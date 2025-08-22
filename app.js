const express = require("express");
const path = require('path');
const app =express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
mongoose.connect('mongodb://localhost/contactDance');

const port =8000;
const fs = require('fs');


//Define mongoose scehma
var contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
  desc: String
});

var Contact = mongoose.model('Contact',contactSchema);



//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'));// for serving static files
app.use(express.urlencoded({ extended: true }));



//PUG SPECIFIC STUFF
app.set('view engine','pug');//set template engine as pug
app.set('views', path.join(__dirname,'views'));//set the view directory


//ENDPOINTS 
app.get('/',(req,res)=>{
    const paras={}
    res.status(200).render('home.pug',paras);
}); 


app.get('/contact',(req,res)=>{
    const paras={}
    res.status(200).render('contact.pug',paras);
}); 


app.post('/contact',(req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=> {
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.send(400).send('Item was not save to the database')
}); 

    /* res.status(200).render('contact.pug',paras); */
});


// START THE SERVER

app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`)
});