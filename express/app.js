const express = require("express")
const app = express();
const path = require(`path`);
const fs = require('fs');
const bodyparser = require("body-parser")
const port = 80;


const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Contactdata');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const ContactSchema = new mongoose.Schema({
    name: String,
    age: String,
    Email: String,
    Phoneno: Number,
    Address: String,
  });


  const Contact = mongoose.model('contact', ContactSchema );
















app.use(`/static`, express.static(`static`))
app.use(express.urlencoded())

app.set(`view engine`,`pug`)
app.set(`views`, path.join(__dirname, `views`))


app.get("/",(req,res)=>{
    const params = {}
    res.status(200).render('home.pug', params );
})

app.get("/contact",(req,res)=>{
    const params = {}
    res.status(200).render('contact.pug', params );
})


app.post("/contact",(req,res)=>{
    var myData = new  Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been send to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved")
    });
        
//      res.status(200).render('contact.pug' );
 })



app.get("/about",(req,res)=>{
    const params = {}
    res.status(200).render('about.pug', params );
})
app.get("/donate",(req,res)=>{
    const params = {}
    res.status(200).render('donate.pug', params );
})

app.get("/help",(req,res)=>{
    const params = {}
    res.status(200).render('help.pug', params );
})







 


app.listen(port,()=>{
   console.log(`The application started successfully on port ${port}` )
});