
'use strict';

// GLOBAL VARIABLES

var memoryArray = [
	'images/apa.svg',
	'images/elefant.svg',
	'images/gris.svg',
	'images/hund.svg',
	'images/panda.svg',
	'images/rav.svg',
	'images/tiger.svg',
	'images/zebra.svg',
	'images/ko.svg',
	'images/apa.svg',
	'images/elefant.svg',
	'images/gris.svg',
	'images/hund.svg',
	'images/panda.svg',
	'images/rav.svg',
	'images/tiger.svg',
	'images/zebra.svg',
	'images/ko.svg'
];

var countTurned = 0;
var turnedID = [];
var turnedCardsArray = [];
var par = [];

// SHUFFLE FUNCTION

Array.prototype.shuffle = function() {
	var i = this.length, j, temp;
	while (--i > 0) {
		j = Math.floor(Math.random() * (i+1));
		temp = this[j];
		this[j] = this[i];
		this[i] = temp;
	}
}

//ADD CLICK EVENT TO THE CARDS

function addClickEvent() {
	var card = document.querySelectorAll('.flip-container');

	for (var i = 0; i < card.length; i++) {

		card[i].addEventListener('click', gameFunction, false);

	}
};

//REMOVE CLICK EVENT FROM CARDS

function removeClickEvent() {
	var rcard = document.querySelectorAll('.flip-container');

	for (var i = 0; i < rcard.length; i++) {

		rcard[i].removeEventListener('click', gameFunction, false);

	}
};

//CREATE NEW SHUFFLED BOARD

function newDeck() {

	memoryArray.shuffle();

	var count = 0;

	for (var i = 0; i < memoryArray.length; i++ ) {
		var createContainer = document.createElement('div');
		document.querySelector('.memory-container').appendChild(createContainer);
		createContainer.classList.add('flip-container');
		createContainer.id = count + 1;
		count++;
	}
	var flipContArray = document.querySelectorAll('.flip-container');
	var realArray = [];
	flipContArray.forEach(function(name) {
		realArray.push(name);
	});
	realArray.forEach(function(addFlipper) {
		addFlipper.appendChild(document.createElement('div')).classList.add('flipper');

	});

	var flipperArray = document.querySelectorAll('.flipper');
	var realArray2 = [];
	flipperArray.forEach(function(addFront) {
		realArray2.push(addFront);
		addFront.appendChild(document.createElement('div')).classList.add('front');
		addFront.appendChild(document.createElement('div')).classList.add('back');
	});

	var allFronts = document.querySelectorAll('.front');
	var counter = 0;
	allFronts.forEach(function(addFrontBg) {

		addFrontBg.textContent = memoryArray[counter];
		counter++;

	});
	var allFronts = document.querySelectorAll('.front');
	allFronts.forEach(function(addFrontBg) {

		addFrontBg.style.background = '#F4F1DE url("' + addFrontBg.textContent + '") center no-repeat';
		addFrontBg.style.backgroundSize = '70%';

	});
	addClickEvent();
}

newDeck(); //CALL NEWDECK FUNCTION WHEN PAGE LOADS

//THE MAIN GAME FUNCTION
function gameFunction(event) {
	//FLIP CARDS ON CLICK
	var brick = event.path[2];

	brick.classList.add("flip"); //FLIPS CARD BY ADDING FLIPPCLASS TO CLICKED CARD
	turnedID.push(brick.id);
	turnedCardsArray.push(brick.textContent);

	if (turnedCardsArray.length === 1) {
		var removeListener1 = document.getElementById(turnedID[0]);
		var removeListener2 = document.getElementById(turnedID[1]);
		removeListener1.removeEventListener('click', gameFunction, false); //PREVENT COUNTING THE SAME CARD MORE THAN ONCE IN THE SAME ROUND
	}
	if (turnedCardsArray.length > 1) {
		removeClickEvent(); //PREVENT BEGINNING NEW ROUND UNTIL PREVIOUS IS DONE
		//CHECK IF FIRST AND SECOND CARD IN A ROUND MATCH
		if (turnedCardsArray[0] === turnedCardsArray[1]) {
			reset();
			countTurned += 2; //IF MATCH ADD TWO TOO THE VARIABLE THAT COUNTS THE PAIRS
			addClickEvent();
			//CHECK IF ALL PAIRS ARE FLIPPED
			if (countTurned === memoryArray.length) {
				alert('Grattis');
				var container = document.querySelector('.memory-container');
				//EMPTY BOARD AND ADD NEW CARDS
				container.innerHTML = '';
				newDeck();
			}
			//PREVENT COUNTING ALREADY FLIPPED PAIRS
			removeListener1.removeEventListener('click', gameFunction, false);
			removeListener2.removeEventListener('click', gameFunction, false);

		} else {
			//FLIP BACK IF NO PAIR
			setTimeout(flipBack, 1000);
		}
	}
};

//FUNCTION TO FLIP CARDS BACK IF NO PAIR

function flipBack() {

	addClickEvent();

	var idEtt = document.getElementById(turnedID[0]);
	var idTva = document.getElementById(turnedID[1]);

	idEtt.classList.remove('flip');
	idTva.classList.remove('flip');
	turnedID = [];
	turnedCardsArray = [];
}

//RESETS VALUES AFTER ROUND

function reset() {
	turnedID = [];
	turnedCardsArray = [];
}

//REPLAY BUTTON DESKTOP
var replay = document.querySelector('.board');

replay.addEventListener('click', function() {
	var container = document.querySelector('.memory-container');
	container.innerHTML = '';
	reset();
	newDeck();
});

//REPLAY BUTTON MOBILE DEVICE
var replay2 = document.querySelector('.boardunder');

replay2.addEventListener('click', function() {
	var container = document.querySelector('.memory-container');
	container.innerHTML = '';
	reset();
	newDeck();
});
