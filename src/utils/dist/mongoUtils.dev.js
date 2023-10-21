"use strict";

var _require = require('mongodb'),
    MongoClient = _require.MongoClient,
    ServerApiVersion = _require.ServerApiVersion;

var uri = "mongodb+srv://farmaciaProyecto:farmaciaProyecto@clusterproyecto.rdjfylo.mongodb.net/?retryWrites=true&w=majority"; // Create a MongoClient with a MongoClientOptions object to set the Stable API version

var client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});

function queryDB(collectionName, query) {
  var collection, result;
  return regeneratorRuntime.async(function queryDB$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(client.connect());

        case 3:
          console.log("Conexión exitosa con la base de datos");
          collection = client.db("farmacia").collection(collectionName);
          _context.next = 7;
          return regeneratorRuntime.awrap(collection.find(query).toArray());

        case 7:
          result = _context.sent;
          return _context.abrupt("return", result);

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          console.error("Error al conectar con la base de datos:", _context.t0);
          throw _context.t0;

        case 15:
          _context.prev = 15;
          _context.next = 18;
          return regeneratorRuntime.awrap(client.close());

        case 18:
          return _context.finish(15);

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11, 15, 19]]);
}

function insertData(collectionName, data) {
  var collection, insertResult;
  return regeneratorRuntime.async(function insertData$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(client.connect());

        case 3:
          console.log("Conexión exitosa con la base de datos");
          collection = client.db("farmacia").collection(collectionName);
          _context2.next = 7;
          return regeneratorRuntime.awrap(collection.insertOne(data));

        case 7:
          insertResult = _context2.sent;
          console.log("Documento insertado exitosamente");
          console.log("ID del documento insertado:", insertResult.insertedId);
          _context2.next = 16;
          break;

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](0);
          console.error("Error al conectar con la base de datos:", _context2.t0);
          throw _context2.t0;

        case 16:
          _context2.prev = 16;
          _context2.next = 19;
          return regeneratorRuntime.awrap(client.close());

        case 19:
          return _context2.finish(16);

        case 20:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 12, 16, 20]]);
}

function updateDataById(collectionName, id, newData) {
  var collection, updateResult;
  return regeneratorRuntime.async(function updateDataById$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(client.connect());

        case 3:
          console.log("Conexión exitosa con la base de datos");
          collection = client.db("farmacia").collection(collectionName);
          _context3.next = 7;
          return regeneratorRuntime.awrap(collection.updateOne({
            _id: id
          }, {
            $set: newData
          }));

        case 7:
          updateResult = _context3.sent;
          console.log("Documento actualizado exitosamente");
          console.log("Cantidad de documentos actualizados:", updateResult.modifiedCount);
          _context3.next = 16;
          break;

        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](0);
          console.error("Error al conectar con la base de datos:", _context3.t0);
          throw _context3.t0;

        case 16:
          _context3.prev = 16;
          _context3.next = 19;
          return regeneratorRuntime.awrap(client.close());

        case 19:
          return _context3.finish(16);

        case 20:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 12, 16, 20]]);
}

function deleteData(collectionName, id) {
  var collection, deleteResult;
  return regeneratorRuntime.async(function deleteData$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(client.connect());

        case 3:
          console.log("Conexión exitosa con la base de datos");
          collection = client.db("farmacia").collection(collectionName);
          _context4.next = 7;
          return regeneratorRuntime.awrap(collection.deleteOne({
            _id: id
          }));

        case 7:
          deleteResult = _context4.sent;

          if (deleteResult.deletedCount === 1) {
            console.log("Documento eliminado exitosamente");
          } else {
            console.log("No se encontró el documento con el ID proporcionado");
          }

          _context4.next = 15;
          break;

        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](0);
          console.error("Error al conectar con la base de datos:", _context4.t0);
          throw _context4.t0;

        case 15:
          _context4.prev = 15;
          _context4.next = 18;
          return regeneratorRuntime.awrap(client.close());

        case 18:
          return _context4.finish(15);

        case 19:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 11, 15, 19]]);
} //REPORTES
// INICIO MODIFICADO : MANUEL


