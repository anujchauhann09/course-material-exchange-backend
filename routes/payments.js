const express = require('express')
const router = express.Router()
const Razorpay = require('razorpay')
const crypto = require('crypto')

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})

router.post('/checkout', async (req, res) => {
  const { amount } = req.body

  try {
    const options = {
      amount: amount * 100, // amount in paise
      currency: 'INR',
      receipt: crypto.randomBytes(10).toString('hex'),
    }

    const order = await razorpay.orders.create(options)
    return res.status(201).json({ orderId: order.id })
  } catch (err) {
    return res.status(500).send('Server error')
  }
})

router.post('/verify', (req, res) => {
    const { orderId, paymentId, signature } = req.body
    const generatedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${orderId}|${paymentId}`)
      .digest('hex')
  
    if (generatedSignature === signature) {
      return res.status(201).send('Payment verified')
    } else {
      return res.status(400).send('Payment verification failed')
    }
})

module.exports = router
