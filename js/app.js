const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const startGameBtn = document.querySelector('.btn__reset');
const ul = document.querySelector('ul');
const h2 = document.createElement('h2');
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
function getRandomPhraseAsArray(arr) {
	const randomNumber = Math.floor(Math.random() * phrases.length);
	const randomPhrase = phrases[randomNumber];
	const splitPhrase = randomPhrase.split('');
	return splitPhrase;
}

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);


// Add letters of string to the display
function addPhraseToDisplay(arr) {
	for(let i = 0; i < phraseArray.length; i++) {
		const li = phraseArray[i];
		const liPhrase = document.createElement('li');
		liPhrase.textContent = li;
		const ul = document.querySelector('#phrase ul');
		ul.appendChild(liPhrase);

		if (li !== ' ') {
			liPhrase.classList.add('letter');
		} else if (li === ' ') {
			liPhrase.classList.add('space');
		}
	}
}

// Check if a letter is in the phrase
function checkLetter(selectLetter) {
	const correctLetter = phraseArray.includes(selectLetter);
	
	if (correctLetter === true) {
		for (let i = 0; i < phraseArray.length; i++)
		if (phraseArray[i] === selectLetter) {
			document.querySelectorAll('li')[i].classList.add('show');
		}
	} else {
		const attempts = document.querySelectorAll('img');
		attempts[missed].src = "images/lostHeart.png";
		missed++;
	} 
}

// Listen for the onscreen keyboard to be clicked
qwerty.addEventListener('click', (e) => {
	if (e.target.tagName === 'BUTTON' && e.target.className != 'chosen') {
		const button = e.target;
		button.disabled = true;
		button.className = 'chosen';
		const letterCheck = e.target.textContent;
		const letterFound = checkLetter(letterCheck);
	}
	checkWin();
});

// Check if the game has been won or lost
function checkWin() {
	const letters = document.querySelectorAll('.letter');
	const shows = document.querySelectorAll('.show');
	if (shows.length === letters.length) {
		overlay.style.display = 'flex';
		overlay.className = 'win';
		document.querySelector('h2').textContent = "You Win!";
		overlay.appendChild(h2);
		startGameBtn.textContent = 'Restart?';
	} else if (missed > 4) {
		overlay.style.display = 'flex';
		overlay.className = 'lose';
		overlay.appendChild(h2);
		h2.textContent = "You Lose!";
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



