const mongoose=require('mongoose')
const config = require("config");
const dbconnection = async => {
    try {
        console.log("dbconnected", process.env.DB_connect)
        const conn = mongoose.connect("mongodb://localhost:27017/food-ordering", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then((conn) => {
            console.log(`Database connect: ${conn.connection.host}`)
        })
    } catch (error) {
        console.log('error occur to connect database' + error)
    }
}

module.exports = { dbconnection }