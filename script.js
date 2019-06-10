const cards = document.querySelectorAll(".card");

const gameLenght = cards.length;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let delay = 1200;
let gameResult = 0;
let successfullyGuesses = 0;

cards.forEach(card => card.addEventListener("click", flipCard));

(function shuffle() {
  cards.forEach(card => {
    let randomNumber = Math.floor(Math.random() * gameLenght);
    card.style.order = randomNumber;
  });
})();

function flipCard() {
  if (lockBoard) return;
  if (firstCard === this) return;

  this.classList.add("selected");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
  } else {
    hasFlippedCard = false;
    secondCard = this;

    checkForMatch();
  }
}

function checkForMatch() {
  firstCard.dataset.color === secondCard.dataset.color
    ? disableCards()
    : unflipCards();
    gameResult++;
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  makeMatched();
}

function makeMatched() {
  lockBoard = true;
  setTimeout(() => {
    const selected = document.querySelectorAll(".selected");
    selected.forEach(card => {
      card.classList.replace("selected", "matched");
      resetBoard();
    });

    if (++successfullyGuesses === gameLenght / 2) {
      endGame();
    }
  }, delay);
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("selected");
    secondCard.classList.remove("selected");
    resetBoard();
  }, delay);
}

function endGame() {
  setTimeout(() => {
    if (
      confirm(`Congrats, you needed ${gameResult} guesses. One More Time?`)
    ) {
      location.reload();
    }
  }, delay);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}
