const express = require('express')
const app = express()
const port = process.env.PORT || 9900;
const dotenv = require('dotenv').config();
const bodyParser = require('body-Parser')
const config = require("config");
const { dbconnection } = require('./connect/database')
dbconnection()


app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json());

const admin = require('./routes/admin')
const user = require('./routes/user')

app.use('/', admin);
app.use('/', user);


app.listen(port, () => {
    console.log(`server is listening ${port}`)
})