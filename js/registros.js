document.addEventListener('DOMContentLoaded', () => {
    agregarMatricula()
var boton = document.getElementById("aceptar")
boton.addEventListener('click', validar) 

async function validar()
{
    const matricula=document.getElementById("matricula")
    if (matricula == 1) 
    {
        alert("Matricula incorrecta, verifique de nuevo")
    }
    else
    {
        alert("Matricula correcta")
        window.open("/src/Inscripcion_vemergente.html" , "ventana1" , "width=1000,height=600,scrollbars=NO")
    }
}

})

function agregarMatricula()
{
    const id = document.getElementById('identificador')
    const matricula = sessionStorage.getItem('administrador')
    id.innerHTML = `<b>Matricula: ${matricula}</b>`
}

