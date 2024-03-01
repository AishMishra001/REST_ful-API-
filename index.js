const express = require("express") ; 
const mongoose = require("mongoose") ; 
const app = express() ; 
const Product = require("../REST_ful API/product.model.js");

app.use(express.json()) ; 
app.use(express.urlencoded({extended : false })) ; // will now allow to add all kinds of ways to add files like json , xml , form etc ; 

// Checking api

app.get("/",(req,res)=>{
  res.send("hello from node api updated");
})

// posting products in database 

app.post("/api/product",async (req,res)=>{
    try{
      console.log(req.body.name) ; 
      const product = await Product.create(req.body)
      res.status(200).json(product) ; 
     }catch(error){
      res.status(500).json({message : error.message })
    }
  })
  
  // getting all the products made in database 

  app.get("/api/products" , async (req,res)=>{
    try{
      const Products = await Product.find({}); 
      res.status(200).json(Products)
    }catch(e){
    res.status(500).json({message : error.message })
}
})

// getting a single product using id from database 

app.get("/api/product/:id" , async (req,res) =>{
  try {
    const id = req.params.id ; 
    const product = await Product.findById(id) ; 
     res.status(200).json(product) ; 
    }
   catch (error) {
    res.status(400).json({message : error.message })
  }
})

// updating a product using id 

app.put("/api/product/:id" , async (req,res) =>{
  try {
    const id = req.params.id ; 
    const product = await Product.findByIdAndUpdate(id , req.body )
    
    if(!product){
      return  res.status(404).json({
          msg : "product not found" 
      })
    }

    const UpdatedProduct = await Product.findById(id) ; 
    res.status(200).json(UpdatedProduct) ; 
  } catch (error) {
    res.status(500).json({
      msg : error.message 
    })
  }
})

// deleting a product using id 

app.delete('/api/product/:id', async (req,res)=>{
   try {
    const id = req.params.id ; 
    const product =await Product.findByIdAndDelete(id) ; 
    
    if(!product){
      res.status(404).json({
        msg : "Product Not Found "
      })
    } 
    res.status(200).json({
      msg : "Product deleted Successfully !! "
    })

   } catch (error) {
     res.status(404).json(error.message) ; 
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