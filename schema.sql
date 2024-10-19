-- DROP TABLE IF EXISTS Customers;
-- CREATE TABLE IF NOT EXISTS Customers (CustomerId INTEGER PRIMARY KEY, CompanyName TEXT, ContactName TEXT);
-- INSERT INTO Customers (CustomerID, CompanyName, ContactName) VALUES (1, 'Alfreds Futterkiste', 'Maria Anders'), (4, 'Around the Horn', 'Thomas Hardy'), (11, 'Bs Beverages', 'Victoria Ashworth'), (13, 'Bs Beverages', 'Random Name');

-- Drop the table if it exists
DROP TABLE IF EXISTS Contacts;

-- Create the Contacts table
CREATE TABLE IF NOT EXISTS Contacts (
    ContactId INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    Email TEXT NOT NULL,
    Message TEXT NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Optionally, insert some initial test data
INSERT INTO Contacts (Name, Email, Message) VALUES 
    ('John Doe', 'john@example.com', 'Hello, this is a test message.'),
    ('Jane Smith', 'jane@example.com', 'I would like to inquire about your services.');
