var mins = 2;
var secs = mins * 60;

let count = 1;

let allPlayers = {};
function getAllPlayers() {

    $("#highScore").empty();
    Object.keys(localStorage).forEach(function (key) {

        allPlayers[key] = localStorage.getItem(key);
    });

    const playerKeys = Object.keys(allPlayers)
    console.log(playerKeys)

    const playerValues = Object.values(allPlayers)
    console.log(playerValues)


    for (let j = 0; j < playerKeys.length; j++) {



        $("#highScore").append(`${playerKeys[j]}: ${playerValues[j]}`);


    }


}


function countdown() {
    setTimeout('Decrement()', 60);
}

function Decrement() {
    if (document.getElementById) {
        minutes = document.getElementById("minutes");
        seconds = document.getElementById("seconds");

        if (seconds < 59) {
            seconds.value = secs;
        }

        else {
            minutes.value = getminutes();
            seconds.value = getseconds();
        }

        if (mins < 1) {
            minutes.style.color = "red";
            seconds.style.color = "red";
        }

        if (mins < 0) {
            alert('time up! How well did you do?');
            minutes.value = 0;
            seconds.value = 0;
        }
        else {
            secs--;
            setTimeout('Decrement()', 1000);
        }
    }
}

function getminutes() {
    mins = Math.floor(secs / 60);
    return mins;
}

function getseconds() {
    return secs - Math.round(mins * 60);
}

(function () {
    const myQuestions = [
        {
            question: "What is my dog called?",
            answers: {
                A: "Rio",
                B: "Lassie",
                C: "River",
                D: "Misty",
            },
            correctAnswer: "C"
        },
        {
            question: "Where do i live?",
            answers: {
                A: "Cheshire",
                B: "Manchester",
                C: "Stoke",
                D: "Chester",
            },
            correctAnswer: "A"
        },
        {
            question: "How old am I?",
            answers: {
                A: "23",
                B: "25",
                C: "27",
                D: "29",
            },
            correctAnswer: "C"
        },
        {
            question: "What month is my birthday in?",
            answers: {
                A: "August",
                B: "March",
                C: "February",
                D: "July",
            },
            correctAnswer: "D"
        },
        {
            question: "Who is my favourite sportsperson?",
            answers: {
                A: "Wayne Rooney",
                B: "Mo Farah",
                C: "Andy Murray",
                D: "Shaun White",
            },
            correctAnswer: "D"
        },
        {
            question: "Which is my favourite sport?",
            answers: {
                A: "Snowboarding",
                B: "Tennis",
                C: "Skiing",
                D: "Hockey",
            },
            correctAnswer: "A"
        },
        {
            question: "What vehicle do I own?",
            answers: {
                A: "Car",
                B: "Motorbike",
                C: "Scooter",
                D: "Truck",
            },
            correctAnswer: "B"
        },
        {
            question: "Which country do I want to visit?",
            answers: {
                A: "Australia",
                B: "China",
                C: "Japan",
                D: "Canada",
            },
            correctAnswer: "C"
        },
        {
            question: "What colour are my eyes?",
            answers: {
                A: "Green",
                B: "Hazel",
                C: "Brown",
                D: "Blue",
            },
            correctAnswer: "A"
        },
        {
            question: "What is my favourite food?",
            answers: {
                A: "Spaghetti",
                B: "Curry",
                C: "Burritos",
                D: "Pizza",
            },
            correctAnswer: "D"
        }
    ];

    function buildQuiz() {
        const output = [];

        myQuestions.forEach((currentQuestion, questionNumber) => {
            const answers = [];

            for (letter in currentQuestion.answers) {
                answers.push(
                    `<label>
               <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
             </label>`
                );
            }

            output.push(
                `<div class="slide">
             <div class="question"> ${currentQuestion.question} </div>
             <div class="answers"> ${answers.join("")} </div>
           </div>`
            );
        });

        quizContainer.innerHTML = output.join("");
        document.getElementById("quiz").style.display = "block";
        document.getElementById("buttons").style.display = "block";
        document.getElementById("results").style.display = "block";
    }

    function showResults() {

        const answerContainers = quizContainer.querySelectorAll(".answers");

        let numCorrect = 0;

        myQuestions.forEach((currentQuestion, questionNumber) => {
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            if (userAnswer === currentQuestion.correctAnswer) {
                numCorrect++;

                answerContainers[questionNumber].style.color = "darkgreen";
            } else {
                answerContainers[questionNumber].style.color = "red";
            }
        });

        resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;

        let currentPlayer = `player${count}`


        localStorage.setItem(currentPlayer, numCorrect);

        count++

        document.getElementById("quiz").style.display = "none";
        document.getElementById("buttons").style.display = "none";
        document.getElementById("results").style.display = "none";





        getAllPlayers();

        console.log(allPlayers);
    }

    function showSlide(n) {
        slides[currentSlide].classList.remove("active-slide");
        slides[n].classList.add("active-slide");
        currentSlide = n;

        if (currentSlide === 0) {
            previousButton.style.display = "none";
        } else {
            previousButton.style.display = "inline-block";
        }

        if (currentSlide === slides.length - 1) {
            nextButton.style.display = "none";
            submitButton.style.display = "inline-block";
        } else {
            nextButton.style.display = "inline-block";
            submitButton.style.display = "none";
        }
    }

    function showNextSlide() {
        showSlide(currentSlide + 1);
    }

    function showPreviousSlide() {
        showSlide(currentSlide - 1);
    }



    const quizContainer = document.getElementById("quiz");
    const resultsContainer = document.getElementById("results");
    const submitButton = document.getElementById("submit");

    buildQuiz();

    const homeButton = document.getElementById("home");
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    const beginQuiz = document.querySelectorAll(".beginquiz");
    let currentSlide = 0;

    showSlide(0);

    submitButton.addEventListener("click", showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
})();