const socket = io('/moderator');

const questions = [
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
    { question: "What is 3 * 4?", options: ["7", "10", "12", "14"], answer: "12" },
    // Add more questions here
];

let currentQuestionIndex = 0;

function sendQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    socket.emit('question', currentQuestion);
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        sendQuestion();
    } else {
        console.log('No more questions.');
    }
}

sendQuestion();
