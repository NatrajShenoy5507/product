const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const mongoose= require('mongoose')
const res = require('express/lib/response')
const zomatoRoutes= require('./Routes/zomato')
const paymentRoutes=require('./Routes/payment')


//Connecting to MongoDB

mongoose.connect('mongodb://localhost/zomato',()=>{
   console.log("Connected to MongoDB")
})

 
//Creating a server
var app=express();      //creating here server the moment i call this




//MiddleWare is interfereing the process add middle ware before routes
app.use(bodyParser.json())                //Body parser : Must be above the routes
app.use(cors())
 
 
//Adding Routes 
 
app.use('/zomato/',zomatoRoutes)                 //use this to add middleware
app.use('/pay',paymentRoutes)

if(process.env.NODE_ENV=="production"){
    app.use(express.static("zomato/build"))
    const path=require("path")
      app.get("*",(req,res)=>{
         res.sendFile(path.resolve(__dirname,"zomato","build","index.html"))
      })




// //Configurations these configurations should be part of router  //tell app to refer to the restaurant routes
// app.get('/',(req,res)=>{
//     res.send("Hii there you called GET method in express")
// })

// app.post('/',(req,res)=>{
//     res.send("Hii there you called POST method in express")
// })

// app.put('/',(req,res)=>{
//     res.send("Hii there you called PUT method in express")
// })


//listen
app.listen( process.env.PORT || 5050, ()=>{
    console.log("Express is running and Server is started")
})

//http is something core package of node js express is one package where we can easily ceate API
}
