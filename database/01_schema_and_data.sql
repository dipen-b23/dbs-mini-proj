-- ============================================================================
-- EVENT REGISTRATION AND ATTENDANCE MANAGEMENT SYSTEM
-- Complete SQL Schema + Sample Data
-- ============================================================================

-- ============================================================================
-- 1. ROLE TABLE
-- ============================================================================
CREATE TABLE Role (
    role_id INT PRIMARY KEY,
    role_name VARCHAR2(50) UNIQUE NOT NULL
);

INSERT INTO Role (role_id, role_name) VALUES (1, 'Admin');

INSERT INTO Role (role_id, role_name) VALUES (2, 'Organizer');

INSERT INTO Role (role_id, role_name) VALUES (3, 'Student');

INSERT INTO Role (role_id, role_name) VALUES (4, 'Volunteer');

INSERT INTO Role (role_id, role_name) VALUES (5, 'Faculty');


-- ============================================================================
-- 2. USER TABLE
-- ============================================================================
CREATE TABLE Users (
    user_id INT PRIMARY KEY,
    name VARCHAR2(100) NOT NULL,
    email VARCHAR2(100) UNIQUE NOT NULL,
    password VARCHAR2(100) NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES Role(role_id)
);

INSERT INTO Users (user_id, name, email, password, role_id) VALUES (1, 'Admin User', 'admin@university.edu', 'admin@123', 1);

INSERT INTO Users (user_id, name, email, password, role_id) VALUES (2, 'Dr. Ramesh Kumar', 'ramesh.kumar@university.edu', 'org@123', 2);

INSERT INTO Users (user_id, name, email, password, role_id) VALUES (3, 'Prof. Priya Sharma', 'priya.sharma@university.edu', 'org@123', 2);

INSERT INTO Users (user_id, name, email, password, role_id) VALUES (4, 'Amit Verma', 'amit.verma@university.edu', 'org@123', 2);

INSERT INTO Users (user_id, name, email, password, role_id) VALUES (5, 'Rohan Singh', 'rohan.singh@student.edu', 'pass@123', 3);

INSERT INTO Users (user_id, name, email, password, role_id) VALUES (6, 'Ananya Desai', 'ananya.desai@student.edu', 'pass@123', 3);

INSERT INTO Users (user_id, name, email, password, role_id) VALUES (7, 'Nikhil Patel', 'nikhil.patel@student.edu', 'pass@123', 3);

INSERT INTO Users (user_id, name, email, password, role_id) VALUES (8, 'Priya Gupta', 'priya.gupta@student.edu', 'pass@123', 3);

INSERT INTO Users (user_id, name, email, password, role_id) VALUES (9, 'Vikram Nair', 'vikram.nair@student.edu', 'pass@123', 3);

INSERT INTO Users (user_id, name, email, password, role_id) VALUES (10, 'Meera Iyer', 'meera.iyer@student.edu', 'pass@123', 3);

INSERT INTO Users (user_id, name, email, password, role_id) VALUES (11, 'Aditya Reddy', 'aditya.reddy@student.edu', 'pass@123', 3);

INSERT INTO Users (user_id, name, email, password, role_id) VALUES (12, 'Divya Menon', 'divya.menon@student.edu', 'pass@123', 3);

INSERT INTO Users (user_id, name, email, password, role_id) VALUES (13, 'Kabir Khan', 'kabir.khan@student.edu', 'pass@123', 3);

INSERT INTO Users (user_id, name, email, password, role_id) VALUES (14, 'Sanjay Rao', 'sanjay.rao@student.edu', 'vol@123', 4);

INSERT INTO Users (user_id, name, email, password, role_id) VALUES (15, 'Neha Joshi', 'neha.joshi@student.edu', 'vol@123', 4);


-- ============================================================================
-- 3. VENUE TABLE
-- ============================================================================
CREATE TABLE Venue (
    venue_id INT PRIMARY KEY,
    venue_name VARCHAR2(100) NOT NULL,
    building VARCHAR2(100),
    capacity INT NOT NULL,
    CHECK (capacity > 0)
);

INSERT INTO Venue (venue_id, venue_name, building, capacity) VALUES (1, 'Auditorium A', 'Main Building', 500);

