// positions functionality

// database information

    // TO DO
// var config = {
//     apiKey:,
//     authDomain:,
//     databaseURL:,
//     storageBucket:
//   };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();

// Button to add new stock
$("#add-position-btn").on("click", function(event) {
    event.preventDefault();
    
    var stockName = $("#input-name-div").val().trim();
    var initialPrice = $("#input-initial-price-div").val().trim();
    var numShares = $("#input-shares-div").val().trim();

    // create local temporary object for new stock input
    var newStock = {
        name: stockName,
        startPrice: initialPrice,
        shares: numShares
      };

      database.ref().push(newStock);

    //   displays new object in console
      console.log(newStock.name);
      console.log(newStock.startPrice);
      console.log(newStock.shares);

      alert("Stock successfully added");

        // Clears all of the text-boxes
        $("#input-name-div").val("");
        $("#input-initial-price-div").val("");
        $("#input-final-price-div").val("");
        $("#input-shares-div").val("");
    
    });

//  create Firebase event for adding a stock to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

      // stores everything into a variable
  var stockName = childSnapshot.val().name;
  var initialPrice = childSnapshot.val().startPrice;
  var numShares = childSnapshot.val().shares;

    // logging stock info
    console.log(stockName);
    console.log(initialPrice);
    console.log(numShares);


        // (re)calculating for updating value    (Inputting finalPrice from API - TODO)
        // var valueChange = ((finalPrice* shares) - (initialPrice * shares));
        // var valueChangePercent = ((finalPrice/initialPrice) * 100);
        // if (initialPrice >= finalPrice) {
        //     var sign = "-";
        // }
        // else var sign = "";

        var newRow = $("<tr>").append(
            $("<td>").text(stockName),
            $("<td>").text(initialPrice),
            $("<td>").text(numShares),
            $("<td>").text(finalPrice),
            $("<td>").text(sign + valueChange),
            $("<td>").text(sign + valueChangePercent)
          );

  // Append the new row to the table
  $("#positions-table > tbody").append(newRow);
});
