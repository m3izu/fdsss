import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getFirestore, doc, getDoc, updateDoc, setDoc, collection } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

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
            academicRecordsInput.value = data.academicRecords || '';
            yearLevelInput.value = data.yearLevel || '';
            enrollmentStatusInput.value = data.enrollmentStatus || '';
            programOfStudyInput.value = data.programOfStudy || '';
            outputDiv.textContent = "Student data loaded.";
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
        const academicRecordsCollection = collection(db, "academicRecords");

        // Create a new document in the 'academicRecords' collection
        const newRecordRef = doc(academicRecordsCollection); // Auto-generated document ID
        await setDoc(newRecordRef, {
            studentId: searchId,
            academicRecords: academicRecordsInput.value,
            yearLevel: yearLevelInput.value,
            enrollmentStatus: enrollmentStatusInput.value,
            programOfStudy: programOfStudyInput.value,
            timestamp: new Date() // Optionally, you can add a timestamp to track when the record was created
        });

        outputDiv.textContent = "New academic record added successfully.";
    } catch (e) {
        console.error("Error adding new academic record: ", e);
        outputDiv.textContent = "Error adding new academic record.";
    }
});
