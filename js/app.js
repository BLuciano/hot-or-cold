
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
		if(!isRepeated($userGuess, guesses)){
			updateStage($userGuess);
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


