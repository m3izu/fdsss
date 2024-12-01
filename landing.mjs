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

const loginForm = document.getElementById('loginForm');
const dashboard = document.getElementById('dashboard');
const studentName = document.getElementById('studentName');
const dashboardStudentId = document.getElementById('dashboardStudentId');
const dashboardDob = document.getElementById('dashboardDob');
const dashboardHeight = document.getElementById('dashboardHeight');
const dashboardWeight = document.getElementById('dashboardWeight');
const dashboardGender = document.getElementById('dashboardGender');
const dashboardNationality = document.getElementById('dashboardNationality');
const dashboardAddress = document.getElementById('dashboardAddress');

const loginStudentIdInput = document.getElementById('loginStudentId');
document.getElementById('login').addEventListener('click', async () => {
    const studentId = loginStudentIdInput.value;
    if (!studentId) {
        alert("Please enter a Student Number.");
        return;
    }

    try {
        const docRef = doc(db, "students", studentId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            // Populate dashboard
            studentName.textContent = data.fullName || "Unknown";
            dashboardStudentId.textContent = data.studentId || "N/A";
            dashboardDob.textContent = data.dateOfbirth || "N/A";
            dashboardHeight.textContent = `${data.height || "N/A"} cm`;
            dashboardWeight.textContent = `${data.weight || "N/A"} kg`;
            dashboardGender.textContent = data.gender || "N/A";
            dashboardNationality.textContent = data.nationality || "N/A";
            dashboardAddress.textContent = `${data.currentAddress || "N/A"}, ${data.permanentAddress || "N/A"}`;

            // Show dashboard and hide login form
            loginForm.style.display = "none";
            dashboard.style.display = "block";
        } else {
            alert("Student record not found.");
        }
    } catch (e) {
        console.error("Error fetching student data: ", e);
        alert("Error logging in. Please try again.");
    }
});

document.getElementById('logout').addEventListener('click', () => {
    // Hide dashboard and show login form
    dashboard.style.display = "none";
    loginForm.style.display = "block";
    loginStudentIdInput.value = "";
});
