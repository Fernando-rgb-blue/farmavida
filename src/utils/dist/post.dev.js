"use strict";

var formSeaProd = d.getElementById("formSeaProd");
var formAddProd = d.getElementById("formAddProd");
var formDelProd = d.getElementById("formDelProd"); // Escuchar el evento click del botón de enviar

formAddProd.addEventListener('submit', function (e) {
  e.preventDefault(); // Evitar el comportamiento predeterminado del formulario
  // Capturar los valores de los campos en variables

  var idProducto = d.querySelector('#ideProd').value;
  var nombreProducto = d.querySelector('#nomProd').value;
  var concentrado = d.querySelector('#conProd').value;
  var nombreFarmacia = d.querySelector('#nomForProd').value;
  var nombreFarmaciaSimplificado = d.querySelector('#nomForSimProd').value;
  var presentacion = d.querySelector('#preProd').value;
  var fracciones = d.querySelector('#fraProd').value;
  var fechaVencimiento = d.querySelector('#fecVenRegProd').value;
  var numeroRS = d.querySelector('#numRegProd').value;
  var situacion = d.querySelector('#sitProd').value;
  var stock = d.querySelector('#stoProd').value;
  var precio = d.querySelector('#preProd').value;
  alert("LOS DATOS SE GUARDARON CORRECTAMENTE"); // Hacer algo con los valores capturados

  console.log('ID del Producto:', idProducto);
  console.log('Nombre del Producto:', nombreProducto);
  console.log('Concentrado:', concentrado);
  console.log('Nombre Formal de Farmacia:', nombreFarmacia);
  console.log('Nombre Formal de Farmacia Simplificado:', nombreFarmaciaSimplificado);
  console.log('Presentación:', presentacion);
  console.log('Fracciones:', fracciones);
  console.log('Fecha de Vencimiento de RS:', fechaVencimiento);
  console.log('Número de RS:', numeroRS);
  console.log('Situación:', situacion);
  console.log('Stock:', stock);
  console.log('Precio:', precio); // Restablecer el formulario

  form.reset();
});
formDelProd.addEventListener("submit", function (e) {
  console.log("ELIMINAR");
});
formSeaProd.addEventListener("submit", function (e) {
  console.log("BUSCAR");
});