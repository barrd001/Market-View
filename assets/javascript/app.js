$(document).on('click', '#buttoncheck', function() {
    $(".newsContainer").empty();
     search = $("#textInput").val().trim();
     console.log(search)
     queryURL = "https://newsapi.org/v2/everything?qInTitle=" + search + "&sortby=publishedAt&apiKey=df2279637a6742afb7f8f57de492e5c9"
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
            headline.text(results[i].title);
            headline.attr("href", results[i].url);
            headline.attr("class", "headline");;
            console.log(headline);
            newsDiv.append(headline);
            newsDiv.attr("class", "news");
            var author = $("<h2>");
            author.text("By:" + results[i].author);
            newsDiv.append(author);
            var description = $("<h4>");
            description.attr("class", "content");
            description.text(results[i].description);
            author.append(description);
            $(".newsContainer").append(newsDiv);
        }
        });
    });