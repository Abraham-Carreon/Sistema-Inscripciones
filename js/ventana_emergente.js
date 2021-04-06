document.addEventListener('DOMContentLoaded', () => {
    var boton = document.getElementById("aceptar")
    boton.addEventListener('click', validar)

    async function validar()
    {
    alert("Datos mandados correctamente")
    window.close("/src/Inscripcion_vemergente.html" , "ventana1" , "width=1000,height=600,scrollbars=NO")
    }
})  

document.addEventListener('DOMContentLoaded', () => {
    var boton = document.getElementById("cancelar")
    boton.addEventListener('click', validar)


async function validar()
{
    
    alert("Cancelado correctamente")
    window.close("/src/Inscripcion_vemergente.html" , "ventana1" , "width=1000,height=600,scrollbars=NO")
}

})  




