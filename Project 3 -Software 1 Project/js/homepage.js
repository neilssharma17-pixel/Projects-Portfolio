/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function openDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}
  


  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.login-button')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
// Check for username in local storage and display greeting
window.onload = function() {
  const username = sessionStorage.getItem('username');
  if (username) {
      const greetingElement = document.getElementById("greeting");
      greetingElement.textContent = `Hi ${username}!`;
  }
};


function goToPG1(){
  window.location.href = 'PG1.html';
}

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { app } from "./firebase"; // Import your Firebase instance

console.log("Firebase App Initialized:", app); // Optional log to verify setup

ReactDOM.render(<App />, document.getElementById("root"));

document.addEventListener("DOMContentLoaded", function () {
  const accountButton = document.getElementById("accountButton");

  // Monitor authentication state
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      accountButton.classList.remove("d-none"); // Show Account button
    } else {
      accountButton.classList.add("d-none"); // Hide Account button
    }
  });
});
