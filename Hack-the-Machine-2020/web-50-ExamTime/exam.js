// Code utilized from https://www.sitepoint.com/simple-javascript-quiz/

(function(){

  // THOMAS
  console.log('HELLO WORLD')

  // THOMAS: this sets up the HTML for the quiz
  // Functions
  function buildQuiz(){
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {

        // variable to store the list of possible answers
        const answers = [];

        // and for each available answer...
        for(letter in currentQuestion.answers){

          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }

        // add this question and its answers to the output
        output.push(
          `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
          </div>`
        );
      }
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }

  // THOMAS: This gathers up our answers and checks to see if it was correct
  function showResults(){

    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    let numCorrect = 0;
    let data = "";
    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {

      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;
      data = data + questionNumber + "=" + userAnswer + "&";
      // if answer is correct
      if(userAnswer === currentQuestion.correctAnswer){
        // add to the number of correct answers
        numCorrect++;

      }
    });

    // THOMAS
    // 0=d&1=c&2=a&3=b&4=y&
    console.log(data)
    data="0=d&1=c&2=a&3=b&4=y&"
    resultsContainer.innerHTML = "You are %100 correct my good sir."
    sendData(data);

    // // show number of correct answers out of total
    // if(numCorrect === myQuestions.length){
    //     resultsContainer.innerHTML = "You are %100 correct my good sir."
    //     sendData(data);
    // } else {
    //     resultsContainer.innerHTML = "You are a failure." 
    //     sendData(data);
    // }
  }

function sendData(data){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("result").innerHTML = this.responseText;
        }
    };
    xhttp.open("POST", "submit.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(data); 
}

  function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide === 0){
      previousButton.style.display = 'none';
    }
    else{
      previousButton.style.display = 'inline-block';
    }
    if(currentSlide === slides.length-1){
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    }
    else{
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  // Variables
  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  
  const myQuestions = [
    {
      question: "When did the war of 1912 happen?",
      answers: {
        a: "My sources say no.",
        b: "Signs point to yes.",
        c: "Reply hazy, try again.",
        d: "Yes." 
      },
      correctAnswer: "d"
    },
    {
      question: "How much wood would a woodchuck chuck if a woodchuck could chuck wood?",
      answers: {
        a: "Cannot predict now.",
        b: "Outlook good.",
        c: "It is decidedly so.",
        d: "Most likely."
      },
      correctAnswer: "c"
    },
    {
      question: "Can you safely look at a picture of a sun? ",
      answers: {
        a: "Cannot predict now.",
        b: "You may rely on it.",
        c: "My reply is no.",
        d: "As I see it, yes."
      },
      correctAnswer: "a"
    },
    {
      question: "Are there birds in Canada?",
      answers: {
        a: "Concentrate and ask again.",
        b: "Without a doubt.",
        c: "It is decidedly so.",
        d: "It is certain."
      },
      correctAnswer: "b"
    },
    {
      question: "On which planet is the moon? ",
      answers: {
        a: "My reply is no.",
        b: "Yes – definitely.",
        c: "Better not tell you now.",
        d: "Very doubtful."
      },
      correctAnswer: "y"
    }
  ];

  // Kick things off
  buildQuiz();

  // Pagination
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  // Show the first slide
  showSlide(currentSlide);

  // Event listeners
  submitButton.addEventListener('click', showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();

