const jwt = require('jsonwebtoken')

function generateToken(payload) {
    try {
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })
        return token
    } catch (error) {
        console.error('Error generating token:', error)
        throw error
    }
}

module.exports = generateToken