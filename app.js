 const express = require("express");
 const bodyParser = require("body-parser");
 const mongoose = require("mongoose");

const app = express();
app.set("view engine","ejs");


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolist").then(()=>console.log("connection is succesful")).catch((err)=>console.log(err));

const todolistSchema = new mongoose.Schema({
    name: String,
})

const newItem = new mongoose.model("task",todolistSchema);

app.get("/",function(req,res){

    newItem.find({},function(err,allitems){
        if(err){
            console.log(err);
        }else{
            res.render("list",{kindDay:"Today",newItemList:allitems});
        }
    })
});


app.post("/",function(req,res){
    
    var task = req.body.task;
    var items= req.body.button;
        if(task===""){
            res.redirect("/")
        }else{
            const taskName = new newItem({
                name:task,
             })
             newItem.insertMany([taskName]);
             res.redirect("/")
        }
})

  app.post("/delete",function(req,res){
      const checkedItem = req.body.deleteData;
      console.log(checkedItem);
      newItem.deleteMany({_id:checkedItem},function(err){
          if(err){
              console.log(err);
          }else{
              console.log("delete itemdata")
          }
          res.redirect("/");
      });
  }) 

app.listen(3000,function(){
    console.log("server is started on 3000");
})