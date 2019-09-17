// table script

$("#search-stock-btn").on("click", function(event) {
  event.preventDefault();

  // taking in search term
  var searchSymbol = $("#placeholder-stock-search-div").val().trim();

  // setting up get requests from worldtradingdata for table input
  var queryURL = "https://api.worldtradingdata.com/api/v1/stock?symbol=" + searchSymbol + "&api_token=E9WkYOdirs63yl0rDrZNAnAfzIT9JEoTVrjDDedq2xeTTeROg4ZvtJy8HCUC";

  $.ajax({
  url: queryURL,
  method: "GET"

})

// inputting data from worldtradingdata api
.then(function(data) {

  // Clears all of the text-boxes
  $("#placeholder-stock-search-div").val("");
  
  // testing API functionality/object syntax
  console.log(data);
  console.log(data.data[0].symbol);


  // setting both daychange variables to green/red based on market data
  var dayChange = $("<td>");
  var dayChangePct = $("<td>");
  dayChangePct.text(data.data[0].change_pct)
  dayChange.text(data.data[0].day_change)
  if (data.data[0].day_change < 0){
    dayChangePct.css("color", "red");
    dayChange.css("color", "red");
  } else {
    dayChangePct.css("color", "lightgreen");
    dayChange.css("color", "lightgreen");
  }



var newRow = $("<tr>").append(
  $("<td>").text(data.data[0].symbol),
  $("<td>").text(data.data[0].price),
  $("<td>").text(data.data[0].day_high),
  $("<td>").text(data.data[0].day_low),
  $("<td>").text(data.data[0]["52_week_high"]),
  $("<td>").text(data.data[0]["52_week_low"]),
  $("<td>").text(data.data[0].volume),
  $("<td>").text(data.data[0].volume_avg),
  dayChange,
  dayChangePct
  // $("<td>").text(data.data[0].day_change),
  // $("<td>").text(data.data[0].change_pct),
);
  // Append the new row to the table
  $("#table-table > tbody").append(newRow);
})
})