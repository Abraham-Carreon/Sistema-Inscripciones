import dbData from '../db.js'
import mysql from 'mysql'

// Busca todas las inscripciones
const GetAllInscripciones = (req,res) =>
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
            const searchInscription = ` SELECT *
                                        FROM Inscripciones
                                        INNER JOIN Deportistas 
                                        ON Deportistas.Matricula = Inscripciones.Matricula
                                        INNER JOIN Deportes
                                        on Deportes.Id_deporte = Inscripciones.Id_deporte
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
                    // Retorna las inscripciones existentes
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
}

// Busca una inscripcion por la matricula
const GetInscripcionID = (req,res) =>
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
                                        FROM Inscripciones
                                        INNER JOIN Deportistas 
                                        ON Deportistas.Matricula = Inscripciones.Matricula
                                        INNER JOIN Deportes
                                        on Deportes.Id_deporte = Inscripciones.Id_deporte
                                        where Inscripciones.Matricula = ${matricula}
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
}

// Busca una inscripcion por el id del deporte
const GetInscripcionIDDeporte = (req,res) =>
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
                                        FROM Inscripciones
                                        INNER JOIN Deportistas 
                                        ON Deportistas.Matricula = Inscripciones.Matricula
                                        INNER JOIN Deportes
                                        on Deportes.Id_deporte = Inscripciones.Id_deporte
                                        where Inscripciones.Id_deporte = ${idDeporte}`

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
}

// Insertar la inscripcion en la base de datos
const PostInscripcion = (req,res) =>
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
                                    insert into Inscripciones(Matricula, Id_entrenador, Id_deporte, Fecha_inscripcion, Id_administrador)
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
}

// Elimina la inscripcion en la base de datos por el id de la inscripcion 
const DeleteInscripcion = (req,res) =>
{
    const idInscripcion = req.params.id
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
            const deleteInscription = `
                                    delete from Inscripciones
                                    where Id_inscripcion = ${idInscripcion}
                                    `

            connection.query(deleteInscription, (err, result, fields) =>
            {
                if (err) 
                {
                    console.log(err)
                    res.status(406).json( { Mensaje: "Hubo un error al eliminar o no existe la inscripcion"} )
                }
                else
                {
                    // Aviso de que la inscripcion ha sido eliminada
                    res.status(200).json({ "Mensaje": `La inscripcion ha sido eliminada`})                    
                    
                    connection.end((err) =>
                    {
                        if (err) console.log(err)
                        
                        else console.log("Conexion cerrada correctamente")
                    })
                }
            })
        }
    })
}

export 
{
    GetAllInscripciones,
    GetInscripcionID,
    GetInscripcionIDDeporte,
    PostInscripcion,
    DeleteInscripcion
}