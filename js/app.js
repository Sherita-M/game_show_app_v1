const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const startGameBtn = document.querySelector('.btn__reset');
const ul = document.querySelector('ul');
const youWin = document.querySelector('ul');
let missed = 0;	
const overlay = document.getElementById('overlay');


// Hide Start Game Button 
startGameBtn.addEventListener('click', () => {
	overlay.style.display='none';
});

// Phrases array
const phrases = [
	'a penny saved is a penny earned',
	'out of sight out of mind',
	'home is where the heart is',
	'pride comes before a fall',
	'early bird catches the worm',
];



// Return a random phrase from an array\
function getRandomPhraseAsArray (arr) {
	const randomNumber = Math.floor(Math.random() * phrases.length);
	let phrase = arr[randomNumber];
	return phrase;
}



const randomPhrase = getRandomPhraseAsArray(phrases);
function addPhraseToDisplay(arr) {
	for (let i = 0; i < randomPhrase.length; i++){
		let text = arr[i];
		const li = document.createElement('li');
		ul.appendChild(li);
		li.className = 'letter';
		li.textContent = text;
		if (randomPhrase[i] === " ") {
			li.className = 'space';
		} else {
			li.className = 'letter';
		}

	}
}

// Adds the letters of a string to the display
addPhraseToDisplay(randomPhrase);


// Check if a letter is in the phrase
function checkLetter(selectLetter) {
	const checkLetter = document.querySelectorAll('li');
	let match = null;

	for (let i = 0; i < checkLetter.length; i++) {
		const letterCheck = checkLetter[i];

		if (selectLetter === letterCheck.textContent) {
			checkLetter[i].className = 'show letter';
			match = letterCheck.textContent;
		}

	}
	return match;
}
// Listen for the onscreen keyboard to be clicked
qwerty.addEventListener('click', (e) => {
	e.preventDefault();
	if (e.target.tagName === 'BUTTON' && e.target.className != 'chosen') {
		const button = e.target;
		e.target.className = 'chosen';
		e.target.setAttribute('disabled', '');
		const match = checkLetter(button);
		if (match === null) {
			const tries = document.querySelectorAll('img');
			tries[missed].setAttribute('src', 'images/lostHeart.png');
			missed++;
		}
	}
	checkWin();
});

// Check if the game has been won or lost
function checkWin() {
	const letters = document.querySelectorAll('.letter');
	const shows = document.querySelectorAll('.show');
	if (letters.length === shows.length) {
		overlay.style.display = 'flex';
		overlay.className = 'win';
		youWin.textContent = "You Win!";
		startGameBtn.textContent = 'Restart?';
	} else if (missed > 4) {
		overlay.style.display = 'flex';
		overlay.className = 'lose';
		youWin.textContent = "You Lose!";
		startGameBtn.textContent = 'Try Again?';
	}
	resetGame();
}

// Reset Game
function resetGame() {
	startGameBtn.addEventListener('click', (e) => {
		ul.requestFullscreen.display = 'none';
		location.reload();
	});
}



