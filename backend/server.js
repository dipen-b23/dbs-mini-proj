const express = require("express");
const cors = require("cors");
const oracledb = require("oracledb");

const app = express();
app.use(cors());
app.use(express.json());

// TEST ENDPOINT
app.get("/test", (req, res) => {
  res.json({ status: "Backend OK", timestamp: new Date() });
});

const dbConfig = {
  user: "system",
  password: "dipen_b23",
  connectString: "localhost:1521/XEPDB1"
};

// GET USERS
app.get("/users", async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `SELECT * FROM USERS`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  } finally {
    if (connection) await connection.close();
  }
});

// ADD NEW USER
app.post("/users", async (req, res) => {
  const { name, email, password, roleId } = req.body;

  if (!name || !email || !password || !roleId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    // Get next user_id
    const idResult = await connection.execute(
      `SELECT MAX(USER_ID) + 1 as NEXT_ID FROM USERS`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    const nextId = idResult.rows[0]?.NEXT_ID || 1;

    const result = await connection.execute(
      `INSERT INTO USERS (USER_ID, NAME, EMAIL, PASSWORD, ROLE_ID) 
       VALUES (:id, :name, :email, :password, :roleId)`,
      {
        id: nextId,
        name,
        email,
        password,
        roleId
      }
    );

    await connection.commit();
    res.json({ success: true, userId: nextId, message: "User added successfully" });
    console.log(`✅ New user added: ${name} (ID: ${nextId})`);
  } catch (err) {
    console.error('❌ Add user error:', err.message);
    res.status(500).json({ error: err.message });
  } finally {
    if (connection) await connection.close();
  }
});

// LOGIN
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `SELECT * FROM USERS WHERE EMAIL = :email AND PASSWORD = :password`,
      [email, password],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    if (result.rows.length > 0) {
      console.log(`✅ Login successful: ${email}`);
      res.json({ success: true, user: result.rows[0] });
    } else {
      res.json({ success: false });
    }

  } catch (err) {
    console.error('❌ Login error:', err.message);
    res.status(500).json({ error: err.message });
  } finally {
    if (connection) await connection.close();
  }
});

// REGISTER NEW USER
app.post("/register", async (req, res) => {
  const { name, email, password, roleId } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    // Get next user_id
    const idResult = await connection.execute(
      `SELECT MAX(USER_ID) + 1 as NEXT_ID FROM USERS`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    const nextId = idResult.rows[0]?.NEXT_ID || 1;

    await connection.execute(
      `INSERT INTO USERS (USER_ID, NAME, EMAIL, PASSWORD, ROLE_ID) 
       VALUES (:id, :name, :email, :password, :roleId)`,
      {
        id: nextId,
        name,
        email,
        password,
        roleId: roleId || 3 // Default to Student
      }
    );

    await connection.commit();
    console.log(`✅ User registered: ${name} (${email})`);
    res.json({ success: true, userId: nextId, message: "Registration successful" });
  } catch (err) {
    console.error('❌ Register error:', err.message);
    res.status(500).json({ error: err.message });
  } finally {
    if (connection) await connection.close();
  }
});

// ============ ADMIN ENDPOINTS ============

// GET ALL EVENTS
app.get("/admin/events", async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    console.log('📌 /admin/events called');

    const result = await connection.execute(
      `SELECT EVENT_ID, EVENT_NAME, EVENT_DATE, VENUE_ID, CATEGORY_ID FROM EVENT`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    console.log('✅ Events found:', result.rows.length);
    res.json(result.rows);
  } catch (err) {
    console.error('❌ Events error:', err.message);
    res.status(500).json({ error: err.message });
  } finally {
    if (connection) await connection.close();
  }
});

// GET ALL REGISTRATIONS WITH DETAILS
app.get("/admin/registrations", async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `SELECT r.REGISTRATION_ID, u.NAME as USER_NAME, u.EMAIL, 
              e.EVENT_NAME, tt.TICKET_NAME, r.REGISTRATION_DATE, 
              r.REGISTRATION_STATUS, p.AMOUNT, p.PAYMENT_STATUS
       FROM REGISTRATION r
       JOIN USERS u ON r.USER_ID = u.USER_ID
       JOIN EVENT e ON r.EVENT_ID = e.EVENT_ID
       JOIN TICKET_TYPE tt ON r.TICKET_ID = tt.TICKET_ID
       LEFT JOIN PAYMENT p ON r.REGISTRATION_ID = p.REGISTRATION_ID
       ORDER BY r.REGISTRATION_DATE DESC`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    console.log('Registrations fetched:', result.rows.length);
    res.json(result.rows);
  } catch (err) {
    console.error('Registrations endpoint error:', err);
    res.status(500).send(err.message);
  } finally {
    if (connection) await connection.close();
  }
});

