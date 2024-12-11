import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
import { setDoc, doc } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyDbezcx_H3tK4sHAofzozB5vqxg5BEyWb0",
    authDomain: "studentprof-28799.firebaseapp.com",
    projectId: "studentprof-28799",
    storageBucket: "studentprof-28799.firebasestorage.app",
    messagingSenderId: "214200989847",
    appId: "1:214200989847:web:f5043295b2450cca6a51d2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById('form');
const studentIdInput = document.getElementById('studentId');
const fullNameInput = document.getElementById('fullName');
const dateOfbirthInput = document.getElementById('dateOfbirth');
const heightInput = document.getElementById('height');
const weightInput = document.getElementById('weight');
const genderInput = document.getElementById('gender');
const nationalityInput = document.getElementById('nationality');
const currentAddressInput = document.getElementById('currentAddress');
const permanentAddressInput = document.getElementById('permanentAddress');
const civilStatusInput = document.getElementById('civilStatus');
const contactInformationInput = document.getElementById('contactInformation');
const emergencyContactInput = document.getElementById('emergencyContact');
const motherNameInput = document.getElementById('motherName');
const fatherNameInput = document.getElementById('fatherName');
const religionInput = document.getElementById('religion');
const bloodTypeInput = document.getElementById('bloodType');
const outputDiv = document.getElementById('output');


document.getElementById('submit').addEventListener('click', async () => {
    const studentId = studentIdInput.value;
    const fullName = fullNameInput.value;
    const dateOfbirth = dateOfbirthInput.value;
    const height = heightInput.value;
    const weight = weightInput.value;
    const gender = genderInput.value;
    const nationality = nationalityInput.value;
    const currentAddress = currentAddressInput.value;
    const permanentAddress = permanentAddressInput.value;
    const civilStatus = civilStatusInput.value;
    const contactInformation = contactInformationInput.value;
    const emergencyContact = emergencyContactInput.value;
    const motherName = motherNameInput.value;
    const fatherName = fatherNameInput.value;
    const religion = religionInput.value;
    const bloodType = bloodTypeInput.value;
   
    
    

    if (studentId && fullName && dateOfbirth && height && weight && gender && nationality 
        && currentAddress && permanentAddress && civilStatus && contactInformation && emergencyContact 
        && motherName && fatherName && religion && bloodType) {
        try {
            // Add data to Firestore
            await setDoc(doc(db, "students", studentId), { studentId, fullName, dateOfbirth, height, weight, gender, nationality, 
                currentAddress, permanentAddress, civilStatus, contactInformation, 
                emergencyContact, motherName, fatherName, religion, bloodType});
            outputDiv.textContent = `Data added`;
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    } else {
        outputDiv.textContent = "Please fill in both fields.";
    }
});

async function fetchData() {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    });
}




import mysql from 'mysql2/promise';

// Connect to Cloud SQL using environment variables
const pool = mysql.createPool({
    host: process.env.DB_HOST,         // Public or Private IP (e.g., '127.0.0.1' for public IP or 'localhost' for Cloud SQL Auth Proxy)
    user: process.env.DB_USER,         // Database username (e.g., 'db_user')
    password: process.env.DB_PASSWORD, // Database password (e.g., 'db_password')
    database: process.env.DB_NAME      // Database name (e.g., 'student_management')
});

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { studentId, fullName, dateOfbirth, height, weight, gender, nationality, 
            currentAddress, permanentAddress, civilStatus, contactInformation, emergencyContact, 
            motherName, fatherName, religion, bloodType } = req.body;

        try {
            const query = `
                INSERT INTO students (studentId, fullName, dateOfbirth, height, weight, gender, nationality, 
                currentAddress, permanentAddress, civilStatus, contactInformation, emergencyContact, motherName, 
                fatherName, religion, bloodType)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            const values = [studentId, fullName, dateOfbirth, height, weight, gender, nationality, currentAddress, 
                permanentAddress, civilStatus, contactInformation, emergencyContact, motherName, fatherName, religion, bloodType];
            
            await pool.query(query, values);
            res.status(200).json({ message: 'Student record successfully added' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error adding student record' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}






fetchData();


document.getElementById('submit').addEventListener('click', async () => {
    const studentData = {
        studentId: document.getElementById('studentId').value,
        fullName: document.getElementById('fullName').value,
        dateOfbirth: document.getElementById('dateOfbirth').value,
        height: document.getElementById('height').value,
        weight: document.getElementById('weight').value,
        gender: document.getElementById('gender').value,
        nationality: document.getElementById('nationality').value,
        currentAddress: document.getElementById('currentAddress').value,
        permanentAddress: document.getElementById('permanentAddress').value,
        civilStatus: document.getElementById('civilStatus').value,
        contactInformation: document.getElementById('contactInformation').value,
        emergencyContact: document.getElementById('emergencyContact').value,
        motherName: document.getElementById('motherName').value,
        fatherName: document.getElementById('fatherName').value,
        religion: document.getElementById('religion').value,
        bloodType: document.getElementById('bloodType').value,
    };

    try {
        const response = await fetch('https://your-vercel-project.vercel.app/api/handleStudentSignUp', {
            method: 'POST', // Ensure POST method
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(studentData),
        });
        
        const result = await response.json();
        if (response.ok) {
            console.log(result.message);
            alert('Student record successfully added');
        } else {
            console.error(result.message);
            alert('Error adding student record');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error submitting the form');
    }
});
