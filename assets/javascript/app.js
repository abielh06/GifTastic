$(function () {
    populateButtons(sports, "searches", "#images");
});
// $(document).ready(function(){
var sports = ["basketball", "soccer", "football", "basball", "physics", "jukes"];

function populateButtons(search, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();
    for (var i = 0; i < search.length; i++) {
        // jquery 
        var a = $('<button>');
        // this method is used to add on or more class names to the selected elements
        a.addClass(classToAdd);
        // this method is used to return the attribute value of mathched elements
        a.attr("data-type", search[i])
        // to make the button = to the text of array
        a.text(search[i]);
        $(areaToAddTo).append(a);
    }
}
// create function to populate images from giphy api, .searches(adds click event to any element with any element with the class searches while the DOM loads and after it loads)
$(document).on("click", ".searches", function () {
    $("buttons-area").removeClass("active")
    $(this).addClass("active");

    var type = $(this).attr("data-type");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=b3hhguqPowvEmduZw2ABPVmhdHYFk4iV&limit=10";
    // Ajax call
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function (response) {
            var results = response.data;
            console.log(response);
            for (var i = 0; i < results.length; i++) {
                var sportsDiv = $("<div>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var animated = results[i].images.fixed_height.url;
                var still = results[i].images.fixed_height_still.url;
                var sportsImage = $("<img>");
                sportsImage.attr("src", still);
                sportsImage.attr("data-still", still);
                sportsImage.attr("data-animate", animated);
                sportsImage.attr("data-state", "still");
                sportsImage.addClass("sport-image");
                sportsDiv.append(p);
                sportsDiv.append(sportsImage);
                $("#gifs-appear-here").append(sportsDiv);
            }
        });
});
// set the state from still to animate when gif is clicked

$(document).on("click", ".sport-image", function () {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

$("addSearch").on("click", function (event) {
    event.preventdefault();
    var newSearch = $('yourSearch').val();
    sports.push(newSearch);
    // populateButtons(sports, "searches", "#images") 
});

