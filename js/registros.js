document.addEventListener('DOMContentLoaded', () => {
    agregarMatricula()
var boton = document.getElementById("aceptar")
boton.addEventListener('click', validar) 

async function validar()
{
    const matricula=document.getElementById("matricula")
    if (matricula == "" || deporte == "" || instructor == "") 
    {
        alert("Algun dato no esta lleno, verifique de nuevo")
    }
    else
    {
        /*alert("Matricula correcta")
        window.open("/src/Inscripcion_vemergente.html" , "ventana1" , "width=1000,height=600,scrollbars=NO")*/
        const url = "https://backend-inscripciones.herokuapp.com/api/deportes"
        const datos = {
            matricula,
            deporte,
            instructor
        }

       fetch('https://backend-inscripciones.herokuapp.com/api/inscripcion/', {
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

})

function agregarMatricula()
{
    const id = document.getElementById('identificador')
    const matricula = sessionStorage.getItem('administrador')
    id.innerHTML = `<b>Matricula: ${matricula}</b>`
}

