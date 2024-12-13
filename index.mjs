import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDbezcx_H3tK4sHAofzozB5vqxg5BEyWb0",
  authDomain: "studentprof-28799.firebaseapp.com",
  projectId: "studentprof-28799",
  storageBucket: "studentprof-28799.firebasestorage.app",
  messagingSenderId: "214200989847",
  appId: "1:214200989847:web:f5043295b2450cca6a51d2",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const loginStudentIdInput = document.getElementById("loginStudentId");

// add event handling for submitting login_form
document.getElementById("login_form").addEventListener("submit", async (e) => {
  e.preventDefault();

  // disable submit button
  disableLoginButtonState(true);

  const studentId = loginStudentIdInput.value;

  if (loginStudentIdInput.value === "admin") {
    window.location.href = "adminAccess.html";
    return;
  }

  try {
    const docRef = doc(db, "students", studentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      sessionStorage.setItem("studentData", JSON.stringify(data));

      window.location.href = "dashboard.html";
    } else {
      alert(`Student record with student number ${studentId} not found.`);

      // re-enable submit button
      disableLoginButtonState(false);
    }
  } catch (e) {
    console.error("Error fetching student data: ", e);
    alert("Error logging in. Please try again.");

    // re-enable submit button
    disableLoginButtonState(false);
  }
});

function disableLoginButtonState(state) {
  // toggle disabled state submit button
  state === true
    ? document
        .getElementById("student_login_form_submit")
        .setAttribute("disabled", true)
    : document
        .getElementById("student_login_form_submit")
        .removeAttribute("disabled");
}
