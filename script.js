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

// Track quiz start time
const startTime = Date.now();

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

    // Calculate time spent
    const endTime = Date.now();
    const timeSpent = ((endTime - startTime) / 1000).toFixed(2);

    let studentName = document.getElementById("studentName").value;
    let answers = {};
    let score = 0;
    let totalQuestions = 10;

    // Loop through questions
    Object.keys(correctAnswers).forEach((key) => {
        let selectedOption = document.querySelector(`input[name="${key}"]:checked`);
        if (selectedOption) {
            answers[key] = selectedOption.value;
            if (selectedOption.value === correctAnswers[key]) {
                score++;
            }
        }
    });

    let percentage = (score / totalQuestions) * 100;
    let grade = percentage >= 80 ? "A" : percentage >= 70 ? "B" : percentage >= 60 ? "C" : percentage >= 50 ? "D" : "F";
    let comment = grade === "A" ? "Excellent!" : grade === "B" ? "Good Job!" : grade === "C" ? "Fair Effort" : grade === "D" ? "Needs Improvement" : "Better luck next time!";

    // Save to Firebase
    const studentAnswers = {
        name: studentName,
        score: score,
        percentage: percentage,
        grade: grade,
        comment: comment,
        timeSpent: timeSpent,
        answers: answers,
        timestamp: new Date().toISOString()
    };

    // Save the quiz result to Firebase database
    database.ref("quizResults").push(studentAnswers)
        .then(() => {
            alert("Quiz submitted successfully!");
        })
        .catch((error) => {
            console.error("Error saving to database:", error);
        });

    // Display results to the student
    let resultHTML = `
        <p><strong>Name:</strong> ${studentName}</p>
        <p><strong>Score:</strong> ${score}/${totalQuestions} (${percentage.toFixed(2)}%)</p>
        <p><strong>Grade:</strong> ${grade}</p>
        <p><strong>Comment:</strong> ${comment}</p>
        <p><strong>Time Spent:</strong> ${timeSpent} seconds</p>
        <h3>Correct Answers</h3>
        <table id="quizResultsTable">
            <tr><th>Question</th><th>Correct Answer</th><th>Your Answer</th></tr>
    `;

    Object.keys(correctAnswers).forEach((key, index) => {
        resultHTML += `
            <tr>
                <td>Question ${index + 1}</td>
                <td>${correctAnswers[key]}</td>
                <td>${answers[key] || "Not answered"}</td>
            </tr>
        `;
    });

    resultHTML += "</table>";
    document.getElementById("result").innerHTML = resultHTML;

    // Reset form
    document.getElementById("quizForm").reset();
});
