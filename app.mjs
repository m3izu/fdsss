import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

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

//stor
const form = document.getElementById('form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const outputDiv = document.getElementById('output');

document.getElementById('submit').addEventListener('click', async () => {
    const name = nameInput.value;
    const email = emailInput.value;

    if (name && email) {
        try {
            // Add data to Firestore
            await addDoc(collection(db, "users"), { name, email });
            outputDiv.textContent = `Data added: ${name}, ${email}`;
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    } else {
        outputDiv.textContent = "Please fill in both fields.";
    }
});

//fetchling
async function fetchData() {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    });
}


fetchData();
