const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
//const date = require(__dirname + "/filename.js"); //Basically used To add/import/export node modules a file JS

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true});

app.get("/", function(req, res) {   //When user tries to access the home route, res.send("Hello")
    let today = new Date();

    let currentDay = today.getDay();

    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    let day = today.toLocaleDateString("en-US", options);   //can be used to render date in japanese, chinese,...etc


    res.render("list", {listTitle: day, newListItems: items});  //ejs list.html- passing JS objects
});

app.post("/", function(req, res) {

    let item = req.body.newItem;

    //res.redirect("/");   //Redirects to home route and then goes back to the app.get("/") and runs that code.

    if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    } else{
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work", function(req,res) {
    res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res) {
    res.render("about");
});

app.listen(3000, function() {
    console.log("Server started at port 3000");
});