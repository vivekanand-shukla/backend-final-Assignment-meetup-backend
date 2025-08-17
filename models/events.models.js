const mongoose = require("mongoose");

const meetupAppSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  eventType: {
    type: String,
    required: true,
    enum: ["online", "offline"]
  },
  eventUrl: {
    type: String,
    required: true
  },
  eventStart: {
    type: Date,
    required: true
  },
  eventEnd: {
    type: Date,
    required: true
  },
  hostedBy: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  dressCode: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  eventTags: {
    type: [String],
    required: true
  },
  venue: {
    type: String, 
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  speakers: [{
    name: { type: String, required: true },
    post: { type: String, required: true }
  }]
});

const meetupApp = mongoose.model('meetupApp' ,meetupAppSchema)
module.exports= meetupApp;



