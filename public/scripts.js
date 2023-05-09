// If you would like to see some examples of similar code to make an interface interact with an API, 
// check out the coin-server example from a previous COMP 426 semester.
// https://github.com/jdmar3/coinserver
// Global variables
const choices = document.querySelectorAll('input[name="choice"]');
const playerChoiceText = document.getElementById('player-choice');
const computerChoiceText = document.getElementById('computer-choice');
const outcomeText = document.getElementById('outcome');
const playButton = document.getElementById('play');
const resetButton = document.getElementById('reset');
const gameContainers = document.querySelectorAll('.game');

// Initialize game state
let game = 'rps';
let opponent = 'human';
let playerChoice;
let computerChoice;
let outcome;

// Functions to handle game logic
function getRandomChoice() {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex].value;
}

function getOutcome(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return 'Tie!';
  } else if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'paper' && computerChoice === 'rock') ||
    (playerChoice === 'scissors' && computerChoice === 'paper') ||
    (playerChoice === 'rock' && computerChoice === 'lizard') ||
    (playerChoice === 'paper' && computerChoice === 'spock') ||
    (playerChoice === 'scissors' && computerChoice === 'lizard') ||
    (playerChoice === 'lizard' && computerChoice === 'spock') ||
    (playerChoice === 'lizard' && computerChoice === 'paper') ||
    (playerChoice === 'spock' && computerChoice === 'rock') ||
    (playerChoice === 'spock' && computerChoice === 'scissors')
  ) {
    return 'You win!';
  } else {
    return 'You lose!';
  }
}

function play() {
  // Get player's choice
  playerChoice = document.querySelector('input[name="choice"]:checked').value;
  playerChoiceText.textContent = playerChoice;
  
  // Get computer's choice
  if (opponent === 'computer') {
    computerChoice = getRandomChoice();
  } else {
    computerChoice = document.querySelector('input[name="choice"]:checked').value;
  }
  computerChoiceText.textContent = computerChoice;
  
  // Determine outcome
  outcome = getOutcome(playerChoice, computerChoice);
  outcomeText.textContent = outcome;
}

function reset() {
  // Reset game state
  playerChoice = null;
  computerChoice = null;
  outcome = null;
  playerChoiceText.textContent = '';
  computerChoiceText.textContent = '';
  outcomeText.textContent = '';
  
  // Reset choices
  choices.forEach(choice => {
    choice.checked = choice.defaultChecked;
  });
}

function showGame(gameToShow) {
  gameContainers.forEach(container => {
    if (container.classList.contains(gameToShow)) {
      container.style.display = 'block';
    } else {
      container.style.display = 'none';
    }
  });
}

// Add event listeners
playButton.addEventListener('click', play);
resetButton.addEventListener('click', reset);
document.querySelectorAll('input[name="game"]').forEach(radio => {
  radio.addEventListener('change', () => {
    game = radio.value;
    showGame(game);
    reset();
  });
});
document.querySelectorAll('input[name="opponent"]').forEach(radio => {
  radio.addEventListener('change', () => {
    opponent = radio.value;
    reset();
  });
});

// Show initial game
showGame(game);