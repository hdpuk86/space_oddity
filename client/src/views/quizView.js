var Popup = require('./popupView');
var Quiz = require('./quizView');

// This is the paragraph where the result of the chosen answer is held
var pResult = document.createElement('p');

var checkRadioAnswer = function(element, correctAnswer){
  disableRadioBtns();
  if(element.value === correctAnswer){
    pResult.innerText = 'Correct'
    pResult.style.color = 'green';
  }else {
    pResult.innerText = 'Incorrect'
    pResult.style.color = 'red';
  }
}

function disableRadioBtns(){
  // Get all radio buttons
  var radioBtns = document.getElementsByTagName('input');
  // Loop over radio buttons and disable them
  for( var i = 0; i < radioBtns.length; i++){
    radioBtns[i].disabled = true;
  };
};

var Quiz = function(planet, popup, num){
  // Creates a div based on the passed in question number 0 = 1
  // Get the questions for the planet
  var questions = planet.quiz.questions;
  // Get the number of question that was passed in
  var question = questions[num];

  // Create quiz div
  var quizDiv = document.createElement('div');
  // Add Quiz name paragraph
  var pQuizName = document.createElement('p');
  pQuizName.innerText = `${planet.name} Quiz`;
  quizDiv.appendChild(pQuizName);
  // Add question text
  var pQuestion = document.createElement('p');
  pQuestion.innerText = question.question;
  quizDiv.appendChild(pQuestion);
  // Create fieldset to hold ul of radio buttons
  var quizFieldSet = document.createElement('fieldset');
  // create UL
  var ul = document.createElement('ul');
  // Get all answers for the question
  var answers = question.allAnswers;
  // Create li, radio input and label for each answer
  answers.forEach(function(answer){
    var li = document.createElement('li');
    var questionInput = document.createElement('input');
    var label = document.createElement('label');
    label.innerText = answer;

    questionInput.setAttribute('type', 'radio');
    questionInput.setAttribute('name', planet.name);
    questionInput.setAttribute('value', answer);
    questionInput.class = 'radioAnswers';
    questionInput.addEventListener('click', function(){
      checkRadioAnswer(questionInput, question.correctAnswer);
    })

    label.appendChild(questionInput);
    li.appendChild(label);
    ul.appendChild(li);
    quizFieldSet.appendChild(ul);
  })
  quizDiv.appendChild(quizFieldSet);

  //Appends the paragraph to display if answer is correct or not
  pResult.innerText = '';
  quizDiv.appendChild(pResult);

  // Adds the next question button and the event listener
  var imgButton = document.createElement('img');
  imgButton.src = '../images/right_arrow.png';
  imgButton.width = 25;
  imgButton.addEventListener('click', function(){
    // increases the number in the question array
    num++
    // Creates a new div based on the question
    var div = new Quiz(planet, popup, num);
    // repopulates the popuo with the new question
    popup.setContent(div);
  })

  quizDiv.appendChild(imgButton);
  return quizDiv;
}

module.exports = Quiz;