let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI ELEMENT
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');   

      // assign UI min and max
      minNum.textContent = min;
      maxNum.textContent = max;

      // PLAY AGAIN EVENT LISTENER
      game.addEventListener('mousedown', function(e){
         if(e.target.className === 'play-again'){
            window.location.reload();
         }
       
      });

      // listen for guess
      guessBtn.addEventListener('click', function(){
     let guess = parseInt(guessInput.value);

     //validate
        if (isNaN(guess) || guess < min || guess > max){
            disMessage(`Please input between ${min} and ${max}`, 'red');
        }


        // check if won
       if (guess === winningNum){
        //Game over - won
        gameOver(true, `${winningNum} is correct, YOU WIN!`);

      } else{
        guessesLeft -= 1;
       
        if(guessesLeft === 0){
         // Game over - lost
         gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);
         
        } else {
            // Game continues - answer wrong

            // change border color
            guessInput.style.borderColor = 'red';

            // clear input
            guessInput.value = '';

            // tell user it the wrong number
            disMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
            
        }

       }

      });

// Game Over
  function gameOver(won, msg){
let color;
won === true ? color = 'green' : color = 'red';

// disable input
  guessInput.disabled = true;
//  change border color
  guessInput.style.borderColor = color;
  // set text color
  message.style.color = color;
// set message
  disMessage(msg);

  // PLAY AGAIN
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again'
}

// Get WInning Number
function getRandomNum(min, max){
   return Math.floor(Math.random()*(max-min+1)+min);
}


// set message
      function disMessage(msg, color){
        message.style.color = color;
        message.textContent = msg;
      }