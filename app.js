/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/



/*variables declaration for the game*/

var scores, roundScore, activePlayer, dice, prevDice, gamePlayng, winningScore;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
	if(gamePlayng) {

		//Get a random number between 1 and 6
		prevDice = dice;
		//console.log(prevDice);
		dice = Math.floor(Math.random() * 6) + 1;

		//Display results
		var diceDOM = document.querySelector('.dice');
		diceDOM.style.display = 'block';
		diceDOM.src = 'dice-' + dice +'.png';

		if (dice === 6 && prevDice === 6) {
			document.querySelector('#score-' + activePlayer).textContent = 0 ;
			nextPlayer();
		} else {
				//Update the round score only if the rolled number in not equal to 1
				if (dice !== 1) {
				//Add score
				roundScore += dice;
				document.querySelector('#current-' + activePlayer).textContent = roundScore ;
				} else {
				//Next Player
				nextPlayer();
				}
		}		
	}
		
});




document.querySelector('.btn-hold').addEventListener('click', function() {
	if(gamePlayng) {

		//Add current score to global score
		scores[activePlayer] += roundScore;
		//Update the UI
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
		//Check if player won the game
		if (scores[activePlayer] >= winningScore) {
			document.getElementById('name-' + activePlayer).textContent = 'WINNER';
			document.querySelector('.dice').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			gamePlayng = false;
		} else {
		//Next Player
		nextPlayer();
		}
	}	
});


document.querySelector('.btn-new').addEventListener('click', init); 

document.querySelector('.btn-score').addEventListener('click', getScore)


function getScore() {
	var customScore = document.getElementById("score-win");
	if (customScore.value >= 10 && customScore.value <= 100) { 
	winningScore = customScore.value;
	document.querySelector('.alert').style.display = 'none';
	console.log(winningScore);
	} else {
	document.querySelector('.alert').style.display = 'block';
	}
};

function init() {
	scores = [0,0];
	winningScore = 100;
	roundScore = 0;
	activePlayer = 0;
	gamePlayng = true;


	document.querySelector('.dice').style.display = 'none';

	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';

	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	
	document.querySelector('.player-0-panel').classList.add('active');
	document.getElementById("score-win").value = '';
	document.querySelector('.alert').style.display = 'none';


} 


function nextPlayer() {
		activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
		roundScore = 0;

		document.getElementById('current-0').textContent = '0';
		document.getElementById('current-1').textContent = '0';

		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');

		document.querySelector('.dice').style.display = 'none'; 


};










