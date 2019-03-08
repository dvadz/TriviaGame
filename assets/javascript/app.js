'use strict'
var debug = false;

//timers
var global_thirty_second_timeout, global_one_second_interval;

//numbers in seconds
var global_timeRemaining, global_timeAllotted = 7;
var global_show_answer_timeout = 3;
var global_wait_while_answer_displayed = false;

var TriviaGame = {

    questionNumber: 0
    ,playerAnswers : []
    ,currentQuestion:[]
    ,numberOfCorrectAnswers: 0
    ,numberOfMistakes: 0
    ,gameOver: false
    ,questions : [
        {
            question: "Which is NOT a primitive?"
            ,choices: ["string", "number", "array", "boolean"]
            ,correctAnswer: 2
        }
        ,{
            question: "How do you write scripts inside your hmtl?"
            ,choices: ["<link>", "{script}", "app.js", "<script>"]
            ,correctAnswer: 3
        }
        ,{
            question: "Which variable has a value of undefined?"
            ,choices: ["var a;", "var b = [];", "var c = false;", "var d = 0;"]
            ,correctAnswer: 0
        }
        ,{
            question: "Which function requires the user to type?"
            ,choices: ["alert()", "prompt()", "ask()", "confirm()"]
            ,correctAnswer: 1
        }
        ,{
            question: "Click on 'less than or equal to'"
            ,choices: [">=", "<=", "!<=", "!="]
            ,correctAnswer: 1
        }
        ,{
            question: "How do you put comments"
            ,choices: ["!!", "||", "\\", "//"]
            ,correctAnswer: 3 
        }
        ,{
            question: "How do you add an external script?"
            ,choices: ["<script='app.js'>", "<scripts href='app.js'>", "<scripts src='app.js'>", "<scripts name='app.js'>"]
            ,correctAnswer: 2
        }
        ,{
            question: "What is a the keyword for creating variables"
            ,choices: ["for", "function", "return", "var"]
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

    removeTransparent();
    global_wait_while_answer_displayed = false;

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

    if(TriviaGame.gameOver) {
        return false;
    }
    
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
    
    //make the clock opaque
    makeTransparent();
    //set this flag so that any click event can be ignored by the event handler
    global_wait_while_answer_displayed = true;
    var wait5seconds = setTimeout(askAQuestion, global_show_answer_timeout * 1000);
    if(debug){console.log(global_show_answer_timeout," second delay to show the correct answer");}
}

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
    
    TriviaGame.gameOver = true;
    //disable the click event
    turnOFFClickOptions()
    //hide the timer
    hideTimer();
    //show the play button 
    showPlayButton();
    //show score
    showScore();
}

function showScore() {
    clearThePreviousSelection();
    $("#question").text("Your Score");
    $("#option0").text("Hits");
    $("#option1").text(TriviaGame.numberOfCorrectAnswers);
    $("#option2").text("Misses");
    $("#option3").text(TriviaGame.numberOfMistakes);
}

// ALL ABOUT EVENTS -------------------------------------

$(document).ready(function(){
    if(debug){console.log("document is ready");}
    //START
    $("#btn_start").on("click", function(){
        prepareTheBoard();
        askAQuestion();
        TriviaGame.gameOver = false;
    });
});

function ClickEventHandler(buttonClicked) {
    //don't process any click while the previous answer is on screen
    if(global_wait_while_answer_displayed) {
        return false;
    }
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
    $(".options").off("click");
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
    startTheClock();
}

function clearAllTimers() {
    clearTimeout(global_thirty_second_timeout);
    clearInterval(global_one_second_interval);
    //clear the clock on the screen
    $(".clock").empty();
}

function startTheClock() {
    if(debug){console.log("function: run30secondTimerl");}
    global_thirty_second_timeout = setTimeout(checkTheAnswer, global_timeAllotted * 1000);
    $(".clock").text(global_timeAllotted);
    global_timeRemaining = global_timeAllotted;
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
    if(TriviaGame.numberOfMistakes!==0) {
        $("#btn_start").text("I want to try again");
    } else {
        $("#btn_start").text("That was too easy");
    }
}

function hideTimer(){
    if(debug) {console.log("function: hideTimer")}
    $(".container_timer").addClass("hidden");
}

function showTimer(){
    if(debug) {console.log("function: showTimer")}
    $(".container_timer").removeClass("hidden");
}

function makeTransparent() {
    if(debug) {console.log("function: makeTransparent")}
    $(".container_timer").addClass("opaque");
}

function removeTransparent() {
    if(debug) {console.log("function: removeTransparent")}
    $(".container_timer").removeClass("opaque");
}
