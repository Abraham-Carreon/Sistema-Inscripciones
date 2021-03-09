import express from 'express'
import router from './routes/index.js'

const app = express()
const port = process.env.PORT || 5000

// Sirve para decodificar el json
app.use(express.json())
// Agrega body parser
app.use(express.urlencoded({extended: true}))

// Uso de todas las rutas
app.use(router)

app.listen(port, () => console.log(`Servidor corriendo en http://localhost:${port}`))