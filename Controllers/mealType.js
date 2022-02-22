const mealTypes=require('../models/mealtype')

exports.getAllMealType=(req,res)=>{
    mealTypes.find().then(
        meal=>{
            res.status(200) .json({message:"Data Fetched here is your Meal Types", data:meal})
        }
    ).catch(error=>{
        res,status(50).json({message:"Error in database",error})
    })
}