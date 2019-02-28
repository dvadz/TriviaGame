var debug = true;

//timers
var thirty_second_timeout, one_second_interval;

var timeRemaining = 30;

var TriviaGame = {

    currentQuestion: 0
    ,yourAnswers : []
    ,questions : [
        {
            question: "This is question1"
            ,choices: [
                "choice1" 
                ,"choice2" 
                ,"choice3"
                ,"choice4"
            ]
            ,correctAnswer: 0
        }
    
        ,{
            question: "This is question2"
            ,choices: [
                "choice1"
                ,"choice2"
                ,"choice3"
                ,"choice4"
            ]
            ,correctAnswer: 2
        }
    
        ,{
            question: "This is question3"
            ,choices: [
                ,"choice1"
                ,"choice2"
                ,"choice3"
                ,"choice4"
            ]
            ,correctAnswer: 3
        }
    ]
    ,initialize : function() {
        if(debug){console.log("TriviaGame: initialize")};
        this.yourAnswers = [];
        timeRemaining
    }
    ,getTheCurrentQuestion: function(whichQuestion){
        if(debug){console.log("TriviaGame: getTheCurrentQuestion ", this.questions[whichQuestion]);};

    }    
    ,saveMyAnswer: function(myAnswer) {
        this.yourAnswers.push(myAnswer);
        if(debug){console.log("TriviaGame: saveMyAnswer "), this.yourAnswers};
    }
    ,getTotalNumberOfQuestions(){
        if(debug){console.log("TriviaGame: getTotalNumberOfQuestions ", this.questions.length,);};
        return this.questions.length;
    }
}


function letsPlayTriviaGame() {
    'use strict'

    if(debug){console.log("function: letsPlayTriviaGame");}
    var TotalNumberOfQuestions = TriviaGame.getTotalNumberOfQuestions();

    var timer_ForAQuestion;
    var interval_RefreshTheClock;
 
    //get a question
    var theCurrentQuestion = TriviaGame.questions[0];
    //post the question
    postTheQuestion(theCurrentQuestion);
    //start a 30 second timer
    startTheTimer();
    

    // interval_RefreshTheClock = setInterval(refreshTheClock(), 1000);
}

function postTheQuestion(theQuestion) {
    if(debug) {console.log("function: postTheQuestion ",theQuestion);}
    $("#question").text(theQuestion.question)
    $("label[for = options_index_0]").text(theQuestion.choices[0]);
    $("label[for = options_index_1]").text(theQuestion.choices[1]);
    $("label[for = options_index_2]").text(theQuestion.choices[2]);
    $("label[for = options_index_3]").text(theQuestion.choices[3]);
}

function startTheTimer() {
    //clear the '30s timeout' and '1s interval"
    clearTimeout(thirty_second_timeout);
    clearInterval(one_second_interval);
    //restart the 30s timer
    thirty_second_timer = setTimeout(timeIsUP, 30000);
    $("#timer").text("30");
    timeRemaining = 30;
    //start another timer to refresh the clock every second
    one_second_interval = setInterval(refreshTheClock, 1000);

}

function one_second_interval() {
    if(debug){console.log("function: one_second_interval");}
}

function timeIsUP() {
    if(debug){console.log("function: timeIsUp ");}

}

function refreshTheClock() {
    if(debug){console.log("function: refreshTheClock");}
    timeRemaining--;
    $("#timer").text(timeRemaining);
    if(timeRemaining===0){
        if(debug) {console.log("stopped refreshing time remaining");}
        clearInterval(one_second_interval);
    }
}

$("#start").on("click", function(){
    letsPlayTriviaGame();
});

