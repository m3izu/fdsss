import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

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

const searchIdInput = document.getElementById('searchId');
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
            fullNameInput.value = data.fullName || '';
            dateOfbirthInput.value = data.dateOfbirth || '';
            heightInput.value = data.height || '';
            weightInput.value = data.weight || '';
            genderInput.value = data.gender || '';
            nationalityInput.value = data.nationality || '';
            currentAddressInput.value = data.currentAddress || '';
            permanentAddressInput.value = data.permanentAddress || '';
            civilStatusInput.value = data.civilStatus || '';
            contactInformationInput.value = data.contactInformation || '';
            emergencyContactInput.value = data.emergencyContact || '';
            motherNameInput.value = data.motherName || '';
            fatherNameInput.value = data.fatherName || '';
            religionInput.value = data.religion || '';
            bloodTypeInput.value = data.bloodType || '';
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
        const docRef = doc(db, "students", searchId);
        await updateDoc(docRef, {
            fullName: fullNameInput.value,
            dateOfbirth: dateOfbirthInput.value,
            height: heightInput.value,
            weight: weightInput.value,
            gender: genderInput.value,
            nationality: nationalityInput.value,
            currentAddress: currentAddressInput.value,
            permanentAddress: permanentAddressInput.value,
            civilStatus: civilStatusInput.value,
            contactInformation: contactInformationInput.value,
            emergencyContact: emergencyContactInput.value,
            motherName: motherNameInput.value,
            fatherName: fatherNameInput.value,
            religion: religionInput.value,
            bloodType: bloodTypeInput.value
        });
        outputDiv.textContent = "Student data updated successfully.";
    } catch (e) {
        console.error("Error updating document: ", e);
        outputDiv.textContent = "Error updating student data.";
    }
});
