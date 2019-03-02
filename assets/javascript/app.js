'use strict'
var debug = true;

//timers
var global_thirty_second_timeout, global_one_second_interval;

var global_timeRemaining = 30;

var TriviaGame = {

    questionNumber: 0
    ,playerAnswers : []
    ,currentQuestion:[]
    ,numberOfCorrectAnswers: 0
    ,numberOfMistakes: 0
    ,gameOver: false
    ,questions : [
        {
            question: "Who is the Prime Minister of Canada"
            ,choices: ["Pierre Trudeau", "Justin TimberLake", "Justin Trudeau", "Stephen Harper "]
            ,correctAnswer: 2
        }
        ,{
            question: "Which country lies on the southern border of Canada"
            ,choices: ["Mexico", "USA", "Russia", "Alaska"]
            ,correctAnswer: 1
        }
        ,{
            question: "What is the Raptors"
            ,choices: ["baseball team", "football team", "soccer team", "basketball team"]
            ,correctAnswer: 3
        }
    ]
    ,initialize : function() {
        if(debug){console.log("TriviaGame: initialize")};
        this.playerAnswers = [];
        this.questionNumber = 0;
        this.numberOfCorrectAnswers = 0;
        this.numberOfMistakes = 0;
    }
    ,getTheNextQuestion: function(){
        this.currentQuestion = this.questions[this.questionNumber];
        if(debug){console.log("TriviaGame: getTheCurrentQuestion ", this.currentQuestion);};
        this.questionNumber++;
    }    
    ,saveMyAnswer: function(myAnswer) {
        this.playerAnswers.push(myAnswer);
        if(debug){console.log("TriviaGame: saveMyAnswer "), this.playerAnswers};
    }
    ,getTotalNumberOfQuestions(){
        if(debug){console.log("TriviaGame: getTotalNumberOfQuestions ", this.questions.length,);};
        return this.questions.length;
    }
}

//  DISPPLAY THE QUESTION AND START THE CLOCK------------------------------------------

function askAQuestion() {
    if(debug){console.log("function: askAQuestion");}
    //get a question
    TriviaGame.getTheNextQuestion();
    //post the question

    // check that question is not 'undefined'
    if(TriviaGame.currentQuestion===undefined){
        if(debug){console.log("The question is undefined... meaning we already answered the last.")}
        gameOver();
        return false;
    }
    
    postTheCurrentQuestion();
    //start a 30 second timer
    startTheTimer();


}

function postTheCurrentQuestion() {
    if(debug) {console.log("function: postTheQuestion ",TriviaGame.currentQuestion);}
    clearThePreviousSelection();
    $("#question").text(TriviaGame.currentQuestion.question)
    $("#option0").text(TriviaGame.currentQuestion.choices[0]);
    $("#option1").text(TriviaGame.currentQuestion.choices[1]);
    $("#option2").text(TriviaGame.currentQuestion.choices[2]);
    $("#option3").text(TriviaGame.currentQuestion.choices[3]);
}

function clearThePreviousSelection() {
    if(debug) {console.log("function: clearThePreviousSelection ");}
    $(".options").removeClass("player-clicked");
    // $(".hand").removeClass("correct-answer");
    $(".hand").addClass("hidden");

}

//   CLICK EVENT FIRED AFTER USER CLICKED AN ANSWER ------------------------

function checkTheAnswer(buttonClicked) {
    if(debug){console.log("function: checkTheAnswer ");}

    //first let's stop all timers
    clearAllTimers();
    //store player's answer
    savethePlayersAnswer(buttonClicked);    //SAVE NOT YET DECIDED WHAT TO DO WITH THESE ANSWERS

    //check if the player's answer is correct and update the score
    if(TriviaGame.currentQuestion.correctAnswer===parseInt(buttonClicked)) {
        TriviaGame.numberOfCorrectAnswers++;
    }else {
        TriviaGame.numberOfMistakes++;
    }    
    if(debug){console.log("Right ", TriviaGame.numberOfCorrectAnswers, " Wrong ", TriviaGame.numberOfMistakes);}
    
    // show the correct answer for 5 seconds
    $("#option" + buttonClicked).addClass("player-clicked");
    $("#hand" + TriviaGame.currentQuestion.correctAnswer).removeClass("hidden");
    
    var wait5seconds = setTimeout(askAQuestion, 5000);
    if(debug){console.log("5 second delay to show the correct answer");}

    //cleanup
}



