const socket = io();

socket.on('question', (question) => {
    const questionDiv = document.getElementById('question');
    questionDiv.innerText = question.question;

    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';

    question.options.forEach((option, index) => {
        const optionButton = document.createElement('button');
        optionButton.innerText = option;
        optionButton.onclick = () => {
            socket.emit('answer', { questionIndex: index, answer: option });
        };
        optionsDiv.appendChild(optionButton);
    });
});
