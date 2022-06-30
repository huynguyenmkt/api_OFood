const bodyParser = require('body-parser')
const express = require('express')
const logger = require('morgan')
const mongoClient = require('mongoose')
const dotenv = require('dotenv');
dotenv.config();

const connectString = process.env.CONNECT_STRING
//setup connect mongodb by mongoose
// mongoClient.connect(connectString, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true  }, ()=>{
//     console.log("connected mongoDB")
// })
mongoClient
  .connect(connectString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Database connected!"))
  .catch(err => console.log(err));

const app = express()



const port = process.env.PORT

const userRoute = require('./routes/user')

//Middlewares
app.use(logger('dev'))
app.use(bodyParser.json())
//Routes
app.use('/users',userRoute)
app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'Server is ok 123!'
  })
})
//Catch 404 Errors and forward them to error handle
app.use((req, res, next)=>{
    const err = new Error("Not Found")
    err.status = 404
    next(err)
})
// Error handler function
app.use(()=>{
    const error = app.get('env') === 'development' ? err : {}
    const status = err.status || 500

    return res.status(status).json({
        status: false,
        message: error.message,
        data: []
    })
})


//Start Server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})