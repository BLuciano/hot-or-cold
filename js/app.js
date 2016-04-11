
$(document).ready(function(){
	var guessNum, secretNum, guesses;

	/*call new game function on load and when clicked*/
	newGame();
	$(".new").click(function(){
		newGame();
	});

	//Grabs user input, checks to see if valid and continues with game.
	$("#guessButton").click(function(e){
		e.preventDefault();
		var $userGuess = $("#userGuess").val();
		$("#userGuess").val("");
		
		if($userGuess === "" || !isValid(+$userGuess)){
			$("#feedback").text("Enter a number from 0 to 100");
		 	return;
		}

		/*Round guess to avoid repetition, ex 1.0 and 1 
		would yield two different results*/ 
		$userGuess = Math.round($userGuess); 
		//If guess is not repeated cont game and update view.
		if(!isRepeated($userGuess, guesses)){
			updateStage($userGuess);

			if($userGuess === secretNum){
				$("#feedback").text("You won!!! Click new game to play again!");
				$("#guessButton").css("visibility", "hidden");
			} else {
				isHotOrCold($userGuess, secretNum);
			}
		} else {
			$("#feedback").text($userGuess + " was already chosen!");
			return;
		}
	});

	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);
  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

  	/*Starts a new game and resets previous stats*/
  	function newGame(){
  		guessNum = 0;	
		secretNum = getRandom();
		guesses = [];
		$("#guessButton").css("visibility", "visible");
		$("#feedback").text("Make your Guess!");
		$("#count").text(0);
		$("#guessList").html("");
	}

	//Updates the game with the latest guess results.
	function updateStage(guess){
		guessNum++;
		guesses.push(guess);
		$("#guessList").append("<li>" + guess + "</li>");
		$("#count").text(guessNum);
	}
});
 
//Random number from 0 to 100
function getRandom(){
	return Math.floor(Math.random() * 101);
}

//Check user input and return if its valid or not
function isValid(num){
	if(isNaN(num) || num > 100 || num < 0 || num % 1 !== 0){
		return false;
	}
	return true;
}

//Check to see if current guess wasn't chosen already
function isRepeated(guess, guesses){
	for(var i = 0; i < guesses.length; i++){
		if(guess === guesses[i]){
			return true;
		}
	}
}

//Check to see how hot or cold the guess is
function isHotOrCold(guess, toGuess){
	var diff;
	if(guess > toGuess){
		diff = guess - toGuess;
	} else {
		diff = toGuess - guess;
	}
	console.log(guess, toGuess, diff);
	switch (true){
		case (diff > 50):
			$("#feedback").text("REAAALLY COLD!");
			break;
		case (diff >= 30):
			$("#feedback").text("COLD");
			break;
		case (diff >= 20):
			$("#feedback").text("GETTING WARM");
			break;
		case (diff >= 10):
			$("#feedback").text("HOT!");
			break;
		case (diff >= 0):
			$("#feedback").text("VERY HOT!!!");
			break;
	}
}


