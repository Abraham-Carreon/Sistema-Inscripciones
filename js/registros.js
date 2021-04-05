var boton = document.getElementById("aceptar")

var matricula = document.querySelector('#matricula')

async function validar()
{
    if (matricula == 1) 
    {
        alert("Matricula incorrecta, verifique de nuevo")
    }
    else
    {
        alert("Matricula correcta")
    }
}

boton.addEventListener('click', validar)    