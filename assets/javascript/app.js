// positions functionality
var initialPrice;
var finalPrice;
var shares;
var valueChange;
var valueChangePercent;
var sign;

initialPrice = 10;
finalPrice = 5;
var shares = 1;

setInterval(function(){ 

        // recalculating for updating value    
        valueChange = ((finalPrice* shares) - (initialPrice * shares));
        valueChangePercent = ((finalPrice/initialPrice) * 100);
        if (initialPrice >= finalPrice) {
            sign = "-";
        }
        else sign = "";
    
        $("#initial-price-div").html("Initial Price: " + initialPrice);
        $("#final-price-div").html("New Price: " + finalPrice);
        $("#change-div").html("Value Change: " + valueChange);
        $("#percent-change-div").html("Percentage Change: " + valueChangePercent);

        // Incrementing finalPrice for testing purposes only -- real functionality will be merely updating finalPrice to current real value
        finalPrice++;
    
    ; }, 3000);




