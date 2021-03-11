document.addEventListener('DOMContentLoaded', () => {
    const boton = document.getElementById("enviar")
    boton.addEventListener('click', validar)
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
            headers:{
            'Content-Type': 'application/json'
            }
        }).then(res => 
          {
              res.json()
              if (res.ok) 
              {
                alert("Usuario validado")
                window.location.href = "/src/principal.html"
            } 
                else {
                alert("El usuario no existe, intente nuevamente")
                matricula.value = ""
                contrasena.value = ""
            }
          })
          .then(response => console.log('Success:', response))
          .catch(error => console.error('Error:', error))
        
    } else {
        alert("Formulario incompleto")
    } 
}


