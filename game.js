var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

var started = false;

//To start the game you need to press on any key.
//The value of started is negated to true, then the if statement gets executed.
$(document).keypress(function() {
  if (!started) {

    //The text of the h1 is changed to the current level
    $("#level-title").text("Level " + level);

    //Function gets called to show the new random color in the game and increase the level.
    nextSequence();

    //The value of started is then set to true, so the if statement does not get executed again.
    started = true;
  }

});

//Randomly chosen color button got flashed, so now the player needs to click a color button.
//When a color button gots clicked, an anonymous function gets executed.
$(".btn").click(function() {

  //To get the id of the button that the player chose.
  var userChosenColor = $(this).attr("id");

  //The chosen color gets added to the userClickedPattern array.
  userClickedPattern.push(userChosenColor);

  //The sound of the chosen color gets played.
  playSound(userChosenColor);

  //Function that creates the shadow when you press on a color button.
  animatePress(userChosenColor);

  //Checks answer and takes the level as input.
  //Level is the last element of the userClickedPattern array, which is the length -1.
  checkAnswer(userClickedPattern.length-1);
});



function nextSequence() {

  //Level gets increased imediately after key press event gets triggered.
  level++;

  //Text of h1 is changed to the current level.
  $("#level-title").text("Level " + level);

  //Random number is generated in range 0 - 4.
  var randomNumber = Math.floor(Math.random() * 4);

  //Random color is chosen in the buttonColors array at the index of the random number.
  var randomChosenColor = buttonColors[randomNumber];

  //Every time a color gets chosen, the color gets added to the gamePattern array.
  gamePattern.push(randomChosenColor);

  //The random color gets flashed.
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

  //The corresponding sound of the color gets played
  playSound(randomChosenColor);

  //Resets the userClickedPattern, so the player needs to remember all the buttons again and press them.
  //CheckAnswer function only works if the userClickedPattern is emptied, because the player needs to press all the colors from start again.
  userClickedPattern = [];
  
}

function checkAnswer(currentLevel) {

  //If the last element in the userClickedPattern array is the same as the last one in gamePattern array, then console log 'succes'.
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    //If the last element in the arrays are the same, then check if the length of the arrays are the same.
    if (userClickedPattern.length === gamePattern.length){

      //If so, call nextSequence after 1000ms to get the next random color in the array to flash.
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  } else {

    //If not, add the game-over class, which sets the background to red.
    console.log("wrong");

    $("body").addClass("game-over");

    //Remove the class after 200 ms.
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    //Change the h1 text.
    $("#level-title").text("Game Over, Press Any Key to Restart");
    
    startOver();
  }
}

function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play(); 
}

//Takes as input the color chosen by the player.
function animatePress(currentColor) {

  //Selects the id of the chosen color and adds the pressed class 
  //to create a shadow flash effect when a user clicks on the button
  $("#" + currentColor).addClass("pressed");

  //Removes the pressed class after 100 ms.
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//Resets everything to start over.
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}












