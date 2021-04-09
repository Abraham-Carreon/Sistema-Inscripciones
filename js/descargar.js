document.addEventListener('DOMContentLoaded', ()=>
{
    validarAdministrador()

    agregarDeportes()

    const btnBuscar = document.getElementById('buscar')
    btnBuscar.addEventListener('click', buscar)

    const btnDescargar = document.getElementById('descargar')
    btnDescargar.addEventListener('click', descargar)
    agregarMatricula()

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

function buscar()
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
        alert("Selecciona algun deporte")
    }
    
}

function crearDatosTabla(datos)
{
    const tabla = document.getElementById('inscripciones')
    tabla.innerHTML = 
    `
        <tr>
        <td>Matricula</td>
        <td>Nombre</td>
        <td>Deporte</td>
        <td>Correo</td>
        </tr>
        <tbody id="inscripciones"></tbody>
    `
    datos.forEach(inscripcion =>
        {
            const fila = document.createElement('tr')
            const columnaMatricula = document.createElement('td')
            const columnaNombre = document.createElement('td')
            const columnaDeporte = document.createElement('td')
            const columnaCorreo = document.createElement('td')

            columnaMatricula.textContent = inscripcion.Matricula
            columnaNombre.textContent = inscripcion.Nombre
            columnaDeporte.textContent = inscripcion.Nombre_deporte
            columnaCorreo.textContent = inscripcion.Correo
            fila.append(columnaMatricula, columnaNombre, columnaDeporte, columnaCorreo)
            tabla.appendChild(fila)
            
        })
}

function descargar()
{
    const tabla = document.getElementById('inscripciones')
     if (tabla.hasChildNodes())
     {
         console.log("si tenes")
         let tableToExcel = (function() {
            let uri = 'data:application/vnd.ms-excel;base64,'
              , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
              , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
              , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
            return function(table, name) {
              if (!table.nodeType) table = document.getElementById(table)
              var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
              window.location.href = uri + base64(format(template, ctx))
            }
          })()
          tableToExcel('descargarInscripciones', 'Inscripciones')
        //   onclick="tableToExcel('descargarInscripciones', 'Inscripciones')"
     }
     else
     {
         alert("No existen inscripciones")
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
        window.location.href = "/index.html"
    }
}