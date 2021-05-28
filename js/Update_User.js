document.addEventListener('DOMContentLoaded', () => {
    agregarMatricula()
    validarAdministrador()
    const boton = document.getElementById("mybutton")
    const btnInscripcion = document.getElementById('enviarInscripcion')
    const btnCancelar = document.getElementById("cancelarInscripcion")
    
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

    async function actualizarDatos() {
        const matricula = document.querySelector("#matricula").value
        const nombre = document.querySelector('#nombre').value
        const grupo = document.querySelector('#grupo').value
        const semestre = document.querySelector('#semestre').value
        const correo = document.querySelector('#correo').value

        /*let nombre = document.querySelector("#nombre").value
        let grupo = document.querySelector('#grupo').value
        let semestre = document.querySelector('#semestre').value
        let correo = document.querySelector('#correo').value*/

        if(nombre == "" || grupo == "" || semestre == "" || correo == "")
        {
            alert("Formulario incompleto, llene las credenciales correctamente")
        }
        
        else
        {
            const datos = {
                matricula,
                nombre,
                grupo,
                semestre, 
                correo
            }
            const url = `https://backend-inscripciones.herokuapp.com/api/deportistas/${matricula}`
            fetch(url, {
                    method: 'PUT', // or 'PUT'
                    body: JSON.stringify(datos), // data can be `string` or {object}!
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => {
                    res.json()
                    if (res.ok) {
                        alert(`Usuario con la matricula: ${matricula} ha sido actualizado`)
                        window.location.reload()
                    } else {
                        alert("No fue actualizado")
                        nombre.value = ""
                        grupo.value = ""
                        semestre.value = ""
                        correo.value = ""
                    }
                })
                .then(response => console.log('Success:', response))
                .catch(error => console.error('Error:', error))
        }
    }



    async function cancelar()
    {
        alert(`Operacion cancelada`)
        window.location.reload()
    }



    boton.addEventListener('click', validar)
    btnInscripcion.addEventListener('click', actualizarDatos)
    btnCancelar.addEventListener('click', cancelar)
})

function agregarMatricula()
{
    const id = document.getElementById('identificador')
    const matricula = sessionStorage.getItem('administrador')
    id.innerHTML = `<b>Matricula: ${matricula}</b>`
}

function validarAdministrador()
{
    const matricula = sessionStorage.getItem("administrador")
    
    if (matricula == null) 
    {
        document.body.style.background = "none"
        alert("No esta validado, ingrese sus credenciales")
        window.location.href = "Sistema-Inscripciones/src/index.html"
    }
}