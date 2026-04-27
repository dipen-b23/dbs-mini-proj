-- ============================================================================
-- EVENT REGISTRATION AND ATTENDANCE MANAGEMENT SYSTEM
-- Complete SQL Schema + Sample Data
-- ============================================================================
-- LAST UPDATED: March 31, 2026
-- 
-- IMPLEMENTED FEATURES:
--  User Management (5 roles: Admin, Organizer, Student, Volunteer, Faculty)
--  Event Management (creation, categorization, venue selection)
--  Ticket Management (tiered pricing with quantity tracking)
--  Event Sessions (multi-session tracking with specific times)
--  Registration System (with waitlist support)
--  Attendance Tracking (per session with status)
--  Payment Processing (with status tracking)
--  Feedback System (ratings and comments)
--  Admin Dashboard (analytics and monitoring)
--  User Profiles (dashboard, attendance records, registrations)
--  Event Discovery Portal (public event listing with details)
--  Event Details Page (with ticket selection and registration)
--
-- FRONTEND FEATURES SUPPORTED:
-- - Admin Portal: Event creation, user management, statistics
-- - User Portal: Event discovery, registration, ticket purchase
-- - Payment Processing: Integration with payment system
-- - Attendance Tracking: View attendance records
-- - Event Details: Full event information with tickets
--
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


CREATE OR REPLACE TRIGGER trg_payment_complete
AFTER UPDATE OF payment_status ON Payment
FOR EACH ROW
WHEN (NEW.payment_status = 'Completed')
BEGIN
    UPDATE Registration
    SET registration_status = 'Confirmed'
    WHERE registration_id = :NEW.registration_id;
END;
/


-- ============================================================================
-- EVENT MANAGEMENT DBMS - CRITICAL SQL QUERIES
-- Useful for:
-- 1. Lab submission (demonstrate query writing)
-- 2. Viva (explain business logic)
-- 3. Future reference
-- ============================================================================

-- ============================================================================
-- 1. BASIC RETRIEVAL QUERIES
-- ============================================================================

-- Q1.1: List all confirmed registrations for an event
SELECT 
    r.registration_id,
    u.name AS student_name,
    u.email,
    e.event_name,
    r.registration_date,
    tt.ticket_name,
    tt.price
FROM Registration r
JOIN User u ON r.user_id = u.user_id
JOIN Event e ON r.event_id = e.event_id
JOIN Ticket_Type tt ON r.ticket_id = tt.ticket_id
WHERE e.event_id = 1 AND r.registration_status = 'Confirmed'
ORDER BY r.registration_date;

-- Q1.2: Find all events organized by a specific organizer
SELECT 
    e.event_id,
    e.event_name,
    e.event_date,
    v.venue_name,
    ec.category_name,
    v.capacity
FROM Event e
JOIN Venue v ON e.venue_id = v.venue_id
JOIN Event_Category ec ON e.category_id = ec.category_id
WHERE e.organizer_id = 2
ORDER BY e.event_date;

-- Q1.3: Get all sessions for a specific event with timings
SELECT 
    es.session_id,
    es.session_name,
    es.start_time,
    es.end_time,
    TIMEDIFF(es.end_time, es.start_time) AS duration
FROM Event_Session es
WHERE es.event_id = 1
ORDER BY es.start_time;

-- ============================================================================
-- 2. WAITLIST MANAGEMENT QUERIES
-- ============================================================================

-- Q2.1: Get all waitlisted registrations for an event
SELECT 
    r.registration_id,
    u.name,
    u.email,
    r.waitlist_position,
    r.registration_date,
    tt.ticket_name,
    tt.price
FROM Registration r
JOIN User u ON r.user_id = u.user_id
JOIN Ticket_Type tt ON r.ticket_id = tt.ticket_id
WHERE r.event_id = 1 AND r.registration_status = 'Waitlisted'
ORDER BY r.waitlist_position;

