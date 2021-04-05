    const boton = document.getElementById("mybutton");

    function validar()
    {
        var matricula = document.getElementById("matricula");
                  
        if (matricula == 1946342 || matricula == 1953829 || matricula == 1946218 || matricula == 1956753 || matricula == 1946887 || matricula == 1966811) 
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