import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

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


const loginStudentIdInput = document.getElementById('loginStudentId');
document.getElementById('login').addEventListener('click', async () => {
    const studentId = loginStudentIdInput.value;
    if (!studentId) {
        alert("Please enter a Student Number.");
        return;
    }
    else if (loginStudentIdInput.value === "admin") {
        window.location.href = "adminAccess.html";
        return;
    }

    try {
        const docRef = doc(db, "students", studentId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            sessionStorage.setItem('studentData', JSON.stringify(data));

            window.location.href = 'dashboard.html';
        } else {
            alert("Student record not found.");
        }
    } catch (e) {
        console.error("Error fetching student data: ", e);
        alert("Error logging in. Please try again.");
    }
});



