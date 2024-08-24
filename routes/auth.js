const express = require('express')
const router = express.Router()
const User = require('../models/user.model')
const {cryptPassword, comparePassword} = require('../utils/cryptPassword')
const generateToken = require('../utils/generateToken')

router.post('/register', async (req, res) => {
    const {name, email, password} = req.body

    try {
        let user = await User.findOne({email})
        if(user) return res.status(400).json({message: 'User already exists'}) 

        user = new User({
            name,
            email,
            password
        })
        user.password = cryptPassword(password)

        const payload = {
            user: {
                id: user.id
            }
        }

        const token = generateToken(payload)

        return res.status(201).json({token})
    } catch (error) {
        return res.status(500).send('Server error')
    }
})

router.post('/login', async (req, res) => {
    const {email, password} = req.body

    try {
        let user = await User.findOne({email})
        if(!user)
            return res.status(400).json({message: 'Invalid credentials'})

        const isMatch = comparePassword(password, user.password)
        if(!isMatch)
            return res.status(400).json({message: 'Invalid credentials'})

        const payload = {
            user: {
                id: user.id
            }
        }

        const token = generateToken(payload)

        return res.status(201).json({token})
    } catch (error) {
        return res.status(500).send('Server error')
    }
})

