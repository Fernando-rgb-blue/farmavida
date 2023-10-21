"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var d = document;
var load = d.getElementById("loader");

function fechaCorrecta(dateString) {
  var meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  var month = parseInt(dateString.substring(5, 7));
  return dateString.substring(8, 10) + ' de ' + meses[month - 1] + ' de ' + dateString.substring(0, 4);
}

$(function () {
  //ABIR EL POPUP DEL REPORTE 6
  $("#report6PopUp").on("click", function () {
    $("#popupRe6Dat").show();
  }); //CERRAR EL POPUP DEL REPORTE 6

  $("#closeRe6").on("click", function () {
    $("#popupRe6Dat").hide();
  }); //VERIFICAR QUE LOS IMPUTS TIPO DATE TENGAN DATOS Y SEAN CORRECTOS

  $("#formRe6").on("input", function () {
    var flag = true;
    var fecha1 = $("#fecIniRe6").val();
    var fecha2 = $("#fecFinRe6").val();
    if (fecha1 === "" || fecha2 === "" || !(fecha1 < fecha2)) flag = false;
    $("#report6").prop("disabled", !flag);
  });
  $("#report1a").on("click", function () {
    console.log("reporte 1a");
    $.ajax({
      url: "/reports",
      type: "POST",
      data: {
        report: "1a"
      },
      success: function success() {},
      error: function error() {},
      complete: function complete() {}
    });
  });
  $("#report1b").on("click", function () {
    loaderAct();
    var content = d.getElementById("resultsRep");
    content.innerHTML = "";
    $.ajax({
      url: "/reports",
      type: "POST",
      data: {
        report: "1b"
      },
      success: function success(response) {
        datos = response.results;
        Swal.fire({
          title: "Se han encontrado ".concat(datos.length, " empleados"),
          icon: "success",
          showConfirmButton: false
        });

        if (datos.length >= 1) {
          keys = ["ID", "Nombre", "Dirección", "Teléfono", "Email", "fecha_contratacion", "Salario"]; //CREACION DE LA TABLA

          var _content = d.getElementById("resultsRep");

          datos.forEach(function (obj) {
            var tbl = d.createElement("table");
            tbl.className = "tblProd";
            var i = 0;

            for (var clave in obj) {
              tbl.innerHTML += "<tr><th>".concat(keys[i], "</th><td>").concat(obj[clave], "</td></tr>");
              i++;
            }

            _content.appendChild(tbl);
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
  });
  $("#report1c").on("click", function () {
    loaderAct();
    var content = d.getElementById("resultsRep");
    content.innerHTML = "";
    $.ajax({
      url: "/reports",
      type: "POST",
      data: {
        report: "1c"
      },
      success: function success(response) {
        datos = response.results;
        Swal.fire({
          title: "Se han encontrado ".concat(datos.length, " pedidos"),
          icon: "success",
          showConfirmButton: false
        });

        if (datos.length >= 1) {
          keys = ["ID", "Fecha de pedido", "ID de proveedor", "Producto", "Nombre", "Cantidad", "Precio unitario"]; //CREACION DE LA TABLA

          var _content2 = d.getElementById("resultsRep");

          datos.forEach(function (obj) {
            console.log(obj);
            var tbl = d.createElement("table");
            tbl.className = "tblPed";
            var i = 0;

            for (var clave in obj) {
              console.log(clave);
              console.log(i);

              if (i <= 2) {
                if (clave === 'fecha') {
                  tbl.innerHTML += "<tr><th>".concat(keys[i], "</th><td>").concat(fechaCorrecta(obj[clave]), "</td></tr>");
                } else {
                  tbl.innerHTML += "<tr><th>".concat(keys[i], "</th><td>").concat(obj[clave], "</td></tr>");
                }
              } else {
                if (obj.productos.length > 0) {
                  var n = 0;

                  for (var prod in obj.productos) {
                    tbl.innerHTML += "<tr><th></th><td><br></td></tr>";
                    tbl.innerHTML += "<tr><th>".concat(keys[i], " ").concat(n + 1, ":</th><td></td></tr>");
                    tbl.innerHTML += "<tr><th>".concat(keys[4], "</th><td>").concat(obj.productos[prod].nombre, "</td></tr>");
                    tbl.innerHTML += "<tr><th>".concat(keys[5], "</th><td>").concat(obj.productos[prod].cantidad, "</td></tr>");
                    tbl.innerHTML += "<tr><th>".concat(keys[6], "</th><td>").concat(obj.productos[prod].precio_unitario, "</td></tr>");
                    n++;
                  }
                } else {
                  tbl.innerHTML += "<tr><th>Sin productos</th><td></td></tr>";
                }
              }

              i++;
            }

            _content2.appendChild(tbl);
          });
        }
      },
      error: function error(_error2) {
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
  $("#report1d").on("click", function () {
    loaderAct();
    var content = d.getElementById("resultsRep");
    content.innerHTML = "";
    $.ajax({
      url: "/reports",
      type: "POST",
      data: {
        report: "1d"
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

          var _content3 = d.getElementById("resultsRep");

          datos.forEach(function (obj) {
            var tbl = d.createElement("table");
            tbl.className = "tblProd";
            var i = 0;

            for (var clave in obj) {
              tbl.innerHTML += "<tr><th>".concat(keys[i], "</th><td>").concat(obj[clave], "</td></tr>");
              i++;
            }

            _content3.appendChild(tbl);
          });
        }
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
  });
  $("#report1e").on("click", function () {
    console.log("reporte 1e");
    $.ajax({
      url: "/reports",
      type: "POST",
      data: {
        report: "1e"
      },
      success: function success() {},
      error: function error() {},
      complete: function complete() {}
    });
  });
  $("#report1f").on("click", function () {
    console.log("reporte 1f");
    $.ajax({
      url: "/reports",
      type: "POST",
      data: {
        report: "1f"
      },
      success: function success() {},
      error: function error() {},
      complete: function complete() {}
    });
  });
  $("#report2").on("click", function () {
    //CARGA
    loaderAct();
    var content = d.getElementById("resultsRep");
    content.innerHTML = "";
    $.ajax({
      url: "/reports",
      type: "POST",
      data: {
        report: 2
      },
      success: function success(response) {
        var datos = response.results;
        console.log(datos);

        if (datos.length >= 1) {
          //CREAR LA TABLA
          var tbl = d.createElement("table");
          tbl.className = "tblProd";
          tbl.innerHTML = "\n                        <thead>\n                            <tr>\n                                <th>Proveedor</th>\n                                <th>Pedidos</th>\n                            </tr>\n                        </thead>\n                    ";
          var tbody = d.createElement('tbody');
          datos.forEach(function (obj) {
            var tr = d.createElement("tr");
            var i = 0;

            for (var clave in obj) {
              tr.innerHTML += "<td>".concat(obj[clave], "</td>");
              i++;
            }

            tbody.appendChild(tr);
          });
          tbl.appendChild(tbody);
          content.appendChild(tbl);
        }
      },
      error: function error(_error4) {},
      complete: function complete() {
        loaderDes();
      }
    });
  });
  $("#report3").on("click", function () {
    $.ajax({
      url: "/reports",
      type: "POST",
      data: {
        report: 3
      },
      success: function success(response) {},
      error: function error(_error5) {},
      complete: function complete() {}
    });
  });
  $("#report4").on("click", function () {
    //CARGA
    loaderAct();
    var content = d.getElementById("resultsRep");
    content.innerHTML = "";
    var btns = d.getElementsByClassName("btnReport");
    console.log(btns);
    $.ajax({
      url: "/reports",
      type: "POST",
      data: {
        report: 4
      },
      success: function success(response) {
        var datos = response.results;
        console.log(datos);

        if (datos.length >= 1) {
          keys = ["Producto", "Total de Ventas"]; //CREAR LA TABLA

          var tbl = d.createElement("table");
          tbl.className = "tblProd";
          tbl.style.height = "".concat(content.offsetHeight, "px");
          console.log(content.offsetHeight);
          tbl.innerHTML = "\n                        <thead>\n                            <tr>\n                                <th>Total de Pedidos</th>\n                                <th>Proveedor</th>\n                            </tr>\n                        </thead>\n                    ";
          var tbody = d.createElement('tbody');
          datos.forEach(function (obj) {
            var tr = d.createElement("tr");
            var i = 0;

            for (var clave in obj) {
              tr.innerHTML += "<td>".concat(obj[clave], "</td>");
              i++;
            }

            tbody.appendChild(tr);
          });
          tbl.appendChild(tbody);
          content.appendChild(tbl);
        }
      },
      error: function error(_error6) {
        alert("HA OCURRIDO UN ERROR");
      },
      complete: function complete() {
        loaderDes();
      }
    });
  });
  $("#report5").on("click", function () {
    loaderAct();
    $.ajax({
      url: "/reports",
      type: "POST",
      data: {
        report: 5
      },
      success: function success(response) {
        var content = d.getElementById("resultsRep");
        content.innerHTML = "";
        var datos = response.results;
        console.log(datos);

        if (datos.length >= 1) {
          //CREAR LA TABLA
          var tbl = d.createElement("table");
          tbl.className = "tblProd";
          tbl.style.height = "".concat(content.offsetHeight, "px");
          console.log(content.offsetHeight);
          tbl.innerHTML = "\n                        <thead>\n                            <tr>\n                                <th>Nombre del Producto</th>\n                                <th>Cantidad de Venta</th>\n                            </tr>\n                        </thead>\n                    ";
          var tbody = d.createElement('tbody');
          datos.forEach(function (obj) {
            var tr = d.createElement("tr");
            var i = 0;

            for (var clave in obj) {
              tr.innerHTML += "<td>".concat(obj[clave], "</td>");
              i++;
            }

            tbody.appendChild(tr);
          });
          tbl.appendChild(tbody);
          content.appendChild(tbl);
        }
      },
      error: function error(_error7) {
        alert("HA OCURRIDO UN ERROR");
      },
      complete: function complete() {
        loaderDes();
      }
    });
  });
  $("#report6").on("click", function (e) {
    e.preventDefault();
    loaderAct();
    var fecha1 = $("#fecIniRe6").val();
    var fecha2 = $("#fecFinRe6").val();
    $.ajax({
      url: "/reports",
      type: "POST",
      data: {
        report: 6,
        fecha1: fecha1,
        fecha2: fecha2
      },
      success: function success(response) {
        datos = response.results;
        $("#popupRe6Dat").hide();
        Swal.fire({
          title: "Se han encontrado ".concat(datos.length, " resultados"),
          icon: "success",
          showConfirmButton: false
        });
        var content = d.getElementById("resultsRep");
        content.innerHTML = "";

        if (datos.length >= 1) {
          //CREAR LA TABLA
          var tbl = d.createElement("table");
          tbl.className = "tblProd";
          tbl.style.height = "".concat(content.offsetHeight, "px");
          console.log(content.offsetHeight);
          tbl.innerHTML = "\n                        <thead>\n                            <tr>\n                                <th>ID</th>\n                                <th>Fecha</th>\n                                <th>DNI del Cliente</th>\n                                <th>Productos</th>\n                                <th>Precio</th>\n                            </tr>\n                        </thead>\n                    ";
          var tbody = d.createElement('tbody');
          datos.forEach(function (obj) {
            var tr = d.createElement("tr");
            var i = 0;

            for (var clave in obj) {
              if (_typeof(obj[clave]) === 'object') {
                var txt = "";
                obj[clave].forEach(function (product) {
                  txt += "".concat(product.nombre, ", ");
                  console.log(product.nombre);
                });
                tr.innerHTML += "<td>".concat(txt, "</td>");
              } else {
                tr.innerHTML += "<td>".concat(obj[clave], "</td>");
              }

              i++;
            }

            tbody.appendChild(tr);
          });
          tbl.appendChild(tbody);
          content.appendChild(tbl);
        }
      },
      error: function error(_error8) {
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
});

var loaderAct = function loaderAct() {
  load.style.display = "block";
  load.style.zIndex = 9999;
};

var loaderDes = function loaderDes() {
  load.style.display = "none";
  load.style.zIndex = 0;
};

var validarFecha = function validarFecha(fecha) {
  fecha = new Date(fecha).toISOString().replace('Z', '+00:00');
  fecha = new Date(fecha);
  return fecha;
};