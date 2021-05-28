document.addEventListener('DOMContentLoaded', () => {
    agregarMatricula()
    validarAdministrador()
    const boton = document.getElementById("aceptar")
    boton.addEventListener("click",validar)


})
agregarDeportes()
function agregarDeportes()
    {
        const url = "https://backend-inscripciones.herokuapp.com/api/deportes"
        fetch(url)
            .then(res =>res.json())
                .then(data => 
                    {
                        const deportes = document.getElementById('deporte')
                        data.forEach(deporte =>
                            {
                                const dep = document.createElement("option")
                                dep.textContent = deporte.Nombre_deporte
                                dep.value = deporte.Id_deporte
                                deportes.append(dep)                            
                            })
                    })
    }

    agregarInstructores()
function agregarInstructores()
    {
        const url = "https://backend-inscripciones.herokuapp.com/api/entrenadores"
        fetch(url)
            .then(res =>res.json())
                .then(data => 
                    {
                        const deportes = document.getElementById('instructor')
                        data.forEach(entrenador =>
                            {
                                const dep = document.createElement("option")
                                dep.textContent = entrenador.Nombre
                                dep.value = entrenador.Id_entrenador
                                deportes.append(dep)                            
                            })
                    })
    }

async function validar()
{
    
    const matricula=document.querySelector('#matricula').value
    const deporte=document.querySelector('#deporte').value
    const instructor=document.querySelector('#instructor').value
    
    if(matricula == "" || deporte == "---Seleccione una opcion---" || instructor == "---Seleccione una opcion---")
    {
        return alert("Falta un parametro")
    }
            const url = `https://backend-inscripciones.herokuapp.com/api/deportistas/${matricula}`
            const request = await fetch(url)
            const response = await request.json()

            if (request.ok) 
            {
                let nombre, matricula
                response.forEach(el => {
                    nombre = el.Nombre 
                    matricula = el.Matricula
                })
                const confirmacion = confirm(`Desea inscribir al alumno: ${nombre}\nCon matricula: ${matricula}`)
                
                if (confirmacion)
                {               
                    const matricula = document.querySelector('#matricula').value
                    const idDeporte = document.querySelector('#deporte').value
                    const idEntrenador = document.querySelector('#instructor').value
                    const idAdministrador = sessionStorage.getItem('administrador')
                    console.log(matricula, idDeporte, idEntrenador, idAdministrador)
                    const datos = {
                        matricula,
                        idEntrenador,
                        idDeporte,
                        idAdministrador
                    }
                    const url2 = `https://backend-inscripciones.herokuapp.com/api/inscripcion/`
                    fetch(url2, {
                        method: 'POST',
                        body: JSON.stringify(datos),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(res => {
                        if (res.ok) {
                            alert(`Usuario con la matricula: ${matricula} ha sido inscrito`)
                            window.location.reload()
                        } 
                        else {
                            alert("No fue inscrito")
                            window.location.reload()
                        }
                    })
                    .catch(error => console.error('Error:', error))
                }

                else
                {
                    alert("No se hizo la inscripcion")
                }
                
            } 
            else 
            {
                alert("Usuario no existe")
            }
    }

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
        window.location.href = "Sistema-Inscripciones/index.html"
    }
}