//valiables globales del formulario y login

const d = document;

userInput = d.querySelector("#usuarioForm");
passInput = d.querySelector("#contraForm");
btnLogin = d.querySelector(".btnLogin");


//evento al boton del formlulario

btnLogin.addEventListener("click", () =>{
//alert("Escribio: "+userInput.value)
let dataForm = getData();
sendData(dataForm);
});


//funcion para valkidar el formulario
//obtener datos del formulario
let getData = () => {
    //validar formulario
    let user;
    if (userInput.value && passInput.value){
        user = {
            usuario: userInput.value,
            contrasena: passInput.value
        }
        
        userInput.value = "";
        passInput.value = "";
        


    }else{
        alert("El usuario y contraseña es obligatoria")
    }
    console.log(user);
    return user;

}


// funcion para resibir los datos
// realizar la peticion al servidor

let sendData = async (data) => {
    let  url = "http://localhost/backend-apiCrud/login";
    try {
        
        let respuesta = await fetch(url,{
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify (data)
        });

        if (respuesta.status === 401){
            alert("El usuario y/o contraseña es incorrecto")
        }else{
            let userLogin= await respuesta.json();
            alert(`Bienvenido: ${userLogin.nombre}` )
            //guardar datos en local storage
            localStorage.setItem("userLogin",JSON.stringify(userLogin));
            location.href = "../index.html";

        }


    } catch (error) {
     console.log(error);   
    }
};



