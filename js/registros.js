document.addEventListener('DOMContentLoaded', () => {
    agregarMatricula()
    const boton = document.getElementById("aceptar")

    // mod 
    async function validar() {
        let matricula = document.querySelector("#matricula")
        const deporte = document.querySelector("#deporte")
        const instructor = document.querySelector("#instructor")
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
    }
    boton.addEventListener('click', validar)
})





function agregarMatricula()
{
    const id = document.getElementById('identificador')
    const matricula = sessionStorage.getItem('administrador')
    id.innerHTML = `<b>Matricula: ${matricula}</b>`
}

