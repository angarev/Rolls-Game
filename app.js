var scores, roundScore, activePlayer, gamePlaying, doubleSix;

init();



document.querySelector('.btn-roll').addEventListener('click', function () {
    
    if (!gamePlaying) {
        return;
    }
    
    // Create random number between 1 and 6
    var dice = Math.floor(Math.random() * 6) + 1;

    //Check if the player rolls two 6 in the row
    if (doubleSix === dice) {
        nextPlayer();
    } else {
        doubleSix = dice;
    }
        
    //Match the number 
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = "block";
    diceDOM.src = 'dice-' + dice + '.png';


    if (dice !== 1) {
        //Add dice to round score
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;

    } else {
        nextPlayer();
    }        

});

document.querySelector('.btn-hold').addEventListener('click', function () {

    if (!gamePlaying) {
        return;
    }

    //Add current core to global score
    scores[activePlayer] += roundScore;

    //Update the UI
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

    //Check if the player won the game
    if (scores[activePlayer] >= 100) {
        document.getElementById('name-' + activePlayer).textContent = "Winner!";
        document.querySelector('.dice').style.display = "none";
        document.querySelector(".player-"+activePlayer+"-panel").classList.add('winner');
        document.querySelector(".player-"+activePlayer+"-panel").classList.remove('active');
        document.querySelector('#current-' + activePlayer).textContent = 0;
        roundScore = 0;
        gamePlaying = false;
    } else {
        nextPlayer();    
    }
});

//
document.querySelector('.btn-new').addEventListener('click', init);

//Next player function
function nextPlayer() {
    //Change active player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0

    //Clear score
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //Toggle active glass (grey background and red point)
    document.querySelector(".player-0-panel").classList.toggle('active');
    document.querySelector(".player-1-panel").classList.toggle('active');  
    document.querySelector('.dice').style.display = "none";
}

//Init function

function init() {
    scores = [0,0];
    roundScore = 0; 
    activePlayer = 0;
    gamePlaying = true;
    doubleSix = '';

    document.querySelector('.dice').style.display = "none";
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';    
    document.getElementById('name-0').textContent = "Player 1";
    document.getElementById('name-1').textContent = "Player 2";
    document.querySelector(".player-0-panel").classList.remove('winner');
    document.querySelector(".player-1-panel").classList.remove('winner');
    document.querySelector(".player-0-panel").classList.remove('active');
    document.querySelector(".player-1-panel").classList.remove('active');
    document.querySelector(".player-0-panel").classList.add('active');
}