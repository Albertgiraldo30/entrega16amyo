document.addEventListener("DOMContentLoaded", function() {
    let btnCrearProducto = document.querySelector("#crear-producto");

    btnCrearProducto.addEventListener("click", function() {
        let nombreProducto = document.querySelector("#productos-select").value;
        let precioProducto = document.querySelector("#precio-pro").value;
        let stockProducto = document.querySelector("#form6Example6").value;
        let descripcionProducto = document.querySelector("#form6Example7").value;

        // Creamos un objeto con los datos del producto
        let nuevoProducto = {
            nombre: nombreProducto,
            precio: precioProducto,
            stock: stockProducto,
            descripcion: descripcionProducto
        };

        // Obtenemos los productos existentes del almacenamiento local
        let productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];

        // Agregamos el nuevo producto a la lista de productos
        productosGuardados.push(nuevoProducto);

        // Almacenamos la lista actualizada de productos en el almacenamiento local
        localStorage.setItem("productos", JSON.stringify(productosGuardados));

        // Redireccionamos al usuario al listado de productos después de guardar el producto
        window.location.href = "listado-pro.html";
    });
});