// GET PAYMENT ANALYTICS
app.get("/admin/payments", async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `SELECT p.PAYMENT_ID, p.AMOUNT, p.PAYMENT_STATUS, p.PAYMENT_DATE,
              p.PAYMENT_METHOD, u.NAME as USER_NAME, e.EVENT_NAME
       FROM PAYMENT p
       JOIN REGISTRATION r ON p.REGISTRATION_ID = r.REGISTRATION_ID
       JOIN USERS u ON r.USER_ID = u.USER_ID
       JOIN EVENT e ON r.EVENT_ID = e.EVENT_ID
       ORDER BY p.PAYMENT_DATE DESC`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    console.log('Payments fetched:', result.rows.length);
    res.json(result.rows);
  } catch (err) {
    console.error('Payments endpoint error:', err);
    res.status(500).send(err.message);
  } finally {
    if (connection) await connection.close();
  }
});

// GET FEEDBACK DATA
app.get("/admin/feedback", async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `SELECT f.FEEDBACK_ID, f.RATING, f.COMMENTS,
              u.NAME as USER_NAME, e.EVENT_NAME
       FROM FEEDBACK f
       JOIN REGISTRATION r ON f.REGISTRATION_ID = r.REGISTRATION_ID
       JOIN USERS u ON r.USER_ID = u.USER_ID
       JOIN EVENT e ON r.EVENT_ID = e.EVENT_ID
       ORDER BY f.FEEDBACK_ID DESC`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    console.log('Feedback fetched:', result.rows.length);
    res.json(result.rows);
  } catch (err) {
    console.error('Feedback endpoint error:', err);
    res.status(500).send(err.message);
  } finally {
    if (connection) await connection.close();
  }
});

// GET ATTENDANCE RECORDS
app.get("/admin/attendance", async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `SELECT a.ATTENDANCE_ID, u.NAME as USER_NAME, e.EVENT_NAME,
              es.SESSION_NAME, a.ATTENDANCE_STATUS
       FROM ATTENDANCE a
       JOIN REGISTRATION r ON a.REGISTRATION_ID = r.REGISTRATION_ID
       JOIN USERS u ON r.USER_ID = u.USER_ID
       JOIN EVENT e ON r.EVENT_ID = e.EVENT_ID
       JOIN EVENT_SESSION es ON a.SESSION_ID = es.SESSION_ID
       ORDER BY a.ATTENDANCE_ID DESC`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    console.log('Attendance fetched:', result.rows.length);
    res.json(result.rows);
  } catch (err) {
    console.error('Attendance endpoint error:', err);
    res.status(500).send(err.message);
  } finally {
    if (connection) await connection.close();
  }
});

