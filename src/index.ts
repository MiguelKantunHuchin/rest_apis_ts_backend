import server from "./server";


const port = process.env.PORT || 4000

//Descomentar las lineas de abajo al hacer tests

server.listen(port, () => {
// console.log(`Desde el puerto ${port}`)

})