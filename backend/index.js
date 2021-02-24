import express from 'express';

const app = express()

const port = process.env.PORT || 5000

app.get('/entrenadores' , (req,res) =>
{  
    res.write("Datos")
    res.end()
})

app.listen(port, () => console.log(`Servidor corriendo en http://localhost:${port}`))