// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBVEMqQEwLmpzCwGQdQOfuc1CLceg7TX4M",
    authDomain: "herman-e5894.firebaseapp.com",
    databaseURL: "https://herman-e5894-default-rtdb.firebaseio.com",
    projectId: "herman-e5894",
    storageBucket: "herman-e5894.appspot.com",
    messagingSenderId: "17968105226",
    appId: "1:17968105226:web:d7c2852d574327495a1cf3"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Correct answers
const correctAnswers = {
    q1: "d",
    q2: "c",
    q3: "a",
    q4: "e",
    q5: "c",
    q6: "b",
    q7: "e",
    q8: "e",
    q9: "b",
    q10: "e"
};

// Handle quiz submission
document.getElementById("quizForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Track start time
    const startTime = Date.now();

    // Get student name
    let studentName = document.getElementById("studentName").value;

    // Get selected answers
    let answers = {};
    let score = 0;
    let totalQuestions = 10;

    Object.keys(correctAnswers).forEach((key) => {
        let selectedOption = document.querySelector(`input[name="${key}"]:checked`);
        if (selectedOption) {
            answers[key] = selectedOption.value;
            if (selectedOption.value ===
