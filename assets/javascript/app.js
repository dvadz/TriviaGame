var debug = true;

var TriviaGame = {

    currentQuestion: 0
    ,yourAnswers : []
    ,questions : [
        {
            Question: "This is question1"
            ,Choices: [
                "choice1" 
                ,"choice2" 
                ,"choice3"
                ,"choice4"
            ]
            ,Answer: 0
        }
    
        ,{
            Question: "This is question2"
            ,Choices: [
                "choice1"
                ,"choice2"
                ,"choice3"
                ,"choice4"
            ]
            ,Answer: 2
        }
    
        ,{
            Question: "This is question3"
            ,Choices: [
                ,"choice1"
                ,"choice2"
                ,"choice3"
                ,"choice4"
            ]
            ,Answer: 3
        }
    ]
    ,initialize : function() {
        if(debug){console.log("TriviaGame: initialize")};
        this.yourAnswers = [];
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
 
    // TODO: post a question
    var theCurrentQuestion = TriviaGame.questions[0];
    askTheQuestion(theCurrentQuestion);
    // TODO: start a 30 second timer

    
    timer_ForAQuestion = setInterval();

    interval_RefreshTheClock = setInterval(refreshTheClock(), 1000);
}

function askTheQuestion(theQuestion) {
    var question,choices,correctAnswer,yourAnswer;
    
    question = theQuestion.question;
    choices  = theQuestion.choices;
    correctAnswer = theQuestion.answer;


}

function refreshTheClock(timeRemaining) {
    if(debug){console.log("function: refreshTheClock");}
    $("#timer").text()
}

function askAQuestion() {
    if(debug){console.log("function: askAQuestion");}    
    //run an interval which refreshes the timer every second
}    

$("#start").on("click", function(){
    letsPlayTriviaGame();
});

