const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const _ = require("lodash");
//const date = require(__dirname + "/filename.js"); //Basically used To add/import/export node modules a file JS

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-subodh:2580@subodh-m0uhl.mongodb.net/todolistDB", {useNewUrlParser: true});

const itemsSchema = {
    name: String
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
    name: "Welcome to your todolist"
});

const item2 = new Item({
    name: "Hit the + button to add todolist"
});

const item3 = new Item({
    name: "<--- Hit this to delete an item"
});

const defaultItems = [item1, item2, item3];

const listSchema = {
    name: String,
    items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);

app.get("/", function(req, res) {   //When user tries to access the home route, res.send("Hello")

    Item.find({}, function(err, foundItems){
        if(foundItems.length === 0){
            Item.insertMany(defaultItems, function(err){
                if(err){
                    console.log(err);
                }
                else {
                    console.log("Sucessfully Saved Default Items to Database");
                }
            });
            res.redirect("/");
        } else {
             res.render("list", {listTitle: "Today", newListItems: foundItems});  //ejs list.html- passing JS objects
        }
    });

});

app.post("/", function(req, res) {

    const itemName = req.body.newItem;
    const listName = req.body.list;

    const item = new Item({
    name: itemName
});

if(listName === "Today"){
    item.save();
    res.redirect("/");   //Redirects to home route and then goes back to the app.get("/") and runs that code.
} else {
    List.findOne({name: listName}, function(err, foundList){
        foundList.items.push(item);
        foundList.save();
        res.redirect("/" + listName);
    })
    }
});

app.post("/delete", function(req,res){
    const checkedItemId = req.body.checkbox;
    const listName = req.body.listName;

    if(listName === "Today"){
        Item.findByIdAndRemove(checkedItemId, function(err){
            if(!err){
                console.log("Sucessfully Removed the item");
                res.redirect("/");
            }
        });
    } else {
        List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}, function(err, foundList){
            if(!err){
                res.redirect("/" + listName);
            }
        });
    }

   
});

app.get("/:customName", function(req,res) {
    const customName = _.capitalize(req.params.customName);

List.findOne({name: customName}, function(err, foundList){
    if(!err){
        if(!foundList){
            const list = new List({
                name: customName,
                items: defaultItems
            });
            list.save();
            res.redirect("/" + customName);
        }
        else {
            res.render("list",{listTitle: foundList.name, newListItems: foundList.items});
        }
    }
});
});

app.get("/about", function(req, res) {
    res.render("about");
});

let port = process.env.PORT;
if(port == null || port == "") {
    port = 3000;
}

app.listen(port, function() {
    console.log("Server started at port 3000");
});