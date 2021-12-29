'use strict';

//Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0'); 
const score1El = document.getElementById('score--1'); 
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores,currentScore, activePlayer,playing;

//Function when page loads and while Resetting to New Game

const init = function() {
    scores = [0,0];
    currentScore =0; //let becoz we are updating it
    activePlayer = 0; //for determining which is current player
    playing = true;

    score0El.textContent = 0; //Starting and reset Conditions
    score1El.textContent = 0; //Starting and reset Conditions
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active'); //becoz initially player zero was active and we need that initially position only
    player1El.classList.remove('player--active'); 
};

init();  

//Switch Player Function

const switchPlayer = function () {
        document.getElementById(`current--${activePlayer}`).textContent = 0;
        currentScore = 0;
        activePlayer = activePlayer === 0 ? 1 : 0;
        player0El.classList.toggle('player--active'); //toggle will add the class if its not there nd remove the class if its there same as .contains in modal example
        player1El.classList.toggle('player--active');
}

//Rolling Dice Functionality.
btnRoll.addEventListener('click', function () {
    if(playing) 
  {
    //1.Generating a random dice roll
    const dice = Math.trunc(Math.random()*6) +1;
    console.log(dice);
    //2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3.Check for rolled 1 : if true, 
    if(dice !==1) {
        //Add dice to current score
        currentScore += dice;  //currentScore = currentScore + dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        
    }
    else{
        //switch to next player
        switchPlayer();
    }
  }
});

//RHold button Functionality.

btnHold.addEventListener('click', function(){
    if(playing) 
  {
    //1.Add current score to active player
    scores[activePlayer] += currentScore; //scores[activePlayer] = scores[activePlayer] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    //2.Check if player's score >= 20
    if(scores[activePlayer] >= 20) {
        //Finish the game
        playing = false;
        diceEl.classList.add('hidden');
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        
    }else {
        //Switch to the next player
        switchPlayer();
    }
   }
});

//Resetting to New Game Functionality.

btnNew.addEventListener('click', init);
