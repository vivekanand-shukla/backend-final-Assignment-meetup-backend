require('dotenv').config();
const mongoUri = process.env.MONGODB;
const mongoose = require('mongoose')


const dbConnect = async()=>{
  await mongoose.connect(mongoUri).then(()=>{
    console.log("db connected sucessfuly")
  }).catch((error)=>{
    console.log("error occured while conecting the db" ,error)
  })
}

module.exports ={ dbConnect}
