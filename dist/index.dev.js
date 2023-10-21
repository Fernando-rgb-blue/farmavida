"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//CONSTANTES
var express = require('express');

var path = require('path');

var app = express();

var bodyParser = require('body-parser');

require('dotenv').config({
  path: './config/.env'
});

var _require = require("./src/utils/mongoUtils.js"),
    queryDB = _require.queryDB,
    deleteData = _require.deleteData,
    insertData = _require.insertData,
    updateDataById = _require.updateDataById,
    report2DB = _require.report2DB,
    report4DB = _require.report4DB,
    report5DB = _require.report5DB,
    report6DB = _require.report6DB;

var _require2 = require('console'),
    Console = _require2.Console; // Configurar el middleware body-parser


app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json()); //USE

app.use(express["static"]("public")); //SET

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
var expPort = process.env.EXP_PORT;
var expIp = process.env.EXP_IP; // ***************************************************************************************
// NUEVO CÓDIGO DE LOGIN:

var isLoggedIn = false; // Función para mantener el estado si el usuario ha ingresado o no
// TIENEN QUE AGREGAR ESTA FUNCIÓN EN CADA .get Y .post QUE CREEN

function checkLoggedIn(req, res, next) {
  if (isLoggedIn) {
    next();
  } else {
    res.redirect('/login');
  }
} // // ESTA NO, ESTA SOLO ES PARA EL /login
// function noMoreLogin(req, res, next) {
//     if (isLoggedIn) {
//         res.redirect('/')
//     } else {
//         next();
//     }
// }
// app.get('/login', noMoreLogin, (req, res) => {
//     res.render('login');
// })


app.post('/login', function _callee(req, res) {
  var query, empl_email, empl_password, results;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          query = {};
          empl_email = req.body.username;
          empl_password = req.body.password;
          console.log(empl_email, empl_password);
          query = {
            'email': empl_email,
            '_id': empl_password
          };
          _context.prev = 5;
          _context.next = 8;
          return regeneratorRuntime.awrap(queryDB('empleado', query));

        case 8:
          results = _context.sent;

          if (results.length > 0) {
            isLoggedIn = true;
            res.redirect('/');
          } else {
            res.redirect('/login');
          }

          _context.next = 16;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](5);
          console.error('Error al realizar la consulta a la base de datos:', _context.t0);
          res.redirect('/login');

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[5, 12]]);
}); // El '/' es ahora la página principal, unido al main.pug
// app.get('/', checkLoggedIn, (req, res) => {
//     res.render('main');
// })

app.get('/', function (req, res) {
  res.render('reports');
}); // Ruta de salida

app.get('/out', function (req, res) {
  isLoggedIn = false;
  res.redirect('/login');
}); // ***************************************************************************************
// Ruta para Mostrar todo
// app.get('/mostTodo', checkLoggedIn, (req, res) => {
//     // Lógica para manejar la solicitud GET
//     // Puede ser la renderización de una vista, envío de datos, etc.
//     res.render('mostTodo', {
//         results: []
//     });
// });
// INICIO MODIFICADO: MANUEL
// app.get('/pedByProv', checkLoggedIn, async (req, res) => {
//     let results1;
//     try {
//         results1 = await report1DB();
//     } catch(error) {
//         console.error(error);
//         results1 = [];
//     } finally {
//         res.render('pedByProv', { results1 });
//     }
// })
// FIN MODIFICADO: MANUEL
// INICIO MODIFICADO LUIS
// app.get('/reportPyPed', checkLoggedIn, async (req, res) => {
//     let results;
//     try {
//         results = await report4DB(); // Llamar a la función queryDB para obtener los resultados
//     } catch (error) {
//         console.error(error);
//         results = []; // Establecer los resultados como un arreglo vacío en caso de error
//     } finally {
//         res.render('reportPyPed', { results }); // Pasar los resultados a la plantilla Pug como una variable
//     }
// });
// Ruta para mostrar Clientes

