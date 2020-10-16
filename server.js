// Libraries something
const express = require('express')
const expressLayouts = require('express-layouts')

const app = express()

require('dotenv/config')

//Connect to Mongo
const mongoose = require('mongoose')
mongoose.connect(
    process.env.DB_CONNECTION,
    {useUnifiedTopology: true, useNewUrlParser: true},
    () => console.log('~')) 

//EJS
app.use(expressLayouts)
app.set('view engine','ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(express.static(__dirname + '/public'));

//Body Parser
app.use(express.urlencoded({extended:false}))

//Routes
const indexRoute = require('./routes/index')
const usersRoute = require('./routes/users')

//Route INIT
app.use('/', indexRoute)
app.use('/users', usersRoute)

const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`Server Started on Port  ${PORT}`))