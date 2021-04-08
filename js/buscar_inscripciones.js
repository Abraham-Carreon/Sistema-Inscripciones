document.addEventListener('DOMContentLoaded', () => {
    const boton = document.getElementById("buscar")
    const eliminar = document.getElementById('eliminar')
    async function validar() {
        let matricula = document.querySelector("#matricula")

        if (matricula.value !== "") {
            // document.body.style.background = "none"

            const url = `https://backend-inscripciones.herokuapp.com/api/inscripciones/${matricula.value}`
            const request = await fetch(url)
            const response = await request.json()
            if (request.ok) {
                alert("Usuario existe")
                const matriculad = document.querySelector('#matricula')
                const nombre = document.querySelector('#nombre')
                const semestre = document.querySelector('#semestre')
                const deprote = document.querySelector('#deporte')

                response.forEach(deportista => {
                    matriculad.value = deportista.Matricula
                    nombre.value = deportista.Nombre
                    semestre.value = deportista.Semestre
                    deporte.value = deportista.Nombre_deporte
                })
            } else {
                alert("Usuario no existe")
            }
        } 
        else 
        {
            if (deporte.value !== "") {
                // document.body.style.background = "none"
    
                const url = `https://backend-inscripciones.herokuapp.com/api/inscripciones/${Nombre_deporte}`
                const request = await fetch(url)
                const response = await request.json()
                if (request.ok) {
                    alert("Usuario existe")
                    const matriculad = document.querySelector('#matricula')
                    const nombre = document.querySelector('#nombre')
                    const semestre = document.querySelector('#semestre')
                    const deprote = document.querySelector('#deporte')
    
                    response.forEach(deportista => {
                        matriculad.value = deportista.Matricula
                        nombre.value = deportista.Nombre
                        semestre.value = deportista.Semestre
                        deporte.value = deportista.Nombre_deporte
                    })
                } else {
                    alert("Usuario no existe")
                }
            } else {
                document.body.style.background = "none"
                alert("Deporte incorrecto, verifique de nuevo")
            }
            document.body.style.background = "none"
            alert("Matricula incorrecta, verifique de nuevo")
        }
    }
    async function funEliminar() {
        let deporte = document.querySelector("#deportes")

      
    }

    boton.addEventListener('click', validar)
    eliminar.addEventListener('click', funEliminar)
})