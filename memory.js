
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
  var card = document.querySelectorAll('.back');

  for (var i = 0; i < card.length; i++) {

    card[i].addEventListener('click', gameFunction, false);

  }
};

//REMOVE CLICK EVENT FROM CARDS

function removeClickEvent() {
  var rcard = document.querySelectorAll('.back');

  for (var i = 0; i < rcard.length; i++) {

    rcard[i].removeEventListener('click', gameFunction, false);

  }
};

//CREATE NEW SHUFFLED BOARD

function newDeck() {

  memoryArray.shuffle();

  var count = 0;

  for (var i = 0; i < memoryArray.length; i++ ) {
    var createCard = document.createElement('div');
    document.querySelector('.memory-container').appendChild(createCard);
    createCard.classList.add('back');
    createCard.textContent = memoryArray[i]; //SET IMAGE URL AS TEXTCONTENT (HIDDEN WITH CSS).
    createCard.id = count + 1;
    count++;
  }
  addClickEvent();
}

newDeck(); //CALL NEWDECK FUNCTION WHEN PAGE LOADS

//

function gameFunction(event) {
	//FLIP CARDS ON CLICK
  var brick = event.target;
  brick.style.background = '#F4F1DE url("' + brick.textContent + '") center no-repeat'; //USE TEXT CONTENT OF CLICKED CARD TO SHOW ANIMALS WHEN FLIPPED
  brick.style.backgroundSize = '70%';
	//PUSH FLIPPED CARD ID AND IMAGE URL TO NEW ARRAY
  turnedID.push(brick.id);
  turnedCardsArray.push(brick.textContent);

  if (turnedCardsArray.length === 1) {
		var removeListener1 = document.getElementById(turnedID[0]);
		var removeListener2 = document.getElementById(turnedID[1]);
		removeListener1.removeEventListener('click', gameFunction, false);

	}
  if (turnedCardsArray.length > 1) {
		removeClickEvent();
    if (turnedCardsArray[0] === turnedCardsArray[1]) {
      reset();
      countTurned += 2;
			addClickEvent();
      console.log(memoryArray.length);
      if (countTurned === memoryArray.length) {
          alert('Grattis');
          var container = document.querySelector('.memory-container');
          container.innerHTML = '';
          newDeck();
      }

			removeListener1.removeEventListener('click', gameFunction, false);
      removeListener2.removeEventListener('click', gameFunction, false);

    } else {
				setTimeout(flipBack, 1000);
    }
  }
};

//FLIP CARDS BACK IF NO PAIR

function flipBack() {

//	var addListener1 = document.getElementById(turnedID[0]);
//	addListener1.addEventListener('click', gameFunction, false);
	addClickEvent();
  var idEtt = document.getElementById(turnedID[0]);
  var idTva = document.getElementById(turnedID[1]);

  idEtt.style.background = 'url("images/baksida.jpg")';
  idTva.style.background = 'url("images/baksida.jpg")';
  turnedID = [];
  turnedCardsArray = [];
}

//RESETS VALUES AFTER ROUND

function reset() {
  turnedID = [];
  turnedCardsArray = [];
}

//REPLAY BUTTON

var replay = document.querySelector('.board');

replay.addEventListener('click', function() {
  var container = document.querySelector('.memory-container');
  container.innerHTML = '';
  reset();
  newDeck();
});
