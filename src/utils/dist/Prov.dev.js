// Formularios Para Pproviders

"use strict";

var formSeaProv = d.getElementById("formSeaProv");
var formAddProv = d.getElementById("formAddProv");

formAddProv.addEventListener('submit', function (e) {
  e.preventDefault(); // Evitar el comportamiento predeterminado del formulario
  // Capturar los valores de los campos en variables

  var idProveedor = document.querySelector('#idProveedor').value;
  var nombreProveedor = document.querySelector('#nombreProveedor').value;
  alert("LOS DATOS SE GUARDARON CORRECTAMENTE"); // Hacer algo con los valores capturados

  console.log('ID del Proveedor:', idProveedor);
  console.log('Nombre del Proveedor:', nombreProveedor);

  form.reset();
});


formSeaProv.addEventListener("submit", function (e) {
    console.log("BUSCAR");
  });