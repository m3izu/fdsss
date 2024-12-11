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
const facultyIdInput = document.getElementById('facultyId');
const fullNameInput = document.getElementById('fullName');
const positionInput = document.getElementById('position');
const departmentInput = document.getElementById('department');
const qualificationstInput = document.getElementById('qualifications');
const employeeStatusInput = document.getElementById('employeeStatus');
const yearofServiceInput = document.getElementById('yearofService');
const outputDiv = document.getElementById('output');


document.getElementById('submit').addEventListener('click', async () => {
    const facultyId = facultyIdInput.value;
    const fullName = fullNameInput.value;
    const position = positionInput.value;
    const department = departmentInput.value;
    const qualifications = qualificationstInput.value;
    const employeeStatus = employeeStatusInput.value;
    const yearofService = yearofServiceInput.value;
   
    
    

    if (facultyId && fullName && position && department && qualifications && employeeStatus && yearofService ) {
        try {
            await setDoc(doc(db, "faculty", facultyId), { facultyId, fullName, position, position, department, qualifications, employeeStatus, 
                yearofService});
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
