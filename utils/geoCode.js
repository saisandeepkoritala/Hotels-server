const request = require("request");
// User gives us address ,fetching latitude,longitude.
const geoCode=(address,callback)=>{
    const URL=`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic3Vubnl0YW11ayIsImEiOiJjbG43cGx4amcwcDVvMmtvZHlkMjVmNmY5In0.wCsRhvGwpugEjjd7ae_0ZA&limit=1`;
    request({url:URL,json:true},(err,res)=>{
        if(err){
            callback(err,null);
        }
        else if(res.body.features.length===0){
            callback(res.body,null)
        }
        else{
            callback(null,{latitude:res.body.features[0].center[1],
                longitude:res.body.features[0].center[0],
                location:res.body.features[0].place_name})
        }
    })
}

module.exports = geoCode;