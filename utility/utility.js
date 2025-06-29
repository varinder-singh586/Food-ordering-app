const bcrypt = require('bcrypt')
const config = require('config')
const jwt = require('jsonwebtoken');
// const messages = require("../message").messages.MESSAGES;


module.exports = {
    hashPasswordUsingBcrypt: async (plainTextPassword) => {
        return bcrypt.hashSync(plainTextPassword, 10);
    },

    comparePasswordUsingBcrypt: async (pass, hash) => {
        return bcrypt.compareSync(pass, hash)
    },
    success: async (res, data) => {
        return res.status(200).json({
            data: data,
        })
    },
    failure: async (res,message) => {
        return res.status(400).json({
            message
        })
    },

}









// jwtSign: async (payload) => {
    //     try {
    //         return jwt.sign(payload, config.get("jwtOption.jwtSecretKey"), { expiresIn: config.get("jwtOption.expiresIn") });
    //     } catch (error) {
    //         throw error;
    //     }
    // },
    // getJwtExpireTime : async () =>{
    //     return  parseInt(config.get("jwtOption.expiresIn").replace("s", ""));
    // },





