import express from 'express'
import mysql from 'mysql'

const app = express()

const port = process.env.PORT || 5000

// Agrega body parser
app.use(express.urlencoded({extended: true}))

const dbData = 
{
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'inscripciones'
}

app.get('/api/entrenadores' , (req,res) =>
{  
    const connection = mysql.createConnection(dbData)

    connection.connect((err) =>
    {
        if (err) 
        {
            console.log(err)
            res.status(500).json( { Mensaje: "Error en la conexion de la base de datos"} )
        }

        else 
        {
            console.log("Conexion hecha correctamente")

            const selectTrainers = `select * from entrenadores`
            connection.query(selectTrainers, (err, result, fields) =>
            {
                if (err) 
                {
                    console.log(err)
                    res.status(400).json( { Mensaje: "Hubo un error en la busqueda"} )
                }

                else
                {
                    // Retorna los entrenadores a el endpoint y tambien el status
                    res.status(200).json(result)

                    connection.end((err) =>
                    {
                        if (err) console.log(err)
                
                        else console.log("Conexion cerrada correctamente")
                    })
                }
            })
        }
    })
})

app.get('/api/deportes' , (req,res) =>
{  
    const connection = mysql.createConnection(dbData)

    connection.connect((err) =>
    {
        if (err) 
        {
            console.log(err)
            res.status(500).json( { Mensaje: "Error en la conexion de la base de datos"} )
        }

        else 
        {
            console.log("Conexion hecha correctamente")

            const selectSports = `select * from deportes`
            connection.query(selectSports, (err, result, fields) =>
            {
                if (err) 
                {
                    console.log(err)
                    res.status(400).json( { Mensaje: "Hubo un error en la busqueda"} )
                }
                else
                {
                    // Retorna los deportes a el endpoint y tambien el status                
                    res.status(200).json(result)

                    connection.end((err) =>
                    {
                        if (err) console.log(err)
                
                        else console.log("Conexion cerrada correctamente")
                    })
                }
            })
        }
    })
})

app.get('/api/deportistas/:id' , (req,res) =>
{  
    const matricula = req.params.id

    const connection = mysql.createConnection(dbData)

    connection.connect((err) =>
    {
        if (err) 
        {
            console.log(err)
            res.status(500).json( { Mensaje: "Error en la conexion de la base de datos"} )
        }

        else 
        {
            console.log("Conexion hecha correctamente")

            const selectAthletes = `select * from deportistas where Matricula = ${matricula}`
            connection.query(selectAthletes, (err, result, fields) =>
            {
                if (err) 
                {
                    console.log(err)
                    res.status(400).json( { Mensaje: "Hubo un error en la busqueda"} )
                }
                else
                {
                    // Retorna los deportes a el endpoint y tambien el status
                    res.status(200).json(result)                    
                    
                    connection.end((err) =>
                    {
                        if (err) console.log(err)
                        
                        else console.log("Conexion cerrada correctamente")
                    })
                }
            })
        }
    })
})

app.listen(port, () => console.log(`Servidor corriendo en http://localhost:${port}`))