### DATABASE NAME
## EMPLOYMENT
## ALL THE USERS TABLE

```sql
-- Employees table
CREATE TABLE tbl_user(
    UserID VARCHAR(255),
    First_name VARCHAR(255),
    Last_name VARCHAR(255),
    Email_address VARCHAR(255),
    Password VARCHAR(255),
    Contact_information VARCHAR(255),
    Gender VARCHAR(255),
    Admin_role VARCHAR(255),
    Date_of_Birth DateTime,
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
