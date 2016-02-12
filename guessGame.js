/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
  winningNumber = Math.floor(Math.random() * 100 + 1);
}

// Fetch the Players Guess

function playersGuessSubmission(){
  playersGuess = +document.getElementById("guess").value || null;
  document.getElementById("guess").value = "";
  prevGuesses.push(playersGuess);
  guessesLeft();
  checkGuess();
  showLastGuess();
}

// Check if the Player's Guess is the winning number 

function checkGuess(){
  if (playersGuess === winningNumber) {
    $("#info").html("You guessed the number!<br><br>It was ".toUpperCase() + winningNumber + "!").show();
    $("#picture").html("<img class=\"pic\" src=\"images/happy_jordan.png\" style=\"width: 400px\">");
    $("#info").addClass("winner");
    gameEnd();
  } else if (playersGuess === null || playersGuess < 1 || playersGuess > 100 || isNaN(playersGuess)) {
    $("#info").html("Please enter a valid number").show();
    reset();
  } else if (checkDuplicate() === true) {
    $("#info").html("You guessed that number already...").show();
    reset();
  } else {
    guessMessage();
  };
}

// Reset guesses after invalid guess

function reset() {
  prevGuesses.pop();
  numGuessesLeft++;
  $("#helper").html("You have " + numGuessesLeft + " more guesses!").show();
}

// Check to see if Player is guessing a number previously guessed

function checkDuplicate() {
  for(var i = 0; i < prevGuesses.length-1; i++) {
    if (playersGuess === prevGuesses[i]) {
      return true;
    };
  };
}

// Inform Player of how they are doing

function guessMessage() {
  if (numGuessesLeft > 0) {
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
    $("#info").addClass("loser");
    $("#info").html("Sorry... The number was ".toLowerCase() + winningNumber).show();
    $("#picture").html("<img class=\"pic\" src=\"images/sad_jordan.png\" style=\"width: 400px\">");
  };
}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(){
  if (playersGuess > winningNumber) {
    return "high";
  } else {
    return "low";
  };
}

// Keep track of guesses remaining

function guessesLeft() {
  if (numGuessesLeft > 2) {
    numGuessesLeft--;
    $("#helper").html("You have " + numGuessesLeft + " more guesses!").show();
  } else if (numGuessesLeft === 2) {
    numGuessesLeft--;
    $("#helper").html("You have " + numGuessesLeft + " more guesses!").show();
  } else {
    numGuessesLeft--;
    $("last-guess").hide();
    gameEnd();
  };
}

// Display the last guess to the Player

function showLastGuess() {
  if (prevGuesses.length > 0 && prevGuesses.length < 5 && playersGuess != winningNumber) {
    $('#last-guess').html("Your last guess was: " + prevGuesses[prevGuesses.length - 1]).show();
  };
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
  if (hintGiven === false) {
    var numHints = numGuessesLeft*2;
    var hintArray = [];
    hintString = "";
    for(var i = 0; i < numHints - 2; i++) {
      hintArray[i] = Math.floor(Math.random()*100+1);
    };
    hintArray.splice(Math.floor(Math.random()*(hintArray.length-1)+1),0,winningNumber);
    hintDuplicate(hintArray);
    hintString = hintArray.join(", ");
    $("#helper").html("Possible Answers:<br>" + hintString);
    hintGiven = true;
    $("#hint-button").html('Reveal Hint');
  } else {
    $("#helper").html("Possible Answers:<br>" + hintString);
  };
}

// Ensure that "hintArray" doesn't contain multiple of the same number

function hintDuplicate (array) {
  for (var i = 0; i < array.length; i++) {
    for (var j = 0; j < array.length; j++) {
      if (array[i] === array[j] && i != j) {
        array[j] = Math.floor(Math.random()*100+1);
      };
    };
  };
}

// Allow the "Player" to Play Again

function playAgain(){
  gameStart();
}

// This will happen when the game ends

function gameEnd() {
  $(".header").hide();
  $("#guess").hide();
  $("#info").show();
  $("#submit").hide();
  $("#last-guess").hide();
  $(".during").hide();
  $(".over").show();
  $("#helper").hide();
  $(".ranging").hide();
}

// Happens on either page load or play again

function gameStart() {
  prevGuesses = [];
  numGuessesLeft = 5;
  hintGiven = false;
  generateWinningNumber();
  $(".header").show();
  $("#guess").show();
  $("#info").hide();
  $("#submit").show();
  $("#last-guess").hide();
  $(".during").show();
  $(".over").hide();
  $("#helper").html("You have " + numGuessesLeft + " more guesses!").show();
  $(".ranging").show();
  $("#picture").html("");
  $("#info").removeClass("winner");
  $("#info").removeClass("loser");
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