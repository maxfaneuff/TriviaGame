//Trivia game JS//

var questionTimer;
var nextQuestion;
var questions = ["Who does Chappelle play in the Player Haters Ball?", "What do the five fingers say to the face?", "Who chooses Tiger Woods in the Racial Draft?", 
"Is pimpin easy?", "What is the official beer of the show?"];
var options = {
	one: ["Beautiful", "Buc Nasty", "Pit Bull", "Silky Johnson"],
	two: ["Byaaah!", "Slap!", "Kapow!", "Booh-Yah!"],
	three: ["The Black Delegation", "The Jewish Delegation", "The White Delegation", "The Asian Delegation"],
	four: ["Yeah", "Hell Yeah", "Nah", "Big Daddy Kane would say Pimpin Ain't Easy"],
	five: ["Coors Light", "Samuel Adams", "Pabst Blue Ribbon", "Samuel Jackson"],
};
var isStarted = true;
var isClicked = false;
var answerChoice = "";
var rightAnswers = [];
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var timerClock = 30


function count() {
	questionTimer--;


}

function askQuestion() {
	setInterval(count, 1000);

	for (var i = 0; i < questions.length; i++){

		$("#question").text(questions[i]);


	}

}


if ((isStarted === true) || (nextQuestion === 0)) {
	askQuestion();
}

$("#title").on("click", function () {
	alert("js link works");
})