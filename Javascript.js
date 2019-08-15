$(document).ready(function() {

    var anime = [
        "Bleach", "Naruto", "One Piece", "One Punch Man", "Yu-Gi-Oh",
        "Death Note", "Fairy Tail", "Hunter X Hunter", "Dragon Ball",
    ];

    function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
        $(areaToAddTo).empty();

        for (var i = 0; i < arrayToUse.length; i++) {
            var a = $("<button>");
            a.addClass(classToAdd);
            a.attr("data-type", arrayToUse[i]);
            a.text(arrayToUse[i]);
            $(areaToAddTo).append(a);
        }

    }

    $(document).on("click", ".anime-btn", function() {
        $("#anime").empty();
        $(".anime-btn").removeClass("active");
        $(this).addClass("active");

        var type = $(this).attr("data-type");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .then(function(response) {
                var results = response.data;
                console.log(response)

                for (var i = 0; i < results.length; i++) {
                    var animeDiv = $("<div class=\"animal-item\">");

                    var title = results[i].title;

                    var picTitle = $("<p>").text(title);

                    var animated = results[i].images.fixed_height.url;
                    var still = results[i].images.fixed_height_still.url;

                    var animeImg = $("<img>");
                    animeImg.attr("src", still);
                    animeImg.attr("data-still", still);
                    animeImg.attr("data-animate", animated);
                    animeImg.attr("data-state", "still");
                    animeImg.addClass("anime-img");

                    animeDiv.append(picTitle);
                    animeDiv.append(animeImg);

                    $("#anime").append(animeDiv);
                }
            });
    });

    $(document).on("click", ".anime-img", function() {

        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    $("#add-anime").on("click", function(event) {
        event.preventDefault();
        var newAnime = $("input").eq(0).val();

        if (newAnime.length > 2) {
            anime.push(newAnime);
        }

        populateButtons(anime, "anime-btn", "#anime-btn");

    });

    populateButtons(anime, "anime-btn", "#anime-btn");
});