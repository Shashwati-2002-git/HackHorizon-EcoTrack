// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Your config (already correct ✅)
const firebaseConfig = {
  apiKey: "AIzaSyDCfHyiLhuOdr0ZMYmRra7_9XmLQWUPnNU",
  authDomain: "ecotrack-app-2366a.firebaseapp.com",
  projectId: "ecotrack-app-2366a",
  storageBucket: "ecotrack-app-2366a.firebasestorage.app",
  messagingSenderId: "265164462344",
  appId: "1:265164462344:web:7b29b3af2b510abe3fb4bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle Signup
const form = document.getElementById("signupForm");

if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                alert("✅ Account created successfully!");
                console.log(userCredential.user);

                // Optional: redirect
                window.location.href = "/input";
            })
            .catch((error) => {
                alert("❌ " + error.message);
            });
    });
}

// Add this import
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// LOGIN HANDLER
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;
        const message = document.getElementById("loginMessage");

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                message.style.color = "green";
                message.innerText = "✅ Login successful!";

                console.log(userCredential.user);

                // Redirect after login
                setTimeout(() => {
                    window.location.href = "/input";
                }, 1000);
            })
            .catch((error) => {
                message.style.color = "red";
                message.innerText = "❌ " + error.message;
            });
    });
}