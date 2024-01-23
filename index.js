import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import connectDB from './connectDB.js'
import authRoutes from './routes/auth.js'
import hotelRoutes from './routes/hotel.js'
import userRoutes from './routes/user.js'
import cookieParser from 'cookie-parser'

dotenv.config()
const app = express()
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Booking App')
})

app.use('/auth', authRoutes)
app.use('/users',userRoutes)
app.use('/hotels', hotelRoutes)

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const messageStatus = err.message || 'Something went wrong'
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: messageStatus,
        stack: err.stack,
    })
})
const PORT = process.env.PORT || 6000
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})
connectDB()