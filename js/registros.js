document.addEventListener('DOMContentLoaded', () => {
    agregarMatricula()
    const boton = document.getElementById("aceptar")


    async function validar()
{
    //hola
    const matricula=document.getElementById("matricula")
    if(matricula.value == "")
    {
        if(deporte.value !== "---Seleccione una opcion---")
        {
            alert("Perfecto")
        }
        else
        {
            if(instructor.value !== "---Seleccione una opcion---")
            {
                alert("Perfecto")
            }
            else
            {
                alert("Falta un parametro")
            }
        }
    }
    else
    {
        alert("Falta un parametro")
    }
    if (matricula == 1) 
    {
        /*alert("Matricula correcta")
        window.open("/src/Inscripcion_vemergente.html" , "ventana1" , "width=1000,height=600,scrollbars=NO")*/
        const url = "https://backend-inscripciones.herokuapp.com/api/deportes"
        const datos = {
            matricula,
            deporte,
            instructor
        }

       fetch('https://backend-inscripciones.herokuapp.com/api/inscripciones/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    matricula,
                    deporte,
                    instructor,
                })            
            }).then(res => {
                res.json()
                if (res.ok) {
                    alert("Proceso completado correctamente")
                    window.open("/src/Inscripcion_vemergente.html" , "ventana1" , "width=1000,height=600,scrollbars=NO")
                } else {
                    alert("Error al registrar, intente de nuevo")
                    matricula.value = ""
                    instructor.value = ""
                    deporte.value = ""
                }
            })
            .then(response => console.log('Success:', response))
            .catch(error => console.error('Error:', error))

    }
}
boton.addEventListener("click",validar)
})





function agregarMatricula()
{
    const id = document.getElementById('identificador')
    const matricula = sessionStorage.getItem('administrador')
    id.innerHTML = `<b>Matricula: ${matricula}</b>`
}

