//VARIABLES

var memoryArray = [
  'images/apa.svg',
  'images/elefant.svg',
  'images/gris.svg',
  'images/hund.svg',
  'images/panda.svg',
  'images/rav.svg',
  'images/tiger.svg',
  'images/zebra.svg',
  'images/apa.svg',
  'images/elefant.svg',
  'images/gris.svg',
  'images/hund.svg',
  'images/panda.svg',
  'images/rav.svg',
  'images/tiger.svg',
  'images/zebra.svg'
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

//NEW DECK FUNCTION

function newDeck() {

  memoryArray.shuffle();

  var count = 0;

  for (var i = 0; i < memoryArray.length; i++ ) {
    var createCard = document.createElement('div');
    document.querySelector('.memory-container').appendChild(createCard);
    createCard.classList.add('back');
    createCard.textContent = memoryArray[i];
    createCard.id = count + 1;
    count++;
  }
}

newDeck(); //CALL NEW DECK FUNCTION

//TURN CARDS ON CLICK

var card = document.querySelectorAll('.back');

card.forEach(function(name) {


  name.addEventListener('click', function(variable) {
    console.log(turnedCardsArray);





  var getImageUrl = turnedCardsArray.includes(name.textContent);

  name.style.background = '#F4F1DE url("' + name.textContent + '") center no-repeat';
  name.style.backgroundSize = '70%';
  turnedID.push(name.id);
  turnedCardsArray.push(name.textContent);


  if (turnedCardsArray.length > 1) {

    if (turnedCardsArray[0] === turnedCardsArray[1]) {
      reset();
      countTurned += 2;
      if (countTurned === memoryArray.length) {
          alert('Grattis');
          var container = document.querySelector('.memory-container');
          container.innerHTML = '';
          newDeck();

      }

    } else {

        setTimeout(tillbaka, 1000);
    }

  }
  });

});
//FUNCTION TO UPDATE GLOBAL VARIABLE "COUNTTURNED" FROM EVENT LISTENER CALLBACK



function tillbaka() {

  var idEtt = document.getElementById(turnedID[0]);
  var idTva = document.getElementById(turnedID[1]);


  idEtt.style.background = 'url("images/baksida.jpg")';
  idTva.style.background = 'url("images/baksida.jpg")';
  turnedID = [];
  turnedCardsArray = [];
}


function reset() {
  turnedID = [];
  turnedCardsArray = [];
}

var replay = document.querySelector('.board');

replay.addEventListener('click', function() {
  var container = document.querySelector('.memory-container');
  container.innerHTML = '';
  newDeck();
});
