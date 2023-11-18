const express = require("express");
const cors=require("cors");
const geoCode = require("./utils/geoCode");
const getHotels = require("./Api/getHotels");
const getHotelDetails = require("./Api/getHotelsDetails");
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
            getHotels(data.latitude,data.longitude,"2023-11-15","2023-11-20")
            .then((data)=>{
                Hotel.create({hotels:data.data.result,name:"Testing data"})
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

app.use("/getHotelDetails",async (req,res)=>{
    console.log("posted",req.body)
    if(!(req.body.arrival && req.body.departure && req.body.id)){
        console.log("error")
    }
    // else{
    //     const values= await Hotel.findOne({name:"Testing data"})
    //     res.status(200).json({
    //             status:"Success",
    //                 Hotel_data:values
    //             })
    //     }
    else{
        getHotelDetails(req.body.arrival,req.body.departure,req.body.id)
        .then((data)=>{
            console.log("data fetched from the server",data.data)
            res.status(200).json({
                status:"Success",
                Hotel_data:data
            })
        })
        .catch((err)=>{
            res.status(400).json({
                status:"Fail",
                message:"Error",err
            })
        })
    }
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

app.use("/getAllHotelsData",(req,res)=>{
    Hotel.find({name:"Testing data"})
    .then((data)=>{
        res.status(200).json({
            status:"Success",
            Hotels_details:data
        })
    })
    .catch((err)=>console.log("error"))
})


module.exports = app;