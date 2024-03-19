### DATABASE NAME
## EMPLOYMENT
## ALL THE USERS TABLE

```sql
-- Employees table
CREATE TABLE employees(
    EmployeeID VARCHAR(255) PRIMARY KEY,
    First_name VARCHAR(255),
    Last_name VARCHAR(255),
    Email_address VARCHAR(255),
    Password VARCHAR(255),
    Contact_information VARCHAR(255),
    Gender VARCHAR(255),
    Admin_role VARCHAR(255),
    Date_of_Birth Date,
    Country VARCHAR(255),
    City VARCHAR(255),
    Street VARCHAR(255),
    Postal_code VARCHAR(255),
    Profile_url VARCHAR(999)
);

-- Employee table data
INSERT INTO tbl_user (UserID, First_name, Last_name, Email_address, Password, Contact_information, Gender, Admin_role, Date_of_Birth, Country, City, Street, Postal_code, Profile_url)
VALUES 
    ('1', 'John', 'Doe', 'john@example.com', 'password123', '+123456789', 'male', 'admin', '1990-01-01', 'USA', 'New York', '123 Main St', '10001', 'https://example.com/john'),
    ('2', 'Jane', 'Doe', 'jane@example.com', 'password456', '+987654321', 'female', 'employee', '1992-05-15', 'USA', 'Los Angeles', '456 Oak St', '90001', 'https://example.com/jane'),
    ('3', 'Alice', 'Smith', 'alice@example.com', 'password789', '+1122334455', 'female', 'employee', '1985-07-20', 'UK', 'London', '789 Elm St', 'W1 1AA', 'https://example.com/alice'),
    ('4', 'Bob', 'Johnson', 'bob@example.com', 'passwordabc', '+9988776655', 'male', 'employee', '1988-11-30', 'Canada', 'Toronto', '456 Maple St', 'M1M 1M1', 'https://example.com/bob'),
    ('5', 'Emily', 'Brown', 'emily@example.com', 'passwordxyz', '+1122334455', 'female', 'employee', '1993-03-25', 'Australia', 'Sydney', '789 Pine St', '2000', 'https://example.com/emily');

-- Attendance table
CREATE TABLE Attendance (
    AttendanceID VARCHAR(255) PRIMARY KEY,
    EmployeeID VARCHAR(255),
    CheckIn DateTime,
    CheckOut DateTime,
    Date Date,
    FOREIGN KEY (EmployeeID) REFERENCES employees (EmployeeID)
);

-- Attendance table data
-- Sample data for the Attendance table
INSERT INTO Attendance (AttendanceID, EmployeeID, CheckIn, CheckOut, Date) VALUES
('1', 'EMP001', '2024-03-19 08:00:00', '2024-03-19 17:00:00', '2024-03-19'),
('2', 'EMP002', '2024-03-19 08:15:00', '2024-03-19 17:30:00', '2024-03-19'),
('3', 'EMP003', '2024-03-19 07:45:00', '2024-03-19 16:45:00', '2024-03-19'),
('4', 'EMP001', '2024-03-20 08:30:00', '2024-03-20 17:15:00', '2024-03-20'),
('5', 'EMP002', '2024-03-20 08:10:00', '2024-03-20 17:45:00', '2024-03-20'),
('6', 'EMP003', '2024-03-20 08:00:00', '2024-03-20 17:30:00', '2024-03-20');

-- Sample data for the employees table
INSERT INTO employees (EmployeeID, First_name, Last_name, Email_address, Password, Contact_information, Gender, Admin_role, Date_of_Birth, Country, City, Street, Postal_code, Profile_url) VALUES
('EMP001', 'John', 'Doe', 'john.doe@example.com', 'password123', '1234567890', 'Male', 'Admin', '1990-05-15', 'USA', 'New York', '123 Main St', '10001', 'http://example.com/profiles/johndoe'),
('EMP002', 'Jane', 'Smith', 'jane.smith@example.com', 'password456', '0987654321', 'Female', 'Employee', '1985-09-20', 'Canada', 'Toronto', '456 Oak St', 'M5V 1A1', 'http://example.com/profiles/janesmith'),
('EMP003', 'Alice', 'Johnson', 'alice.johnson@example.com', 'password789', '9876543210', 'Female', 'Employee', '1992-12-10', 'UK', 'London', '789 Elm St', 'SW1A 1AA', 'http://example.com/profiles/alicejohnson');

-- Sample data for the Attendance table
INSERT INTO Attendance (AttendanceID, EmployeeID, CheckIn, CheckOut, Date) VALUES
('1', 'EMP001', '2024-03-19 08:00:00', '2024-03-19 17:00:00', '2024-03-19'),
('2', 'EMP002', '2024-03-19 08:15:00', '2024-03-19 17:30:00', '2024-03-19'),
('3', 'EMP003', '2024-03-19 07:45:00', '2024-03-19 16:45:00', '2024-03-19'),
('4', 'EMP001', '2024-03-20 08:30:00', '2024-03-20 17:15:00', '2024-03-20'),
('5', 'EMP002', '2024-03-20 08:10:00', '2024-03-20 17:45:00', '2024-03-20'),
('6', 'EMP003', '2024-03-20 08:00:00', '2024-03-20 17:30:00', '2024-03-20');
