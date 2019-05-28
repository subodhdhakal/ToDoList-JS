const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items = ["Buy Food", "Cook Food", "EAT FOOD O_O YUM YUM"];  //Global variable

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {   //When user tries to access the home route, res.send("Hello")
    let today = new Date();

    let currentDay = today.getDay();

    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    let day = today.toLocaleDateString("en-US", options);   //can be used to render date in japanese, chinese,...etc


    res.render("list", {kindOfday: day, newListItems: items});  //ejs list.html- passing JS objects
});

app.post("/", function(req, res) {

    item = req.body.newItem;

    items.push(item);

    res.redirect("/");   //Redirects to home route and then goes back to the app.get("/") and runs that code.
});

app.listen(3000, function() {
    console.log("Server started at port 3000");
});