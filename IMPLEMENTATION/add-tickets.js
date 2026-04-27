const oracledb = require('oracledb');

const dbConfig = {
  user: 'system',
  password: 'oracle',
  connectString: 'localhost:1521/XE'
};

async function addTickets() {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    
    await connection.execute(
      `INSERT INTO TICKET_TYPE (ticket_id, event_id, ticket_name, price, quantity_available) 
       VALUES (9, 7, 'Standard Pass', 500, 100)`
    );
    
    await connection.execute(
      `INSERT INTO TICKET_TYPE (ticket_id, event_id, ticket_name, price, quantity_available) 
       VALUES (10, 7, 'Premium Pass', 800, 50)`
    );
    
    await connection.commit();
    console.log('✅ Tickets added successfully for event 7');
  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

addTickets();
