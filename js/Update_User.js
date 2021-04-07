    const boton = document.getElementById("mybutton")
    const boton = document.getElementById("btncancelar")
    const boton = document.getElementById("btnaceptar")

    function validar()
    {
        var matricula = document.querySelector("#matricula")
            nombre = document.querySelector("#nombre")
            grupo = document.querySelector("#grupo")
            semestre = document.querySelector("#semestre")
            correo = document.querySelector("#correo")
                  
            document.body.style.background = "none"
            alert("Matricula verificada")      

                    const request = await fetch(url, {
                            method: 'GET', 
                            body: JSON.stringify(nombre, grupo, semestre, correo), 
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }).then(res => {
                            res.json()
                        })
                        .then(response => console.log('Success:', response))
                        .catch(error => console.error('Error:', error))
            }
    boton.addEventListener('click', validar)  
    
    function datos()
    {
        async function prueba() {
            let admin = sessionStorage.getItem("administrador")
            const datos = {
                matricula: 1953829,
                grupo: 1,
                semestre: 3,
                correo: abraham
            }
            const url = 'https://backend-inscripciones.herokuapp.com/api/deportistas/'
            fetch(url, {
                    method: 'PATCH',
                    body: JSON.stringify(datos), 
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => {
                    res.json()
                    if (res.ok) {
                        alert("Inscripcion fue actualizada")
                    } else {
                        alert("La inscripcion no fue actualizada")
                    }
                })
                .then(response => console.log('Success:', response))
                .catch(error => console.error('Error:', error))
            }
        }