let cards = document.querySelectorAll(".memory-card");
let count = cards.length;
let arr = [];
let lockboard = false;
let moves=0;
let endTime;
let startTime = Date.now();


(function shuffleCards() {
    //turn nodelist to array for array operations
    //we cannot chnage positions of item in nodelist
    let cardsArray = Array.from(cards);
    let container = document.querySelector(".memory-board");
    for (let i = cardsArray.length - 1; i > 0; i--) {
        let randIndex = Math.floor(Math.random() * (i + 1));
        let temp = cardsArray[i];
        cardsArray[i] = cardsArray[randIndex];
        cardsArray[randIndex] = temp;
    }
    for (let i = 0; i < cardsArray.length; i++) {
        container.appendChild(cardsArray[i]);
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

}

function unflip(firstCard, secondCard) {
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        lockboard = false;
    }, 1000);
}

function checkCards(firstCard, secondCard) {
    lockboard = true;
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        count=count-2;
        if(count==0){
            endTime= Date.now();
            let elapsedTime= (endTime-startTime)/1000;
            let minutes= Math.floor(elapsedTime / 60);
            let seconds= Math.floor(elapsedTime % 60);
            const result= document.querySelector(".result");
            result.innerText= `Moves:${moves}  Time taken:${minutes}:${seconds} (m:s)`;
            result.classList.add("finalResult");
        }
        disableListeners(firstCard, secondCard);
    }
    else {
        unflip(firstCard, secondCard);
    }

}

for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", flipcard)
}