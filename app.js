let currentQuestionIndex = 0;
let quizData = [];

// 1. Fetch and load the JSON data
async function loadQuiz() {
    try {
        const response = await fetch('data.json');
        quizData = await response.json();
        showQuestion();
    } catch (error) {
        console.error("Error loading JSON data:", error);
        document.getElementById('question').innerText = "Failed to load quiz data.";
    }
}

// 2. Display the current question and options
function showQuestion() {
    const feedbackDiv = document.getElementById('feedback');
    feedbackDiv.innerText = ""; // Clear feedback
    
    if (currentQuestionIndex >= quizData.length) {
        document.getElementById('question').innerText = "Quiz Completed! 🎉";
        document.getElementById('options').innerHTML = "";
        return;
    }

    const currentQuiz = quizData[currentQuestionIndex];
    document.getElementById('question').innerText = currentQuiz.question;

    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = ""; // Clear old options

    currentQuiz.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option-btn');
        button.onclick = () => checkAnswer(option, currentQuiz.answer);
        optionsDiv.appendChild(button);
    });
}

// 3. Verify user's selection
function checkAnswer(selected, correct) {
    const feedbackDiv = document.getElementById('feedback');
    if (selected === correct) {
        feedbackDiv.innerText = "Correct! Moving to next question...";
        feedbackDiv.style.color = "green";
        currentQuestionIndex++;
        setTimeout(showQuestion, 500);
    } else {
        feedbackDiv.innerText = "Wrong answer! Try again.";
        feedbackDiv.style.color = "red";
    }
}

// Start the quiz app
loadQuiz();
