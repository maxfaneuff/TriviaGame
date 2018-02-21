<script>
	//Trivia game JS//

//~~~***BUGS!***~~~//
	//1) Clock doesn't reset back to 10 before counting down again.  It shows the remaining time from the 
	//	 previous question, so questionNum isn't being reset to 10
	//2) When I copy/paste my JS to my app page & comment it out here, I lose all my onClick functionality.
	//	 But my intervals still work, so it is reading my JS from my app page

var questionTimer;
//holds the interval of the question.  when askQuestion runs, start decrementing the interval of this by 1, until it gets to 0.  If it hits zero before anything is clicked, run checkAnswer.  When checkAnswer runs, clearInterval(questionTimer).  Print this to the timer div//
var answerTimer;
//holds the interval of the check answer slate.  When checkAnswer runs, start decrementing this by 1, until it gets to zero.  When it gets to zero, run askQuestion again, questionNum++.  When askQuestion runs, clearInterval(nextQuestion).
var questions = ["Who wins Hater of the Year?", "What do the five fingers say to the face?", "Which delegation chooses Tiger Woods in the Racial Draft?", "Is pimpin easy?", "What is the official beer of the show?"];
//An array of questions.  This gets printed to the question div by incrementing the questionNum by one each time nextQuestion runs.  
var options = [
				["Beautiful", "Buc Nasty", "Pit Bull", "Silky Johnson"], 
				["Byaaah!", "Slap!", "Kapow!", "Booh-Yah!"],
				["The Black Delegation", "The Jewish Delegation", "The White Delegation", "The Asian Delegation"],
				["Yeah", "Hell Yeah", "Nah", "Big Daddy Kane would say Pimpin Ain't Easy"],
				["Coors Light", "Samuel Adams", "Pabst Blue Ribbon", "Samuel Jackson"]
			];
//An array of the options for each question.  Each index of options is it's own array.  We can print these with questionNum, the same way we print questions.  
var gifs = ["https://github.com/maxfaneuff/TriviaGame/blob/master/assets/images/silky.gif?raw=true", "https://github.com/maxfaneuff/TriviaGame/blob/master/assets/images/slap.gif?raw=true", "https://github.com/maxfaneuff/TriviaGame/blob/master/assets/images/tiger.gif?raw=true", "https://github.com/maxfaneuff/TriviaGame/blob/master/assets/images/pimpin.gif?raw=true", "https://github.com/maxfaneuff/TriviaGame/blob/master/assets/images/samuel_jackson.gif?raw=true"];
var isStarted = false;
var isClicked = false;
var answerChoice = [];
var rightAnswers = ["Silky Johnson", "Slap!", "The Black Delegation", "Yeah", "Hell Yeah", "Nah", "Big Daddy Kane would say Pimpin Ain't Easy", "Samuel Jackson"];
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var questionNum = 0;
var questionClock = 10;
var answerClock = 5;

$(document).ready(function() {
	$("#start-screen").show();
	$("#question-screen").hide();
	$("#answer-screen").hide();
	$("#results-screen").hide();
	clearInterval(questionTimer);
})

function newGame() {
	correct = 0;
	incorrect = 0;
	unanswered = 0;
	questionNum = 0;
	questionClock = 10;
	answerClock = 5;
	askQuestion();
}
//When called, askQuestions does the following//
	//clearInterval(answerTimer)
	//hide the #answer-screen section, and show the #question-screen section
	//decrement the timer by 1, as soon as the screen loads
	//print the specific question to #questions, using the questionNum to cycle through.  questions[questionNum]
	//print the options of the corresponding options array to #options, using the same method.  options[questionNum]
	//all of the options have to be INDIVIDUALLY clickable.  Each option needs to assign its corresponding div a value of that option
	//print the timer to the timer div.  Start at 30 seconds
	//When an option is clicked, push the value of that div to the answerChoice string.
	//Check the newly pushed answerChoice string against rightAnswers, to see if answerChoice is an indexOf rightAnswers
	//call checkAnswer, with the value of the selection as the argument
