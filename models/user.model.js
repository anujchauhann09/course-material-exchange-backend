const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    subscription: {
        type: String,
        default: 'free',
    },
  }, {
    timestamps: true, 
  })

  module.exports = mongoose.model('User', userSchema)

//   {
//     "name": "Anuj Chauhan",
//     "email": "anujchauhan@gmail.com",
//     "password": "anujchauhan",
//     "subscription": "paid"
//   }

// {
//     "name": "Anuj",
//     "email": "anuj@gmail.com",
//     "password": "anuj",
//     "subscription": "free"
// }