app.get('/mostClient', checkLoggedIn, function _callee2(req, res) {
  var results;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(MostrClientes());

        case 3:
          results = _context2.sent;
          _context2.next = 10;
          break;

        case 6:
          _context2.prev = 6;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          results = []; // Establecer los resultados como un arreglo vacío en caso de error

        case 10:
          _context2.prev = 10;
          res.render('mostClient', {
            results: results
          }); // Pasar los resultados a la plantilla Pug como una variable

          return _context2.finish(10);

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 6, 10, 13]]);
}); // Ruta para mostrar PROVEEDORES

app.get('/mostProv', checkLoggedIn, function _callee3(req, res) {
  var results;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(MostrProvee());

        case 3:
          results = _context3.sent;
          _context3.next = 10;
          break;

        case 6:
          _context3.prev = 6;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);
          results = []; // Establecer los resultados como un arreglo vacío en caso de error

        case 10:
          _context3.prev = 10;
          res.render('mostProv', {
            results: results
          }); // Pasar los resultados a la plantilla Pug como una variable

          return _context3.finish(10);

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 6, 10, 13]]);
}); // Ruta para productos

app.get('/products', function (req, res) {
  // Puede ser la renderización de una vista, envío de datos, etc.
  res.render("products");
});
app.post('/products', function _callee4(req, res) {
  var formularios, query, key, value, results, dataToInsert, result, text, id, _id, newData, _result, _text;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          formularios = req.body.formId;
          query = {};
          _context4.t0 = formularios;
          _context4.next = _context4.t0 === "form1" ? 5 : _context4.t0 === "form2" ? 29 : _context4.t0 === "form3" ? 42 : _context4.t0 === "form4" ? 55 : 81;
          break;

        case 5:
          key = req.body.key;
          value = req.body.val;
          _context4.t1 = key;
          _context4.next = _context4.t1 === "_id" ? 10 : _context4.t1 === "Fec_Vcto_Reg_Sanitario" ? 12 : 15;
          break;

        case 10:
          value = parseInt(value);
          return _context4.abrupt("break", 15);

        case 12:
          value = new Date(value).toISOString().replace('Z', '+00:00');
          value = new Date(value);
          return _context4.abrupt("break", 15);

        case 15:
          query = _defineProperty({}, key, value);
          console.log(query);
          _context4.prev = 17;
          _context4.next = 20;
          return regeneratorRuntime.awrap(queryDB('producto', query));

        case 20:
          results = _context4.sent;
          res.status(200).json({
            message: "Todo correcto",
            results: results
          });
          _context4.next = 28;
          break;

        case 24:
          _context4.prev = 24;
          _context4.t2 = _context4["catch"](17);
          console.error('Error al realizar la consulta a la base de datos:', _context4.t2);
          res.status(500).json({
            message: "Error"
          });

        case 28:
          return _context4.abrupt("break", 81);

        case 29:
          dataToInsert = {
            _id: parseInt(req.body._id),
            Nom_Prod: req.body.Nom_Prod,
            Concent: req.body.Concent,
            Nom_Form_Farm: req.body.Nom_Form_Farm,
            Nom_Form_Farm_Simplif: req.body.Nom_Form_Farm_Simplif,
            Presentac: req.body.Presentac,
            Fracciones: parseInt(req.body.Fracciones),
            Fec_Vcto_Reg_Sanitario: req.body.Fec_Vcto_Reg_Sanitario,
            Num_RegSan: req.body.Num_RegSan,
            Situacion: req.body.Situacion,
            Stock: parseInt(req.body.Stock),
            Precio: parseFloat(req.body.Precio)
          };
          _context4.prev = 30;
          _context4.next = 33;
          return regeneratorRuntime.awrap(insertData('producto', dataToInsert));

        case 33:
          result = _context4.sent;
          text = "Datos insertados a la ID: ".concat(result);
          res.status(200).json({
            message: text
          });
          _context4.next = 41;
          break;

        case 38:
          _context4.prev = 38;
          _context4.t3 = _context4["catch"](30);
          res.status(500).json({
            message: "Error"
          });

        case 41:
          return _context4.abrupt("break", 81);

        case 42:
          id = parseInt(req.body._id);
          console.log(req.body);
          _context4.prev = 44;
          _context4.next = 47;
          return regeneratorRuntime.awrap(deleteData('producto', id)["catch"](console.error));

        case 47:
          res.status(200).json({
            message: 'El dato se ha eliminado correctamente'
          });
          _context4.next = 54;
          break;

        case 50:
          _context4.prev = 50;
          _context4.t4 = _context4["catch"](44);
          console.error('Error al eliminar el datos:', error);
          res.status(500).json({
            message: 'Ha ocurrido un error al eliminar el dato'
          });

        case 54:
          return _context4.abrupt("break", 81);

        case 55:
          _id = parseInt(req.body._id);
          newData = {}; // Validar los campos antes de guardarlos en el objeto newData

          if (req.body.Nom_Prod) newData.Nom_Prod = req.body.Nom_Prod;
          if (req.body.Concent) newData.Concent = req.body.Concent;
          if (req.body.Nom_Form_Farm) newData.Nom_Form_Farm = req.body.Nom_Form_Farm;
          if (req.body.Nom_Form_Farm_Simplif) newData.Nom_Form_Farm_Simplif = req.body.Nom_Form_Farm_Simplif;
          if (req.body.Presentac) newData.Presentac = req.body.Presentac;
          if (req.body.Fracciones) newData.Fracciones = parseInt(req.body.Fracciones);
          if (req.body.Fec_Vcto_Reg_Sanitario) newData.Fec_Vcto_Reg_Sanitario = req.body.Fec_Vcto_Reg_Sanitario;
          if (req.body.Num_RegSan) newData.Num_RegSan = req.body.Num_RegSan;
          if (req.body.Situacion) newData.Situacion = req.body.Situacion;
          if (req.body.Stock) newData.Stock = parseInt(req.body.Stock);
          if (req.body.Precio) newData.Precio = parseFloat(req.body.Precio);
          console.log(req.body);
          _context4.prev = 69;
          _context4.next = 72;
          return regeneratorRuntime.awrap(updateDataById('producto', _id, newData));

        case 72:
          _result = _context4.sent;
          _text = "Cantidad de documentos actualizados: ".concat(_result);
          res.status(200).json({
            message: _text
          });
          _context4.next = 80;
          break;

        case 77:
          _context4.prev = 77;
          _context4.t5 = _context4["catch"](69);
          res.status(500).json({
            message: 'Ha ocurrido un error al modificar los datos'
          });

        case 80:
          return _context4.abrupt("break", 81);

        case 81:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[17, 24], [30, 38], [44, 50], [69, 77]]);
}); // Ruta para ventas