function askQuestion() {
	$("#question-screen").show();
	$("#answer-screen").hide();
	$("#results-screen").hide();
	$("#start-screen").hide();

	resetAnswerTimer();

	questionTimer = setInterval(questionCount, 1000);

//prints the appropriate question & options//
	$("#question").text(questions[questionNum]);
	$("#optionOne").text(options[questionNum][0]);
	$("#optionTwo").text(options[questionNum][1]);
	$("#optionThree").text(options[questionNum][2]);
	$("#optionFour").text(options[questionNum][3]);

//assigns a value of each options div to the corresponding option from the array//
	$("#optionOne").val(options[questionNum][0]);
	$("#optionTwo").val(options[questionNum][1]);
	$("#optionThree").val(options[questionNum][2]);
	$("#optionFour").val(options[questionNum][3]);

}
//grabs the value of a clicked option & enters it into the answerChoice array//
	$(".options").on("click", function() {
		answerChoice.push($(this).val());
		isClicked = true;	
		if(rightAnswers.indexOf(answerChoice.toString()) != -1) {
			rightAnswer();
		} else {
			wrongAnswer();
		}	
	})

	$("#replay").on("click", function() {
		newGame();
	})

	$("#begin").on("click", function() {
		askQuestion();
	})

//When called, checkAnswer does the following//
	//.hide the #question-screen section, and display the #answer-screen section
	//clearInterval(questionTimer)
	//setInterval(answerTimer).  Begin decrementing the timer by 1, starting at :05
	//.empty() the timer, question, and options divs
	//questionNum++
	//if (rightAnswers.indexOf(answerChoice != -1)) - $("#answer-statement").text("You got it right!  YEAAAAAAAAH!").  Correct++
	//if else (rightAnswers.indexOf(answerChoice === -1)) - $("#answer-statement").text("You got it wrong...").  Incorrect++
	//if else (questionTimer === 0) - $("#answer-statement").text("Time's up!  HWHAAAAAAAT?").  Unanswered++
	//for all conditions, display the approrpriate .gif
	//when answerTimer === 0, call askQuestion.  

//function for when an answer is wrong.//
	//displays appropriate text & gif//
	//incorrect++//
	//starts the answer timer//
	//runs resetQuestionTimer(), which clearIntervals(questionTimer), and sets questionClock to 10 again//

function wrongAnswer() {
	$("#question-screen").hide();
	$("#answer-screen").show();
	$("#results-screen").hide();
	$("#start-screen").hide();

	$("#win-lose").text("Sorry, that's incorrect...");
	$("#gif").html("<img src=" + gifs[questionNum] + "alt=gif>");
	
	incorrect++;

	resetQuestionTimer();
	answerTimer = setInterval(answerCount, 1000);
}

function rightAnswer() {
	$("#question-screen").hide();
	$("#answer-screen").show();
	$("#results-screen").hide();
	$("#start-screen").hide();

	$("#win-lose").text("You got it right!  YEAAAAAAAAH");
	$("#gif").html("<img src=" + gifs[questionNum] + "alt=gif>");

	correct++;

	resetQuestionTimer();
	answerTimer = setInterval(answerCount, 1000);
}

function timeout() {
	$("#question-screen").hide();
	$("#answer-screen").show();
	$("#results-screen").hide();
	$("#start-screen").hide();

	$("#win-lose").text("Time's up!  HWHAAAAAAAT?!!");
	$("#gif").html("<img src=" + gifs[questionNum] + "alt=gif>");

	unanswered++;

	resetQuestionTimer();
	answerTimer = setInterval(answerCount, 1000);
}

function answerCount() {
	answerClock--;

	if(answerClock === 0) {
		questionNum++;
			if(questionNum > 4) {
			resultsScreen();
			resetAnswerTimer();
			return;
			}	
		answerChoice.length = 0;
		resetQuestionTimer();
		stopAnswerClock();
		askQuestion();
	}
}

function questionCount() {
	questionClock--;
	
	if(questionClock === 0) {
		stopQuestionClock();
		timeout();
	}
	$("#timer").text("Time Remaining: " + questionClock);
}

function stopQuestionClock() {
	clearInterval(questionTimer);
}

function stopAnswerClock() {
	clearInterval(answerTimer);
}

function resetQuestionTimer() {
	clearInterval(questionTimer);
	questionClock = 10;
	
}

function resetAnswerTimer() {
	clearInterval(answerTimer);
	answerClock = 5;

}

function resultsScreen() {
	$("#results-screen").show();
	$("#question-screen").hide();
	$("#answer-screen").hide();
	$("#start-screen").hide();

	$("#correct-num").text("Correct:  " + correct);
	$("#incorrect-num").text("Incorrect:  " + incorrect);
	$("#unanswered-num").text("Unanswered:  " + unanswered);
	console.log(questionTimer);
	console.log(answerTimer);



}
askQuestion();




</script>