INSERT INTO Venue (venue_id, venue_name, building, capacity) VALUES (2, 'Seminar Hall B', 'Academic Block', 150);

INSERT INTO Venue (venue_id, venue_name, building, capacity) VALUES (3, 'Conference Room C', 'Admin Building', 80);

INSERT INTO Venue (venue_id, venue_name, building, capacity) VALUES (4, 'Multipurpose Hall D', 'Student Center', 300);

INSERT INTO Venue (venue_id, venue_name, building, capacity) VALUES (5, 'Open Air Amphitheater', 'Central Lawn', 1000);


-- ============================================================================
-- 4. EVENT_CATEGORY TABLE
-- ============================================================================
CREATE TABLE Event_Category (
    category_id INT PRIMARY KEY,
    category_name VARCHAR2(100) UNIQUE NOT NULL
);

INSERT INTO Event_Category (category_id, category_name) VALUES (1, 'Workshop');

INSERT INTO Event_Category (category_id, category_name) VALUES (2, 'Seminar');

INSERT INTO Event_Category (category_id, category_name) VALUES (3, 'Hackathon');

INSERT INTO Event_Category (category_id, category_name) VALUES (4, 'Cultural Event');

INSERT INTO Event_Category (category_id, category_name) VALUES (5, 'Sports');

INSERT INTO Event_Category (category_id, category_name) VALUES (6, 'Competition');


-- ============================================================================
-- 5. EVENT TABLE
-- ============================================================================
CREATE TABLE Event (
    event_id INT PRIMARY KEY,
    event_name VARCHAR2(150) NOT NULL,
    description CLOB,
    event_date DATE NOT NULL,
    venue_id INT NOT NULL,
    category_id INT NOT NULL,
    organizer_id INT NOT NULL,
    FOREIGN KEY (venue_id) REFERENCES Venue(venue_id),
    FOREIGN KEY (category_id) REFERENCES Event_Category(category_id),
    FOREIGN KEY (organizer_id) REFERENCES Users(user_id)
);

INSERT INTO Event (event_id, event_name, description, event_date, venue_id, category_id, organizer_id) VALUES (1, 'AI & Machine Learning Workshop', 'Hands-on workshop on ML algorithms and neural networks', TO_DATE('2024-04-15','YYYY-MM-DD'), 1, 1, 2);

INSERT INTO Event (event_id, event_name, description, event_date, venue_id, category_id, organizer_id) VALUES (2, 'Data Science Seminar', 'Industry insights on big data analytics', TO_DATE('2024-04-20','YYYY-MM-DD'), 2, 2, 3);

INSERT INTO Event (event_id, event_name, description, event_date, venue_id, category_id, organizer_id) VALUES (3, 'Code Masters Hackathon', '24-hour coding competition with prizes', TO_DATE('2024-05-10','YYYY-MM-DD'), 4, 3, 4);

INSERT INTO Event (event_id, event_name, description, event_date, venue_id, category_id, organizer_id) VALUES (4, 'Annual Cultural Fest', 'Music, dance, and drama performances', TO_DATE('2024-05-25','YYYY-MM-DD'), 5, 4, 2);

INSERT INTO Event (event_id, event_name, description, event_date, venue_id, category_id, organizer_id) VALUES (5, 'Web Development Masterclass', 'Advanced web technologies and frameworks', TO_DATE('2024-04-22','YYYY-MM-DD'), 2, 1, 3);

INSERT INTO Event (event_id, event_name, description, event_date, venue_id, category_id, organizer_id) VALUES (6, 'Sports Day 2024', 'Inter-department sports competition', TO_DATE('2024-06-01','YYYY-MM-DD'), 5, 5, 4);


-- ============================================================================
-- 6. EVENT_SESSION TABLE
-- ============================================================================
CREATE TABLE Event_Session (
    session_id INT PRIMARY KEY,
    event_id INT NOT NULL,
    session_name VARCHAR2(150),
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES Event(event_id),
    CHECK (end_time > start_time)
);

INSERT INTO Event_Session (session_id, event_id, session_name, start_time, end_time) VALUES (1, 1, 'Session 1: Supervised Learning', TIMESTAMP '2024-04-15 09:00:00', TIMESTAMP '2024-04-15 11:00:00');

