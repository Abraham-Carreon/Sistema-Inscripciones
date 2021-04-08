document.addEventListener('DOMContentLoaded', () => {
    agregarMatricula()
    const boton = document.getElementById("buscar")
    async function validar() {
        let matricula = document.querySelector("#matricula")

        if (matricula.value !== "") {
            // document.body.style.background = "none"

            const url = `https://backend-inscripciones.herokuapp.com/api/deportistas/${matricula.value}`
            const request = await fetch(url)
            const response = await request.json()
            if (request.ok) {
                alert("Usuario existe")
                const nombre = document.querySelector('#nombre')
                const grupo = document.querySelector('#grupo')
                const semestre = document.querySelector('#semestre')
                const correo = document.querySelector('#correo')

                response.forEach(deportista => {
                    nombre.value = deportista.Nombre
                    grupo.value = deportista.Grupo
                    semestre.value = deportista.Semestre
                    correo.value = deportista.Correo
                })
            } else {
                alert("Usuario no existe")
            }
        } else {
            document.body.style.background = "none"
            alert("Matricula incorrecta, verifique de nuevo")
        }
    }
})

function agregarMatricula()
{
    const id = document.getElementById('identificador')
    const matricula = sessionStorage.getItem('administrador')
    id.innerHTML = `<b>Matricula: ${matricula}</b>`
}