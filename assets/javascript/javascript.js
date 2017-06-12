// // boilerplate
// // add firebase config
var config = {
    apiKey: "AIzaSyCyQ3J5CWCkdpeeL_Y8C1TtOy-it4AI__s",
    authDomain: "train-schedule-4630d.firebaseapp.com",
    databaseURL: "https://train-schedule-4630d.firebaseio.com",
    projectId: "train-schedule-4630d",
    storageBucket: "train-schedule-4630d.appspot.com",
    messagingSenderId: "309004152601"
};


firebase.initializeApp(config);


// // connect to firebase
// // get a refernce to the database via firebase
var database = firebase.database();

var trainName = "";
var destinationLoc = "";
var firstTrain = "";
var frequencyMin = "";



// $('#SOME_BUTTON_GOES_HERE').on('click', function() {
//   // collect the data from the html form, create variables to hold the data
//   // train name, .... etc
//   // when retrieving the "first train" data, make sure to parse it into a Unix timestamp

$('#run-search').on("click", function(event) {
    event.preventDefault();

    var trainName = $("#train-input").val().trim();
    var destinationLoc = $("#destination-input").val().trim();
    var firstTrain = moment($("#first-train-input").val().trim(), "HH.mm").format("X");
    var frequencyMin = $("#frequencymin-input").val().trim();


    var newTrain = {
        train: trainName,
        destination: destinationLoc,
        pickup: firstTrain,
        frequency: frequencyMin,
    };

    // Uploads train Info to the database
    database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.train);
    console.log(newTrain.destination);
    console.log(newTrain.pickup);
    console.log(newTrain.frequency);


    alert("Train Time Successfully added");

    // Clears all of the text-boxes
    $("#train-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequencymin-input").val("");

});

// something.on('child_added', function(childSnapshot) {
//   console.log('the childSnapshot data', childSnapshot.val());

//   // create local variables to store the data from firebase

// // FIRST MAKE THE table row show up with empty strings for `timeInMinutes` / `tArrival `

// // THEN DO THIS MATH
//         // compute the difference in time from 'now' and the first train, store in var
//         // get the remainder of time after using `mod` with the frequency, store in var
//         // subtract the remainder from the frequency, store in var `timeInMinutes`
//         // format `timeInMinutes` ()"make pretty") and store in var `tArrival`

// // ITS OKAY TO JUST SHOW EMPTY STRINGS for `timeInMinutes` / `tArrival`
//   // append to our table of trains, inside the `tbody`, with a new row of the train data

// });




database.ref().on("child_added", function(childSnapshot) {

    console.log('the childSnapshot data', childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().train;
    var destinationLoc = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().pickup;
    var frequencyMin = childSnapshot.val().frequency;

    //create two variables that's based on the user's input
    var nextArrival = "";

    //"time" compute the difference in time from 'now' and the first train
        var now = moment().unix();
        var firstNow = now - firstTrain;
        console.log(firstNow); 

    // get the remainder of time after using `mod` with the frequency, store in var
         var freqMinsSec = frequencyMin * 60;
         
         var remainderInSec = firstNow % freqMinsSec;

         console.log(remainderInSec);

    // subtract the remainder from the frequency, store in var `timeInMinutes`

         var minutesAway = Math.round((freqMinsSec - remainderInSec) / 60)

         console.log(minutesAway); 

         






          

          








    // train Info
    // console.log(trainName);
    // console.log(destinationLoc);
    // console.log(firstTrain);
    // console.log(frequencyMin);


    //this displays the user train info
    $("#train-table").append("<tr>" + "<td> " + trainName +
        " </td><td> " + destinationLoc +
        " </td><td> " + frequencyMin +
        " </td><td> " + nextArrival +
        " </td><td> " + minutesAway + " </td></tr> ");

});




//   var empMonths = moment().diff(moment.unix(empStart, "X"), "months");
//   console.log(empMonths);

//   // Calculate the total billed rate
//   var empBilled = empMonths * empRate;
//   console.log(empBilled);

//   // Add each train's data into the table
//   $("#train-table > tbody").append("<tr><td>" + empName + "</td><td>" + empRole + "</td><td>" +
//   empStartPretty + "</td><td>" + empMonths + "</td><td>" + empRate + "</td><td>" + empBilled + "</td></tr>");
// });
