const express=require('express')
const Router=express.Router()
const paymentController=require('../Controllers/payment')

Router.post('/razorpay',paymentController.completePayment);
Router.post('/transaction',paymentController.saveTransaction );


module.exports=Router