import mysql from 'mysql2/promise';

// Configure your database connection
const pool = mysql.createPool({
    host: process.env.DB_HOST,        // Replace with your Cloud SQL instance IP or hostname
    user: process.env.DB_USER,        // Replace with your database username
    password: process.env.DB_PASSWORD,// Replace with your database password
    database: process.env.DB_NAME,    // Replace with your database name
});

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { studentId, fullName, dateOfbirth, height, weight, gender, nationality, currentAddress, permanentAddress, civilStatus, contactInformation, emergencyContact, motherName, fatherName, religion, bloodType } = req.body;

    try {
        const query = `
            INSERT INTO students (studentId, fullName, dateOfbirth, height, weight, gender, nationality, currentAddress, permanentAddress, civilStatus, contactInformation, emergencyContact, motherName, fatherName, religion, bloodType)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [studentId, fullName, dateOfbirth, height, weight, gender, nationality, currentAddress, permanentAddress, civilStatus, contactInformation, emergencyContact, motherName, fatherName, religion, bloodType];
        
        await pool.query(query, values);
        res.status(200).json({ message: 'Student record successfully added' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding student record' });
    }
}
