const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'
const connetToMongo = ()=>{
    mongoose.connect(mongoURI,{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },()=>{
        console.log("Connected to MongoDB")
    })
}
module.exports = connetToMongo;