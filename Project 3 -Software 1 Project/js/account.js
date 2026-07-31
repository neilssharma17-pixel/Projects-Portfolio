document.addEventListener("DOMContentLoaded", () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const email = user.email;
        const password = "**********"; // Placeholder for password asterisks
  
        // Populate account details
        document.getElementById("userEmail").textContent = email;
        document.getElementById("userPassword").textContent = "*".repeat(10); // Adjust length as necessary
      } else {
        alert("You must be logged in to view this page.");
        window.location.href = "index.html"; // Redirect to homepage if not logged in
      }
    });
  });
  