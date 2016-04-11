
$(document).ready(function(){
	var guessNum, secretNum, guesses;

	/*call new game function on load and when clicked*/
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
		
		console.log("valid");
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


