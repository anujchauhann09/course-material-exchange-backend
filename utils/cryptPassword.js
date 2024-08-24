const bcrypt = require('bcrypt')

async function cryptPassword(password) {
    const salt = await bcrypt.salt(10)
    return await bcrypt.hash(password, salt)
}

async function comparePassword(password, userPassword) {
    const isMatch = await bcrypt.compare(password, userPassword)

    if(isMatch) return true
    else return false
}

module.exports = {cryptPassword, comparePassword}