const oracledb = require('oracledb');

const dbConfig = {
  user: 'system',
  password: 'dipen_b23',
  connectString: 'localhost:1521/XEPDB1'
};

async function addTickets() {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    
    // Get next ticket ID
    const idResult = await connection.execute(
      `SELECT MAX(TICKET_ID) + 1 as NEXT_ID FROM TICKET_TYPE`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    
    let nextId = idResult.rows[0]?.NEXT_ID || 11;
    
    await connection.execute(
      `INSERT INTO TICKET_TYPE (ticket_id, event_id, ticket_name, price, quantity_available) 
       VALUES (:id1, 7, 'Standard Pass', 500, 100)`,
      [nextId]
    );
    
    await connection.execute(
      `INSERT INTO TICKET_TYPE (ticket_id, event_id, ticket_name, price, quantity_available) 
       VALUES (:id2, 7, 'Premium Pass', 800, 50)`,
      [nextId + 1]
    );
    
    await connection.commit();
    console.log(`✅ Tickets (IDs ${nextId}, ${nextId + 1}) added successfully for event 7`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

addTickets();
