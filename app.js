const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/paymentsDB");

const paymentSchema = {
    paymentID: String,
    name: String,
    amount: Number,
    ts: Number
};

const payment = mongoose.model("payments",paymentSchema);



app.post("/payments",(req,res,next)=>{

    console.log(req.body.paymentID);
    console.log(req.body.name);
    console.log(req.body.amount);

    const newPayment = new payment({
        paymentID: req.body.paymentID,
        name: req.body.name,
        amount: req.body.amount,
        ts: req.body.ts
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
  payment.find({}).sort({ts: -1}).exec(function(err,results){
    if(!err){
        res.send(results);
    }
    else{
        res.send("Error Occured");
    }
  }) 
})

app.delete("/payments",function(req,res){
    console.log(req.body._id);
    payment.findOneAndDelete({_id: req.body._id},function(err,result){
        if(err){
            res.send("Deletion Failed");
        }
        else{
            res.send("Successfully deleted");
        }
    })
})

app.listen(3000,(req,res)=>{
    console.log("Server started at port 3000");
})