function report2DB() {
  var collection1, result;
  return regeneratorRuntime.async(function report2DB$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(client.connect());

        case 3:
          console.log("Conexión exitosa con la base de datos");
          collection1 = client.db("farmacia").collection('pedido');
          _context5.next = 7;
          return regeneratorRuntime.awrap(collection1.aggregate([{
            $lookup: {
              from: "proveedor",
              localField: "id_proveedor",
              foreignField: "_id",
              as: "proveedor_"
            }
          }, {
            $unwind: "$productos"
          }, {
            $project: {
              _id: 0,
              nombreProveedor: {
                $arrayElemAt: ["$proveedor_.nombre", 0]
              },
              nombreProducto: "$productos.nombre"
            }
          }]).toArray());

        case 7:
          result = _context5.sent;
          return _context5.abrupt("return", result);

        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5["catch"](0);
          console.error("Error al conectar con la base de datos:", _context5.t0);
          throw _context5.t0;

        case 15:
          _context5.prev = 15;
          _context5.next = 18;
          return regeneratorRuntime.awrap(client.close());

        case 18:
          return _context5.finish(15);

        case 19:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 11, 15, 19]]);
} // FIN MODIFICADO : MANUEL
// INICIO MODIFICADO : LUIS


function report4DB() {
  var collection1, result;
  return regeneratorRuntime.async(function report4DB$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(client.connect());

        case 3:
          console.log("Conexión exitosa con la base de datos");
          collection1 = client.db("farmacia").collection('pedido');
          _context6.next = 7;
          return regeneratorRuntime.awrap(collection1.aggregate([{
            $group: {
              _id: "$id_proveedor",
              total_pedidos: {
                $sum: 1
              }
            }
          }, {
            $sort: {
              total_pedidos: -1
            }
          }, {
            $limit: 3
          }, {
            $lookup: {
              from: "proveedor",
              localField: "_id",
              foreignField: "_id",
              as: "proveedor_info"
            }
          }, {
            $project: {
              _id: 0,
              proveedor: {
                $arrayElemAt: ["$proveedor_info.nombre", 0]
              },
              total_pedidos: 1
            }
          }]).limit(10).toArray());

        case 7:
          result = _context6.sent;
          return _context6.abrupt("return", result);

        case 11:
          _context6.prev = 11;
          _context6.t0 = _context6["catch"](0);
          console.error("Error al conectar con la base de datos:", _context6.t0);
          throw _context6.t0;

        case 15:
          _context6.prev = 15;
          _context6.next = 18;
          return regeneratorRuntime.awrap(client.close());

        case 18:
          return _context6.finish(15);

        case 19:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 11, 15, 19]]);
} // INICIO MODIFICADO : TELLO


function report5DB() {
  var collection1, result;
  return regeneratorRuntime.async(function report5DB$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(client.connect());

        case 3:
          console.log("Conexión exitosa con la base de datos");
          collection1 = client.db("farmacia").collection('venta');
          _context7.next = 7;
          return regeneratorRuntime.awrap(collection1.aggregate([{
            $unwind: "$productos_vendidos"
          }, {
            $group: {
              _id: "$productos_vendidos.nombre",
              total_vendido: {
                $sum: "$productos_vendidos.cantidad"
              }
            }
          }, {
            $sort: {
              total_vendido: -1
            }
          }, {
            $limit: 5
          }]).toArray());

        case 7:
          result = _context7.sent;
          return _context7.abrupt("return", result);

        case 11:
          _context7.prev = 11;
          _context7.t0 = _context7["catch"](0);
          console.error("Error al conectar con la base de datos:", _context7.t0);
          throw _context7.t0;

        case 15:
          _context7.prev = 15;
          _context7.next = 18;
          return regeneratorRuntime.awrap(client.close());

        case 18:
          return _context7.finish(15);

        case 19:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 11, 15, 19]]);
} // FIN MODIFICADO : TELLO


function report6DB(fechaInicio, fechaFin) {
  var collection1, result;
  return regeneratorRuntime.async(function report6DB$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return regeneratorRuntime.awrap(client.connect());

        case 3:
          console.log("Conexión exitosa con la base de datos");
          collection1 = client.db("farmacia").collection("venta");
          _context8.next = 7;
          return regeneratorRuntime.awrap(collection1.find({
            "fecha": {
              $gte: fechaInicio,
              $lte: fechaFin
            }
          }).toArray());

        case 7:
          result = _context8.sent;
          return _context8.abrupt("return", result);

        case 11:
          _context8.prev = 11;
          _context8.t0 = _context8["catch"](0);
          console.error("Error al conectar con la base de datos:", _context8.t0);
          throw _context8.t0;

        case 15:
          _context8.prev = 15;
          _context8.next = 18;
          return regeneratorRuntime.awrap(client.close());

        case 18:
          return _context8.finish(15);

        case 19:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 11, 15, 19]]);
}

module.exports = {
  queryDB: queryDB,
  deleteData: deleteData,
  insertData: insertData,
  updateDataById: updateDataById,
  report2DB: report2DB,
  report4DB: report4DB,
  report5DB: report5DB,
  report6DB: report6DB
};