app.get('/sales', checkLoggedIn, function (req, res) {
  res.render('sales', {
    results: []
  });
});
app.post('/sales', checkLoggedIn, function _callee5(req, res) {
  var formularios, query, key, value, projection, results, id;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          formularios = req.body.formId;
          query = {};
          _context5.t0 = formularios;
          _context5.next = _context5.t0 === "form1" ? 5 : _context5.t0 === "form2" ? 22 : _context5.t0 === "form3" ? 23 : 36;
          break;

        case 5:
          key = req.body.SalesCat;
          value = req.body.searchBar;
          console.log(key, value);
          query = _defineProperty({}, key, value);
          _context5.prev = 9;
          // Definir la proyección de campos
          projection = {
            productos_vendidos: 1,
            fecha: 1,
            id_cliente: 1,
            precio_total: 1
          };
          _context5.next = 13;
          return regeneratorRuntime.awrap(queryDB('venta', query, projection));

        case 13:
          results = _context5.sent;
          res.render('sales', {
            results: results
          });
          _context5.next = 21;
          break;

        case 17:
          _context5.prev = 17;
          _context5.t1 = _context5["catch"](9);
          console.error('Error al realizar la consulta a la base de datos:', _context5.t1); // Resto de la lógica para manejar el error

          res.redirect('/sales');

        case 21:
          return _context5.abrupt("break", 36);

        case 22:
          return _context5.abrupt("break", 36);

        case 23:
          id = req.body._id;
          console.log(req.body);
          _context5.prev = 25;
          _context5.next = 28;
          return regeneratorRuntime.awrap(deleteData('venta', id)["catch"](console.error));

        case 28:
          res.status(200).json({
            message: 'El dato se ha eliminado correctamente'
          });
          _context5.next = 35;
          break;

        case 31:
          _context5.prev = 31;
          _context5.t2 = _context5["catch"](25);
          console.error('Error al eliminar el datos:', error);
          res.status(500).json({
            message: 'Ha ocurrido un error al eliminar el dato'
          });

        case 35:
          return _context5.abrupt("break", 36);

        case 36:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[9, 17], [25, 31]]);
}); // Ruta para clientes

