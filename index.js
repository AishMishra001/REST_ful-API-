const express = require("express") ; 
const mongoose = require("mongoose") ; 
const app = express() ; 
const Product = require("../REST_ful API/product.model.js")

app.use(express.json()) ; 

app.get("/",(req,res)=>{
  res.send("hello from node api updated");
})

app.post("/api/product",async (req,res)=>{
    try{
      const product = await Product.create(req.body)
      res.status(200).json(product) ; 
     }catch(error){
      res.status(500).json({message : error.message })
    }
  })
  
  app.get("/api/products" , async (req,res)=>{
    try{
      const Products = await Product.find({}); 
      res.status(200).json(Products)
    }catch(e){
    res.status(500).json({message : error.message })
}
})

mongoose.connect("mongodb+srv://admin:pass@cluster0.o79ngt1.mongodb.net/Products?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
  console.log("connect to database!!") ; 
  app.listen(3000, ()=>{
    console.log("Server is running on port 3000")
  })
})
.catch(()=>{
  console.log("connection failed!!")
})