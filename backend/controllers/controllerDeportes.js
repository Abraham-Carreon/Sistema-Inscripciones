import dbData from '../db.js'
import mysql from 'mysql'

const deportes = (req,res) =>
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

            const selectSports = `select * from Deportes`
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
}

export default deportes