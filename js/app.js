

// Shuffle function from http://stackoverflow.com/a/2450976
// I got the idea of startGame function from https://www.youtube.com/watch?v=G8J13lmApkQ with many changes to be appropriate with my code
// I understand the whole idea of Timer function from https://www.youtube.com/watch?v=jRhB1IG7uAw

/** 
 * The array that store the icons
 */
const cards = ["fa fa-diamond", "fa fa-diamond",
    "fa fa-paper-plane-o", "fa fa-paper-plane-o",
    "fa fa-anchor", "fa fa-anchor",
    "fa fa-bolt", "fa fa-bolt",
    "fa fa-cube", "fa fa-cube",
    "fa fa-leaf", "fa fa-leaf",
    "fa fa-bicycle", "fa fa-bicycle",
    "fa fa-bomb", "fa fa-bomb"];

/**
 * The container of the cards 
 */
const cardContainer = document.querySelector(" .deck");


/**
 * Array to store opened cards 
 */
let openCards = [];
let openCardsCounter = [];
shuffle(cards);

/**
 * To Create the cards and append it to the container 
 */
function startGame() {
    for (let i = 0; i < cards.length; i++) {
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = `<i class="${cards[i]}"></i>`;
        cardContainer.appendChild(card);

        clickedCard(card);
    }
}

/**
 * to create click event listener to the cards 
 */
function clickedCard(card) {
    card.addEventListener("click", function () {
        counter++;
        const card1 = openCards[0];
        const card2 = this;
        startTimer();
        if (openCards.length === 1) {
            card.classList.add("open", "show", "disabled");
            openCards.push(this);
            compareCards(card1, card2);
        } else {
            card.classList.add("open", "show", "disabled");
            openCards.push(this);
        }
    });
}

/**
 * Function thats check if the cards are match 
 */
function compareCards(card1, card2) {
    if (card2.innerHTML === card1.innerHTML) {
        card2.classList.add("match");
        card1.classList.add("match");
        openCardsCounter.push(card2, card1);
        openCards = [];

        //If it's game over
        gameOver();

    } else {
        openCards = [];
        setTimeout(function () {
            card2.classList.remove("open", "show", "disabled");
            card1.classList.remove("open", "show", "disabled");
        }, 400);
    }
    move();
}

/**
 * The counter of movements
 */
let moves = 0;
let moveNum = document.querySelector(" .moves")
function move() {
    moves++;
    moveNum.textContent = moves;
    // call rating function to change stars according to the moves value
    rating();
}

/**
 * Create rating stars
 */
const star1 = document.getElementById("star1");
const star2 = document.getElementById("star2");
// variables for star that appears into congratulations modal
const winStar1 = document.getElementById("winStar1");
const winStar2 = document.getElementById("winStar2");
function rating() {
    switch (moves) {
        case 18:
            star1.classList.add("hide");
            winStar1.classList.add("hideWinStar");
            break;
        case 25:
            star2.classList.add("hide");
            winStar2.classList.add("hideWinStar");
            break;
    }
}


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/**
 * Create the timer 
 */
const timer = document.querySelector(" .timer");
let watch = new Timer(timer);
function Timer(element) {
    let time = 0;
    let interval;
    let offset;
    function update() {
        if (this.isOn) {
            time += delta();
        }
        let formattedTime = timeFormatted(time);
        element.textContent = formattedTime;
    }
    function delta() {
        let now = Date.now();
        let timePassed = now - offset;
        offset = now;
        return timePassed;
    }
    function timeFormatted(timeInMilliseconds) {
        let time = new Date(timeInMilliseconds);
        let minutes = time.getMinutes().toString();
        let seconds = time.getSeconds().toString();
        let milliseconds = time.getMilliseconds().toString();
        if (minutes.length < 2) {
            minutes = '0' + minutes;
        }
        if (seconds.length < 2) {
            seconds = '0' + seconds;
        }
        while (milliseconds.length < 3) {
            milliseconds = '0' + milliseconds;
        }
        return minutes + ' : ' + seconds + ' : ' + milliseconds;
    }
    this.isOn = false;
    this.start = function () {
        if (!this.isOn) {
            interval = setInterval(update.bind(this), 10);
            offset = Date.now();
            this.isOn = true;
        }
    };
    this.stop = function () {
        if (this.isOn) {
            clearInterval(interval);
            interval = null;
            this.isOn = false;
        }
    };
    this.reset = function () {
        time = 0;
        update();
    }
};

/**
 * function that start the timer accourding to the counter value 
 */
let counter = 0;
function startTimer() {
    if (counter === 1) {
        watch.start();
    }
}

/**
 * If want to restart the game
 */
const reset = document.querySelector(" .restart");
reset.addEventListener("click", function () {
    cardContainer.innerHTML = "";
    startGame();
    openCards = [];
    openCardsCounter = [];
    moveNum.textContent = 0;
    moves = 0;
    counter = 0;
    watch.stop();
    watch.reset();
    star1.classList.remove("hide");
    star2.classList.remove("hide");
    winStar1.classList.remove("hideWinStar");
    winStar2.classList.remove("hideWinStar");
    shuffle(cards);
})

/**
 * If the game is over 
 */
const modal = document.getElementById("modal");
const playAgain = document.getElementById("playAgain");
const playInfo = document.getElementById("play-info");
const lastTime = document.getElementById("timer");
function gameOver() {
    if (openCardsCounter.length === cards.length) {
        setTimeout(function () {
            let currentTime = lastTime.textContent;
            watch.stop();
            modal.style.display = "block";
            playInfo.textContent = "You took " + currentTime + "  time to win ";
            playAgain.onclick = function () {
                modal.style.display = "none";
                cardContainer.innerHTML = "";
                startGame();
                openCardsCounter = [];
                moveNum.textContent = 0;
                moves = 0;
                counter = 0;
                watch.stop();
                watch.reset();
                star1.classList.remove("hide");
                star2.classList.remove("hide");                
                winStar1.classList.remove("hideWinStar");
                winStar2.classList.remove("hideWinStar");
                shuffle(cards);
            }

        }, 1000);
    }
}

//call the startGame function 
startGame();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
