import express from 'express'
import mysql from 'mysql'

const app = express()

const port = process.env.PORT || 5000

// Sirve para decodificar el json
app.use(express.json())
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
                    // Retorna si existe el deportista
                    if (result.length > 0)
                    {
                        res.status(200).json(result)                  
                    } 

                    else
                    {
                        res.status(401).json({ "Mensaje": `El deportista con la matricula ${matricula} no existe`})                    
                    }
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

app.put('/api/deportistas/:id' , (req,res) =>
{  
    const matricula = req.params.id

    // Tratar las variables para evitar SQL Injection 
    let { nombre, grupo, semestre, correo } = req.body
    nombre = nombre.replace(";", "")
    correo = correo.replace(";", "")

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
            const updateAthletes = `
                                    update deportistas 
                                    set Matricula = ${matricula}, 
                                    Nombre = '${nombre}', 
                                    Grupo = ${grupo}, 
                                    Semestre = ${semestre}, 
                                    Correo = '${correo}' 
                                    where Matricula = ${matricula} `

            connection.query(updateAthletes, (err, result, fields) =>
            {
                if (err) 
                {
                    console.log(err)
                    res.status(406).json( { Mensaje: "Hubo un error al actualizar o no existe el usuario"} )
                }
                else
                {
                    // Retorna los deportes a el endpoint y tambien el status
                    res.status(200).json({ "Mensaje": `El usuario con la matricula ${matricula} ha sido actualizado`})                    
                    
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

app.post('/api/administradores/' , (req,res) =>
{
    // Tratar las variables para evitar SQL Injection
    let matricula = req.body.matricula  
    let contrasena = req.body.contrasena
    contrasena = contrasena.replace(";", "")

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
            const updateAthetes = `
                                    select * from administradores
                                    where Matricula = ${matricula} and Contraseña = '${contrasena}' `

            connection.query(updateAthetes, (err, result, fields) =>
            {
                if (err) 
                {
                    console.log(err)
                    res.status(406).json( { Mensaje: "Hubo un error al actualizar o no existe el usuario"} )
                }
                else
                {
                    // Retorna si existe el administrador
                    if (result.length > 0)
                    {
                        res.status(200).json({ "Mensaje": `El administrador con la matricula ${matricula} existe`})                    
                    } 
                        
                    else
                    {
                        res.status(401).json({ "Mensaje": `El administrador con la matricula ${matricula} no existe`})                    
                    }
                    
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

app.post('/api/inscripcion/' , (req,res) =>
{
    const { matricula, idEntrenador, idDeporte, idAdministrador } = req.body
    let fecha = new Date()
    fecha = `${fecha.getFullYear()}/${fecha.getMonth()}/${fecha.getDate()}`
    
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
            const insertInscription = `
                                    insert into inscripciones(Matricula, Id_entrenador, Id_deporte, Fecha_inscripcion, Id_administrador)
                                    values(${matricula}, ${idEntrenador}, ${idDeporte}, '${fecha}', ${idAdministrador})
                                     `

            connection.query(insertInscription, (err, result, fields) =>
            {
                if (err) 
                {
                    console.log(err)
                    res.status(406).json( { Mensaje: "Hubo un error al insertar o no existe el usuario"} )
                }
                else
                {
                    // Retorna las inscripciones a el endpoint y tambien el status
                    res.status(200).json({ "Mensaje": `El usuario con la matricula ${matricula} ha sido inscrito`})                    
                    
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

// Busca una inscripcion por la matricula
app.get('/api/inscripciones/:id' , (req,res) =>
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

            const searchInscription =   `
                                        SELECT *
                                        FROM inscripciones
                                        INNER JOIN deportistas 
                                        ON deportistas.Matricula = inscripciones.matricula
                                        INNER JOIN deportes
                                        on deportes.Id_deporte = inscripciones.Id_deporte
                                        where inscripciones.matricula = ${matricula}
                                        `
            connection.query(searchInscription, (err, result, fields) =>
            {
                if (err) 
                {
                    console.log(err)
                    res.status(400).json( { Mensaje: "Hubo un error en la busqueda"} )
                }
                else
                {
                    // Retorna si existe la inscripcion
                    if (result.length > 0)
                    {
                        res.status(200).json(result)                  
                    } 

                    else
                    {
                        res.status(401).json({ "Mensaje": `No existen inscripciones`})                    
                    }

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


// Busca una inscripcion por el id del deporte
app.get('/api/inscripciones/deporte/:id' , (req,res) =>
{  
    const idDeporte = req.params.id
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
            const searchInscription = ` SELECT *
                                        FROM inscripciones
                                        INNER JOIN deportistas 
                                        ON deportistas.Matricula = inscripciones.matricula
                                        INNER JOIN deportes
                                        on deportes.Id_deporte = inscripciones.Id_deporte
                                        where inscripciones.Id_deporte = ${idDeporte}`

            connection.query(searchInscription, (err, result, fields) =>
            {
                if (err) 
                {
                    console.log(err)
                    res.status(400).json( { Mensaje: "Hubo un error en la busqueda"} )
                }
                else
                {
                    // Retorna si existe la inscripcion
                    if (result.length > 0)
                    {
                        res.status(200).json(result)                  
                    } 

                    else
                    {
                        res.status(401).json({ "Mensaje": `No existen inscripciones`})                    
                    }

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