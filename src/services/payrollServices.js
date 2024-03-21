import { poolRequest, sql } from "../utilis/dbConnect.js";

// Create a new payroll entry
export const addPayrollService = async (newPayroll) => {
    try {
        const addPayrollQuery =
            `
            INSERT INTO Payroll (PayrollID, EmployeeID, GrossPay, DeductionID, NetPay, OvertimePay, Advance)
            VALUES (@PayrollID, @EmployeeID, @GrossPay, @DeductionID, @NetPay, @OvertimePay, @Advance)
            `;

        const result = await poolRequest()
            .input("PayrollID", sql.VarChar, newPayroll.PayrollID)
            .input("EmployeeID", sql.VarChar, newPayroll.EmployeeID)
            .input("GrossPay", sql.Int, newPayroll.GrossPay)
            .input("DeductionID", sql.VarChar, newPayroll.DeductionID)
            .input("NetPay", sql.Int, newPayroll.NetPay)
            .input("OvertimePay", sql.Int, newPayroll.OvertimePay)
            .input("Advance", sql.Int, newPayroll.Advance)
            .query(addPayrollQuery);

            // console.log(result);

        return result;
    } catch (error) {
        return error.message;
    }
};

// Fetch all payroll entries
export const fetchAllPayrollService = async () => {
    try {
        const query = `
            SELECT * FROM Payroll
        `;

        const result = await poolRequest().query(query);
        return result.recordset;
    } catch (error) {
        return error;
    }
};

// Fetch one payroll entry by PayrollID
export const fetchPayrollByIdService = async (PayrollID) => {
    try {
        const query = `
            SELECT * FROM Payroll WHERE PayrollID = @PayrollID
        `;
        const result = await poolRequest()
            .input("PayrollID", sql.VarChar, PayrollID)
            .query(query);
        return result.recordset[0];
    } catch (error) {
        return error;
    }
};

// Update an existing payroll entry by PayrollID
export const updatePayrollService = async (updatedPayroll) => {
    try {
        const updatePayrollQuery =
            `
            UPDATE Payroll
            SET EmployeeID = @EmployeeID, GrossPay = @GrossPay, DeductionID = @DeductionID, NetPay = @NetPay, OvertimePay = @OvertimePay, Advance = @Advance
            WHERE PayrollID = @PayrollID
            `;

        const result = await poolRequest()
            .input("PayrollID", sql.VarChar, updatedPayroll.PayrollID)
            .input("EmployeeID", sql.VarChar, updatedPayroll.EmployeeID)
            .input("GrossPay", sql.Int, updatedPayroll.GrossPay)
            .input("DeductionID", sql.VarChar, updatedPayroll.DeductionID)
            .input("NetPay", sql.Int, updatedPayroll.NetPay)
            .input("OvertimePay", sql.Int, updatedPayroll.OvertimePay)
            .input("Advance", sql.Int, updatedPayroll.Advance)
            .query(updatePayrollQuery);

        return result;
    } catch (error) {
        return error.message;
    }
};

// Delete a payroll entry by PayrollID
export const deletePayrollService = async (PayrollID) => {
    try {
        const deletePayrollQuery =
            `
            DELETE FROM Payroll WHERE PayrollID = @PayrollID
            `;

        const result = await poolRequest()
            .input("PayrollID", sql.VarChar, PayrollID)
            .query(deletePayrollQuery);

        return result;
    } catch (error) {
        return error.message;
    }
};
