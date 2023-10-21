//CONSTANTES
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

require('dotenv').config({
    path: './config/.env'
});
const {
    queryDB,
    deleteData,
    insertData,
    updateDataById,
    report2DB,
    report4DB,
    report5DB,
    report6DB
} = require("./src/utils/mongoUtils.js");
const { Console } = require('console');

// Configurar el middleware body-parser
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());
//USE
app.use(express.static("public"));

//SET
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

const expPort = process.env.EXP_PORT;
const expIp = process.env.EXP_IP;

// ***************************************************************************************
// NUEVO CÓDIGO DE LOGIN:
let isLoggedIn = true; //CAMBIE POR Q NO CARGABA VENTAS TABA EN FALSE

// Función para mantener el estado si el usuario ha ingresado o no
// TIENEN QUE AGREGAR ESTA FUNCIÓN EN CADA .get Y .post QUE CREEN
function checkLoggedIn(req, res, next) {
    if (isLoggedIn) {
        next();
    } else {
        res.redirect('/login')
    }
}

// // ESTA NO, ESTA SOLO ES PARA EL /login
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


app.post('/login', async (req, res) => {
    let query = {};
    const empl_email = req.body.username;
    const empl_password = req.body.password;
    console.log(empl_email, empl_password);
    
    query = {'email': empl_email, '_id': empl_password};

    try {
        const results = await queryDB('empleado', query);

        if (results.length > 0) {
            isLoggedIn = true;
            res.redirect('/');
        } else {
            res.redirect('/login');
        }
    } catch (error) {
        console.error('Error al realizar la consulta a la base de datos:', error);
        res.redirect('/login');
    }
});

// El '/' es ahora la página principal, unido al main.pug
// app.get('/', checkLoggedIn, (req, res) => {
//     res.render('main');
// })

app.get('/', (req, res) => {
    res.render('reports');
})

// Ruta de salida
app.get('/out', (req, res) => {
    isLoggedIn = false;
    res.redirect('/login');
});
// ***************************************************************************************

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






// Ruta para añadir ventas 13/07/23
app.get('/anadir', checkLoggedIn, (req, res) => {
    res.render('anadir', {
        results: []
    });
});


app.post('/anadir', checkLoggedIn, async (req, res) => {
    const formularios = req.body.formId;
    let query = {};
    
    switch (formularios) {
        case "form1":
            break;
    
        case "form2":
            const dataToInsert = {
                _id: req.body._id,
                fecha: new Date(req.body.fecha),
                id_cliente: req.body.id_cliente,
                productos_vendidos: [],
                // cod_prod: req.body.cod_prod,
                // nom_prod: req.body.nombre,
                // cant: req.body.cantidad,
                // precio: req.body.precio,
                precio_total: parseFloat(req.body.precio_total)
            };

            const codigosProd = req.body.cod_prod;
            const nombresProd = req.body.nombre;
            const cantidadesProd = req.body.cantidad;
            const preciosProd = req.body.precio;

            const longitud = codigosProd.length;

            for (let i = 0; i < longitud; i++) {
                const producto = {
                    cod_prod: codigosProd[i],
                    nombre: nombresProd[i],
                    cantidad: parseInt(cantidadesProd[i]),
                    precio: parseFloat(preciosProd[i])
                };
                dataToInsert.productos_vendidos.push(producto);
            }

            insertData('venta', dataToInsert).catch(console.error);
            res.redirect('/anadir');
            break;
        case "form3":
            break;

    }
});











// Ruta para mostrar Clientes
app.get('/mostClient', checkLoggedIn, async (req, res) => {
    let results;
    try {
        results = await MostrClientes(); // Llamar a la función queryDB para obtener los resultados
    } catch (error) {
        console.error(error);
        results = []; // Establecer los resultados como un arreglo vacío en caso de error
    } finally {
        res.render('mostClient', { results }); // Pasar los resultados a la plantilla Pug como una variable
    }
});

// Ruta para mostrar PROVEEDORES
app.get('/mostProv', checkLoggedIn, async(req, res) => {
    let results;
    try {
        results = await MostrProvee(); // Llamar a la función queryDB para obtener los resultados
    } catch (error) {
        console.error(error);
        results = []; // Establecer los resultados como un arreglo vacío en caso de error
    } finally {
        res.render('mostProv', { results }); // Pasar los resultados a la plantilla Pug como una variable
    }
});

// Ruta para productos
app.get('/products', (req, res) => {
    // Puede ser la renderización de una vista, envío de datos, etc.
    res.render("products");
});

