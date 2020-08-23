/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, activePlayer, dice, totalScore, currentBox, gameOver, diceTemp;

initilize();

//document.getElementById('score-'+activePlayer).innerHTML=totalScore[activePlayer];


document.querySelector('.btn-roll').addEventListener('click', function () { //Event trigger on Dice click
    document.querySelector('#score-' + activePlayer);

    //------------------------Dice roll-------------------------------------
    if (gameOver === false) {
        dice = Math.floor(Math.random() * 6) + 1;
        document.querySelector('.dice').style.display = "block";
        document.querySelector('.dice').src = "dice-" + dice + ".png";
        currentBox = document.getElementById('current-' + activePlayer);
        if (dice !== 1) {
            scores[activePlayer] += dice;
            currentBox.innerHTML = scores[activePlayer];
        }

        //------------------------Next player turns------------------------------------------
        else {
            changePlayer(); //For next Player turn
            return;
        }
    }
});


//----------------------On hold-----------------------------------------------

document.querySelector('.btn-hold').addEventListener('click', function () {

    if (gameOver === false) {
        //Add Scores in Global Score
        totalScore[activePlayer] += scores[activePlayer];


        //Update UI
        document.getElementById('score-' + activePlayer).innerHTML = totalScore[activePlayer];

        //-----------------------Check if player wins the Game-----------------------

        if (totalScore[activePlayer] >= 20) {
            document.getElementById('name-' + activePlayer).innerHTML = "Winner";
            document.querySelector('.player-0-panel').classList.remove('active');
            document.querySelector('.player-1-panel').classList.remove('active');
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            gameOver = true;
        } 
        else {
            changePlayer(); //To change Player turn
        }




    }

});

//.....................Next player turn...............................................
function changePlayer() {

    scores[activePlayer] = 0;
    var currentBox = document.getElementById('current-' + activePlayer);
    currentBox.innerHTML = scores[activePlayer];
    (activePlayer !== 1 ? activePlayer = 1 : activePlayer = 0);
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = "none";

}


//---------------for New Game-----------------------------------

document.querySelector('.btn-new').addEventListener('click',initilize);

function initilize() {
    scores = [0, 0];
    totalScore = [0, 0];
    activePlayer = 0;
    dice = 0;
    gameOver = false;
    document.getElementById('score-0').innerHTML = 0;
    document.getElementById('score-1').innerHTML = 0;
    document.getElementById("current-0").innerHTML = 0;
    document.getElementById("current-1").innerHTML = 0;
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
    document.getElementById('name-0').innerHTML="Player 1";
    document.getElementById('name-1').innerHTML="Player 2";
}