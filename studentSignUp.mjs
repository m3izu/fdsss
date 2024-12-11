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
