document.addEventListener('DOMContentLoaded', () => 
{
    const matricula = sessionStorage.getItem("administrador")
    
    if (matricula == null) 
    {
        document.body.style.background = "none"
        alert("No esta validado, ingrese sus credenciales")
    }
})

Este cambio es nuevo
