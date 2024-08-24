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
    paymentDetails: {
        upiId: { 
            type: String 
        },
    },
  }, {
    timestamps: true, 
  })

  module.exports = mongoose.model('User', userSchema)