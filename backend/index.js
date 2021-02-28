import express from 'express'
import mysql from 'mysql'

const app = express()

const port = process.env.PORT || 5000

const dbData = 
{
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'inscripciones'
}

app.get('/entrenadores' , (req,res) =>
{  
    const connection = mysql.createConnection(dbData)

    connection.connect((err) =>
    {
        if (err) console.log(err)

        else 
        {
            console.log("Conexion hecha correctamente")

            const selectTrainers = `select * from entrenadores`
            connection.query(selectTrainers, (err, result, filelds) =>
            {
                if (err) console.log(err)

                else
                {
                    console.log(result)
                    res.json(result)
                }
            })
        }
    })
})

app.listen(port, () => console.log(`Servidor corriendo en http://localhost:${port}`))