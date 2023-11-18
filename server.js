const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({path:`${__dirname}/config.env`});
const app=require("./app");

const DB=process.env.DATABASE.replace("<PASSWORD>",process.env.PASSWORD)
const PORT = process.env.PORT; 

mongoose.connect(DB)
.then((res)=>console.log("Connection is Successful"))
.catch((err)=>console.log("Error in Connecting to DB ",err))

app.listen(PORT,(err,res)=>{
    if(err){
        console.log("Error in listening")
    }
    else{
        console.log(`Server is running on ${PORT}`)
    }
})
