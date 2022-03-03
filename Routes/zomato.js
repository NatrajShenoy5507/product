const express=require('express')
const Router= express.Router()
const restaurantController=require('../Controllers/restaurant')
const locationController=require('../Controllers/location')
const mealTypeController=require('../Controllers/mealType')
const menuController=require('../Controllers/menu')

//configuartion of routes

Router.get('/restaurants',restaurantController.getAllRestaurants)
Router.post('/restaurants/filter/:pageNo',restaurantController.getAllRestaurantsByFilter)
Router.get('/restaurantDetails/:name',restaurantController.getAllRestaurantDetails)
Router.get('/restaurants/:city',restaurantController.getAllRestaurantsByCity)
Router.get('/location',locationController.getAlllocation)
Router.get('/mealtype',mealTypeController.getAllMealType)
Router.get('/menu/:rName',menuController.getAllMenuByRestaurantName)


module.exports= Router