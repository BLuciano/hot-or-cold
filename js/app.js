
$(document).ready(function(){
	var guessNum, secretNum, guesses;

	/*call new game function on load and when clicked*/
	newGame();
	$(".new").click(function(){
		newGame();
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
 
function getRandom(){
	return Math.floor(Math.random() * (100)) + 1;
}


