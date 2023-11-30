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
    
    geoCode(req.body.searchTerm,(err,data)=>{

        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        

        // Get the current date

        // Calculate the next date
        const nextDate = new Date(currentDate);
        nextDate.setDate(currentDate.getDate() + 1);

        // Format the next date as "YYYY-MM-DD"
        const formattedNextDate = nextDate.toISOString().split('T')[0];


        // next day of nov 30 would be 31 , so invalid ,need to fix it

        if(err){
            console.log("Error",err)
            res.status(400).json({
                status:"Fail",
                message:"Address cant be fetched"
            })
        }
        
        else{
            getHotels(data.latitude,data.longitude,formattedDate,formattedNextDate)
            .then((data)=>{
                Hotel.create({hotels:data.data.result,name:"Testing data"})
                .then((res)=>console.log("success"))
                .catch((err)=>console.log("Error in saving hotels",err))
                res.status(200).json({
                    status:"Success",
                    message:"0",
                    data:data
                })
            })
            .catch((err)=>{
                res.status(400).json({
                    status:"Fail",
                    data
                })
            })
        }
    }) 
})

app.use("/getHotelDetails",async (req,res)=>{
    if(!(req.body.arrival && req.body.departure && req.body.id)){
        console.log("error")
        res.status(400).json({
            status:"Fail",
            message:"Need required fields"
        })
    }
    else{
        getHotelDetails(req.body.arrival,req.body.departure,req.body.id)
        .then((data)=>{
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