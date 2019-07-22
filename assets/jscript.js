var topics = ["planet mercury", "planet venus", "earth"];
var search;
var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=oJuYfG7XhZfnbNJ03PVQbwL00bCQSXDj&limit=10&q=";
function renderButtons(){
    $("#buttons").empty();
    for (i = 0; i < topics.length; i++){
        var b = $("<button>");
        b.addClass("items");
        b.attr("val", topics[i]);
        b.text(topics[i]);
        $("#buttons").append(b);
        $("#buttons").append(" ");
    }
}
$("#submit").on("click", function(event){
    event.preventDefault();
    var searchitem = $("#typein").val().trim();
    topics.push(searchitem);
    $("#typein").empty();
    console.log(topics);
    renderButtons();
})
renderButtons();
function renderEverything(){
$(".items").on("click", function(){
    $("#gifs").empty();
    search = $(this).attr("val");
    queryURL = "https://api.giphy.com/v1/gifs/search?api_key=oJuYfG7XhZfnbNJ03PVQbwL00bCQSXDj&limit=10&q="
    $.ajax({
        url: queryURL + search,
        method: "GET"
    }).then(function(response){
            var image;
            var rating;
            for (i = 0; i < 10; i++){
                var divi = $("<div>");
                image = $("<img>").attr("src", response.data[i].images.fixed_height_still.url).attr("still", "true").addClass("image").attr("number", i);
                rating = $("<p>").attr("rating", response.data[i].rating);
                divi.append(image);
                divi.append("<br>" + "Rating: " + rating.attr("rating") + "<br>");
                $("#gifs").append(divi);
                $("#gifs").append(" ");
                $("#gifs").append(" ");
            }
            $(".image").on("click", function(){
                if ($(this).attr("still") === "true"){
                    $(this).attr("src", response.data[$(this).attr("number")].images.fixed_height.url).attr("still", "false");
                }
                else if ($(this).attr("still") === "false"){
                    $(this).attr("src", response.data[$(this).attr("number")].images.fixed_height_still.url).attr("still", "true");
                }
            })
    });
});
}
$(document).on("click", "#submit", renderEverything);
renderEverything(); 
