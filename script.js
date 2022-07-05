'use strict';

// state
let playing = true;

// select dice
const domDice = document.querySelector('.dice');

// select action btn
const domBtnNew = document.querySelector('.btn--new');
const domBtnRoll = document.querySelector('.btn--roll');
const domBtnHold = document.querySelector('.btn--hold');

// current status
let current = 0;
let currentPlayer = 0;
const scores = [0, 0];

// custom functions
const switchPlayer = function () {
  current = 0;
  getPlayer(currentPlayer, 'current').textContent = current;
  getPlayer(currentPlayer, 'player').classList.toggle('player--active');
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  getPlayer(currentPlayer, 'player').classList.toggle('player--active');
  return currentPlayer;
};

const getPlayer = function (player, type) {
  switch (type) {
    case 'current':
      return document.getElementById(`current--${player}`);
    case 'player':
      return document.querySelector(`.player--${player}`);
    case 'score':
      return document.getElementById(`score--${player}`);
    default:
      return 0;
  }
};

const endGame = function () {
  playing = false;
  getPlayer(currentPlayer, 'player').classList.add('player--winner');
  getPlayer(currentPlayer, 'player').classList.remove('player--active');
  current = 0;
  getPlayer(currentPlayer, 'current').textContent = current;
  domDice.classList.add('hidden');
};

// starting condition
getPlayer(0, 'score').textContent = 0;
getPlayer(1, 'score').textContent = 0;
domDice.classList.add('hidden');

// Rolling function
domBtnRoll.addEventListener('click', function () {
  if (playing) {
    // generate random number
    let dice = Math.trunc(Math.random() * 6) + 1;
    // display dice
    domDice.classList.remove('hidden');
    domDice.src = `dice-${dice}.png`;
    // check dice and add score
    if (dice !== 1) {
      current += dice;
      getPlayer(currentPlayer, 'current').textContent = current;
    } else {
      switchPlayer();
    }
  }
});

domBtnHold.addEventListener('click', function () {
  if (playing) {
    scores[currentPlayer] += current;
    getPlayer(currentPlayer, 'score').textContent = scores[currentPlayer];
    // win
    if (scores[currentPlayer] >= 20) {
      endGame();
    } else {
      switchPlayer();
    }
  }
});

domBtnNew.addEventListener('click', function () {
  playing = true;
  if (getPlayer(currentPlayer, 'player').classList.contains('player--active')) {
    getPlayer(currentPlayer, 'player').classList.remove('player--active');
  }
  getPlayer(0, 'player').classList.add('player--active');
  for (let i = 0; i < scores.length; i++) {
    scores[i] = 0;
    getPlayer(i, 'score').textContent = 0;

    current = 0;
    getPlayer(i, 'current').textContent = 0;

    if (
      getPlayer(currentPlayer, 'player').classList.contains('player--winner')
    ) {
      getPlayer(currentPlayer, 'player').classList.remove('player--winner');
    }
  }
  currentPlayer = 0;
});
