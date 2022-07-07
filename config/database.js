const mongoClient = require('mongoose')
const connectString = process.env.CONNECT_STRING
exports.connect = () => {
    mongoClient
        .connect(connectString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log('Database connected!'))
        .catch((err) => {
            console.error('Connect Database from MongoDB failed !' + err)
            process.exit(1)
        })
}
