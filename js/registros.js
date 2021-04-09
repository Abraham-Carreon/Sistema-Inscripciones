document.addEventListener('DOMContentLoaded', () => {
    agregarMatricula()
    const boton = document.getElementById("aceptar")


    async function validar()
{
    //hola
    const matricula=document.querySelector('#matricula').value
    const deporte=document.querySelector('#deporte').value
    const instructor=document.querySelector('#instructor').value
    if(matricula == "" || deporte == "---Seleccione una opcion---" || instructor == "---Seleccione una opcion---")
    {
        alert("Falta un parametro")
    }
    else
    {
        alert("Datos correctos")
        const datos = {
            matricula,
            deporte,
            instructor
        }

        const url = `https://backend-inscripciones.herokuapp.com/api/deportistas/${matricula}`

        fetch(url, {
                method: 'PUT',
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
                } 
                else 
                {
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


btnCon=document.getElementById("btnModal")
btnCon.addEventListener("click", continuar)
function continuar ()
{
    var modal = document.getElementById("tvesModal");
    var btn = document.getElementById("btnModal");
    var span = document.getElementsByClassName("close")[0];
    var body = document.getElementsByTagName("body")[0];

    btn.onclick = function() {
        modal.style.display = "block";

        body.style.position = "static";
        body.style.height = "100%";
        body.style.overflow = "hidden";
    }

    span.onclick = function() {
        modal.style.display = "none";

        body.style.position = "inherit";
        body.style.height = "auto";
        body.style.overflow = "visible";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";

            body.style.position = "inherit";
            body.style.height = "auto";
            body.style.overflow = "visible";
        }
    }
}

const buscar = document.querySelector("#cancelar")
buscar.addEventListener("click", aaaaa)

function aaaaa ()
{
const matricula=document.querySelector('#matricula')
const url = `https://backend-inscripciones.herokuapp.com/api/deportistas/${matricula.value}`
const request = await fetch(url)
const response = await request.json()
if (request.ok) {
    alert("Usuario existe")
    const matricula1 = document.querySelector('#matricula1')
    const nombre1 = document.querySelector('#nombre')
    const grupo1 = document.querySelector('#grupo')
    const semestre1 = document.querySelector('#semestre')


    response.forEach(deportista => {
        matricula1.value = deportista.Matricula
        nombre1.value = deportista.Nombre
        semestre1.value = deportista.Semestre
        grupo1.value = deportista.Grupo

        

    })
} else {
    alert("Usuario no existe")
}
}


        