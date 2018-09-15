"use strict";

var cards = document.querySelectorAll(".memory-card");
var count = cards.length;
var arr = [];
var lockboard = false;
var moves = 0;
var endTime;
var startTime = Date.now();

(function shuffleCards() {
  //turn nodelist to array for array operations
  //we cannot chnage positions of item in nodelist
  var cardsArray = Array.from(cards);
  var container = document.querySelector(".memory-board");

  for (var i = cardsArray.length - 1; i > 0; i--) {
    var randIndex = Math.floor(Math.random() * (i + 1));
    var temp = cardsArray[i];
    cardsArray[i] = cardsArray[randIndex];
    cardsArray[randIndex] = temp;
  }

  for (var _i = 0; _i < cardsArray.length; _i++) {
    container.appendChild(cardsArray[_i]);
  }
})();

function flipcard() {
  if (lockboard) return;
  moves++;
  this.classList.toggle("flip");
  arr.push(this);

  if (arr[1] && arr[0] === arr[1]) {
    arr.length = 0;
  }

  if (arr.length == 2 && arr[0] !== arr[1]) {
    checkCards(arr[0], arr[1]);
    arr.length = 0;
    return;
  }
}

function disableListeners(firstCard, secondCard) {
  firstCard.removeEventListener("click", flipcard);
  secondCard.removeEventListener("click", flipcard);
  lockboard = false;
} //500s delay to slow down boder
//or else border applies when the 2nd matched
//card is immediately turning


function addMatchDesign(first, second) {
  setTimeout(function () {
    first.firstElementChild.style.border = "4px solid green";
    second.firstElementChild.style.border = "4px solid green";
  }, 500);
}

function unflip(firstCard, secondCard) {
  setTimeout(function () {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    lockboard = false;
  }, 1000);
}

function checkCards(firstCard, secondCard) {
  lockboard = true;

  if (firstCard.dataset.framework === secondCard.dataset.framework) {
    count = count - 2;

    if (count == 0) {
      endTime = Date.now();
      var elapsedTime = (endTime - startTime) / 1000;
      var minutes = Math.floor(elapsedTime / 60);
      var seconds = Math.floor(elapsedTime % 60);

      if (seconds < 10) {
        seconds = "0" + seconds;
      }

      var result = document.querySelector(".result");
      result.innerText = "Moves:".concat(moves, "  Time taken:").concat(minutes, ":").concat(seconds, " (m:s)");
      result.classList.add("finalResult");
    }

    disableListeners(firstCard, secondCard);
    addMatchDesign(firstCard, secondCard);
  } else {
    unflip(firstCard, secondCard);
  }
}

for (var i = 0; i < cards.length; i++) {
  cards[i].addEventListener("click", flipcard);
}
