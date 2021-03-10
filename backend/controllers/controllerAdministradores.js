import dbData from '../db.js'
import mysql from 'mysql'

const Administradores = (req,res) =>
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
                                    select * from Administradores
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
}

export default Administradores