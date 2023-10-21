document.getElementById('ventaForm').addEventListener('click', (event) => {
    if (event.target.classList.contains('agregarProducto')) {
        const productosContainer = document.getElementById('productosContainer');
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto');
        productoDiv.innerHTML = `
        <input type='text' class='codProd' name='cod_prod' placeholder='Código de Producto'>
        <input type='text' class='nombre' name='nombre' placeholder='Nombre'>
        <input type='number' class='cantidad' name='cantidad' placeholder='Cantidad' min='1' max='30'>
        <input type='text' class='precio' name='precio' placeholder='Precio' min='0'>
        <button type='button' class='eliminarProducto'>Eliminar</button>
        `;
        productosContainer.appendChild(productoDiv);
}
});


document.addEventListener('DOMContentLoaded', function() {
    const precioInput = document.querySelector('.validarPrecio');

    precioInput.addEventListener('input', function() {
        const value = precioInput.value.trim();

        if (value === '' || !/^\d+(\.\d+)?$/.test(value)) {
            precioInput.classList.add('invalid');
        } else {
            precioInput.classList.remove('invalid');
        }
    });
});


document.getElementById('productosContainer').addEventListener('click', (event) => {
if (event.target.classList.contains('eliminarProducto')) {
    event.target.parentNode.remove();
    actualizarPrecioTotal();
}
});

document.getElementById('ventaForm').addEventListener('input', () => {
    actualizarPrecioTotal();
});

function actualizarPrecioTotal() {
    const productos = Array.from(document.getElementsByClassName('producto'));
    let precioTotal = 0;

    productos.forEach((producto) => {
        const precioInput = producto.querySelector('.precio');
        const cantidadInput = producto.querySelector('.cantidad');

        const precio = parseFloat(precioInput.value);
        const cantidad = Number(cantidadInput.value);

        if (!isNaN(precio) && !isNaN(cantidad)) {
            precioTotal += precio * cantidad;
        }
    });

    const precioTotalInput = document.getElementById('precioTotal');
    precioTotalInput.value = precioTotal.toFixed(2);
}














