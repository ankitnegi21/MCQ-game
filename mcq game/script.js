// Questions and answers
const questions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Rome"],
        correct: "Paris"
    },
    {
        question: "Who developed the theory of relativity?",
        options: ["Isaac Newton", "Albert Einstein", "Nikola Tesla", "Marie Curie"],
        correct: "Albert Einstein"
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Jupiter", "Mars", "Saturn"],
        correct: "Jupiter"
    },
    {
        question: "What is the chemical symbol for water?",
        options: ["O2", "H2O", "CO2", "NaCl"],
        correct: "H2O"
    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        options: ["China", "Japan", "South Korea", "India"],
        correct: "Japan"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;

// DOM elements
const timerElement = document.getElementById("timer");
const questionText = document.getElementById("question-text");
const answerOptions = document.getElementById("answer-options");
const scoreContainer = document.getElementById("score-container");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart-button");

// Start the game
function startGame() {
    score = 0;
    currentQuestionIndex = 0;
    scoreContainer.style.display = "none";
    startTimer();
    showQuestion();
}

// Display the current question
function showQuestion() {
    const question = questions[currentQuestionIndex];
    questionText.textContent = question.question;
    answerOptions.innerHTML = "";

    question.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.addEventListener("click", () => checkAnswer(option));
        answerOptions.appendChild(button);
    });
}

// Check the selected answer
function checkAnswer(selectedOption) {
    const correctAnswer = questions[currentQuestionIndex].correct;
    if (selectedOption === correctAnswer) {
        score++;
    }
    
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        endGame();
    }
}

// End the game and show the score
function endGame() {
    clearInterval(timer);
    timerElement.textContent = "Time's up!";
    scoreElement.textContent = score;
    scoreContainer.style.display = "block";
}

// Start the timer for each question
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time Left: ${timeLeft}`;
        
        if (timeLeft === 0) {
            clearInterval(timer);
            timeLeft = 30;
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                showQuestion();
                startTimer();
            } else {
                endGame();
            }
        }
    }, 1000);
}

// Restart the game
restartButton.addEventListener("click", startGame);

// Start the game initially
startGame();
