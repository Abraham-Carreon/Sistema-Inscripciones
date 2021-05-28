document.addEventListener('DOMContentLoaded', () => {
    const boton = document.getElementById("enviar")
    boton.addEventListener('click', validar, {once: true})

    document.querySelector("#cambiar").addEventListener('click', () =>
    {
        window.open("https://localhost:44336/login") 
    })
})

async function validar() {
    const matricula = document.querySelector('#matricula')
    const contrasena = document.querySelector('#contrasena')

    if (matricula.value !== "" && contrasena.value !== "") {

        const url = "https://backend-inscripciones.herokuapp.com/api/administradores"
        const datos = {
            matricula: matricula.value,
            contrasena: contrasena.value
        }

        const request = await fetch(url, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(datos), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                res.json()
                if (res.ok) {
                    const a = window.location.toString()
                    console.log(a)
                    alert("Usuario validado")
                    // Direcciona a la pagina principal
                    window.location.href = "/src/principal.html"      
                    
                    // Agrega la matricula del administrador al session storage
                    guardarEnStorage(matricula.value)
                } else {
                    alert("El usuario no existe, intente nuevamente")
                    window.location.reload()
                }
            })
            .then(response => console.log('Success:', response))
            .catch(error => console.error('Error:', error))

    }else {
        alert("Formulario incompleto")
    }
}

function guardarEnStorage(matricula) {
    sessionStorage.setItem("administrador", matricula)
}

// Esta funcion es para insertar una inscripcion
async function prueba() {
    let admin = sessionStorage.getItem("administrador")
    const datos = {
        matricula: 1953829,
        idEntrenador: 1,
        idDeporte: 3,
        idAdministrador: admin
    }
    const url = 'https://backend-inscripciones.herokuapp.com/api/inscripcion/'
    fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(datos), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            res.json()
            if (res.ok) {
                alert("Inscripcion creado")
            } else {
                alert("La inscripcion no fue creada")
            }
        })
        .then(response => console.log('Success:', response))
        .catch(error => console.error('Error:', error))
}