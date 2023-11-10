const express = require("express");
const cors=require("cors");
const geoCode = require("./utils/geoCode");
const getHotels = require("./Api/getHotels");
const Hotel = require("./Models/hotels")
const app = express()

app.use(express.json());
app.use(cors());

app.use("/getHotels",(req,res)=>{
    // need to get address , arrival date, departure date.
    geoCode("1100 west corral ave apt 76",(err,data)=>{
        if(err){
            console.log("Error",err)
        }
        else{
            getHotels(data.latitude,data.longitude,"2023-11-08","2023-11-10")
            .then((data)=>{
                Hotel.create({hotels:data.data.result})
                .then((res)=>console.log("success"))
                .catch((err)=>console.log("Error in saving hotels",err))

                res.status(200).json({
                    status:"Success",
                    data:data.data.result
                })
            })
            .catch((err)=>{
                res.status(400).json({
                    status:"Success",
                    data
                })
            })
        }
    }) 
})

app.use("/getData",(req,res)=>{
    Hotel.findOne({name:"Sample Data"})
    .then((data)=>{
        res.status(200).json({
            status:"Success",
            data
        })
    })
    .catch((err)=>console.log("error"))

})

module.exports = app;