app.get('/customers', function (req, res) {
  res.render('customers', {
    results: []
  });
});
app.post('/customers', function _callee6(req, res) {
  var formularios, query, key, value, results, idCliente, nombreCliente, dataToInsert, id;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          formularios = req.body.formId;
          query = {};
          _context6.t0 = formularios;
          _context6.next = _context6.t0 === "form1" ? 5 : _context6.t0 === "form2" ? 21 : _context6.t0 === "form3" ? 27 : 31;
          break;

        case 5:
          key = req.body.CustomersCat;
          value = req.body.searchBar;
          console.log(key, value);
          query = _defineProperty({}, key, value);
          _context6.prev = 9;
          _context6.next = 12;
          return regeneratorRuntime.awrap(queryDB('cliente', query));

        case 12:
          results = _context6.sent;
          res.render('customers', {
            results: results
          });
          _context6.next = 20;
          break;

        case 16:
          _context6.prev = 16;
          _context6.t1 = _context6["catch"](9);
          console.error('Error al realizar la consulta a la base de datos:', _context6.t1); // Resto de la lógica para manejar el error

          res.redirect('/customers');

        case 20:
          return _context6.abrupt("break", 31);

        case 21:
          idCliente = req.body._id;
          nombreCliente = req.body.nombre;
          dataToInsert = {
            _id: idCliente,
            nombre: nombreCliente
          };
          insertData('cliente', dataToInsert)["catch"](console.error);
          res.redirect('/customers');
          return _context6.abrupt("break", 31);

        case 27:
          id = parseInt(req.body._id);
          deleteData('cliente', id)["catch"](console.error);
          res.redirect('/customers');
          return _context6.abrupt("break", 31);

        case 31:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[9, 16]]);
}); // Ruta para proveedores

