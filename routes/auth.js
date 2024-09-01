const express = require('express')
const router = express.Router()
const User = require('../models/user.model')
const {cryptPassword, comparePassword} = require('../utils/cryptPassword')
const generateToken = require('../utils/generateToken')

router.post('/register', async (req, res) => {
    const {name, email, password, subscription} = req.body

    try {
        let user = await User.findOne({email})
        if(user) return res.status(400).json({message: 'User already exists'}) 

        user = new User({
            name,
            email,
            password,
            subscription
        })
        user.password = await cryptPassword(password)
        await user.save()

        const payload = {
            user: {
                id: user.id
            }
        }

        // console.log('Environment:', process.env.NODE_ENV)
        const token = generateToken(payload)
        // console.log('Generated Token:', token)

        // return res.status(201).json({token})

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',  // Ensure cookies are sent only over HTTPS in production
            sameSite: 'strict',  // Helps mitigate CSRF attacks
            maxAge: 3600000  // 1 hour expiration time for the cookie
        })

        return res.status(201).json({ message: 'User registered successfully' })
    } catch (error) {
        console.error('Error during registration:', error);  
        return res.status(500).json({ message: 'Server error', error: error.message })
    }
})

router.post('/login', async (req, res) => {
    const {email, password} = req.body

    try {
        let user = await User.findOne({email})
        if(!user)
            return res.status(400).json({message: 'Invalid credentials'})

        const isMatch = await comparePassword(password, user.password)
        if(!isMatch)
            return res.status(400).json({message: 'Invalid credentials'})

        const payload = {
            user: {
                id: user.id
            }
        }

        const token = generateToken(payload)

        // return res.status(201).json({token})

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000  
        })

        return res.status(200).json({ message: 'Login successful' })
    } catch (error) {
        console.error('Error during login:', error)
        return res.status(500).json({ message: 'Server error', error: error.message })
    }
})

module.exports = router