INSERT INTO Event_Session (session_id, event_id, session_name, start_time, end_time) VALUES (2, 1, 'Session 2: Neural Networks', TIMESTAMP '2024-04-15 11:30:00', TIMESTAMP '2024-04-15 13:30:00');

INSERT INTO Event_Session (session_id, event_id, session_name, start_time, end_time) VALUES (3, 1, 'Session 3: Hands-on Lab', TIMESTAMP '2024-04-15 14:30:00', TIMESTAMP '2024-04-15 16:30:00');

INSERT INTO Event_Session (session_id, event_id, session_name, start_time, end_time) VALUES (4, 2, 'Keynote: Big Data Trends', TIMESTAMP '2024-04-20 10:00:00', TIMESTAMP '2024-04-20 11:30:00');

INSERT INTO Event_Session (session_id, event_id, session_name, start_time, end_time) VALUES (5, 2, 'Panel Discussion: Industry Insights', TIMESTAMP '2024-04-20 12:00:00', TIMESTAMP '2024-04-20 13:30:00');

INSERT INTO Event_Session (session_id, event_id, session_name, start_time, end_time) VALUES (6, 3, 'Opening Ceremony', TIMESTAMP '2024-05-10 09:00:00', TIMESTAMP '2024-05-10 10:00:00');

INSERT INTO Event_Session (session_id, event_id, session_name, start_time, end_time) VALUES (7, 3, 'Coding Phase', TIMESTAMP '2024-05-10 10:00:00', TIMESTAMP '2024-05-10 22:00:00');

INSERT INTO Event_Session (session_id, event_id, session_name, start_time, end_time) VALUES (8, 3, 'Final Presentations', TIMESTAMP '2024-05-10 22:30:00', TIMESTAMP '2024-05-11 00:30:00');

INSERT INTO Event_Session (session_id, event_id, session_name, start_time, end_time) VALUES (9, 4, 'Music Performance', TIMESTAMP '2024-05-25 18:00:00', TIMESTAMP '2024-05-25 20:00:00');

INSERT INTO Event_Session (session_id, event_id, session_name, start_time, end_time) VALUES (10, 4, 'Dance Performance', TIMESTAMP '2024-05-25 20:00:00', TIMESTAMP '2024-05-25 22:00:00');

INSERT INTO Event_Session (session_id, event_id, session_name, start_time, end_time) VALUES (11, 5, 'Frontend Technologies', TIMESTAMP '2024-04-22 10:00:00', TIMESTAMP '2024-04-22 11:30:00');

INSERT INTO Event_Session (session_id, event_id, session_name, start_time, end_time) VALUES (12, 5, 'Backend & Databases', TIMESTAMP '2024-04-22 12:00:00', TIMESTAMP '2024-04-22 13:30:00');

INSERT INTO Event_Session (session_id, event_id, session_name, start_time, end_time) VALUES (13, 6, 'Cricket Match', TIMESTAMP '2024-06-01 08:00:00', TIMESTAMP '2024-06-01 12:00:00');

INSERT INTO Event_Session (session_id, event_id, session_name, start_time, end_time) VALUES (14, 6, 'Badminton Tournament', TIMESTAMP '2024-06-01 13:00:00', TIMESTAMP '2024-06-01 17:00:00');


-- ============================================================================
-- 7. TICKET_TYPE TABLE
-- ============================================================================
CREATE TABLE Ticket_Type (
    ticket_id INT PRIMARY KEY,
    event_id INT NOT NULL,
    ticket_name VARCHAR2(100),
    price FLOAT,
    quantity_available INT,
    CHECK (price >= 0),
    CHECK (quantity_available >= 0),
    FOREIGN KEY (event_id) REFERENCES Event(event_id)
);

INSERT INTO Ticket_Type (ticket_id, event_id, ticket_name, price, quantity_available) VALUES (1, 1, 'Standard Pass', 300.00, 100);

INSERT INTO Ticket_Type (ticket_id, event_id, ticket_name, price, quantity_available) VALUES (2, 1, 'Premium Pass', 500.00, 50);

INSERT INTO Ticket_Type (ticket_id, event_id, ticket_name, price, quantity_available) VALUES (3, 2, 'General Entry', 150.00, 150);

