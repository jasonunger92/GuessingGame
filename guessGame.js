/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

var playersGuess,
    winningNumber,
    numGuessesLeft = 10,
    prevGuesses = [];



/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
  winningNumber = Math.floor(Math.random() * 100 + 1);
}

// Fetch the Players Guess

function playersGuessSubmission(){
  playersGuess = +document.getElementById("guess").value || null;
  document.getElementById("guess").value = "";
  guessesLeft();
  prevGuesses.push(playersGuess);
  checkGuess();
}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(){
  if (playersGuess > winningNumber) {
    return "higher";
  } else {
    return "lower";
  };
}

// Check if the Player's Guess is the winning number 

function checkGuess(){
  if (playersGuess === null || playersGuess < 1 || playersGuess > 100 || isNaN(playersGuess)) {
    $("#info").html("Please enter a valid number").show();
    prevGuesses.pop();
    numGuessesLeft++;
    $("#helper").html("You have " + numGuessesLeft + " more guesses!").show()
  } else if (playersGuess === winningNumber) {
    $("#info").html("You guessed the number!".toUpperCase()).show();
    $("#helper").hide();
  } else if (checkDuplicate() === true) {
    $("#info").html("You guessed that number already...").show();
    prevGuesses.pop();
    numGuessesLeft++;
    $("#helper").html("You have " + numGuessesLeft + " more guesses!").show()
  } else {
    guessMessage();
  };
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
  var fake1 = Math.floor(Math.random() * 100 + 1);
  var fake2 = Math.floor(Math.random() * 100 + 1);
  
}

// Allow the "Player" to Play Again

function playAgain(){
  generateWinningNumber();
  prevGuesses = [];
  numGuessesLeft = 10;
  $("#helper").html("You have " + numGuessesLeft + " more guesses!").show()
  $("#info").hide();
}

function guessesLeft() {
  numGuessesLeft > 2 ? (numGuessesLeft--, $("#helper").html("You have " + numGuessesLeft + " more guesses!").show()) : 2 === numGuessesLeft ? (numGuessesLeft--, $("#helper").html("You have " + numGuessesLeft + " more guess!").show()) : $("#helper").html("Sorry, Play Again!").show()
}

function checkDuplicate() {
  var test = 0;
  for(var i = 0; i < prevGuesses.length-1; i++) {
    if (playersGuess === prevGuesses[i]) {
      test++;
    };
  };
  if (test > 0) {
    return true;
  } else {
    return false;
  };
}

function guessMessage() {
  var direction = lowerOrHigher();
  var absolute = Math.abs(playersGuess - winningNumber);
  var distance = "";
  if (absolute > 20) {
    distance = "more than 20";
  } else if (absolute > 10) {
    distance = "more than 10";
  } else if (absolute < 5) {
    distance = "less than 5";
  } else {
    distance = "less than 10";
  };
  $("#info").html("Your Guess is <strong>" + direction.toUpperCase() + "</strong> and <strong>" + distance.toUpperCase() + "</strong> from the Winning Number").show();
}


/* **** Event Listeners/Handlers ****  */
$(document).ready(function() {
  $('.main').on('click','#submit',playersGuessSubmission);
  $('.main').on('keydown', '#guess', function() {
    if (event.keyCode === 13) {
      playersGuessSubmission();
    };
  })

});