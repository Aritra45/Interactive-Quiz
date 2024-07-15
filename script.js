
const quizData = [
    {
        question: "1. What is the capital of France?",
        answers: {
            a: "Berlin",
            b: "Madrid",
            c: "Paris",
            d: "Rome"
        },
        correct: "c",  
        hint: "It's a famous city known for the Eiffel Tower."  
    },
    {
        question: "2. Which language is used for web development?",
        answers: {
            a: "Python",
            b: "JavaScript",
            c: "C++",
            d: "Java"
        },
        correct: "b",  
        hint: "It's a scripting language primarily used on the web." 
    },
    {
        question: "3. What does CSS stand for?",
        answers: {
            a: "Creative Style Sheets",
            b: "Cascading Style Sheets",
            c: "Computer Style Sheets",
            d: "Colorful Style Sheets"
        },
        correct: "b",  
        hint: "Styling language used for web pages."  
    },
    {
        question: "4. Which of the following is not a JavaScript framework/library?",
        answers: {
            a: "React",
            b: "Angular",
            c: "Vue",
            d: "Django",
        },
        correct: "d",  
        hint: "Popular tools for front-end development."  
    },
    {
        question: "5. Which keyword is used to define a constant in JavaScript?",
        answers: {
            a: "var",
            b: "let",
            c: "const",
            d: "final",
        },
        correct: "c",  
        hint: "It declares a variable that cannot be reassigned."  
    },
    {
        question: "6. What is the output of `typeof [ ]` in JavaScript?",
        answers: {
            a: "object",
            b: "array",
            c: "undefined",
            d: "null",
        },
        correct: "a", 
        hint: "Type checking operator in JavaScript."  
    },
    {
        question: "7. What will be the output of the code?",
        answers: {
            a: "10",
            b: "14",
            c: "11",
            d: "7",
        },
        correct: "b",
        image: "Questions Images/7.png",  
        hint: "Follows operator precedence rules."  
    },
    {
        question: "8. What will be the output of the code?",
        answers: {
            a: "5",
            b: "6",
            c: "4",
            d: "Error",
        },
        correct: "a",
        image: "Questions Images/8.png",  
        hint: "Post-increment operator usage."  
    },
    {
        question: "9. What will be the output of the code?",
        answers: {
            a: "Yes",
            b: "No",
            c: "True",
            d: "False",
        },
        correct: "a",
        image: "Questions Images/9.png",  
        hint: "Conditional (ternary) operator usage."  
    },
    {
        question: "10. What will be the output of the code?",
        answers: {
            a: "Hello",
            b: "World",
            c: "Hello,",
            d: "Error",
        },
        correct: "a",
        image: "Questions Images/10.png",  
        hint: "String method usage for slicing."  
    },
];

const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const timeLeftContainer = document.getElementById('time-left');
const startButton = document.getElementById('start-button');
const startPopup = document.getElementById('start-popup');
let timer;

startButton.addEventListener('click', () => {
    startPopup.style.display = 'none';
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    buildQuiz();
});

submitButton.addEventListener('click', () => {
    showResults();
});

function buildQuiz() {
    const output = [];
    quizData.forEach((currentQuestion, questionNumber) => {
        const answers = [];
        for (letter in currentQuestion.answers) {
            answers.push(
                `<li>
                    <label>
                        <input type="radio" name="question${questionNumber}" value="${letter}">
                        ${letter} : ${currentQuestion.answers[letter]}
                    </label>
                </li>`
            );
        }
        output.push(
            `<div class="question"> ${currentQuestion.question} </div>
            ${currentQuestion.image ? `<img src="${currentQuestion.image}" alt="Question Image">` : ''}
            <ul class="answers"> ${answers.join('')} </ul>
            ${currentQuestion.hint ? `<button type="button" onclick="showHint(${questionNumber})">Show Hint</button><div id="hint${questionNumber}" style="display:none;">${currentQuestion.hint}</div>` : ''}
            <div id="correct-answer${questionNumber}" class="correct-answer" style="display:none;">Correct Answer: ${currentQuestion.answers[currentQuestion.correct]}</div>`
        );
    });
    quizContainer.innerHTML = output.join('');
    startTimer();
}

function showHint(questionNumber) {
    const hint = document.getElementById(`hint${questionNumber}`);
    hint.style.display = hint.style.display === 'none' ? 'block' : 'none';
}

function showResults() {
    clearInterval(timer);
    const answerContainers = quizContainer.querySelectorAll('.answers');
    let numCorrect = 0;
    const userAnswers = [];

    quizData.forEach((currentQuestion, questionNumber) => {
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
        userAnswers.push({ question: currentQuestion.question, answer: userAnswer });

        const correctAnswerContainer = document.getElementById(`correct-answer${questionNumber}`);
        if (userAnswer === currentQuestion.correct) {
            numCorrect++;
            answerContainers[questionNumber].style.color = 'lightgreen';
        } else {
            answerContainers[questionNumber].style.color = 'red';
            correctAnswerContainer.style.display = 'block'; 
            answerContainer.querySelector(`input[value=${currentQuestion.correct}]`).parentElement.style.color = 'lightgreen'; 
        }
    });

    resultsContainer.innerHTML = `You scored ${numCorrect} out of ${quizData.length}`;
    document.getElementById('user-score').value = numCorrect;
    document.getElementById('total-questions').value = quizData.length;
    document.getElementById('user-answers').value = JSON.stringify(userAnswers);
    document.getElementById('quiz-form').submit();
}


function startTimer() {
    let timeLeft = 120;
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            showResults();
        } else {
            timeLeftContainer.textContent = `Time left: ${timeLeft} seconds`; 
            timeLeft--;
        }
    }, 1000);
}