INSERT INTO Ticket_Type (ticket_id, event_id, ticket_name, price, quantity_available) VALUES (4, 2, 'VIP Pass', 250.00, 30);

INSERT INTO Ticket_Type (ticket_id, event_id, ticket_name, price, quantity_available) VALUES (5, 3, 'Team Pass (4 members)', 1000.00, 50);

INSERT INTO Ticket_Type (ticket_id, event_id, ticket_name, price, quantity_available) VALUES (6, 3, 'Individual Pass', 300.00, 100);

INSERT INTO Ticket_Type (ticket_id, event_id, ticket_name, price, quantity_available) VALUES (7, 4, 'General Admission', 200.00, 500);

INSERT INTO Ticket_Type (ticket_id, event_id, ticket_name, price, quantity_available) VALUES (8, 4, 'Premium Seating', 500.00, 100);

INSERT INTO Ticket_Type (ticket_id, event_id, ticket_name, price, quantity_available) VALUES (9, 5, 'Standard', 400.00, 80);

INSERT INTO Ticket_Type (ticket_id, event_id, ticket_name, price, quantity_available) VALUES (10, 5, 'Student Discount', 250.00, 40);

INSERT INTO Ticket_Type (ticket_id, event_id, ticket_name, price, quantity_available) VALUES (11, 6, 'Spectator Pass', 100.00, 800);

INSERT INTO Ticket_Type (ticket_id, event_id, ticket_name, price, quantity_available) VALUES (12, 6, 'Participant Pass', 200.00, 100);


