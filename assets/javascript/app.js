var debug = true;

//timers
var global_thirty_second_timeout, global_one_second_interval;

var global_timeRemaining = 30;

var TriviaGame = {

    questionNumber: 0
    ,yourAnswers : []
    ,questions : [
        {
            question: "Who is the Prime Minister of Canada"
            ,choices: [
                "Pierre Trudeau" 
                ,"Justin TimberLake" 
                ,"Justin Trudeau"
                ,"Stephen Harper "
            ]
            ,correctAnswer: 2
        }
    
        ,{
            question: "Which country lies on the southern border of Canada"
            ,choices: [
                "Mexico"
                ,"USA"
                ,"Russia"
                ,"Alaska"
            ]
            ,correctAnswer: 1
        }
    
        ,{
            question: "What is the Raptors"
            ,choices: [
                ,"baseball team"
                ,"football team"
                ,"soccer team"
                ,"basketball team"
            ]
            ,correctAnswer: 3
        }
    ]
    ,initialize : function() {
        if(debug){console.log("TriviaGame: initialize")};
        this.yourAnswers = [];
        questionNumber = 0;
    }
    ,getTheNextQuestion: function(questionNumber){
        if(debug){console.log("TriviaGame: getTheCurrentQuestion ", this.questions[questionNumber]);};
        questionNumber++;
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


function startTriviaGame() {
    if(debug){console.log("function: letsPlayTriviaGame");}
    //get a question
    var theCurrentQuestion = TriviaGame.questions[0];
    //post the question
    postTheQuestion(theCurrentQuestion);
    //start a 30 second timer
    startTheTimer();
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
    if(debug){console.log("function: startTheTimer ");}
    //clear the '30s timeout' and '1s interval"
    clearTimeout(global_thirty_second_timeout);
    clearInterval(global_one_second_interval);
    //start the 30s timer
    start30SecondTimer();
}

function start30SecondTimer() {
    if(debug){console.log("function: run30secondTimerl");}
    thirty_second_timer = setTimeout(timeIsUP, 30000);
    $("#timer").text("30");
    global_timeRemaining = 30;
    //start a 1 second timer that will refresh the 'time remaining' every second
    startOneSecondTimer();
}

function startOneSecondTimer() {
    if(debug){console.log("function: startOneSecondTimer");}
    global_one_second_interval = setInterval(refreshTheClock, 1000);
}

function refreshTheClock() {
    if(debug){console.log("function: refreshTheClock");}
    global_timeRemaining--;
    $("#timer").text(global_timeRemaining);
    if(global_timeRemaining===0){
        if(debug) {console.log("stopped refreshing time remaining");}
        clearInterval(global_one_second_interval);
    }
}

function timeIsUP() {
    if(debug){console.log("function: timeIsUp ");}

    //TODO: get the player's answer

    //TODO: get the next question

    //TODO: check that question is not 'undefined'

    //TODO: post the the next question

    //TODO: start the timer
}


$("#start").on("click", function(){
    startTriviaGame();
});