app.get('/providers', function (req, res) {
  res.render('providers', {
    results: []
  });
});
app.post('/providers', function _callee7(req, res) {
  var formularios, query, key, value, results, dataToInsert, result, text, id, _id, newData, _result2, _text2;

  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          formularios = req.body.formId;
          query = {};
          _context7.t0 = formularios;
          _context7.next = _context7.t0 === "form1" ? 5 : _context7.t0 === "form2" ? 21 : _context7.t0 === "form3" ? 34 : _context7.t0 === "form4" ? 47 : 65;
          break;

        case 5:
          key = req.body.ProvidersCat;
          value = req.body.searchBar;
          console.log(key, value);
          query = _defineProperty({}, key, value);
          _context7.prev = 9;
          _context7.next = 12;
          return regeneratorRuntime.awrap(queryDB('proveedor', query));

        case 12:
          results = _context7.sent;
          res.render('providers', {
            results: results
          });
          _context7.next = 20;
          break;

        case 16:
          _context7.prev = 16;
          _context7.t1 = _context7["catch"](9);
          console.error('Error al realizar la consulta a la base de datos:', _context7.t1); // Resto de la lógica para manejar el error

          res.redirect('/providers');

        case 20:
          return _context7.abrupt("break", 65);

        case 21:
          dataToInsert = {
            _id: req.body._id,
            nombre: req.body.nombre,
            telefono: req.body.telefono,
            email: req.body.email
          };
          _context7.prev = 22;
          _context7.next = 25;
          return regeneratorRuntime.awrap(insertData('proveedor', dataToInsert));

        case 25:
          result = _context7.sent;
          text = "Datos insertados a la ID: ".concat(result);
          res.status(200).json({
            message: text
          });
          _context7.next = 33;
          break;

        case 30:
          _context7.prev = 30;
          _context7.t2 = _context7["catch"](22);
          res.status(500).json({
            message: "Error"
          });

        case 33:
          return _context7.abrupt("break", 65);

        case 34:
          id = req.body._id;
          console.log(req.body);
          _context7.prev = 36;
          _context7.next = 39;
          return regeneratorRuntime.awrap(deleteData('proveedor', id)["catch"](console.error));

        case 39:
          res.status(200).json({
            message: 'El dato se ha eliminado correctamente'
          });
          _context7.next = 46;
          break;

        case 42:
          _context7.prev = 42;
          _context7.t3 = _context7["catch"](36);
          console.error('Error al eliminar el datos:', error);
          res.status(500).json({
            message: 'Ha ocurrido un error al eliminar el dato'
          });

        case 46:
          return _context7.abrupt("break", 65);

        case 47:
          _id = req.body._id;
          newData = {}; // Validar los campos antes de guardarlos en el objeto newData

          if (req.body.nombre) newData.nombre = req.body.nombre;
          if (req.body.telefono) newData.telefono = req.body.telefono;
          if (req.body.email) newData.email = req.body.email;
          console.log(req.body);
          _context7.prev = 53;
          _context7.next = 56;
          return regeneratorRuntime.awrap(updateDataById('proveedor', _id, newData));

        case 56:
          _result2 = _context7.sent;
          _text2 = "Cantidad de documentos actualizados: ".concat(_result2);
          res.status(200).json({
            message: _text2
          });
          _context7.next = 64;
          break;

        case 61:
          _context7.prev = 61;
          _context7.t4 = _context7["catch"](53);
          res.status(500).json({
            message: 'Ha ocurrido un error al modificar los datos'
          });

        case 64:
          return _context7.abrupt("break", 65);

        case 65:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[9, 16], [22, 30], [36, 42], [53, 61]]);
}); // Ruta para reportes

