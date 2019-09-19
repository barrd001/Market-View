// -- PLACEHOLDER CHANGES FOR POSITIONS WATCHLIST
$(document).ready(function () {
  $(document).on("click", "#add-button", function () {
    event.preventDefault()
    // TAKES IN USER INPUT FROM FORM
    var searchWatchlistSymbol = $("#symbol-input").val().trim();
    // taking in search term
    var queryURL =
      "https://api.worldtradingdata.com/api/v1/stock?symbol=" +
      searchWatchlistSymbol +
      "&api_token=E9WkYOdirs63yl0rDrZNAnAfzIT9JEoTVrjDDedq2xeTTeROg4ZvtJy8HCUC";
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function (data) {
        // Clears all of the text-boxes
        $("#symbol-input").val("");
        // setting both daychange variables to green/red based on market data
        var dayChange = $("<td>");
        var dayChangePct = $("<td>");
        dayChangePct.text(data.data[0].change_pct);
        dayChange.text(data.data[0].day_change);
        if (data.data[0].day_change < 0) {
          dayChangePct.css("color", "red");
          dayChange.css("color", "red");
        } else {
          dayChangePct.css("color", "lightgreen");
          dayChange.css("color", "lightgreen");
        }
        $("#watchlist-table").append(newWatchlistRow);

        var newWatchlistRow = $("<tr>").append(
          $("<td>").text(data.data[0].symbol),
          $("<td>").text(data.data[0].price),
          $("<td>").text(data.data[0].day_high),
          $("<td>").text(data.data[0].day_low),
          $("<td>").text(data.data[0]["52_week_high"]),
          $("<td>").text(data.data[0]["52_week_low"]),
          dayChange,
          dayChangePct,
        );
      });
    $("#watchlist-table > tbody").append(newWatchlistRow);
  })
});