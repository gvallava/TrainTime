// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDyD1I9nPhJ0REU6ybe2EVFreS9i2tJN0g",
    authDomain: "train-3e40f.firebaseapp.com",
    databaseURL: "https://train-3e40f.firebaseio.com",
    storageBucket: "train-3e40f.appspot.com",
    messagingSenderId: "684002333036"
  };
  firebase.initializeApp(config);

	var database = firebase.database();
 

//on click listener

$("#submit").on("click", function(e){

	e.preventDefault();

	//input variables

	trainName = $("#train-name").val().trim();
	destination = $("#destination").val().trim();
	firstTrain = $("#first-train").val().trim();
	frequency = $("#frequency").val().trim();

	nextArrival = {
        name: trainName,
        destin: destination,
        first: firstTrain,
        freq: frequency,
    }


//saving to database

	database.ref().push(nextArrival);
		
//start inputs as blank

 	$("#train-name").val("");
    $("#destination").val("");
    $("#first-time").val("");
    $("#frequency").val("");

	return false;

});

database.ref().on("child_added", function(snapshot, value){


var trainName = snapshot.val().name;
var destination = snapshot.val().destin;
var firstTrain = snapshot.val().first;
var frequency = snapshot.val().freq;

//first train time

var initialTime = moment(firstTrain, "hh:mm");
console.log("Initial time is: " + moment(initialTime).format("hh:mm"));

//current time

var currentTime = moment();
console.log("Current time is: " + moment(currentTime).format("hh:mm"));

//calculate the time difference

var difference = moment().diff(moment(initialTime), "minutes");
console.log("The difference between the Initial time and Current Time is: " + difference);

//modular math

var remainder = difference % frequency;
console.log("The remainder is: " + remainder);

//Minutes until next train 
var minAway = frequency - remainder;
console.log("Number of minutes until next train: " + minAway);

//next train arrival
var nextArrival = moment().add(minAway, "minutes");
console.log("Next train arrives at: " + moment(nextArrival).format("hh:mm"));

$(".trainInput").append("<tr><th>" + trainName + "</th><th>" + destination + "</th><th>" +
 frequency + "</th><th>" + moment(nextArrival).format("hh:mm") + "</th><th>" + minAway + "</tr></th>");
});

