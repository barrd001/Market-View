console.log("working")
$(document).on("click","#add-position-button", function(event) {
    event.preventDefault();
  
    // taking in search terms (symbol, # of shares, avg cost per share)
    var posSymbol = $("#symbol").val().trim();
    console.log(posSymbol);
    var posShares = $("#shares").val().trim();
    console.log(posShares);
    console.log(typeof(posShares));
    var posAverage = $("#average").val().trim();
    console.log(posAverage);


  
    // setting up get requests from worldtradingdata for table input
    var queryURL =
      "https://api.worldtradingdata.com/api/v1/stock?symbol=" +
      posSymbol +
      "&api_token=E9WkYOdirs63yl0rDrZNAnAfzIT9JEoTVrjDDedq2xeTTeROg4ZvtJy8HCUC";
  
    $.ajax({
      url: queryURL,
      method: "GET"
    })
  
      // inputting data from worldtradingdata api
      .then(function(data) {
        // Clears all of the text-boxes
        $("#positions-boxes").val("");
  
        // testing API functionality/object syntax
        console.log(data);
        console.log(data.data[0].symbol);

        // math to determine the dollar change based on inputted info vs the real time value
        var currentValue = parseInt(posShares, 10) * data.data[0].price;
        var valueBasedOnInput = parseInt(posShares, 10) * parseInt(posAverage, 10);
        var valueChange = currentValue - valueBasedOnInput;

        console.log("Value Change = " + valueChange);

        var newPos = $("<div class='col-lg-3 col-md-6 position'><p>" + data.data[0].name + "<div/><p/>" + "<p>Day Change: " + data.data[0].day_change + "<p/>" + "<p>% Change = " + data.data[0].change_pct + "<p/>" + "<p>Change in Value = $" + valueChange + "<p/>").append();
        
        
        
        
        
        
        
        
        //append the div
        $("#positions-boxes").append(newPos);

    
/*         
        Positions:
        Symbol: User input
        # of Shares Purchased: User Input
        Avg Cost: User input
        
        day change
        day percent
        current price too
        users change of value in position 
*/
      });
  });