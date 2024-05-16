//variables globales del formulario
const d = document;
let nameInput = d.querySelector('#productos-select');
let priceInput = d.querySelector('#precio-pro');
let stockInput = d.querySelector('#Stock-pro');
let descripcionInput = d.querySelector('#des-pro');
let imagen = d.querySelector('#imagen-pro');
let btnCreate = d.querySelector(".btn-create");
let productUpdate;

//eventi al boton de formulario
btnCreate.addEventListener('click', ()=>{

   let dataproduct =  getDataProduct()
    sendDataProduct(dataproduct);
})

//evento al navegador para comprobar si recargo la pagina
d.addEventListener("DOMContentLoaded", ()=>{
    productUpdate = JSON.parse (localStorage.getItem("productEdit"));
    if (productUpdate != null ){
        updateDataProduct()
    }

});

//funcion para validar el formulario


//obtener los daatos del formulario
let getDataProduct = () => {
    //validar formulario
    let producto;
    if (nameInput.value && priceInput.value && stockInput.value && descripcionInput.value && imagen.src){
        producto = {
            nombre:nameInput.value,
            descripcion: descripcionInput.value,
            precio: priceInput.value,
            stock: stockInput.value,
            imagen: imagen.src
        
        }
        
        priceInput.value = "";
        descripcionInput.value="";
        stockInput.value= "";
        imagen.src = "https://m.media-amazon.com/images/I/61XV8PihCwL._SY250_.jpg"

        console.log(producto)
    

    }else{
        alert("Todos los campos son obligatorios")
    }
    
    return producto;

}


let sendDataProduct = async (data) => {
    let  url = "http://localhost/backend-apiCrud/productos";
    try {
        
        let respuesta = await fetch(url,{
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify (data)
        });

        if (respuesta.status === 406){
            alert("los datos enviados no son admitidos")

        }else{
            let mensaje= await respuesta.json();
            alert(mensaje.message);
            location.href="../listado-pro.html"

        }


    } catch (error) {
     console.log(error);   
    }
};
//funcion para editar el producto

let updateDataProduct = ()=>{
    //agregar datos a editar en los campos de formulñarios
    nameInput.value = productUpdate.nombre;
    priceInput.value = productUpdate.precio;
    stockInput.value = productUpdate.stock;
    descripcionInput.value = productUpdate.descripcion;
    imagen.src = productUpdate.imagen;

    let producto;

    //alternar el boton de crear y editar

    let btnEdit = d.querySelector(".btn-update");
    btnCreate.classList.toggle("d-none");
    btnEdit.classList.toggle("d-none");


    //agregar evento al boton editar
    btnEdit.addEventListener("click", ()=>{
        producto = {
            id:productUpdate.id,
            nombre:nameInput.value,
            descripcion: descripcionInput.value,
            precio: priceInput.value,
            stock: stockInput.value,
            imagen: imagen.src
        
        }
        //borrar info de localStorage
        localStorage.removeItem("productEdit");
        // pasar los datos del producto a la funcion
        sendUpdateProduct(producto)

  });


};

//funcion para realizar la peticion al servidor 

let sendUpdateProduct = async (pro)=>{
    let  url = "http://localhost/backend-apiCrud/productos";
    try {
        
        let respuesta = await fetch(url,{
            method: "PUT",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify (pro)
        });

        if (respuesta.status === 406){
            alert("los datos enviados no son admitidos")

        }else{
            let mensaje= await respuesta.json();
            alert(mensaje.message);
            location.href="../listado-pro.html"

        }


    } catch (error) {
     console.log(error);   
    }

}
