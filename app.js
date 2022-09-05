const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/paymentsDB");

const paymentSchema = {
    paymentID: String,
    name: String,
    amount: Number
};

const payment = mongoose.model("payments",paymentSchema);



app.post("/payments",(req,res,next)=>{

    console.log(req.body.paymentID);
    console.log(req.body.name);
    console.log(req.body.amount);

    const newPayment = new payment({
        paymentID: req.body.paymentID,
        name: req.body.name,
        amount: req.body.amount
    })
    newPayment.save((err)=>{
        if(!err){
            res.send("Successfully added payments to database");
        }
        else{
            res.send("Error Occured");
        }
    })

});

app.get("/payments",function(req,res){
  payment.find(function(err,results){
    if(!err){
        res.send(results);
    }
    else{
        res.send("Error Occured");
    }
  }) 
})

app.listen(3000,(req,res)=>{
    console.log("Server started at port 3000");
})