// GET DASHBOARD STATS
app.get("/admin/stats", async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const usersResult = await connection.execute(
      `SELECT COUNT(*) as TOTAL_USERS FROM USERS`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    const eventsResult = await connection.execute(
      `SELECT COUNT(*) as TOTAL_EVENTS FROM EVENT`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    const registrationsResult = await connection.execute(
      `SELECT COUNT(*) as TOTAL_REGISTRATIONS FROM REGISTRATION`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    const paymentsResult = await connection.execute(
      `SELECT SUM(AMOUNT) as TOTAL_REVENUE FROM PAYMENT WHERE PAYMENT_STATUS = 'Completed'`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    console.log('Stats fetched:', {
      users: usersResult.rows,
      events: eventsResult.rows,
      registrations: registrationsResult.rows,
      payments: paymentsResult.rows
    });

    res.json({
      totalUsers: usersResult.rows[0]?.TOTAL_USERS || 0,
      totalEvents: eventsResult.rows[0]?.TOTAL_EVENTS || 0,
      totalRegistrations: registrationsResult.rows[0]?.TOTAL_REGISTRATIONS || 0,
      totalRevenue: paymentsResult.rows[0]?.TOTAL_REVENUE || 0
    });
  } catch (err) {
    console.error('Stats endpoint error:', err);
    res.status(500).send(err.message);
  } finally {
    if (connection) await connection.close();
  }
});

// REGISTER USER FOR EVENT
app.post("/events/:eventId/register", async (req, res) => {
  const { eventId } = req.params;
  const { userId, ticketId } = req.body;

  if (!userId || !ticketId) {
    return res.status(400).json({ error: "Missing userId or ticketId" });
  }

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    // Get next registration_id
    const idResult = await connection.execute(
      `SELECT MAX(REGISTRATION_ID) + 1 as NEXT_ID FROM REGISTRATION`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    const registrationId = idResult.rows[0]?.NEXT_ID || 1;

    await connection.execute(
      `INSERT INTO REGISTRATION (REGISTRATION_ID, USER_ID, EVENT_ID, TICKET_ID, REGISTRATION_DATE, REGISTRATION_STATUS)
       VALUES (:regId, :userId, :eventId, :ticketId, SYSDATE, 'Confirmed')`,
      {
        regId: registrationId,
        userId,
        eventId,
        ticketId
      }
    );

    await connection.commit();
    console.log(`✅ User ${userId} registered for event ${eventId}`);
    res.json({ success: true, registrationId, message: "Registered for event" });
  } catch (err) {
    console.error('❌ Event registration error:', err.message);
    res.status(500).json({ error: err.message });
  } finally {
    if (connection) await connection.close();
  }
});

// SUBMIT FEEDBACK
app.post("/feedback", async (req, res) => {
  const { registrationId, rating, comments } = req.body;

  if (!registrationId || !rating) {
    return res.status(400).json({ error: "Missing registrationId or rating" });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ error: "Rating must be between 1 and 5" });
  }

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    // Get next feedback_id
    const idResult = await connection.execute(
      `SELECT MAX(FEEDBACK_ID) + 1 as NEXT_ID FROM FEEDBACK`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    const feedbackId = idResult.rows[0]?.NEXT_ID || 1;

    await connection.execute(
      `INSERT INTO FEEDBACK (FEEDBACK_ID, REGISTRATION_ID, RATING, COMMENTS)
       VALUES (:feedbackId, :registrationId, :rating, :comments)`,
      {
        feedbackId,
        registrationId,
        rating,
        comments: comments || null
      }
    );

    await connection.commit();
    console.log(`✅ Feedback submitted for registration ${registrationId}`);
    res.json({ success: true, feedbackId, message: "Feedback submitted" });
  } catch (err) {
    console.error('❌ Feedback error:', err.message);
    res.status(500).json({ error: err.message });
  } finally {
    if (connection) await connection.close();
  }
});

// PROCESS PAYMENT
app.post("/payment", async (req, res) => {
  const { registrationId, amount, paymentMethod } = req.body;

  if (!registrationId || !amount) {
    return res.status(400).json({ error: "Missing registrationId or amount" });
  }

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    // Get next payment_id
    const idResult = await connection.execute(
      `SELECT MAX(PAYMENT_ID) + 1 as NEXT_ID FROM PAYMENT`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    const paymentId = idResult.rows[0]?.NEXT_ID || 1;

    await connection.execute(
      `INSERT INTO PAYMENT (PAYMENT_ID, REGISTRATION_ID, AMOUNT, PAYMENT_STATUS, PAYMENT_DATE, PAYMENT_METHOD)
       VALUES (:paymentId, :registrationId, :amount, 'Completed', SYSDATE, :paymentMethod)`,
      {
        paymentId,
        registrationId,
        amount,
        paymentMethod: paymentMethod || 'Card'
      }
    );

    await connection.commit();
    console.log(`✅ Payment processed for registration ${registrationId}: $${amount}`);
    res.json({ success: true, paymentId, message: "Payment successful" });
  } catch (err) {
    console.error('❌ Payment error:', err.message);
    res.status(500).json({ error: err.message });
  } finally {
    if (connection) await connection.close();
  }
});

// GET USER REGISTRATIONS
app.get("/users/:userId/registrations", async (req, res) => {
  const { userId } = req.params;

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `SELECT r.REGISTRATION_ID, e.EVENT_ID, e.EVENT_NAME, e.EVENT_DATE, 
              r.REGISTRATION_STATUS, tt.TICKET_NAME, tt.PRICE
       FROM REGISTRATION r
       JOIN EVENT e ON r.EVENT_ID = e.EVENT_ID
       JOIN TICKET_TYPE tt ON r.TICKET_ID = tt.TICKET_ID
       WHERE r.USER_ID = :userId
       ORDER BY e.EVENT_DATE DESC`,
      [userId],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    res.json(result.rows);
  } catch (err) {
    console.error('❌ User registrations error:', err.message);
    res.status(500).json({ error: err.message });
  } finally {
    if (connection) await connection.close();
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});