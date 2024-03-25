### DATABASE NAME
## EMPLOYMENT
## ALL THE USERS TABLE

```sql
-- Employees table (Both)
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

-- Attendance table (Employee) (Fetch from admin)
CREATE TABLE Attendance (
    AttendanceID VARCHAR(255) PRIMARY KEY,
    EmployeeID VARCHAR(255),
    CheckIn DateTime,
    CheckOut DateTime,
    Date Date,
    FOREIGN KEY (EmployeeID) REFERENCES employees (EmployeeID)
);

-- Schedule table (employee)
CREATE TABLE Schedule (
    ScheduleID VARCHAR(255) PRIMARY KEY,
    EmployeeID VARCHAR(255),
	ScheduleName VARCHAR(255),
    CheckIn DATETIME,
    CheckOut DATETIME,
    DAYS VARCHAR(255),
    FOREIGN KEY (EmployeeID) REFERENCES employees (EmployeeID)
)

-- Overtime table (employee)
CREATE TABLE Overtime (
    OvertimeID VARCHAR(255) PRIMARY KEY,
    EmployeeID VARCHAR(255),
    Overtime_date DATEtIME,
    Duration VARCHAR(255),
    Rate INT,
    FOREIGN KEY (EmployeeID) REFERENCES employees (EmployeeID)
)

-- Advance cash table (employee) Finances
CREATE TABLE Advance (
    AdvanceID VARCHAR(255) PRIMARY KEY,
    EmployeeID VARCHAR(255),
    RequestDate DATETIME,
    Amount INT,
    Approval_Status BIT DEFAULT 0,
    Approval_Date DATETIME,
    FOREIGN KEY (EmployeeID) REFERENCES employees (EmployeeID)
)

-- Deductions table (Admin) Finances
CREATE TABLE Deductions (
    DeductionID VARCHAR(255) PRIMARY KEY,
    DeductionName VARCHAR(255),
    DeductionDescription VARCHAR(255),
    Amount INT
)

-- Department table (Admin) done
CREATE TABLE Departments (
    DepartmentID VARCHAR(255) PRIMARY KEY,
    DepartmentName VARCHAR(255),
    MaximumOvertime VARCHAR(255),
)

-- Positions table (Admin) done
CREATE TABLE Positions (
    PositionID VARCHAR(255) PRIMARY KEY,
    EmployeeID VARCHAR(255),
    Title VARCHAR(255),
    DepartmentID VARCHAR(255),
    Salary VARCHAR(255),
    FOREIGN KEY (DepartmentID) REFERENCES Departments (DepartmentID),
    FOREIGN KEY (EmployeeID) REFERENCES employees (EmployeeID)
)

-- Leave table (employee)
CREATE TABLE Leave (
    LeaveID VARCHAR(255) PRIMARY KEY,
    EmployeeID VARCHAR(255),
    BeginDate DATETIME,
    EndDate DATETIME,
    Reason VARCHAR(255),
    DaysCount INT,
    FOREIGN KEY (EmployeeID) REFERENCES employees (EmployeeID)
)

-- Payroll table (admin) Finances
CREATE TABLE Payroll (
    PayrollID VARCHAR(255) PRIMARY KEY,
    EmployeeID VARCHAR(255),
    GrossPay INT,
    DeductionID VARCHAR(255),
    NetPay INT,
    OvertimePay INT,
    Advance INT,
    FOREIGN KEY (EmployeeID) REFERENCES employees (EmployeeID),
    FOREIGN KEY (DeductionID) REFERENCES Deductions (DeductionID)
)

```