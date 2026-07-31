// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_M43Fp-p4PjW9qTU-16OcwOOA0J7y_ko",
  authDomain: "tierforge.firebaseapp.com",
  databaseURL: "https://tierforge-default-rtdb.firebaseio.com",
  projectId: "tierforge",
  storageBucket: "tierforge.firebasestorage.app",
  messagingSenderId: "315477314115",
  appId: "1:315477314115:web:62f199f44ead320dd162f6",
  measurementId: "G-Q0Z4M1HXLF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();

/*function writeUserData(email, ussername, password, passwordref) {

    const db = getDatabase();
    const reference = ref(db, 'users/' + username);

    set(reference, {
    
        email: email,
        username: username,
        password: password,
        passwordref:  passwordref
    })
}

writeUserData("cakibler@radford.edu", "cakiber", "Hello555", "Hello555");
*/