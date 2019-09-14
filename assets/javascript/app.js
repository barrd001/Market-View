// positions functionality

// database information
var config = {
    apiKey: "AIzaSyCnhjZy1y5OuDFkf0eb-5d6LXuDoY6y2ao",
    authDomain: "market-view-7ba03.firebaseapp.com",
    databaseURL: "https://market-view-7ba03.firebaseio.com",
    projectId: "market-view-7ba03",
    storageBucket: "market-view-7ba03.appspot.com",
    appId: "1:324258865048:web:529a40578f4322516755ed"
  };

      // declaring to-be-extrapolated variables
      var newPrice;
      var valueChange;
      var valueChangePercent;
      var sign;
      var numShares;
  
  firebase.initializeApp(config);
  
  var database = firebase.database().ref();

// Button to add new stock
$("#add-position-btn").on("click", function(event) {
    event.preventDefault();

    // setting variables from user input
    var stockSymbol = $("#input-symbol-div").val().trim();
    var initialPrice = $("#input-initial-price-div").val().trim();
    var numShares = $("#input-shares-div").val().trim();
    // get request from market API (placeholder API for now)
    var queryURL = "https://api.worldtradingdata.com/api/v1/stock?symbol=" + stockSymbol + "&api_token=E9WkYOdirs63yl0rDrZNAnAfzIT9JEoTVrjDDedq2xeTTeROg4ZvtJy8HCUC"
    var newPrice;

    $.ajax({
      url: queryURL,
      method: "GET"

    })

    
      .then(function(data) {
      newPrice = data.data[0].price;
      console.log(newPrice);
      // console.log(data);


    


          // (Inputting finalPrice from API - TODO)
  //  INPUT FROM API HERE

          // (re)calculating extrapolated variables for current input    
    valueChange = ((newPrice* numShares) - (initialPrice * numShares));
    valueChangePercent = ((newPrice/initialPrice) * 100);
    if (initialPrice >= newPrice) {
        sign = "-";
        }
    else sign = "+";

    console.log(newPrice);


    // create local temporary object for new stock input
    var newStock = {
        name: stockSymbol,
        startPrice: initialPrice,
        shares: numShares,
        finalPrice: newPrice,
        change: valueChange,
        changePercent: valueChangePercent,
        valueSign: sign
      };

      console.log(newPrice);
      database.push(newStock);

    //   displays new object in console
      console.log(newStock);

      alert("Stock successfully added");

        // Clears all of the text-boxes
        $("#input-symbol-div").val("");
        $("#input-initial-price-div").val("");
        $("#input-shares-div").val("");
    
    });

//  create Firebase event for adding a stock to the database and a row in the html when a user adds an entry
database.on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

      // stores everything into a variable
      stockSymbol = childSnapshot.val().name;
      initialPrice = childSnapshot.val().startPrice;
      numShares = childSnapshot.val().shares;
      newPrice = childSnapshot.val().finalPrice;
      valueChange = childSnapshot.val().change;
      valueChangePercent = childSnapshot.val().changePercent;
      sign = childSnapshot.val().valueSign;

    // logging stock info
    console.log(stockSymbol);
    console.log(initialPrice);
    console.log(numShares);


        var newRow = $("<tr>").append(
            $("<td>").text(stockSymbol),
            $("<td>").text(initialPrice),
            $("<td>").text(numShares),
            $("<td>").text(newPrice),
            $("<td>").text(sign + valueChange),
            $("<td>").text(sign + valueChangePercent)
          );

  // Append the new row to the table
  $("#positions-table > tbody").after(newRow);
});

});