-- Q2.2: Check waitlist count for each event
SELECT 
    e.event_name,
    COUNT(r.registration_id) AS waitlist_count,
    COUNT(CASE WHEN r.registration_status = 'Confirmed' THEN 1 END) AS confirmed_count,
    v.capacity,
    (v.capacity - COUNT(CASE WHEN r.registration_status = 'Confirmed' THEN 1 END)) AS available_capacity
FROM Event e
LEFT JOIN Registration r ON e.event_id = r.event_id
JOIN Venue v ON e.venue_id = v.venue_id
GROUP BY e.event_id, e.event_name, v.capacity
ORDER BY waitlist_count DESC;

-- ============================================================================
-- 3. ATTENDANCE TRACKING QUERIES
-- ============================================================================

-- Q3.1: Get attendance summary for a specific event
SELECT 
    es.session_name,
    COUNT(a.attendance_id) AS total_attendance_records,
    SUM(CASE WHEN a.attendance_status = 'Present' THEN 1 ELSE 0 END) AS present_count,
    SUM(CASE WHEN a.attendance_status = 'Absent' THEN 1 ELSE 0 END) AS absent_count,
    ROUND(100.0 * SUM(CASE WHEN a.attendance_status = 'Present' THEN 1 ELSE 0 END) 
          / COUNT(a.attendance_id), 2) AS attendance_percentage
FROM Attendance a
JOIN Event_Session es ON a.session_id = es.session_id
WHERE es.event_id = 1
GROUP BY es.session_id, es.session_name
ORDER BY es.start_time;

-- Q3.2: Get individual student attendance record for an event
SELECT 
    u.name,
    u.email,
    e.event_name,
    es.session_name,
    a.attendance_status,
    es.start_time,
    es.end_time
FROM Attendance a
JOIN Registration r ON a.registration_id = r.registration_id
JOIN User u ON r.user_id = u.user_id
JOIN Event_Session es ON a.session_id = es.session_id
JOIN Event e ON es.event_id = e.event_id
WHERE e.event_id = 1
ORDER BY u.name, es.start_time;

-- Q3.3: Students with 100% attendance in an event
SELECT 
    u.user_id,
    u.name,
    u.email,
    e.event_name,
    COUNT(a.attendance_id) AS sessions_attended
FROM Registration r
JOIN User u ON r.user_id = u.user_id
JOIN Event e ON r.event_id = e.event_id
JOIN Attendance a ON r.registration_id = a.registration_id
WHERE e.event_id = 1 AND a.attendance_status = 'Present'
GROUP BY u.user_id, u.name, u.email, e.event_name
HAVING COUNT(a.attendance_id) = (SELECT COUNT(*) FROM Event_Session WHERE event_id = 1);

-- ============================================================================
-- 4. PAYMENT AND REVENUE QUERIES
-- ============================================================================

-- Q4.1: Revenue analysis per event
SELECT 
    e.event_id,
    e.event_name,
    COUNT(DISTINCT r.registration_id) AS total_registrations,
    COUNT(CASE WHEN p.payment_status = 'Completed' THEN 1 END) AS completed_payments,
    SUM(CASE WHEN p.payment_status = 'Completed' THEN p.amount ELSE 0 END) AS total_revenue,
    SUM(CASE WHEN p.payment_status = 'Pending' THEN p.amount ELSE 0 END) AS pending_amount,
    SUM(CASE WHEN p.payment_status = 'Failed' THEN p.amount ELSE 0 END) AS failed_amount,
    ROUND(100.0 * COUNT(CASE WHEN p.payment_status = 'Completed' THEN 1 END) 
          / COUNT(DISTINCT r.registration_id), 2) AS payment_success_rate
FROM Event e
LEFT JOIN Registration r ON e.event_id = r.event_id
LEFT JOIN Payment p ON r.registration_id = p.registration_id
GROUP BY e.event_id, e.event_name
ORDER BY total_revenue DESC;

-- Q4.2: Payment status overview
SELECT 
    p.payment_status,
    COUNT(p.payment_id) AS payment_count,
    SUM(p.amount) AS total_amount,
    AVG(p.amount) AS average_amount
FROM Payment p
GROUP BY p.payment_status;

