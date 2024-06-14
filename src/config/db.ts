import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv'
dotenv.config()

const db = new Sequelize(process.env.DATABASE_URL!, {
models : [__dirname + '/../models/**/*'],
logging : false //Esto sirve para deshabilitar los logs de Sequelize

})

//Comentario de referencia
export default db