const express=require("express")
const mongoose=require("mongoose")
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const dotenv=require("dotenv")


// const bodyParser=require("body-parser")
dotenv.config()
const router=require("./router/router")
const port=5555
const app=express()
app.use(express.json())


// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());



app.listen(port,()=>{console.log("listening on port "+port)})
mongoose.connect(process.env.url).catch((error)=>{
    console.log(error.message)
}).then(()=>{ 
    console.log("Connection to the database i  s sucessful") 
})


const  store = new MongoDBStore({
  uri: process.env.url, 
  //databaseName: 'myDb',
  collection: 'mySessions',


});
app.use(session({
    secret: 'joshua',
    resave: false,
    saveUninitialized: true,
    store
  }))
  app.use(router)                                                                                                                                                                                                                                                                                                           