// TODO: review this part
function timedOut() {
    if(debug){console.log("function: timedOut ");}
    var didntSelect;
    //send a didntSelect=undefined
    checkTheAnswer(didntSelect);
}

function savethePlayersAnswer(buttonClicked) {
    TriviaGame.playerAnswers.push(buttonClicked);
    if(debug){console.log("function: savethePlayersAnswer ", TriviaGame.playerAnswers);}
}

function gameOver() {
    if(debug){console.log("gameOver")}
    
    // TODO: disable the click event
    // TODO: show the play button 
}


// ALL ABOUT EVENTS -------------------------------------

$(document).ready(function(){
    if(debug){console.log("document is ready");}
    //START
    $("#btn_start").on("click", function(){
        prepareTheBoard();
        askAQuestion();
    });
});

function ClickEventHandler(buttonClicked) {
    checkTheAnswer(buttonClicked);
}

function turnONClickOptions(){
    if(debug){console.log("Enabled handler for 'options' click event");}
    
    //Player clicked on one of the given options
    $(".options").on("click", function(){
        var buttonClicked = $(this).attr("value");
        if(debug){console.log("Clicked on button index ", buttonClicked)}
        ClickEventHandler(buttonClicked);
    });
}

function turnOFFClickOptions(){
    if(debug){console.log("Disabled handler for 'options' click event");}
    
    //Player clicked on one of the given options
    $(".options").off("click", function(){
        var buttonClicked = $(this).attr("value");
        if(debug){console.log("Clicked on button index ", buttonClicked)}
        ClickEventHandler(buttonClicked);
    });
}
// ------------------------------------------


function prepareTheBoard(){
    if(debug){console.log("function: prepareTheBoard");}
    hidePlayButton();
    showTimer();
    TriviaGame.initialize();
    turnONClickOptions();
}

function startTheTimer() {
    if(debug){console.log("function: startTheTimer ");}
    //clear the '30s timeout' and '1s interval"
    clearAllTimers();
    //start the 30s timer
    start30SecondTimer();
}

function clearAllTimers() {
    clearTimeout(global_thirty_second_timeout);
    clearInterval(global_one_second_interval);
}

function start30SecondTimer() {
    if(debug){console.log("function: run30secondTimerl");}
    global_timeRemaining = 15;
    global_thirty_second_timeout = setTimeout(checkTheAnswer, global_timeRemaining * 1000);
    $(".clock").text(global_timeRemaining);
    //start a 1 second timer that will refresh the 'time remaining' every second
    startOneSecondTimer();
}

function startOneSecondTimer() {
    if(debug){console.log("function: startOneSecondTimer");}
    global_one_second_interval = setInterval(refreshTheClock, 1000);
}

function refreshTheClock() {
    if(debug){console.log("function: refreshTheClock", global_timeRemaining);}
    global_timeRemaining--;
    $(".clock").text(global_timeRemaining);
    if(global_timeRemaining===0){
        if(debug) {console.log("stopped refreshing time remaining");}
        clearInterval(global_one_second_interval);
    }
}

function hidePlayButton(){
    if(debug) {console.log("function: hidePlayButton")}
    $(".container_button").addClass("hidden");
}

function showPlayButton(){
    if(debug) {console.log("function: showPlayButton")}
    $(".container_button").removeClass("hidden");
}

function hideTimer(){
    if(debug) {console.log("function: hideTimer")}
    $(".container_timer").addClass("hidden");
}

function showTimer(){
    if(debug) {console.log("function: showTimer")}
    $(".container_timer").removeClass("hidden");
}