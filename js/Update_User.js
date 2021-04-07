    const boton = document.getElementById("mybutton")

    function validar()
    {
        var matricula = document.querySelector("#matricula")
                  
        if (matricula.value !== "") 
        {
            document.body.style.background = "none"
            alert("Matricula verificada")      

            
        }
        else 
        {
            document.body.style.background = "none"
            alert("Matricula incorrecta, verifique de nuevo")
        }
    }

    boton.addEventListener('click', validar)    