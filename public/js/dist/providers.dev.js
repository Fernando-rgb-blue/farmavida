"use strict";

var d = document;
var load = d.getElementById("loader"); //JQUERY

$(function () {
  //PARA ABRIR LOS POPUPS
  $("#addButton").on("click", function (e) {
    $("#popupAddProv").show();
  });
  $("#chaButton").on("click", function (e) {
    $("#popupChaProv").show();
  });
  $("#delButton").on("click", function (e) {
    $("#popupDelProv").show();
  }); //PARA CERRAR LOS POPUPS

  $("#closeAddProv").on("click", function (e) {
    $("#popupAddProv").hide();
  });
  $("#closeChaProv").on("click", function (e) {
    $("#popupChaProv").hide();
  });
  $("#closeDelProv").on("click", function (e) {
    $("#popupDelProv").hide();
  }); //PARA VERIFICAR QUE SE ESTÉ INGRESANDO LOS DATOS CORRECTOS EN LOS CAMPOS EN MODIFICAR PRODUCTO

  $("#formChaProv").on('input', function () {
    var flag = true;
    if ($("#ideProvCha").val() === "") flag = false;
    $("#btnSubmitCha").prop("disabled", !flag);
  }); //PARA VERIFICAR QUE SE ESTÉ INGRESANDO LOS DATOS CORRECTOS EN LOS CAMPOS EN ELIMINAR PRODUCTO

  $("#formDelProv").on('input', function () {
    var flag = true;
    if ($("#ideProvDel").val() === "") flag = false;
    $("#btnSubmitDel").prop("disabled", !flag);
  }); //PARA VERIFICAR QUE SE ESTÉ INGRESANDO LOS DATOS CORRECTOS EN LOS CAMPOS EN AÑADIR PRODUCTO

  $("#formAddProv").on('input', function () {
    var flag = true;
    if ($("#ideProvAdd").val() == "") flag = false;
    if ($("#nomProvAdd").val() == "") flag = false;
    if ($("#telfProvAdd").val() == "") flag = false;
    if ($("#emailProdAdd").val() == "") flag = false;
    $("#btnSubmitAdd").prop("disabled", !flag);
  }); //PARA VERIFICAR QUE SE ESTÉ INGRESANDO LOS DATOS CORRECTOS EN LOS CAMPOS EN BUSCAR PRODUCTO

  $("#formSeaProv").on('input', function () {
    console.log($("#provSea").val());
    var flag = true;
    if ($("#provSea").val() === "") flag = false;
    $("#btnSubmitSea").prop("disabled", !flag);
  }); //CAPTURAR LOS DATOS
  //PARA CAPTURAR LOS DATOS DE ENVIO DEL FORMULARIO DE BUSCAR PRODUCTO

  $("#btnSubmitSea").on('click', function (e) {
    e.preventDefault();
    loaderAct(); //ELIMINAR EL CONTENIDO DE LAS TABLAS

    $("#contentTable").empty();
    var val = $("#provSea").val();
    var cat = $("#catProvSea").val();
    $.ajax({
      url: "/providers",
      type: "POST",
      data: {
        formId: "form1",
        val: val,
        key: cat
      },
      success: function success(response) {
        datos = response.results;
        Swal.fire({
          title: "Se han encontrado ".concat(datos.length, " productos"),
          icon: "success",
          showConfirmButton: false
        });

        if (datos.length >= 1) {
          keys = ["ID", "Nombre del Proveedor", "Telefono", "Email"]; //CREACION DE LA TABLA

          var content = d.getElementById("contentTable");
          datos.forEach(function (obj) {
            var tbl = d.createElement("table");
            tbl.className = "tblProd";
            var i = 0;

            for (var clave in obj) {
              tbl.innerHTML += "<tr><th>".concat(keys[i], "</th><td>").concat(obj[clave], "</td></tr>");
              i++;
            }

            content.appendChild(tbl);
          });
        }
      },
      error: function error(_error) {
        Swal.fire({
          title: "Ha ocurrido un error",
          icon: "error",
          showConfirmButton: false
        });
      },
      complete: function complete() {
        loaderDes();
      }
    });
  }); //PARA CAPTURAR LOS DATOS DE ENVIO DEL FORMULARIO DE AGREGAR PRODUCTO

  $("#btnSubmitAdd").on("click", function (e) {
    e.preventDefault();
    loaderAct();

    var _id = $("#ideProvAdd").val();

    var nomProv = $("#nomProvAdd").val();
    var telfProv = $("#telfProvAdd").val();
    var emailProv = $("#emailProvAdd").val();
    $.ajax({
      url: "/providers",
      type: "POST",
      data: {
        formId: "form2",
        _id: _id,
        nombre: nomProv,
        telefono: telfProv,
        email: emailProv
      },
      success: function success(response) {
        Swal.fire({
          title: "Se han agregado los datos correctamente",
          icon: "success",
          showConfirmButton: false
        });
      },
      error: function error(xhr, status, _error2) {
        Swal.fire({
          title: "Ha ocurrido un error",
          icon: "error",
          showConfirmButton: false
        });
      },
      complete: function complete() {
        loaderDes();
      }
    });
  }); //PARA CAPTURAR LOS DATOS DE ENVIO DEL FORMULARIO DE MODIFICAR PRODUCTO

  $("#btnSubmitCha").on("click", function (e) {
    e.preventDefault();
    loaderAct();

    var _id = $("#ideProvCha").val();

    var nomProv = $("#nomProvCha").val();
    var telfProv = $("#telfProvCha").val();
    var emailProv = $("#emailProvCha").val();
    $.ajax({
      url: "/providers",
      type: "POST",
      data: {
        formId: "form4",
        _id: _id,
        nombre: nomProv,
        telefono: telfProv,
        email: emailProv
      },
      success: function success(response) {
        Swal.fire({
          title: "Se han modificado los datos correctamente",
          icon: "success",
          showConfirmButton: false
        });
      },
      error: function error(_error3) {
        Swal.fire({
          title: "Ha ocurrido un error",
          icon: "error",
          showConfirmButton: false
        });
      },
      complete: function complete() {
        loaderDes();
      }
    });
  }); //PARA CAPTURAR LOS DATOS CUANDO SE ENVIE EL FORMULARIO DE ELIMINAR DATOS

  $("#btnSubmitDel").on("click", function (e) {
    e.preventDefault();
    loaderAct();

    var _id = $("#ideProvDel").val();

    $.ajax({
      url: "/providers",
      type: "POST",
      data: {
        formId: "form3",
        _id: _id
      },
      success: function success(response) {
        Swal.fire({
          title: "Se han eliminado los datos correctamente",
          icon: "success",
          showConfirmButton: false
        });
      },
      error: function error(xhr, status, _error4) {
        Swal.fire({
          title: "Ha ocurrido un error",
          icon: "error",
          showConfirmButton: false
        });
      },
      complete: function complete() {
        loaderDes();
      }
    });
  });
}); //FUNCION PARA VALIDA NUMERO

function validarNumero(valor) {
  // Validar si el valor es un número decimal o entero
  return /^(\d+|\d+\.\d+)$/.test(valor);
}

var loaderAct = function loaderAct() {
  load.style.display = "block";
  load.style.zIndex = 9999;
};

var loaderDes = function loaderDes() {
  load.style.display = "none";
  load.style.zIndex = 0;
};