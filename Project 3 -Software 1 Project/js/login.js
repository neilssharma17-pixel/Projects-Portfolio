import { initializeApp } from "<REMOVED>";
import { getAuth, signInWithEmailAndPassword } from "<REMOVED>";


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

console.log("what is going on")
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);



//submit button
const submit = document.getElementById('submit')
submit.addEventListener("click", function(event){
    event.preventDefault();
    //inputs
    const email = document.getElementById('inputEmail').value
    const password = document.getElementById('inputPassword').value
    if(!validateEmail(email) || !validatePassword(password) || !validateField(email)|| 
    !validateField(password)){
        return
    }
    else{
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        alert("Loggin in ...")
        window.location.href="index.html"
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