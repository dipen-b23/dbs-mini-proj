-- Add tickets for test event (event_id = 7)
INSERT INTO TICKET_TYPE (ticket_id, event_id, ticket_name, price, quantity_available) 
VALUES (9, 7, 'Standard Pass', 500, 100);

INSERT INTO TICKET_TYPE (ticket_id, event_id, ticket_name, price, quantity_available) 
VALUES (10, 7, 'Premium Pass', 800, 50);

COMMIT;
SELECT 'Tickets created successfully' FROM DUAL;
