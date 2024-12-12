import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getFirestore, doc, getDoc, updateDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

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

const academicRecordsInput = document.getElementById('academicRecords');
const yearLevelInput = document.getElementById('yearLevel');
const enrollmentStatusInput = document.getElementById('enrollmentStatus');
const programOfStudyInput = document.getElementById('programOfStudy');
const searchIdInput = document.getElementById('searchId');
const outputDiv = document.getElementById('output');

document.getElementById('search').addEventListener('click', async () => {
    const searchId = searchIdInput.value;
    if (!searchId) {
        outputDiv.textContent = "Please enter a Student ID to search.";
        return;
    }
    try {
        const docRef = doc(db, "students", searchId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            academicRecordsInput.value = '';
            yearLevelInput.value = data.yearLevel || '';
            enrollmentStatusInput.value = data.enrollmentStatus || '';
            programOfStudyInput.value = data.programOfStudy || '';

            // Display the academic records if they exist
            if (data.academicRecords && Array.isArray(data.academicRecords)) {
                outputDiv.textContent = "Student data loaded. Academic Records: " + JSON.stringify(data.academicRecords);
            } else {
                outputDiv.textContent = "Student data loaded. No academic records found.";
            }
        } else {
            outputDiv.textContent = "No such document!";
        }
    } catch (e) {
        console.error("Error fetching document: ", e);
        outputDiv.textContent = "Error fetching student data.";
    }
});

document.getElementById('update').addEventListener('click', async () => {
    const searchId = searchIdInput.value;
    if (!searchId) {
        outputDiv.textContent = "Please enter a Student ID to update.";
        return;
    }

    try {
        const docRef = doc(db, "students", searchId);

        // Prepare new academic record as an object
        const newAcademicRecord = {
            record: academicRecordsInput.value,
            yearLevel: yearLevelInput.value,
            enrollmentStatus: enrollmentStatusInput.value,
            programOfStudy: programOfStudyInput.value,
            timestamp: new Date().toISOString(), // Add a timestamp for uniqueness and tracking
        };

        // Add the new academic record to the existing array
        await updateDoc(docRef, {
            academicRecords: arrayUnion(newAcademicRecord),
        });

        outputDiv.textContent = "New academic record added successfully.";
    } catch (e) {
        console.error("Error updating document: ", e);
        outputDiv.textContent = "Error updating student data.";
    }
});
