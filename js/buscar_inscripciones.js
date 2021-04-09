document.addEventListener('DOMContentLoaded', () => {

    validarAdministrador()
    agregarDeportes()
    agregarMatricula()
    const boton = document.getElementById("buscar")
    boton.addEventListener('click', buscar)
})

function agregarDeportes()
    {
        const url = "https://backend-inscripciones.herokuapp.com/api/deportes"
        fetch(url)
            .then(res =>res.json())
                .then(data => 
                    {
                        const deportes = document.getElementById('deportes')
                        data.forEach(deporte =>
                            {
                                const dep = document.createElement("option")
                                dep.textContent = deporte.Nombre_deporte
                                dep.value = deporte.Id_deporte
                                deportes.append(dep)                            
                            })
                    })
    }
    
    async function buscar() {
        
        const matricula = document.querySelector("#Matricula")
        const deportes = parseInt(document.getElementById('deportes').value)

        if (matricula.value !== "") {
            const url = `https://backend-inscripciones.herokuapp.com/api/inscripciones/${matricula.value}`
            const request = await fetch(url)
            const response = await request.json()
            if (!isNaN(matricula.value))
            {
                fetch(url)
                    .then(res => 
                        {
                            if (!res.ok)
                            {
                                alert("No existen inscripciones")
                                return window.location.reload()
                            }
                            return res.json()
                        })
                        .then(data => 
                            {
                                crearDatosTabla(data)
                            })            
            }
            else
            {
                alert(`No existen inscripciones con la matricula: ${matricula.value} `)
            }

    }
    else
    {        
        if (!isNaN(deportes))
        {
            const url = `https://backend-inscripciones.herokuapp.com/api/inscripciones/deporte/${deportes}`
            fetch(url)
                .then(res => 
                    {
                        if (!res.ok)
                        {
                            alert("No existen inscripciones")
                            return window.location.reload()
                        }
                        return res.json()
                    })
                    .then(data => 
                        {
                            crearDatosTabla(data)
                        })            
        }
        else
        {
            alert("Selecciona algun deporte o ingresa una matricula")
        }
    }

    if( !isNaN(deportes) && matricula.value !== "" )
    {
        const url = `https://backend-inscripciones.herokuapp.com/api/inscripciones/`
        const request = await fetch(url)
        const response = await request.json()
        crearDatosTabla(response)
    }
}

async function eliminar(e)
{
<<<<<<< HEAD
    let id_inscripcion = document.querySelector("#id_inscripcion")
    const url = `https://backend-inscripciones.herokuapp.com/api/inscripciones/${id_inscripcion}`

            fetch(url, {
=======
    e.preventDefault()
    const id_inscripcion = e.target.id
    const url = `https://backend-inscripciones.herokuapp.com/api/inscripcion/${id_inscripcion}`
            
    fetch(url, {
>>>>>>> 2fa3bc8a04a0a7d29ea6fc167be59a013e300afb
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => {
                    res.json()
                    if (res.ok) {
                        alert(`Inscripcion con la matricula: ${id_inscripcion} ha sido alminado`)
                        window.location.reload()
                    } else {
                        alert("Hubo un error al eliminar")
                        window.location.reload()
                    }
                })                
                .catch(error => console.error('Error:', error))
}

function crearDatosTabla(datos)
{
        const tabla = document.getElementById('inscripciones')
        datos.forEach(inscripcion =>
            {
                const fila = document.createElement('tr')
                const columnaMatricula = document.createElement('td')
                const columnaNombre = document.createElement('td')
                const columnaSemestre = document.createElement('td')
                const columnaDeporte = document.createElement('td')
                const columnaBotonDelete = document.createElement('button')

                // Agregar caracteristicas boton
                columnaBotonDelete.classList.add("button")
                columnaBotonDelete.classList.add("is-danger")
                columnaBotonDelete.classList.add("btnEliminar")
                columnaBotonDelete.textContent = "Eliminar"
                columnaBotonDelete.id = inscripcion.Id_inscripcion
                columnaBotonDelete.addEventListener('click', eliminar)

                columnaMatricula.textContent = inscripcion.Matricula
                columnaNombre.textContent = inscripcion.Nombre
                columnaSemestre.textContent = inscripcion.Semestre
                columnaDeporte.textContent = inscripcion.Nombre_deporte
                fila.append(columnaMatricula, columnaNombre, columnaSemestre, columnaDeporte, columnaBotonDelete)
                tabla.appendChild(fila)
            })
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
        window.location.href = "src/index.html"
    }
}