app.get('/reports', function (req, res) {
  res.render('reports');
});
app.post('/reports', function _callee8(req, res) {
  var report, results, fecha1, fecha2;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          report = req.body.report;
          _context8.t0 = report;
          _context8.next = _context8.t0 === '1a' ? 4 : _context8.t0 === '1b' ? 5 : _context8.t0 === '1c' ? 16 : _context8.t0 === '1d' ? 27 : _context8.t0 === '1e' ? 38 : _context8.t0 === '1f' ? 39 : _context8.t0 === '2' ? 40 : _context8.t0 === '3' ? 51 : _context8.t0 === '4' ? 52 : _context8.t0 === '5' ? 63 : _context8.t0 === '6' ? 74 : 91;
          break;

        case 4:
          return _context8.abrupt("break", 91);

        case 5:
          _context8.prev = 5;
          _context8.next = 8;
          return regeneratorRuntime.awrap(queryDB("empleado", {}));

        case 8:
          results = _context8.sent;
          // Llamar a la función queryDB para obtener los resultados
          res.status(200).json({
            results: results
          });
          _context8.next = 15;
          break;

        case 12:
          _context8.prev = 12;
          _context8.t1 = _context8["catch"](5);
          res.status(500).json({
            message: _context8.t1
          });

        case 15:
          return _context8.abrupt("break", 91);

        case 16:
          _context8.prev = 16;
          _context8.next = 19;
          return regeneratorRuntime.awrap(queryDB("pedido", {}));

        case 19:
          results = _context8.sent;
          // Llamar a la función queryDB para obtener los resultados
          res.status(200).json({
            results: results
          });
          _context8.next = 26;
          break;

        case 23:
          _context8.prev = 23;
          _context8.t2 = _context8["catch"](16);
          res.status(500).json({
            message: _context8.t2
          });

        case 26:
          return _context8.abrupt("break", 91);

        case 27:
          _context8.prev = 27;
          _context8.next = 30;
          return regeneratorRuntime.awrap(queryDB("producto", {}));

        case 30:
          results = _context8.sent;
          // Llamar a la función queryDB para obtener los resultados
          res.status(200).json({
            results: results
          });
          _context8.next = 37;
          break;

        case 34:
          _context8.prev = 34;
          _context8.t3 = _context8["catch"](27);
          res.status(500).json({
            message: _context8.t3
          });

        case 37:
          return _context8.abrupt("break", 91);

        case 38:
          return _context8.abrupt("break", 91);

        case 39:
          return _context8.abrupt("break", 91);

        case 40:
          _context8.prev = 40;
          _context8.next = 43;
          return regeneratorRuntime.awrap(report2DB());

        case 43:
          results = _context8.sent;
          // Llamar a la función queryDB para obtener los resultados
          res.status(200).json({
            results: results
          });
          _context8.next = 50;
          break;

        case 47:
          _context8.prev = 47;
          _context8.t4 = _context8["catch"](40);
          res.status(500).json({
            message: _context8.t4
          });

        case 50:
          return _context8.abrupt("break", 91);

        case 51:
          return _context8.abrupt("break", 91);

        case 52:
          _context8.prev = 52;
          _context8.next = 55;
          return regeneratorRuntime.awrap(report4DB());

        case 55:
          results = _context8.sent;
          // Llamar a la función queryDB para obtener los resultados
          res.status(200).json({
            results: results
          });
          _context8.next = 62;
          break;

        case 59:
          _context8.prev = 59;
          _context8.t5 = _context8["catch"](52);
          res.status(500).json({
            message: _context8.t5
          });

        case 62:
          return _context8.abrupt("break", 91);

        case 63:
          _context8.prev = 63;
          _context8.next = 66;
          return regeneratorRuntime.awrap(report5DB());

        case 66:
          results = _context8.sent;
          // Llamar a la función queryDB para obtener los resultados
          res.status(200).json({
            results: results
          });
          _context8.next = 73;
          break;

        case 70:
          _context8.prev = 70;
          _context8.t6 = _context8["catch"](63);
          res.status(500).json({
            message: _context8.t6
          });

        case 73:
          return _context8.abrupt("break", 91);

        case 74:
          fecha1 = req.body.fecha1;
          fecha2 = req.body.fecha2;
          fecha1 = new Date(fecha1).toISOString().replace('Z', '+00:00');
          fecha1 = new Date(fecha1);
          fecha2 = new Date(fecha2).toISOString().replace('Z', '+00:00');
          fecha2 = new Date(fecha2);
          _context8.prev = 80;
          _context8.next = 83;
          return regeneratorRuntime.awrap(report6DB(fecha1, fecha2));

        case 83:
          results = _context8.sent;
          res.status(200).json({
            results: results
          });
          _context8.next = 90;
          break;

        case 87:
          _context8.prev = 87;
          _context8.t7 = _context8["catch"](80);
          res.status(500).json({
            message: _context8.t7
          });

        case 90:
          return _context8.abrupt("break", 91);

        case 91:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[5, 12], [16, 23], [27, 34], [40, 47], [52, 59], [63, 70], [80, 87]]);
}); // Iniciar el servidor

app.listen(expPort, function () {
  console.log('Servidor Express iniciado en el puerto 3000');
});