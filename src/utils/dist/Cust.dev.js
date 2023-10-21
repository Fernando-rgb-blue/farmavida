// Formularios Para Customers

"use strict";

var formSeaCust = d.getElementById("formSeaCust");
var formAddCust = d.getElementById("formAddCust");

formAddCust.addEventListener('submit', function (e) {
  e.preventDefault(); // Evitar el comportamiento predeterminado del formulario
  // Capturar los valores de los campos en variables

  var idCliente = document.querySelector('#idCliente').value;
  var nombreCliente = document.querySelector('#nombreCliente').value;
  alert("LOS DATOS SE GUARDARON CORRECTAMENTE"); // Hacer algo con los valores capturados

  console.log('ID del Cliente:', idCliente);
  console.log('Nombre del Cliente:', nombreCliente);

  form.reset();
});


formSeaCust.addEventListener("submit", function (e) {
    console.log("BUSCAR");
  });