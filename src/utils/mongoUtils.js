const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://farmaciaProyecto:farmaciaProyecto@clusterproyecto.rdjfylo.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function queryDB(collectionName, query) {
    try {
        await client.connect();
        console.log("Conexión exitosa con la base de datos");

        const collection = client.db("farmacia").collection(collectionName);
        const result = await collection.find(query).toArray();

        return result;

    } catch (error) {
        console.error("Error al conectar con la base de datos:", error);
        throw error;
    } finally {
        await client.close();
    }
}

async function insertData(collectionName, data) {
    try {
        await client.connect();
        console.log("Conexión exitosa con la base de datos");

        const collection = client.db("farmacia").collection(collectionName);
        const insertResult = await collection.insertOne(data);

        console.log("Documento insertado exitosamente");
        console.log("ID del documento insertado:", insertResult.insertedId);

    } catch (error) {
        console.error("Error al conectar con la base de datos:", error);
        throw error;
    } finally {
        await client.close();
    }
}

async function updateDataById(collectionName, id, newData) {
    try {
        await client.connect();
        console.log("Conexión exitosa con la base de datos");

        const collection = client.db("farmacia").collection(collectionName);
        const updateResult = await collection.updateOne({ _id: id }, { $set: newData });

        console.log("Documento actualizado exitosamente");
        console.log("Cantidad de documentos actualizados:", updateResult.modifiedCount);

    } catch (error) {
        console.error("Error al conectar con la base de datos:", error);
        throw error;
    } finally {
        await client.close();
    }
}

async function deleteData(collectionName, id) {
    try {
        await client.connect();
        console.log("Conexión exitosa con la base de datos");

        const collection = client.db("farmacia").collection(collectionName);
        const deleteResult = await collection.deleteOne({ _id: id });

        if (deleteResult.deletedCount === 1) {
            console.log("Documento eliminado exitosamente");
        } else {
            console.log("No se encontró el documento con el ID proporcionado");
        }

    } catch (error) {
        console.error("Error al conectar con la base de datos:", error);
        throw error;
    } finally {
        await client.close();
    }
}

//REPORTES

// INICIO MODIFICADO : MANUEL
async function report2DB() {
    try {
        await client.connect();
        console.log("Conexión exitosa con la base de datos");

        const collection1 = client.db("farmacia").collection('pedido');
        const result = await collection1.aggregate([
            {
                $lookup: {
                    from: "proveedor",
                    localField: "id_proveedor",
                    foreignField: "_id",
                    as: "proveedor_"
                }
            },
            {
                $unwind: "$productos"
            },
            {
                $project: {
                    _id: 0,
                    nombreProveedor: { $arrayElemAt: ["$proveedor_.nombre", 0] },
                    nombreProducto: "$productos.nombre"
                }
            }
        ]).toArray();

        return result;
    } catch (error) {
        console.error("Error al conectar con la base de datos:", error);
        throw error;
    } finally {
        await client.close();
    }
}
// FIN MODIFICADO : MANUEL

// INICIO MODIFICADO : LUIS
async function report4DB() {
    try {
        await client.connect();
        console.log("Conexión exitosa con la base de datos");

        const collection1 = client.db("farmacia").collection('pedido');
        const result = await collection1.aggregate([{ $group: { _id: "$id_proveedor", total_pedidos: { $sum: 1 } } }, { $sort: { total_pedidos: -1 } }, { $limit: 3 }, { $lookup: { from: "proveedor", localField: "_id", foreignField: "_id", as: "proveedor_info" } }, { $project: { _id: 0, proveedor: { $arrayElemAt: ["$proveedor_info.nombre", 0] }, total_pedidos: 1 } }]).limit(10).toArray();

        return result;

    } catch (error) {
        console.error("Error al conectar con la base de datos:", error);
        throw error;
    } finally {
        await client.close();
    }
}

// INICIO MODIFICADO : TELLO
async function report5DB() {
    try {
        await client.connect();
        console.log("Conexión exitosa con la base de datos");

        const collection1 = client.db("farmacia").collection('venta');
        const result = await collection1.aggregate([
            {
                $unwind: "$productos_vendidos"
            },
            {
                $group: {
                    _id: "$productos_vendidos.nombre",
                    total_vendido: { $sum: "$productos_vendidos.cantidad" }
                }
            },
            { $sort: { total_vendido: -1 } },
            { $limit: 5 }
        ]).toArray();

        return result;
    } catch (error) {
        console.error("Error al conectar con la base de datos:", error);
        throw error;
    } finally {
        await client.close();
    }
}
// FIN MODIFICADO : TELLO

async function report6DB(fechaInicio, fechaFin) {
    try {
        await client.connect();
        console.log("Conexión exitosa con la base de datos");

        const collection1 = client.db("farmacia").collection("venta");
        const result = await collection1
            .find({
                "fecha": {
                    $gte: fechaInicio,
                    $lte: fechaFin
                }
            })
            .toArray();
        return result;
    } catch (error) {
        console.error("Error al conectar con la base de datos:", error);
        throw error;
    } finally {
        await client.close();
    }
}



module.exports = {
    queryDB,
    deleteData,
    insertData,
    updateDataById,
    report2DB,
    report4DB,
    report5DB,
    report6DB
}