-- Q4.3: Revenue by ticket type for an event
SELECT 
    tt.ticket_name,
    COUNT(r.registration_id) AS tickets_sold,
    tt.price,
    COUNT(r.registration_id) * tt.price AS expected_revenue,
    SUM(CASE WHEN p.payment_status = 'Completed' THEN p.amount ELSE 0 END) AS actual_revenue
FROM Ticket_Type tt
LEFT JOIN Registration r ON tt.ticket_id = r.ticket_id
LEFT JOIN Payment p ON r.registration_id = p.registration_id
WHERE tt.event_id = 1
GROUP BY tt.ticket_id, tt.ticket_name, tt.price;

-- ============================================================================
-- 5. FEEDBACK AND ANALYTICS QUERIES
-- ============================================================================

-- Q5.1: Event ratings and feedback summary
SELECT 
    e.event_name,
    COUNT(f.feedback_id) AS total_feedback,
    ROUND(AVG(f.rating), 2) AS average_rating,
    MAX(f.rating) AS max_rating,
    MIN(f.rating) AS min_rating,
    COUNT(CASE WHEN f.rating >= 4 THEN 1 END) AS positive_feedback_count,
    COUNT(CASE WHEN f.rating <= 2 THEN 1 END) AS negative_feedback_count
FROM Event e
LEFT JOIN Registration r ON e.event_id = r.event_id
LEFT JOIN Feedback f ON r.registration_id = f.registration_id
GROUP BY e.event_id, e.event_name
ORDER BY average_rating DESC;

-- Q5.2: Get all feedback for a specific event with student names
SELECT 
    u.name,
    u.email,
    f.rating,
    f.comments,
    r.registration_date
FROM Feedback f
JOIN Registration r ON f.registration_id = r.registration_id
JOIN User u ON r.user_id = u.user_id
WHERE r.event_id = 1
ORDER BY f.rating DESC;

-- Q5.3: Best and worst rated events
(SELECT 'Best' AS type, e.event_name, ROUND(AVG(f.rating), 2) AS avg_rating
 FROM Event e
 JOIN Registration r ON e.event_id = r.event_id
 JOIN Feedback f ON r.registration_id = f.registration_id
 GROUP BY e.event_id, e.event_name
 ORDER BY avg_rating DESC
 LIMIT 3)
UNION ALL
(SELECT 'Worst' AS type, e.event_name, ROUND(AVG(f.rating), 2) AS avg_rating
 FROM Event e
 JOIN Registration r ON e.event_id = r.event_id
 JOIN Feedback f ON r.registration_id = f.registration_id
 GROUP BY e.event_id, e.event_name
 ORDER BY avg_rating ASC
 LIMIT 3);

-- ============================================================================
-- 6. CATEGORY AND POPULARITY QUERIES
-- ============================================================================

-- Q6.1: Most popular event categories
SELECT 
    ec.category_name,
    COUNT(DISTINCT e.event_id) AS event_count,
    COUNT(DISTINCT r.registration_id) AS total_registrations,
    ROUND(AVG(f.rating), 2) AS average_rating
FROM Event_Category ec
LEFT JOIN Event e ON ec.category_id = e.category_id
LEFT JOIN Registration r ON e.event_id = r.event_id
LEFT JOIN Feedback f ON r.registration_id = f.registration_id
GROUP BY ec.category_id, ec.category_name
ORDER BY total_registrations DESC;

-- Q6.2: Events by category with registration count
SELECT 
    ec.category_name,
    e.event_name,
    e.event_date,
    v.venue_name,
    COUNT(r.registration_id) AS registration_count,
    SUM(CASE WHEN r.registration_status = 'Confirmed' THEN 1 ELSE 0 END) AS confirmed_count,
    SUM(CASE WHEN r.registration_status = 'Waitlisted' THEN 1 ELSE 0 END) AS waitlist_count
FROM Event_Category ec
JOIN Event e ON ec.category_id = e.category_id
JOIN Venue v ON e.venue_id = v.venue_id
LEFT JOIN Registration r ON e.event_id = r.event_id
GROUP BY ec.category_id, ec.category_name, e.event_id, e.event_name, e.event_date, v.venue_name
ORDER BY ec.category_name, e.event_date;

