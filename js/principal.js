document.addEventListener('DOMContentLoaded', () => 
{
    validarAdministrador()
})

function validarAdministrador()
{
    const matricula = sessionStorage.getItem("administrador")
    
    if (matricula == null) 
    {
        document.body.style.background = "none"
        alert("No esta validado, ingrese sus credenciales")
        window.location.href = "/index.html"
    }
}