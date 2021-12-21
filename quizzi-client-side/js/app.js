
const url = 'https://opentdb.com/api.php?amount=10&type=multiple';

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


// document.getElementById('next').addEventListener('click', () => {
        // location.reload();
        $(document).ready( () => {
            // RELOAD PAGE ON BUTTON CLICK EVENT.
                 $.ajax({url:'http://127.0.0.1:5500/quizzi-client-side/index.html',
                    success: () => {
                    $('#next').click( () => {
                        location.reload(true); 
                    });
                }});
             
          });
// });
