const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res) {   //When user tries to access the home route, res.send("Hello")
    var today = new Date();
    var currentDay = today.getDay();
    var day = "";
    
    switch(currentDay) {
        case 0:
            day = "Sunday";
            break;
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day = "Saturday";
            break;
        default:
            console.log("Error Occured. Current Day unavailable.");
    }
    res.render("list", {kindOfday: day});
});

app.listen(3000, function() {
    console.log("Server started at port 3000");
});