document.addEventListener('DOMContentLoaded', () => {

    // validarAdministrador()

    // agregarDeportes()
    agregarDeportes()
    const boton = document.getElementById("buscar")
    const boton1 = document.getElementById("id_inscripcion")
    async function buscar() {
        let matricula = document.querySelector("#Matricula")

        if (matricula.value !== "") {
            // document.body.style.background = "none"

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
    
                columnaMatricula.textContent = inscripcion.Matricula
                columnaNombre.textContent = inscripcion.Nombre
                columnaSemestre.textContent = inscripcion.Semestre
                columnaDeporte.textContent = inscripcion.Nombre_deporte
                fila.append(columnaMatricula, columnaNombre, columnaSemestre, columnaDeporte)
                tabla.appendChild(fila)
                
            })
    }
    }
    else
    {
        const deportes = parseInt(document.getElementById('deportes').value)
    
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
    
                columnaMatricula.textContent = inscripcion.Matricula
                columnaNombre.textContent = inscripcion.Nombre
                columnaSemestre.textContent = inscripcion.Semestre
                columnaDeporte.textContent = inscripcion.Nombre_deporte
                fila.append(columnaMatricula, columnaNombre, columnaSemestre, columnaDeporte)
                tabla.appendChild(fila)
                
            })
    }
    }
    if(deportes.value !== "" || matricula.value !== "")
    {
        const url = `https://backend-inscripciones.herokuapp.com/api/inscripciones/`
            const request = await fetch(url)
            const response = await request.json()

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
    
                columnaMatricula.textContent = inscripcion.Matricula
                columnaNombre.textContent = inscripcion.Nombre
                columnaSemestre.textContent = inscripcion.Semestre
                columnaDeporte.textContent = inscripcion.Nombre_deporte
                fila.append(columnaMatricula, columnaNombre, columnaSemestre, columnaDeporte)
                tabla.appendChild(fila)
                
            })
    }
   }
   }
    boton.addEventListener('click', buscar)
    boton1.addEventListener('click', eliminar)
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

async function eliminar()
{
    let id_inscripcion = inscripcion.id_inscripcion
    const url = `https://backend-inscripciones.herokuapp.com/api/inscripcion/${id_inscripcion}`

            fetch(url, {
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
                        alert("No fue eliminado")
                        nombre.value = ""
                        grupo.value = ""
                        semestre.value = ""
                        deporte.value = ""
                    }
                })
                .then(response => console.log('Success:', response))
                .catch(error => console.error('Error:', error))
                
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