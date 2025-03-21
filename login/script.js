let logincontainer = document.getElementById('loginformContainer');
let registercontainer = document.getElementById('registerContainer')

function login(){
    registercontainer.style.display = 'none';
    logincontainer.style.display='block';
}

function register(){
    registercontainer.style.display = 'block';
    logincontainer.style.display='none';
}


import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth,  GoogleAuthProvider, signInWithPopup, } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCSUo3Xii10NChScKQHPosc1SSICffTFeU",
    authDomain: "wanderwise-f6228.firebaseapp.com",
    projectId: "wanderwise-f6228",
    storageBucket: "wanderwise-f6228.firebasestorage.app",
    messagingSenderId: "434182405230",
    appId: "1:434182405230:web:631d46c541bd9036ddfa7f"
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);

function showToast(message, success = true) {
    const toast = document.createElement('div');
    toast.className = `toast ${success ? 'success' : 'error'}`;
    toast.textContent = message;

    document.body.appendChild(toast);

    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}




document.getElementById("googleLogin").addEventListener("click", () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            console.log("User:", user);
            localStorage.setItem("LoginDetails", JSON.stringify(user));

            // Redirect after successful login
            setTimeout(() => {
                window.location.href = window.location.origin + "/index.html";
            }, 1500);
        })
        .catch((error) => {
            console.error("Popup sign-in failed:", error.message);

            // If popup sign-in fails, try redirect sign-in
            if (error.code === "auth/popup-blocked" || error.code === "auth/popup-closed-by-user") {
                console.log("Trying sign-in with redirect...");
                signInWithRedirect(auth, provider);
            }
        });
});

// Handle redirect result after login
getRedirectResult(auth)
    .then((result) => {
        if (result) {
            const user = result.user;
            console.log("User signed in via redirect:", user);
            localStorage.setItem("LoginDetails", JSON.stringify(user));

            // Redirect after successful login
            setTimeout(() => {
                window.location.href = window.location.origin + "/index.html";
            }, 1500);
        }
    })
    .catch((error) => {
        console.error("Error during redirect login:", error.message);
    });
