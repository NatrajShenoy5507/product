const locationData=require('../models/location')

exports.getAlllocation=(req,res)=>{
    locationData.find().then(
        loc=>{ res.status(200).json({message:"Data Fetched here is your locations", data:loc})
    }
    ).catch(error=>{
        res,status(50).json({message:"Error in database",error})
    })
   
}