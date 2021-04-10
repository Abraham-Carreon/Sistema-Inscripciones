document.addEventListener('DOMContentLoaded', () => {
    agregarMatricula()
    const boton = document.getElementById("aceptar")
    boton.addEventListener("click",validar)

    async function validar()
{
    
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
        }

            const url = `https://backend-inscripciones.herokuapp.com/api/deportistas/${matricula}`
            const request = await fetch(url)
            const response = await request.json()
            if (request.ok) 
            {
                alert("Usuario existe")
                
                const matricula1 = document.querySelector('#matricula')
                const deporte1 = document.querySelector('#deporte')
                const instructor1 = document.querySelector('#instructor')
                const url2 = `https://backend-inscripciones.herokuapp.com/api/inscripciones/`
                fetch(url2, {
                    method: 'POST', // or 'PUT'
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
                        matricula1.value = ""
                        deporte1.value = ""
                        instructor1.value = ""
                    }
                })
                .then(response => console.log('Success:', response))
                .catch(error => console.error('Error:', error))
            } 
            else 
            {
                alert("Usuario no existe")
            }
    }
})





function agregarMatricula()
{
    const id = document.getElementById('identificador')
    const matricula = sessionStorage.getItem('administrador')
    id.innerHTML = `<b>Matricula: ${matricula}</b>`
}


// btnCon=document.getElementById("btnModal")
// btnCon.addEventListener("click", continuar)
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

// const buscar = document.querySelector("#cancelar")
// buscar.addEventListener("click", aaaaa)

// $(document).ready(aaaaa);
// function aaaaa ()
// {
// const matricula=document.querySelector('#matricula')
// const url = `https://backend-inscripciones.herokuapp.com/api/deportistas/${matricula.value}`
// const request = await fetch(url)
// const response = await request.json()
// if (request.ok) {
//     alert("Usuario existe")
//     const matricula1 = document.querySelector('#matricula1')
//     const nombre1 = document.querySelector('#nombre')
//     const grupo1 = document.querySelector('#grupo')
//     const semestre1 = document.querySelector('#semestre')


//     response.forEach(deportista => {
//         matricula1.value = deportista.Matricula
//         nombre1.value = deportista.Nombre
//         semestre1.value = deportista.Semestre
//         grupo1.value = deportista.Grupo

        

//     })
// } else {
//     alert("Usuario no existe")
// }
// }


        