import dbData from '../db.js'
import mysql from 'mysql'

const GetDeportistasID = (req,res) =>
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
}

const PutDeportistasID = (req,res) =>
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
}

export { GetDeportistasID, PutDeportistasID }