import express from 'express'
import router from './router'
import db from './config/db'
import colors from 'colors'
import cors, { CorsOptions } from 'cors'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './config/swagger'


const port = process.env.PORT || 4000

//Contectar a la base de datos

async function connectDb() {

    try {
        await db.authenticate()
        db.sync()
        // console.log(colors.magenta("Conexion exitosa"))

    } catch (error) {
        console.log(error)
        // console.log(colors.red("Hubo un error al conectarse a la base de datos"))
    }
}

connectDb()

//Instancia de express
const server = express()

//Permitir conexiones

const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
        if (origin === process.env.FRONTEND_URL || process.env.BACKEND_URL) {
            callback(null, true)

        } else {

            callback(new Error("Conexion denegada bro"))
        }
    }
}


//Aquí se instncian las opciones para usarse
server.use(cors(corsOptions))

server.use(morgan('dev'))

//Leer datos de formularios
server.use(express.json())

server.use("/api/products", router)

//Documentacion
server.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec))




export default server