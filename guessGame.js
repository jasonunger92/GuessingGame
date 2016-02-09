/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

var playersGuess,
winningNumber,
numGuessesLeft = 5,
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
  showLastGuess();
}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(){
  if (playersGuess > winningNumber) {
    return "high";
  } else {
    return "low";
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
    $("h3#info").addClass("winning");
    $("#helper").hide();
    $("body").addClass("winner");
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
  var numHints = numGuessesLeft*2;
  var hintArray = [];
  var hintString = "";
  for(var i = 0; i < numHints - 2; i++) {
    hintArray[i] = Math.floor(Math.random()*100+1);
  };
  hintArray.splice(Math.floor(Math.random()*(hintArray.length-1)+1),0,winningNumber);
  hintString = hintArray.join(", ");
  $("#helper").html("Possible Answers:<br>" + hintString);
}

// Allow the "Player" to Play Again

function playAgain(){
  generateWinningNumber();
  prevGuesses = [];
  numGuessesLeft = 5;
  $("#helper").html("You have " + numGuessesLeft + " more guesses!").show()
  $("#info").hide();
  $("#lastGuess").hide();
  $("body").removeClass("winner");
  $("h3#info").removeClass("winning");
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
  if (numGuessesLeft >= 0) {
    var direction = lowerOrHigher();
    var absolute = Math.abs(playersGuess - winningNumber);
    var distance = "";
    if (absolute > 20) {
      distance = "<span class=\"freezing\" style=\"color:#86C7FF\">Freezing</span>";
    } else if (absolute > 10) {
      distance = "<span class=\"cold\" style=\"color:#1D7EFF\">Cold</span>";
    } else if (absolute < 5) {
      distance = "<span class=\"hot\" style=\"color:#DC0000\">Hot</span>";
    } else {
      distance = "<span class=\"warm\" style=\"color:#FF7A15\">Warm</span>";
    };
    $("#info").html("Your Guess is <strong>" + direction.toUpperCase() + "</strong> and <strong>" + distance.toUpperCase() + "</strong>").show();
  } else {
    $("#info").html("Sorry! The number was " + winningNumber).show();
  };
}

function showLastGuess() {
  if (prevGuesses.length > 0) {
    $('#lastGuess').html("Your last guess was: " + prevGuesses[prevGuesses.length - 1]).show();
  };
}


/* **** Event Listeners/Handlers ****  */
$(document).ready(function() {
  $('.main').on('click','#submit',playersGuessSubmission);
  $('.main').on('keypress', '#guess', function() {
    if (event.keyCode === 13) {
      playersGuessSubmission();
    };
  })

});