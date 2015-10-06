var allData = new Firebase("https://inncubator-booking.firebaseio.com");

$(document).ready(function() {
    var url = window.location;
    //var houseSelected = url.toString().split("/")[3].split("_")[0];
    var houseSelected = url.toString().split("/")[4].split("_")[0];
    $("#propertyName").html("<h1 class='text-center'>" + houseSelected + " checkins</h1>");

    //let's get today's date in order to make it the default
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    if (month < 10) {
        var month = "0".concat(month.toString());
        window.month = month;
    };
    var day = today.getDate();
    if (day < 10) {
        var day = "0".concat(day.toString());
        window.day = day;
    };
    var todaysDate = year.toString() + "-" + month.toString() + "-" + day.toString();
    console.log(month);
    allData.orderByChild("start").on("child_added", function(snapshot) {
        var guest = snapshot.val();
        var guestStart = guest.start.split("-")[1];
        var formattedDate = new Date(guest.start);
        var formattedDate = formattedDate.toString().split(" ")[1] + " " + formattedDate.toString().split(" ")[2];
        if (guest.location == houseSelected && guestStart == month) {
            $("#guestFlow").append("<button class='btn btn-default'>" + guest.title + "<br>" + formattedDate + "</button><br><br>");
            var lol = $("#guestFlow button:last");
            var nextDay = parseInt(todaysDate.split("-")[2]) + 1;
            if (guest.start == todaysDate) {
                lol.css("background-color", "#7EB6FF");
            } else if (parseInt(guest.start.split("-")[2]) == nextDay) {
                lol.css("background-color", "#FAFAD2");
            };
        };
    });
});
