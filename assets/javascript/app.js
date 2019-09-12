
$(document).on('click', '#buttoncheck', function() {
    $(".newsContainer").empty();
     search = $("#textInput").val().trim();
     console.log(search)
     queryURL = "https://newsapi.org/v2/everything?qInTitle=" + search + "&language=en&sortby=publishedAt&apiKey=df2279637a6742afb7f8f57de492e5c9"
     console.log(queryURL);
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
          var results = response.articles;
          console.log(results);
          for (var i = 0; i < results.length; i++) {
            var newsDiv = $("<div>")
            var headline = $("<a>")
            var picture = $("<img>")
            if (results[i].urlToImage == null) {
              picture.attr("src", "../Market-View/images.png")
            } else {
              picture.attr("src", results[i].urlToImage);
            }
            picture.css("float", "left");
            picture.css("width", "150px");
            picture.css("height", "100px")
            headline.text(results[i].title);
            headline.attr("href", results[i].url);
            headline.attr("class", "headline");;
            console.log(headline);
            newsDiv.append(headline);
            newsDiv.attr("class", "news");
            var author = $("<h2>");
            if (results[i].author == null) {
              author.text("")
            } else {
              author.text("By:" + results[i].author);
            }
            newsDiv.append(author);
            var description = $("<h4>");
            description.attr("class", "content");
            description.text(results[i].description);
            author.append(description);
            author.append(picture);
            $(".newsContainer").append(newsDiv);
        }
        });
    });

    /* 
console.log($(".input-3lfOzLDc-").val())



$('#search-button').on('click', function(event) {
    event.preventDefault();
    var searchBar = $('.input-3lfOzLDc').val().trim();
$(".input-3lfOzLDc").val(searchBar);
var input = $(".input-3lfOzLDc-");
console.log(input);
/* console.log(searchBar);
 
});
 */


/* var userSearch = "CPB";


$('#search-button').on('click', function(event) {
    event.preventDefault();
    var searchBar = $('#search-bar').val().trim();
    userSearch = searchBar;
 
    console.log(searchBar);
    console.log(userSearch);
}); */