-- ============================================================================
-- 7. VENUE MANAGEMENT QUERIES
-- ============================================================================

-- Q7.1: Venue utilization analysis
SELECT 
    v.venue_name,
    v.capacity,
    COUNT(DISTINCT e.event_id) AS events_hosted,
    COUNT(DISTINCT CASE WHEN r.registration_status = 'Confirmed' THEN r.registration_id END) 
        AS total_confirmed_registrations,
    ROUND(100.0 * COUNT(DISTINCT CASE WHEN r.registration_status = 'Confirmed' THEN r.registration_id END) 
          / (v.capacity * COUNT(DISTINCT e.event_id)), 2) AS utilization_percentage
FROM Venue v
LEFT JOIN Event e ON v.venue_id = e.venue_id
LEFT JOIN Registration r ON e.event_id = r.event_id
GROUP BY v.venue_id, v.venue_name, v.capacity
ORDER BY utilization_percentage DESC;

-- Q7.2: Check for venue conflicts (overlapping events on same date and venue)
SELECT 
    v.venue_name,
    e1.event_name AS event_1,
    e1.event_date,
    e2.event_name AS event_2,
    e2.event_date
FROM Event e1
JOIN Event e2 ON e1.venue_id = e2.venue_id 
    AND e1.event_date = e2.event_date 
    AND e1.event_id < e2.event_id
JOIN Venue v ON e1.venue_id = v.venue_id;

-- ============================================================================
-- 8. USER AND ROLE-BASED QUERIES
-- ============================================================================

-- Q8.1: Student participation summary
SELECT 
    u.user_id,
    u.name,
    u.email,
    COUNT(DISTINCT r.event_id) AS events_registered,
    COUNT(CASE WHEN r.registration_status = 'Confirmed' THEN 1 END) AS confirmed_events,
    COUNT(CASE WHEN r.registration_status = 'Waitlisted' THEN 1 END) AS waitlisted_events,
    SUM(CASE WHEN p.payment_status = 'Completed' THEN p.amount ELSE 0 END) AS total_spent,
    COUNT(DISTINCT f.feedback_id) AS feedback_given
FROM User u
LEFT JOIN Registration r ON u.user_id = r.user_id
LEFT JOIN Payment p ON r.registration_id = p.registration_id
LEFT JOIN Feedback f ON r.registration_id = f.registration_id
WHERE u.role_id = 3
GROUP BY u.user_id, u.name, u.email
ORDER BY events_registered DESC;

-- Q8.2: Organizer event management overview
SELECT 
    u.user_id,
    u.name,
    u.email,
    COUNT(DISTINCT e.event_id) AS events_organized,
    SUM(COUNT(DISTINCT CASE WHEN r.registration_status = 'Confirmed' THEN r.registration_id END)) 
        OVER (PARTITION BY u.user_id) AS total_confirmed_registrations,
    ROUND(AVG(f.rating), 2) AS average_event_rating
FROM User u
LEFT JOIN Event e ON u.user_id = e.organizer_id
LEFT JOIN Registration r ON e.event_id = r.event_id
LEFT JOIN Feedback f ON r.registration_id = f.registration_id
WHERE u.role_id = 2
GROUP BY u.user_id, u.name, u.email
ORDER BY events_organized DESC;

-- Q8.3: Get user details by role
SELECT 
    r.role_name,
    COUNT(u.user_id) AS user_count,
    GROUP_CONCAT(u.name SEPARATOR ', ') AS user_names
FROM Role r
LEFT JOIN User u ON r.role_id = u.role_id
GROUP BY r.role_id, r.role_name;

-- ============================================================================
-- 9. COMPLEX ANALYTICAL QUERIES
-- ============================================================================

