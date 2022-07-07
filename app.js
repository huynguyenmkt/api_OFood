const bodyParser = require('body-parser')
const express = require('express')
const logger = require('morgan')
const dotenv = require('dotenv')
dotenv.config()

const database = require('./config/database')

database.connect()

const app = express()

const port = process.env.PORT

const userRoute = require('./routes/user')
const foodRoute = require('./routes/food')
const categoryRoute = require('./routes/category')
const cartRoute = require('./routes/cart')
const addressRoute = require('./routes/address')
const billRoute = require('./routes/bill')
const reviewRoute = require('./routes/review')

//Middlewares
app.use(logger('dev'))
app.use(bodyParser.json())

//Routes
app.use('/api/users', userRoute)
app.use('/api/food', foodRoute)
app.use('/api/category', categoryRoute)
app.use('/api/cart', cartRoute)
app.use('/api/address', addressRoute)
app.use('/api/bill', billRoute)
app.use('/api/review', reviewRoute)

app.get('/', (req, res) => {
    return res.status(200).json({
        message: 'Server is ok 123!',
    })
})
//Catch 404 Errors and forward them to error handle
app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})
// Error handler function
app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err : {}
    const status = err.status || 500

    return res.status(status).json({
        status: false,
        message: error.message,
        data: [],
    })
})

//Start Server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
