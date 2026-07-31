import { initializeApp } from "<REMOVED>";
import { getAuth, createUserWithEmailAndPassword } from "<REMOVED>";

// Firebase Config
const firebaseConfig = {
    apiKey: "<REMOVED>",
    authDomain: "<REMOVED>",
    databaseURL: "<REMOVED>",
    projectId: "tierforge",
    storageBucket: "<REMOVED>",
    messagingSenderId: "<REMOVED>",
    appId: "<REMOVED>",
    measurementId: "<REMOVED>",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);



//submit button

const submit = document.getElementById('submit')
submit.addEventListener("click", function(event){
    event.preventDefault();
    //inputs
    const email = document.getElementById('uname').value
    const password = document.getElementById('psw').value
    const passwordRepeat = document.getElementById('pswrepeat').value
    if(!validateEmail(email) || !validatePassword(password) || !validateField(email)|| 
    !validateField(password)|| !validateField(passwordRepeat) || !passwordMatch(password, passwordRepeat)){
        return
    }
    else{
        createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        alert("Creating acount")
        window.location.href="loginpage.html"
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        // ..
    });
    }
}

)

// Validation Functions
function validateEmail(email) {
    const expressionForEmail = /^[^@]+@\w+(\.\w+)+\w$/;
    if (!expressionForEmail.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }
    return true;
}

function validatePassword(password) {
    if (password.length < 6) {
        alert("Password must be at least 6 characters long");
        return false;
    }
    return true;
}

function validateField(field) {
    if (!field || field.length <= 0) {
        alert("A field is empty");
        return false;
    }
    return true;
}

function passwordMatch(password, passwordRepeat) {
    if (password !== passwordRepeat) {
        alert("Passwords don't match");
        return false;
    }
    return true;
}

