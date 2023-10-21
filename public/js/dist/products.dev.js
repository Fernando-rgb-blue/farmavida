"use strict";

var d = document;
var load = d.getElementById("loader"); //JQUERY

$(function () {
  //PARA ABRIR LOS POPUPS
  $("#addButton").on("click", function (e) {
    $("#popupAddProd").show();
  });
  $("#chaButton").on("click", function (e) {
    $("#popupChaProd").show();
  });
  $("#delButton").on("click", function (e) {
    $("#popupDelProd").show();
  }); //PARA CERRAR LOS POPUPS

  $("#closeAddProd").on("click", function (e) {
    $("#popupAddProd").hide();
  });
  $("#closeChaProd").on("click", function (e) {
    $("#popupChaProd").hide();
  });
  $("#closeDelProd").on("click", function (e) {
    $("#popupDelProd").hide();
  }); //PARA CAMBIAR LOS TIPO DE INPUTS CUANDO SE CAMBIE EL TIPO DE DATO A BUSCAR

  $('#catProdSea').on('change', function () {
    var selectedValue = $(this).val();
    var searchBar = $('#prodSea');
    searchBar.val("");

    switch (selectedValue) {
      case "_id":
      case "Stock":
        var codeNumber = '<input type="number" id="prodSea" name="searchBar" placeholder="Buscar">';
        searchBar.replaceWith(codeNumber);
        break;

      case "Fec_Vcto_Reg_Sanitario":
        var codeDate = '<input type="date" id="prodSea" name="searchBar" placeholder="Buscar">';
        searchBar.replaceWith(codeDate);
        break;

      case "Situacion":
        codeSelect = '<select id="prodSea" name="searchBar"><option value=""></option><option value="ACT">Activado</option><option value="DES">Desactivado</option></select>';
        searchBar.replaceWith(codeSelect);
        break;

      default:
        var codeText = '<input type="text" id="prodSea" name="searchBar" placeholder="Buscar">';
        searchBar.replaceWith(codeText);
    }
  }); //PARA VERIFICAR QUE SE ESTÉ INGRESANDO LOS DATOS CORRECTOS EN LOS CAMPOS EN MODIFICAR PRODUCTO

  $("#formChaProd").on('input', function () {
    var flag = true;
    if ($("#ideProdCha").val() === "") flag = false;
    $("#btnSubmitCha").prop("disabled", !flag);
  }); //PARA VERIFICAR QUE SE ESTÉ INGRESANDO LOS DATOS CORRECTOS EN LOS CAMPOS EN ELIMINAR PRODUCTO

  $("#formDelProd").on('input', function () {
    var flag = true;
    if ($("#ideProdDel").val() === "") flag = false;
    $("#btnSubmitDel").prop("disabled", !flag);
  }); //PARA VERIFICAR QUE SE ESTÉ INGRESANDO LOS DATOS CORRECTOS EN LOS CAMPOS EN AÑADIR PRODUCTO

  $("#formAddProd").on('input', function () {
    var flag = true;
    if ($("#ideProdAdd").val() == "") flag = false;
    if ($("#nomProdAdd").val() == "") flag = false;
    if ($("#conProdAdd").val() == "") flag = false;
    if ($("#nomForProdAdd").val() == "") flag = false;
    if ($("#nomForSimProdAdd").val() == "") flag = false;
    if ($("#presProdAdd").val() == "") flag = false;
    if ($("#fraProdAdd").val() == "") flag = false;
    if ($("#fecVenRegProdAdd").val() == "") flag = false;
    if ($("#numRegProdAdd").val() == "") flag = false;
    if ($("#stoProdAdd").val() == "") flag = false;
    if ($("#precProdAdd").val() == "" || !validarNumero($("#precProdAdd").val())) flag = false;
    $("#btnSubmitAdd").prop("disabled", !flag);
  }); //PARA VERIFICAR QUE SE ESTÉ INGRESANDO LOS DATOS CORRECTOS EN LOS CAMPOS EN BUSCAR PRODUCTO

  $("#formSeaProd").on('input', function () {
    console.log($("#prodSea").val());
    var flag = true;
    if ($("#prodSea").val() === "") flag = false;
    $("#btnSubmitSea").prop("disabled", !flag);
  }); //CAPTURAR LOS DATOS
  //PARA CAPTURAR LOS DATOS DE ENVIO DEL FORMULARIO DE BUSCAR PRODUCTO

  $("#btnSubmitSea").on('click', function (e) {
    e.preventDefault();
    loaderAct(); //ELIMINAR EL CONTENIDO DE LAS TABLAS

    $("#contentTable").empty();
    var val = $("#prodSea").val();
    var cat = $("#catProdSea").val();
    $.ajax({
      url: "/products",
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
          keys = ["ID", "Nombre del Producto", "Concentrado", "Nombre Formal", "Nombre Formal Simplificado", "Presentacion", "Fracciones", "Fecha de Vencimiento de RS", "Numero de RS", "Situacion", "Stock", "Precio"]; //CREACION DE LA TABLA

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

    var _id = $("#ideProdAdd").val();

    var nomProd = $("#nomProdAdd").val();
    var conProd = $("#conProdAdd").val();
    var nomForProd = $("#nomForProdAdd").val();
    var nomForSimProd = $("#nomForSimProdAdd").val();
    var presProd = $("#presProdAdd").val();
    var fraProd = $("#fraProdAdd").val();
    var fecVenRegProd = $("#fecVenRegProdAdd").val();
    var numRegProd = $("#numRegProdAdd").val();
    var sitProd = $("#sitProdAdd").val();
    var stoProd = $("#stoProdAdd").val();
    var precProd = $("#precProdAdd").val();
    $.ajax({
      url: "/products",
      type: "POST",
      data: {
        formId: "form2",
        _id: _id,
        Nom_Prod: nomProd,
        Concent: conProd,
        Nom_Form_Farm: nomForProd,
        Nom_Form_Farm_Simplif: nomForSimProd,
        Presentac: presProd,
        Fracciones: fraProd,
        Fec_Vcto_Reg_Sanitario: fecVenRegProd,
        Num_RegSan: numRegProd,
        Situacion: sitProd,
        Stock: stoProd,
        Precio: precProd
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

    var _id = $("#ideProdCha").val();

    var nomProd = $("#nomProdCha").val();
    var conProd = $("#conProdCha").val();
    var nomForProd = $("#nomForProdCha").val();
    var nomForSimProd = $("#nomForSimProdCha").val();
    var presProd = $("#presProdCha").val();
    var fraProd = $("#fraProdCha").val();
    var fecVenRegProd = $("#fecVenRegProdCha").val();
    var numRegProd = $("#numRegProdCha").val();
    var sitProd = $("#sitProdCha").val();
    var stoProd = $("#stoProdCha").val();
    var precProd = $("#precProdCha").val();
    $.ajax({
      url: "/products",
      type: "POST",
      data: {
        formId: "form4",
        _id: _id,
        Nom_Prod: nomProd,
        Concent: conProd,
        Nom_Form_Farm: nomForProd,
        Nom_Form_Farm_Simplif: nomForSimProd,
        Presentac: presProd,
        Fracciones: fraProd,
        Fec_Vcto_Reg_Sanitario: fecVenRegProd,
        Num_RegSan: numRegProd,
        Situacion: sitProd,
        Stock: stoProd,
        Precio: precProd
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

    var _id = $("#ideProdDel").val();

    $.ajax({
      url: "/products",
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