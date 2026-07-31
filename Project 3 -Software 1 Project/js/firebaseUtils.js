import { ref, set, onValue, get } from "firebase/database";

// Write data to the database
export function writeUserData(database, userId, username, email) {
    // Write data at the path 'users/userId'
    return set(ref(database, 'users/' + userId), {
        username: username,
        email: email
    }).then(() => {
        console.log("Data written successfully!");
    }).catch((error) => {
        console.error("Error writing data:", error);
    });
}

// Read data from the database using a real-time listener
export function readUserData(database, userId, callback) {
    const userRef = ref(database, 'users/' + userId);

    // Listen for changes in real-time and call the callback function
    onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
            callback(snapshot.val());
        } else {
            console.log("No data available for this user.");
            callback(null); // Call callback with null to indicate no data
        }
    }, (error) => {
        console.error("Error reading data:", error);
    });
}

// Optionally, you can use get() for a one-time read instead of a real-time listener
export async function readUserDataOnce(database, userId) {
    const userRef = ref(database, 'users/' + userId);
    try {
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            console.log("No data available for this user.");
            return null;
        }
    } catch (error) {
        console.error("Error reading data:", error);
        return null;
    }
}
