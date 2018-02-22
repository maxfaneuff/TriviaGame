var questionTimer;
var answerTimer;
var questions = ["Who wins Hater of the Year?", "What do the five fingers say to the face?", "Which delegation chooses Tiger Woods in the Racial Draft?", "Is pimpin easy?", "What is the official beer of the show?"];
var options = [
				["Beautiful", "Buc Nasty", "Pit Bull", "Silky Johnson"], 
				["Byaaah!", "Slap!", "Kapow!", "Booh-Yah!"],
				["The Black Delegation", "The Jewish Delegation", "The White Delegation", "The Asian Delegation"],
				["Yeah", "Hell Yeah", "Nah", "Big Daddy Kane would say Pimpin Ain't Easy"],
				["Coors Light", "Samuel Adams", "Pabst Blue Ribbon", "Samuel Jackson"]
			];
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
	$("#begin").on("click", function() {
		askQuestion();
	})
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

function askQuestion() {
	$("#question-screen").show();
	$("#answer-screen").hide();
	$("#results-screen").hide();
	$("#start-screen").hide();

	resetAnswerTimer();

	questionTimer = setInterval(questionCount, 1000);

	$("#question").text(questions[questionNum]);
	$("#optionOne").text(options[questionNum][0]);
	$("#optionTwo").text(options[questionNum][1]);
	$("#optionThree").text(options[questionNum][2]);
	$("#optionFour").text(options[questionNum][3]);

	$("#optionOne").val(options[questionNum][0]);
	$("#optionTwo").val(options[questionNum][1]);
	$("#optionThree").val(options[questionNum][2]);
	$("#optionFour").val(options[questionNum][3]);

}

	

	


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
	questionClock = 10;
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
