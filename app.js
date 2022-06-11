 const express = require("express");
 const bodyParser = require("body-parser");

const app = express();

var newItems =[];
var workItem =[];

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    
    var today = new Date();
    var options = {
        weekday:"long",
        day:"numeric",
        month:"long",
    }

    const day = today.toLocaleDateString("en-US",options);
    res.render("list",{kindDay:day,newItemList:newItems});
});

app.post("/",function(req,res){
    
    var newItem = req.body.task;
    var items= req.body.button;

    if(items==="work"){
        workItem.push(newItem);
        res.redirect("/work");
    }else{
        newItems.push(newItem);
        res.redirect("/");
    }
})

app.get("/work",function(req,res){
    res.render("list",{kindDay:"work",newItemList:workItem})
})
app.get("/about",function(req,res){
    res.render("about");
})
app.listen(3000,function(){
    console.log("server is started on 3000");
})