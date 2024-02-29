const express = require("express") ; 
const mongoose = require("mongoose") ; 
const app = express() ; 


app.get("/",function(req,res){
  res.send("hello from node api updated");
})

mongoose.connect("mongodb+srv://admin:pass@cluster0.o79ngt1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
  console.log("connect to database!!") ; 
  app.listen(3000, ()=>{
    console.log("Server is running on port 3000")
  })
})
.catch(()=>{
  console.log("connection failed!!")
})