app.post('/products', async (req, res) => {

    const formularios = req.body.formId;
    let query = {};

    switch (formularios) {
        case "form1":
            const key = req.body.key;
            let value = req.body.val;

            switch (key) {
                case "_id":
                    value = parseInt(value); break;
                case "Fec_Vcto_Reg_Sanitario":
                    value = new Date(value).toISOString().replace('Z', '+00:00');
                    value = new Date(value); break;
            }

            query = { [key]: value };
            console.log(query)

            try {
                const results = await queryDB('producto', query);
                res.status(200).json({ message: "Todo correcto", results: results });

            } catch (error) {
                console.error('Error al realizar la consulta a la base de datos:', error);
                res.status(500).json({ message: "Error" });
            }

            break;

        case "form2":

            const dataToInsert = {
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

            try {
                const result = await insertData('producto', dataToInsert);
                const text = `Datos insertados a la ID: ${result}`;
                res.status(200).json({ message: text });
            } catch (error) {
                res.status(500).json({ message: "Error" });
            }

            break;

        case "form3":
            const id = parseInt(req.body._id);
            console.log(req.body);

            try {
                await deleteData('producto', id).catch(console.error);
                res.status(200).json({ message: 'El dato se ha eliminado correctamente' });
            } catch {
                console.error('Error al eliminar el datos:', error);
                res.status(500).json({ message: 'Ha ocurrido un error al eliminar el dato' });
            }

            break;

        case "form4":
            const _id = parseInt(req.body._id);
            const newData = {};
            // Validar los campos antes de guardarlos en el objeto newData
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

            try {
                const result = await updateDataById('producto', _id, newData);
                const text = `Cantidad de documentos actualizados: ${result}`
                res.status(200).json({ message: text });
            } catch (error) {
                res.status(500).json({ message: 'Ha ocurrido un error al modificar los datos' });
            }

            break;
    }

});

// Ruta para ventas
app.get('/sales', checkLoggedIn, (req, res) => {
    res.render('sales', {
        results: []
    });
});

app.post('/sales', checkLoggedIn, async (req, res) => {
    const formularios = req.body.formId;
    let query = {};

    switch (formularios) {
        case "form1":
            const key = req.body.SalesCat;
            const value = req.body.searchBar;
            console.log(key, value);
    
            query = {
                [key]: value
            };
    
            try {
                // Definir la proyección de campos
                const projection = {
                    productos_vendidos: 1,
                    fecha: 1,
                    id_cliente: 1,
                    precio_total: 1
                };
        
                const results = await queryDB('venta', query, projection);
        
                res.render('sales', {
                    results: results
                });
            } catch (error) {
                console.error('Error al realizar la consulta a la base de datos:', error);
                // Resto de la lógica para manejar el error
                res.redirect('/sales');
            }
            break;
    
        case "form2":
            break;


        case "form3":
            const id = req.body._id;
            console.log(req.body);
            
            try{
                await deleteData('venta', id).catch(console.error);
                res.status(200).json({ message: 'El dato se ha eliminado correctamente' });
            } catch {
                console.error('Error al eliminar el datos:', error);
                res.status(500).json({ message: 'Ha ocurrido un error al eliminar el dato' });
            }

            break;

    }
});

// Ruta para clientes
app.get('/customers', (req, res) => {
    res.render('customers', {
        results: []
    });
});

app.post('/customers', async (req, res) => {

    const formularios = req.body.formId;
    let query = {};

    switch (formularios) {
        case "form1":
            const key = req.body.CustomersCat;
            const value = req.body.searchBar;
            console.log(key, value);
        
            query = {
                [key]: value
            };
        
            try {
                const results = await queryDB('cliente', query);
                res.render('customers', {
                    results: results
                });
            } catch (error) {
                console.error('Error al realizar la consulta a la base de datos:', error);
                // Resto de la lógica para manejar el error
                res.redirect('/customers');
            }
            break;
        
        case "form2":
            const idCliente = req.body._id;
            const nombreCliente = req.body.nombre;
            const dataToInsert = {
                _id: idCliente,
                nombre: nombreCliente 
            };
            insertData('cliente', dataToInsert).catch(console.error);
            res.redirect('/customers');
            break;
        case "form3":
            const id = parseInt(req.body._id);
            deleteData('cliente', id).catch(console.error);
            res.redirect('/customers');
            break;
    }

});


// Ruta para proveedores
app.get('/providers', (req, res) => {
    res.render('providers', {
        results: []
    });
});

app.post('/providers', async (req, res) => {

    const formularios = req.body.formId;
    let query = {};

    switch (formularios) {
        case "form1":
            const key = req.body.ProvidersCat;
            const value = req.body.searchBar;
            console.log(key, value);
        
            query = {
                [key]: value
            };
        
            try {
                const results = await queryDB('proveedor', query);
                res.render('providers', {
                    results: results
                });
            } catch (error) {
                console.error('Error al realizar la consulta a la base de datos:', error);
                // Resto de la lógica para manejar el error
                res.redirect('/providers');
            }
            break;
        
        case "form2":
            const dataToInsert = {
                _id: req.body._id,
                nombre: req.body.nombre,
                telefono: req.body.telefono,
                email: req.body.email
            };

            try {
                const result = await insertData('proveedor', dataToInsert);
                const text = `Datos insertados a la ID: ${result}`;
                res.status(200).json({ message: text });
            } catch (error) {
                res.status(500).json({ message: "Error" });
            }

            break;
        case "form3":
            const id = req.body._id;
            console.log(req.body);

            try {
                await deleteData('proveedor', id).catch(console.error);
                res.status(200).json({ message: 'El dato se ha eliminado correctamente' });
            } catch {
                console.error('Error al eliminar el datos:', error);
                res.status(500).json({ message: 'Ha ocurrido un error al eliminar el dato' });
            }

            break;


            case "form4":
                const _id = req.body._id;
                const newData = {};
                // Validar los campos antes de guardarlos en el objeto newData
                if (req.body.nombre) newData.nombre = req.body.nombre;
                if (req.body.telefono) newData.telefono = req.body.telefono;
                if (req.body.email) newData.email = req.body.email;
                
                console.log(req.body);
    
                try {
                    const result = await updateDataById('proveedor', _id, newData);
                    const text = `Cantidad de documentos actualizados: ${result}`
                    res.status(200).json({ message: text });
                } catch (error) {
                    res.status(500).json({ message: 'Ha ocurrido un error al modificar los datos' });
                }
    
                break;
    }

});


// Ruta para reportes
app.get('/reports', (req, res) => {
    res.render('reports');
});

app.post('/reports', async (req, res) => {
    
    const report = req.body.report;
    let results;

    switch(report){
        case '1a': 
            try {
                results = await queryDB("cliente",{}); // Llamar a la función queryDB para obtener los resultados
                res.status(200).json({ results: results });
            } catch (error) {
                res.status(500).json({ message: error });
            }
            break;
        case '1b':
            try {
                results = await queryDB("empleado",{}); // Llamar a la función queryDB para obtener los resultados
                res.status(200).json({ results: results });
            } catch (error) {
                res.status(500).json({ message: error });
            }
            
            break;
        case '1c':
            try {
                results = await queryDB("pedido",{}); // Llamar a la función queryDB para obtener los resultados
                res.status(200).json({ results: results });
            } catch (error) {
                res.status(500).json({ message: error });
            }
            break;
        case '1d':
            try {
                results = await queryDB("producto",{}); // Llamar a la función queryDB para obtener los resultados
                res.status(200).json({ results: results});
            } catch (error) {
                res.status(500).json({ message: error });
            }
            break;
        case '1e':
            try {
                results = await queryDB("proveedor",{}); // Llamar a la función queryDB para obtener los resultados
                res.status(200).json({ results: results });
            } catch (error) {
                res.status(500).json({ message: error });
            }
            break;
        case '1f':
            break;
        case '2':
            try {
                results = await report2DB(); // Llamar a la función queryDB para obtener los resultados
                res.status(200).json({ results: results});
            } catch (error) {
                res.status(500).json({ message: error });
            } 
            break;
        case '3':
            break;
        case '4':
            try {
                results = await report4DB(); // Llamar a la función queryDB para obtener los resultados
                res.status(200).json({ results: results});
            } catch (error) {
                res.status(500).json({ message: error });
            } 
            break;
        case '5':
            try {
                results = await report5DB(); // Llamar a la función queryDB para obtener los resultados
                res.status(200).json({ results: results });
            } catch (error) {
                res.status(500).json({ message: error });
            }
            break;
        case '6':
            let fecha1 = req.body.fecha1;
            let fecha2 = req.body.fecha2;

            fecha1 = new Date(fecha1).toISOString().replace('Z', '+00:00');
            fecha1 = new Date(fecha1); 
            fecha2 = new Date(fecha2).toISOString().replace('Z', '+00:00');
            fecha2 = new Date(fecha2); 

            try {
                results = await report6DB(fecha1, fecha2);
                res.status(200).json({ results: results });
            } catch (error) {
                res.status(500).json({ message: error });
            }
            break;
    }

});

// Iniciar el servidor
app.listen(expPort, () => {
    console.log('Servidor Express iniciado en el puerto 3000');
});