-- Q9.1: Complete event summary with all metrics
SELECT 
    e.event_id,
    e.event_name,
    ec.category_name,
    v.venue_name,
    v.capacity,
    u.name AS organizer_name,
    e.event_date,
    COUNT(DISTINCT r.registration_id) AS total_registrations,
    SUM(CASE WHEN r.registration_status = 'Confirmed' THEN 1 ELSE 0 END) AS confirmed,
    SUM(CASE WHEN r.registration_status = 'Waitlisted' THEN 1 ELSE 0 END) AS waitlisted,
    ROUND(100.0 * SUM(CASE WHEN a.attendance_status = 'Present' THEN 1 ELSE 0 END) 
          / COUNT(DISTINCT a.attendance_id), 2) AS attendance_rate,
    ROUND(AVG(f.rating), 2) AS avg_rating,
    SUM(CASE WHEN p.payment_status = 'Completed' THEN p.amount ELSE 0 END) AS revenue
FROM Event e
JOIN Event_Category ec ON e.category_id = ec.category_id
JOIN Venue v ON e.venue_id = v.venue_id
JOIN User u ON e.organizer_id = u.user_id
LEFT JOIN Registration r ON e.event_id = r.event_id
LEFT JOIN Attendance a ON r.registration_id = a.registration_id
LEFT JOIN Feedback f ON r.registration_id = f.registration_id
LEFT JOIN Payment p ON r.registration_id = p.registration_id
GROUP BY e.event_id, e.event_name, ec.category_name, v.venue_name, v.capacity, 
         u.name, e.event_date
ORDER BY e.event_date DESC;

-- Q9.2: Monthly event statistics
SELECT 
    MONTH(e.event_date) AS month,
    YEAR(e.event_date) AS year,
    COUNT(DISTINCT e.event_id) AS events_count,
    COUNT(DISTINCT r.registration_id) AS total_registrations,
    SUM(CASE WHEN p.payment_status = 'Completed' THEN p.amount ELSE 0 END) AS total_revenue,
    ROUND(AVG(f.rating), 2) AS avg_rating
FROM Event e
LEFT JOIN Registration r ON e.event_id = r.event_id
LEFT JOIN Payment p ON r.registration_id = p.registration_id
LEFT JOIN Feedback f ON r.registration_id = f.registration_id
GROUP BY YEAR(e.event_date), MONTH(e.event_date)
ORDER BY year DESC, month DESC;

-- ============================================================================
-- 10. DATA INTEGRITY AND CONSTRAINT CHECK QUERIES
-- ============================================================================

-- Q10.1: Find registrations with missing payments
SELECT 
    r.registration_id,
    u.name,
    e.event_name,
    tt.price,
    COALESCE(p.payment_status, 'NO PAYMENT RECORD') AS payment_status
FROM Registration r
JOIN User u ON r.user_id = u.user_id
JOIN Event e ON r.event_id = e.event_id
JOIN Ticket_Type tt ON r.ticket_id = tt.ticket_id
LEFT JOIN Payment p ON r.registration_id = p.registration_id
WHERE r.registration_status = 'Confirmed' AND (p.payment_id IS NULL OR p.payment_status != 'Completed');

-- Q10.2: Find registrations with no feedback
SELECT 
    r.registration_id,
    u.name,
    u.email,
    e.event_name,
    r.registration_date
FROM Registration r
JOIN User u ON r.user_id = u.user_id
JOIN Event e ON r.event_id = e.event_id
LEFT JOIN Feedback f ON r.registration_id = f.registration_id
WHERE f.feedback_id IS NULL AND r.registration_status = 'Confirmed'
ORDER BY r.registration_date DESC;

-- Q10.3: Check for attendance records of cancelled registrations (data integrity issue)
SELECT 
    a.attendance_id,
    u.name,
    e.event_name,
    r.registration_status,
    a.attendance_status
FROM Attendance a
JOIN Registration r ON a.registration_id = r.registration_id
JOIN User u ON r.user_id = u.user_id
JOIN Event e ON r.event_id = e.event_id
WHERE r.registration_status = 'Cancelled';


-- ============================================================================
-- End of SQL Queries
-- ============================================================================
-- ============================================================================
-- End of Schema and Data
-- ============================================================================

-- Commit all changes
COMMIT;

