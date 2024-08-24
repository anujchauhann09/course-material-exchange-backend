const mongoose = require('mongoose')

const materialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  fileSize: {
    type: Number,
  },
  fileFormat: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  isFree: {
    type: Boolean,
    default: true,
  },
  course: {
    type: String,  
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  paymentStatus: { 
    type: String, enum: ['pending', 'completed', 'failed'],
    default: 'pending' 
  }, 
  transactionId: { 
    type: String 
  }, // Store transaction ID from payment gateway
}, {timestamp: true})

module.exports = mongoose.model('Material', materialSchema)
