document.addEventListener('DOMContentLoaded', () => 
{
    const boton = document.getElementById("enviar")
    boton.addEventListener('click', validar)
})

function validar()
{
    const matricula = document.querySelector('#matricula').value
    const contrasena = document.querySelector('#contrasena').value

    if (matricula !== "" && contrasena !== "")
    {
        console.log(matricula, contrasena)
    }

    else
    {
        alert("Formulario incompleto")
    }
}