-- ============================================================================
-- 8. REGISTRATION TABLE (with ticket_id)
-- ============================================================================
CREATE TABLE Registration (
    registration_id INT PRIMARY KEY,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    ticket_id INT NOT NULL,
    registration_date DATE NOT NULL,
    registration_status VARCHAR2(20) NOT NULL,
    waitlist_position INT,
    CHECK (registration_status IN ('Confirmed', 'Waitlisted', 'Cancelled')),
    UNIQUE (user_id, event_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (event_id) REFERENCES Event(event_id),
    FOREIGN KEY (ticket_id) REFERENCES Ticket_Type(ticket_id)
);

INSERT INTO Registration (registration_id, user_id, event_id, ticket_id, registration_date, registration_status, waitlist_position) VALUES (1, 5, 1, 1, TO_DATE('2024-03-20','YYYY-MM-DD'), 'Confirmed', NULL);

INSERT INTO Registration (registration_id, user_id, event_id, ticket_id, registration_date, registration_status, waitlist_position) VALUES (2, 6, 1, 2, TO_DATE('2024-03-21','YYYY-MM-DD'), 'Confirmed', NULL);

INSERT INTO Registration (registration_id, user_id, event_id, ticket_id, registration_date, registration_status, waitlist_position) VALUES (3, 7, 1, 1, TO_DATE('2024-03-22','YYYY-MM-DD'), 'Confirmed', NULL);

INSERT INTO Registration (registration_id, user_id, event_id, ticket_id, registration_date, registration_status, waitlist_position) VALUES (4, 8, 1, 1, TO_DATE('2024-03-23','YYYY-MM-DD'), 'Waitlisted', 1);

INSERT INTO Registration (registration_id, user_id, event_id, ticket_id, registration_date, registration_status, waitlist_position) VALUES (5, 5, 2, 3, TO_DATE('2024-03-25','YYYY-MM-DD'), 'Confirmed', NULL);

INSERT INTO Registration (registration_id, user_id, event_id, ticket_id, registration_date, registration_status, waitlist_position) VALUES (6, 9, 2, 4, TO_DATE('2024-03-26','YYYY-MM-DD'), 'Confirmed', NULL);

INSERT INTO Registration (registration_id, user_id, event_id, ticket_id, registration_date, registration_status, waitlist_position) VALUES (7, 10, 2, 3, TO_DATE('2024-03-27','YYYY-MM-DD'), 'Confirmed', NULL);

INSERT INTO Registration (registration_id, user_id, event_id, ticket_id, registration_date, registration_status, waitlist_position) VALUES (8, 5, 3, 5, TO_DATE('2024-04-01','YYYY-MM-DD'), 'Confirmed', NULL);

INSERT INTO Registration (registration_id, user_id, event_id, ticket_id, registration_date, registration_status, waitlist_position) VALUES (9, 7, 3, 5, TO_DATE('2024-04-02','YYYY-MM-DD'), 'Confirmed', NULL);

INSERT INTO Registration (registration_id, user_id, event_id, ticket_id, registration_date, registration_status, waitlist_position) VALUES (10, 11, 3, 6, TO_DATE('2024-04-03','YYYY-MM-DD'), 'Confirmed', NULL);

INSERT INTO Registration (registration_id, user_id, event_id, ticket_id, registration_date, registration_status, waitlist_position) VALUES (11, 12, 3, 6, TO_DATE('2024-04-04','YYYY-MM-DD'), 'Confirmed', NULL);

INSERT INTO Registration (registration_id, user_id, event_id, ticket_id, registration_date, registration_status, waitlist_position) VALUES (12, 13, 3, 6, TO_DATE('2024-04-05','YYYY-MM-DD'), 'Waitlisted', 1);

INSERT INTO Registration (registration_id, user_id, event_id, ticket_id, registration_date, registration_status, waitlist_position) VALUES (13, 6, 4, 7, TO_DATE('2024-05-01','YYYY-MM-DD'), 'Confirmed', NULL);

INSERT INTO Registration (registration_id, user_id, event_id, ticket_id, registration_date, registration_status, waitlist_position) VALUES (14, 8, 4, 8, TO_DATE('2024-05-02','YYYY-MM-DD'), 'Confirmed', NULL);

INSERT INTO Registration (registration_id, user_id, event_id, ticket_id, registration_date, registration_status, waitlist_position) VALUES (15, 9, 4, 7, TO_DATE('2024-05-03','YYYY-MM-DD'), 'Confirmed', NULL);

INSERT INTO Registration (registration_id, user_id, event_id, ticket_id, registration_date, registration_status, waitlist_position) VALUES (16, 10, 4, 7, TO_DATE('2024-05-04','YYYY-MM-DD'), 'Confirmed', NULL);

INSERT INTO Registration (registration_id, user_id, event_id, ticket_id, registration_date, registration_status, waitlist_position) VALUES (17, 7, 5, 9, TO_DATE('2024-04-10','YYYY-MM-DD'), 'Confirmed', NULL);

INSERT INTO Registration (registration_id, user_id, event_id, ticket_id, registration_date, registration_status, waitlist_position) VALUES (18, 11, 5, 10, TO_DATE('2024-04-11','YYYY-MM-DD'), 'Confirmed', NULL);

INSERT INTO Registration (registration_id, user_id, event_id, ticket_id, registration_date, registration_status, waitlist_position) VALUES (19, 5, 6, 11, TO_DATE('2024-05-15','YYYY-MM-DD'), 'Confirmed', NULL);

INSERT INTO Registration (registration_id, user_id, event_id, ticket_id, registration_date, registration_status, waitlist_position) VALUES (20, 8, 6, 12, TO_DATE('2024-05-16','YYYY-MM-DD'), 'Confirmed', NULL);

INSERT INTO Registration (registration_id, user_id, event_id, ticket_id, registration_date, registration_status, waitlist_position) VALUES (21, 13, 6, 11, TO_DATE('2024-05-17','YYYY-MM-DD'), 'Confirmed', NULL);


-- ============================================================================
-- 9. ATTENDANCE TABLE
-- ============================================================================
CREATE TABLE Attendance (
    attendance_id INT PRIMARY KEY,
    registration_id INT NOT NULL,
    session_id INT NOT NULL,
    attendance_status VARCHAR2(20) NOT NULL,
    CHECK (attendance_status IN ('Present', 'Absent')),
    FOREIGN KEY (registration_id) REFERENCES Registration(registration_id),
    FOREIGN KEY (session_id) REFERENCES Event_Session(session_id)
);

INSERT INTO Attendance (attendance_id, registration_id, session_id, attendance_status) VALUES (1, 1, 1, 'Present');

INSERT INTO Attendance (attendance_id, registration_id, session_id, attendance_status) VALUES (2, 1, 2, 'Present');

INSERT INTO Attendance (attendance_id, registration_id, session_id, attendance_status) VALUES (3, 1, 3, 'Absent');

INSERT INTO Attendance (attendance_id, registration_id, session_id, attendance_status) VALUES (4, 2, 1, 'Present');

INSERT INTO Attendance (attendance_id, registration_id, session_id, attendance_status) VALUES (5, 2, 2, 'Present');

INSERT INTO Attendance (attendance_id, registration_id, session_id, attendance_status) VALUES (6, 2, 3, 'Present');

INSERT INTO Attendance (attendance_id, registration_id, session_id, attendance_status) VALUES (7, 3, 1, 'Present');

INSERT INTO Attendance (attendance_id, registration_id, session_id, attendance_status) VALUES (8, 3, 2, 'Absent');

INSERT INTO Attendance (attendance_id, registration_id, session_id, attendance_status) VALUES (9, 3, 3, 'Present');

INSERT INTO Attendance (attendance_id, registration_id, session_id, attendance_status) VALUES (10, 5, 4, 'Present');

INSERT INTO Attendance (attendance_id, registration_id, session_id, attendance_status) VALUES (11, 5, 5, 'Present');

INSERT INTO Attendance (attendance_id, registration_id, session_id, attendance_status) VALUES (12, 6, 4, 'Present');

INSERT INTO Attendance (attendance_id, registration_id, session_id, attendance_status) VALUES (13, 6, 5, 'Absent');

INSERT INTO Attendance (attendance_id, registration_id, session_id, attendance_status) VALUES (14, 7, 4, 'Absent');

INSERT INTO Attendance (attendance_id, registration_id, session_id, attendance_status) VALUES (15, 7, 5, 'Present');

INSERT INTO Attendance (attendance_id, registration_id, session_id, attendance_status) VALUES (16, 8, 6, 'Present');

INSERT INTO Attendance (attendance_id, registration_id, session_id, attendance_status) VALUES (17, 8, 7, 'Present');

INSERT INTO Attendance (attendance_id, registration_id, session_id, attendance_status) VALUES (18, 8, 8, 'Present');

INSERT INTO Attendance (attendance_id, registration_id, session_id, attendance_status) VALUES (19, 9, 6, 'Present');

INSERT INTO Attendance (attendance_id, registration_id, session_id, attendance_status) VALUES (20, 9, 7, 'Present');

INSERT INTO Attendance (attendance_id, registration_id, session_id, attendance_status) VALUES (21, 9, 8, 'Absent');

INSERT INTO Attendance (attendance_id, registration_id, session_id, attendance_status) VALUES (22, 10, 6, 'Absent');

INSERT INTO Attendance (attendance_id, registration_id, session_id, attendance_status) VALUES (23, 10, 7, 'Present');

INSERT INTO Attendance (attendance_id, registration_id, session_id, attendance_status) VALUES (24, 10, 8, 'Present');

INSERT INTO Attendance (attendance_id, registration_id, session_id, attendance_status) VALUES (25, 11, 6, 'Present');

INSERT INTO Attendance (attendance_id, registration_id, session_id, attendance_status) VALUES (26, 11, 7, 'Present');

INSERT INTO Attendance (attendance_id, registration_id, session_id, attendance_status) VALUES (27, 11, 8, 'Present');

INSERT INTO Attendance (attendance_id, registration_id, session_id, attendance_status) VALUES (28, 17, 11, 'Present');

INSERT INTO Attendance (attendance_id, registration_id, session_id, attendance_status) VALUES (29, 17, 12, 'Present');

INSERT INTO Attendance (attendance_id, registration_id, session_id, attendance_status) VALUES (30, 18, 11, 'Present');

INSERT INTO Attendance (attendance_id, registration_id, session_id, attendance_status) VALUES (31, 18, 12, 'Absent');


-- ============================================================================
-- 10. PAYMENT TABLE
-- ============================================================================
CREATE TABLE Payment (
    payment_id INT PRIMARY KEY,
    registration_id INT NOT NULL,
    amount FLOAT NOT NULL,
    payment_status VARCHAR2(20) NOT NULL,
    payment_date DATE,
    payment_method VARCHAR2(50),
    CHECK (amount >= 0),
    CHECK (payment_status IN ('Pending', 'Completed', 'Failed')),
    FOREIGN KEY (registration_id) REFERENCES Registration(registration_id)
);

INSERT INTO Payment (payment_id, registration_id, amount, payment_status, payment_date, payment_method) VALUES (1, 1, 300.00, 'Completed', TO_DATE('2024-03-20','YYYY-MM-DD'), 'Card');

INSERT INTO Payment (payment_id, registration_id, amount, payment_status, payment_date, payment_method) VALUES (2, 2, 500.00, 'Completed', TO_DATE('2024-03-21','YYYY-MM-DD'), 'Card');

INSERT INTO Payment (payment_id, registration_id, amount, payment_status, payment_date, payment_method) VALUES (3, 3, 300.00, 'Completed', TO_DATE('2024-03-22','YYYY-MM-DD'), 'NetBanking');

INSERT INTO Payment (payment_id, registration_id, amount, payment_status, payment_date, payment_method) VALUES (4, 4, 300.00, 'Pending', NULL, NULL);

INSERT INTO Payment (payment_id, registration_id, amount, payment_status, payment_date, payment_method) VALUES (5, 5, 150.00, 'Completed', TO_DATE('2024-03-25','YYYY-MM-DD'), 'Card');

INSERT INTO Payment (payment_id, registration_id, amount, payment_status, payment_date, payment_method) VALUES (6, 6, 250.00, 'Completed', TO_DATE('2024-03-26','YYYY-MM-DD'), 'Card');

INSERT INTO Payment (payment_id, registration_id, amount, payment_status, payment_date, payment_method) VALUES (7, 7, 150.00, 'Completed', TO_DATE('2024-03-27','YYYY-MM-DD'), 'NetBanking');

INSERT INTO Payment (payment_id, registration_id, amount, payment_status, payment_date, payment_method) VALUES (8, 8, 1000.00, 'Completed', TO_DATE('2024-04-01','YYYY-MM-DD'), 'Card');

INSERT INTO Payment (payment_id, registration_id, amount, payment_status, payment_date, payment_method) VALUES (9, 9, 1000.00, 'Completed', TO_DATE('2024-04-02','YYYY-MM-DD'), 'Card');

INSERT INTO Payment (payment_id, registration_id, amount, payment_status, payment_date, payment_method) VALUES (10, 10, 300.00, 'Completed', TO_DATE('2024-04-03','YYYY-MM-DD'), 'NetBanking');

INSERT INTO Payment (payment_id, registration_id, amount, payment_status, payment_date, payment_method) VALUES (11, 11, 300.00, 'Completed', TO_DATE('2024-04-04','YYYY-MM-DD'), 'Card');

INSERT INTO Payment (payment_id, registration_id, amount, payment_status, payment_date, payment_method) VALUES (12, 12, 300.00, 'Pending', NULL, NULL);

INSERT INTO Payment (payment_id, registration_id, amount, payment_status, payment_date, payment_method) VALUES (13, 13, 200.00, 'Completed', TO_DATE('2024-05-01','YYYY-MM-DD'), 'Card');

INSERT INTO Payment (payment_id, registration_id, amount, payment_status, payment_date, payment_method) VALUES (14, 14, 500.00, 'Completed', TO_DATE('2024-05-02','YYYY-MM-DD'), 'Card');

INSERT INTO Payment (payment_id, registration_id, amount, payment_status, payment_date, payment_method) VALUES (15, 15, 200.00, 'Completed', TO_DATE('2024-05-03','YYYY-MM-DD'), 'NetBanking');

INSERT INTO Payment (payment_id, registration_id, amount, payment_status, payment_date, payment_method) VALUES (16, 16, 200.00, 'Completed', TO_DATE('2024-05-04','YYYY-MM-DD'), 'Card');

INSERT INTO Payment (payment_id, registration_id, amount, payment_status, payment_date, payment_method) VALUES (17, 17, 400.00, 'Completed', TO_DATE('2024-04-10','YYYY-MM-DD'), 'Card');

INSERT INTO Payment (payment_id, registration_id, amount, payment_status, payment_date, payment_method) VALUES (18, 18, 250.00, 'Completed', TO_DATE('2024-04-11','YYYY-MM-DD'), 'Card');

INSERT INTO Payment (payment_id, registration_id, amount, payment_status, payment_date, payment_method) VALUES (19, 19, 100.00, 'Completed', TO_DATE('2024-05-15','YYYY-MM-DD'), 'Card');

INSERT INTO Payment (payment_id, registration_id, amount, payment_status, payment_date, payment_method) VALUES (20, 20, 200.00, 'Completed', TO_DATE('2024-05-16','YYYY-MM-DD'), 'NetBanking');

INSERT INTO Payment (payment_id, registration_id, amount, payment_status, payment_date, payment_method) VALUES (21, 21, 100.00, 'Completed', TO_DATE('2024-05-17','YYYY-MM-DD'), 'Card');


-- ============================================================================
-- 11. FEEDBACK TABLE
-- ============================================================================
CREATE TABLE Feedback (
    feedback_id INT PRIMARY KEY,
    registration_id INT NOT NULL UNIQUE,
    rating INT NOT NULL,
    comments VARCHAR2(1000),
    CHECK (rating BETWEEN 1 AND 5),
    FOREIGN KEY (registration_id) REFERENCES Registration(registration_id)
);

INSERT INTO Feedback (feedback_id, registration_id, rating, comments) VALUES (1, 1, 5, 'Excellent workshop! Very informative and well-structured.');

INSERT INTO Feedback (feedback_id, registration_id, rating, comments) VALUES (2, 2, 5, 'Great instructors and hands-on experience.');

INSERT INTO Feedback (feedback_id, registration_id, rating, comments) VALUES (3, 3, 4, 'Good content but could have more practical exercises.');

INSERT INTO Feedback (feedback_id, registration_id, rating, comments) VALUES (4, 5, 4, 'Insightful seminar with industry experts.');

INSERT INTO Feedback (feedback_id, registration_id, rating, comments) VALUES (5, 6, 5, 'Outstanding keynote and panel discussion.');

INSERT INTO Feedback (feedback_id, registration_id, rating, comments) VALUES (6, 8, 5, 'Amazing hackathon experience! Great prizes.');

INSERT INTO Feedback (feedback_id, registration_id, rating, comments) VALUES (7, 9, 5, 'Well-organized and challenging problems.');

INSERT INTO Feedback (feedback_id, registration_id, rating, comments) VALUES (8, 10, 4, 'Good hackathon, challenging problems.');

INSERT INTO Feedback (feedback_id, registration_id, rating, comments) VALUES (9, 11, 5, 'Excellent event, great team bonding.');

INSERT INTO Feedback (feedback_id, registration_id, rating, comments) VALUES (10, 13, 4, 'Cultural fest was entertaining.');

INSERT INTO Feedback (feedback_id, registration_id, rating, comments) VALUES (11, 14, 5, 'Amazing performances and organization.');

INSERT INTO Feedback (feedback_id, registration_id, rating, comments) VALUES (12, 15, 4, 'Good cultural event, enjoyed the performances.');

INSERT INTO Feedback (feedback_id, registration_id, rating, comments) VALUES (13, 17, 5, 'Masterclass was comprehensive and well-taught.');

INSERT INTO Feedback (feedback_id, registration_id, rating, comments) VALUES (14, 19, 4, 'Sports day was well-organized and fun.');


-- ============================================================================
-- 12. INDEXES FOR PERFORMANCE
-- ============================================================================
CREATE INDEX idx_user_on_registration ON Registration(user_id);

CREATE INDEX idx_event_on_registration ON Registration(event_id);

CREATE INDEX idx_session_on_attendance ON Attendance(session_id);

CREATE INDEX idx_payment_on_registration ON Payment(registration_id);

CREATE INDEX idx_event_on_session ON Event_Session(event_id);

CREATE INDEX idx_organizer_on_event ON Event(organizer_id);

CREATE INDEX idx_role_on_user ON User(role_id);

CREATE INDEX idx_venue_on_event ON Event(venue_id);

CREATE INDEX idx_category_on_event ON Event(category_id);


-- ============================================================================
-- End of Schema and Data
-- ============================================================================

-- Commit all changes
COMMIT;

