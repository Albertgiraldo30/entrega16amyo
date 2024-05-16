// variables globales

let tablePro = document.querySelector("#table-pro > tbody");
let searchInput = document.querySelector("#search-input");


//evento para probar el campo de buscar

searchInput.addEventListener("keyup", ()=>{

    console.log(searchInput.value);

});


//evento para el navegador 
document.addEventListener("DOMContentLoaded", ()=>{
    getTableData();
})

//fincion para traer los datos de la base de datos a  la tabla
let getTableData = async () => {
    let url = "http://localhost/backend-apiCrud/productos";
    try {

        let respuesta = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }

        });

        if (respuesta.status === 204) {
            console.log("No hay datos en la BD")
        } else {
            let tableData = await respuesta.json();
            console.log(tableData)

            // Agregar datos a la tabla a local Storage

            localStorage.setItem("datosTabla",JSON.stringify(tableData)) 

         // Agregar datos a la tabla
tableData.forEach((dato, i) => {
    let row = document.createElement("tr");
    row.innerHTML = `
        <td>${i + 1}</td>
        <td>${dato.nombre}</td>
        <td>${dato.descripcion}</td>
        <td>${dato.precio}</td>
        <td>${dato.stock}</td>
        <td><img src="${dato.imagen}" width ="100"></td>
        <td>
            <button  class="onclick="deleteDataTable(${i})"   btn btn-primary btn-sm editar-btn" data-id="${dato}">
              Eliminar  
            </button>
            <button onclick="editDataTable(${i})" class="btn btn-danger btn-sm eliminar-btn" data-id="${i}">
            Editar
        </button>
        </td>
    `;
    tablePro.appendChild(row);
});

        }


    } catch (error) {
        console.log(error);
    }

}

//funcion para editar

//funcion para editar
let editDataTable = (pos) => {
    let products = [];
    let productSave = JSON.parse(localStorage.getItem("datosTabla"));
    if (productSave != null) {
        products = productSave;
    }
    let singleProduct = products[pos];
    //console.log(singleProduct);
    localStorage.setItem("productEdit",JSON.stringify(singleProduct));
    localStorage.removeItem("datostabla");
    location.href = "../crear-pro.html"
}


 




// Función para eliminar un producto de la base de datos
async function eliminarProducto(id) {
    let url = "http://localhost/backend-apiCrud/productos";
    try {
        let respuesta = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: id })
        });

        if (respuesta.status === 200) {
            console.log("Producto eliminado correctamente");
            // Actualizar la tabla después de eliminar el producto
            await getTableData();
        } else {
            console.log("Error al eliminar el producto");
        }
    } catch (error) {
        console.log(error);
    }
}

// Función para manejar el evento de clic en el botón de eliminar
function deleteDataTable(id) {
    if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
        eliminarProducto(id);
    }
}



        




    




