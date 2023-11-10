const request=require("request");
// User getting weather info from latitude, longitude.
const foreCast=(latitude,longitude,location,callback)=>{
    const url=`http://api.weatherstack.com/current?access_key=1feb53d9615f50a2865d7c91e0fed3b9&query=${latitude},${longitude}&units=f`;

    request({url:url,json:true},(err,response)=>{
        if(err){
            callback("Error in finding for your lotion",null)
        }
        else if(response.body.error){
            callback("Address error",null)
        }
        else{
            callback(null,
                {Weather:response.body.current.weather_descriptions[0],
                Temperature :response.body.current.temperature,
                Location:location}
                )
            }
        }
    )
}


module.exports=foreCast;