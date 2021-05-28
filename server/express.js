import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import models from './Models/IndexModels'
import routes from './Routes/IndexRoute'

const app = express()

// parse body params and attach them to req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// use helmet spy bisa dikenali SEO
app.use(helmet())

// secure apps by setting various HTTP headers
app.use(compress())

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

const CURRENT_WORKING_DIR = process.cwd()
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))
app.use("/miniproject/", (req, res) => {
    res.send("Hello  World from Mini Project")
});

// #middleware
app.use(async (req, res, next) => {
    req.context = {models};
    next();
});

//api routes
app.use('/api/users', routes.UsersRoutes)
app.use('/api/movies', routes.MoviesRoute)
app.use('/api/orders', routes.OrdersRoute)
app.use('/api/casts', routes.CastsRoute)

// Catch unauthorised errors
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ "error": err.name + ": " + err.message })
    } else if (err) {
        res.status(400).json({ "error": err.name + ": " + err.message })
        console.log(err)
    }
})

export default app