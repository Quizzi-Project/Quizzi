
const url = 'https://opentdb.com/api.php?amount=10&type=multiple';
// // ADDITION
// const MAX_QUESTIONS = 10;
// let questions = [];
// let currentQuestion = {};
// let acceptingAnswers = false;
// const progressBarFull = document.getElementById('progress-bar-full');
// // END ADDITION

async function getTrivia() {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

function shuffleArr(arr){
    console.log(arr);
    for(let i = arr.length - 1; i >= 0; i--) {
        const sh = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[sh]] = [arr[sh], arr[i]];
    }
}

// // ADDITION
// getNewQuestion = () => {
//     if (availableQuestions.length === 0 || questionsCounter >= MAX_QUESTIONS) {
//         localStorage.setItem('mostRecentScore', score);
//         //go to the end page
//         return window.location.assign('/endgame.html');
//     }
//     questionCounter++;
//     progressText.innerText = `Question ${questionsCounter}/${MAX_QUESTIONS}`;
//     //Update the progress bar
//     progressBarFull.style.width = `${(questionsCounter / MAX_QUESTIONS) * 100}%`;

//     const questionIndex = Math.floor(Math.random() * availableQuesions.length);
//     currentQuestion = availableQuesions[questionIndex];
//     question.innerText = currentQuestion.question;

//     choices.forEach((choice) => {
//         const number = choice.dataset['number'];
//         choice.innerText = currentQuestion['choice' + number];
//     });

//     availableQuesions.splice(questionIndex, 1);
//     acceptingAnswers = true;
// };

// startGame = () => {
//     questionsCounter = 0;
//     score = 0;
//     availableQuestions = [...questions];
//     getNewQuestion();
// };

// startGame();

// END ADDITION

getTrivia().then((data) => {
    const results = data.results[0];
    console.log(results);   
    document.getElementById('question').innerHTML = results.question;
    document.getElementById('category').innerHTML = results.category;
    document.getElementById('difficulty').innerHTML = results.difficulty;

    const answers = [...results.incorrect_answers, results.correct_answer];
    shuffleArr(answers);

    for(let i = 0; i < answers.length; i++) {
        let index = i + 1;
        document.getElementById(`choice${index}label`).innerHTML = answers[i];
        document.getElementById(`choice${index}`).value = answers[i];
    }

    document.getElementById('display').style.display = 'flex';
        document.getElementById('guess').addEventListener('click', () => {
            document.getElementById('guess').innerHTML = 'You guessed it!';
            document.getElementById('guess').disabled = true;
            document.querySelectorAll('input[name="choice"]').forEach((el) => {
                const result = document.getElementById('result'); 

                if(el.checked) {
                    if(el.value === results.correct_answer) {
                        result.innerHTML = 'Great! This is the correct answer 😄';
                    } else result.innerHTML = 'Aww 😒 Better luck next time';
                }
            });
        });
    });

let questionsAnswered = 0;
document.getElementById('next').addEventListener('click', () => {
    location.reload();
});
