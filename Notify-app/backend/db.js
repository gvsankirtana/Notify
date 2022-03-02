const mongoose = require('mongoose');
const mongoURI = 'mongodb://0.0.0.0:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'
const connetToMongo = ()=>{
    mongoose.connect(mongoURI,{ useNewUrlParser: true, useUnifiedTopology: true  },(err)=>{
        if(err) console.log(err) 
        console.log("Connected to MongoDB")
    })
}
module.exports = connetToMongo;