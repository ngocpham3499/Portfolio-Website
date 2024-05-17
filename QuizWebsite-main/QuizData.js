// Questions in the quiz with question, options and correct answer
const quizMath = [
  {
    question: 'What is 9+10?',
    options: ['21', '19', '9', '10'],
    answer: '19',
  },
  {
    question: 'What is the largest number of these: 1, 14, 7, 11?',
    options: ['1', '14', '7', '11'],
    answer: '14',
  },
  {
    question: 'What shape has three corners?',
    options: ['Rectangle', 'Square', 'Triangle', 'Circle'],
    answer: 'Triangle',
  },
];

// Variables to store references to various elements in HTML document
const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');
  
let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

// Randomize the order of answer options for each question
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizMath[currentQuestion];
  
  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;
  
  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';
  
  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);
  
  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';
  
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];
  
    const optionText = document.createTextNode(shuffledOptions[i]);
  
    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }
  
  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizMath[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizMath[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizMath[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizMath.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `You scored ${score} out of ${quizMath.length}!`;
}
  
function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}
  
function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';
  
  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }
  
  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizMath.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}
  
submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);
  
displayQuestion();
