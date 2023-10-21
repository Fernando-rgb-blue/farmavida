const d = document;
let load = d.getElementById("loader");

function fechaCorrecta(dateString) {
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo',
                   'junio', 'julio', 'agosto', 'septiembre',
                   'octubre', 'noviembre', 'diciembre'];

    const month = parseInt(dateString.substring(5, 7));
    
    return dateString.substring(8, 10) + ' de ' + meses[month-1] + ' de ' + dateString.substring(0, 4);
}

$(function () {

    //ABIR EL POPUP DEL REPORTE 6
    $("#report6PopUp").on("click", () => {
        $("#popupRe6Dat").show();
    });

    //CERRAR EL POPUP DEL REPORTE 6
    $("#closeRe6").on("click", () => {
        $("#popupRe6Dat").hide();
    });

    //VERIFICAR QUE LOS IMPUTS TIPO DATE TENGAN DATOS Y SEAN CORRECTOS
    $("#formRe6").on("input", () => {
        let flag = true;
        let fecha1 = $("#fecIniRe6").val();
        let fecha2 = $("#fecFinRe6").val();

        if(fecha1==="" || fecha2==="" || !(fecha1 < fecha2)) flag = false;
        $("#report6").prop("disabled", !flag);
    })

    $("#report1a").on("click", () => {
        console.log("reporte 1a")

        $.ajax({
            url: "/reports",
            type: "POST",
            data: {
                report: "1a"
            },
            success: function (response) {
                datos = response.results;
                Swal.fire({
                    title: `Se han encontrado ${datos.length} clientes`,
                    icon: "success",
                    showConfirmButton: false
                });

                if (datos.length >= 1) {
                    keys2 = [
                        "ID", "Nombre"
                    ];

                    //CREACION DE LA TABLA
                    let content = d.getElementById("resultsRep");
                    content.innerHTML = "";

                    datos.forEach(obj => {
                        let tbl = d.createElement("table");
                        tbl.className = "tblProd";
                        let i = 0;
                        for (const clave in obj) {
                            tbl.innerHTML += `<tr><th>${keys2[i]}</th><td>${obj[clave]}</td></tr>`;
                            i++;
                        }
                        content.appendChild(tbl);
                    })
                }
            },
            error: function (error) {
                Swal.fire({
                    title: `Ha ocurrido un error`,
                    icon: "error",
                    showConfirmButton: false
                });
            },
            complete: function () {
                loaderDes();
            }
        });

    });

    $("#report1b").on("click", () => {
        loaderAct();

        let content = d.getElementById("resultsRep");
        content.innerHTML = "";

        $.ajax({
            url: "/reports",
            type: "POST",
            data: {
                report: "1b"
            },
            success: function (response) {
                datos = response.results;
                Swal.fire({
                    title: `Se han encontrado ${datos.length} empleados`,
                    icon: "success",
                    showConfirmButton: false
                });

                if (datos.length >= 1) {
                    keys = [
                        "ID", "Nombre", "Dirección", "Teléfono", "Email",
                        "fecha_contratacion", "Salario"
                    ];

                    //CREACION DE LA TABLA
                    let content = d.getElementById("resultsRep");

                    datos.forEach(obj => {
                        let tbl = d.createElement("table");
                        tbl.className = "tblProd";
                        let i = 0;
                        for (const clave in obj) {
                            tbl.innerHTML += `<tr><th>${keys[i]}</th><td>${obj[clave]}</td></tr>`;
                            i++;
                        }
                        content.appendChild(tbl);
                    })
                }
            },
            error: function (error) {
                Swal.fire({
                    title: `Ha ocurrido un error`,
                    icon: "error",
                    showConfirmButton: false
                });
            },
            complete: function () {
                loaderDes();
            }
        });


    });

    $("#report1c").on("click", () => {

        loaderAct();

        let content = d.getElementById("resultsRep");
        content.innerHTML = "";

        $.ajax({
            url: "/reports",
            type: "POST",
            data: {
                report: "1c"
            },
            success: function (response) {
                datos = response.results;
                Swal.fire({
                    title: `Se han encontrado ${datos.length} pedidos`,
                    icon: "success",
                    showConfirmButton: false
                });

                if (datos.length >= 1) {
                    keys = [
                        "ID", "Fecha de pedido", "ID de proveedor", "Producto", "Nombre", "Cantidad", "Precio unitario"
                    ];

                    //CREACION DE LA TABLA
                    let content = d.getElementById("resultsRep");
                    content.innerHTML = "";

                    datos.forEach(obj => {
                        console.log(obj);
                        let tbl = d.createElement("table");
                        tbl.className = "tblPed";
                        let i = 0;
                        for (const clave in obj) {
                            console.log(clave);
                            console.log(i);
                            if (i <= 2) {
                                if (clave === 'fecha') {
                                    tbl.innerHTML += `<tr><th>${keys[i]}</th><td>${fechaCorrecta(obj[clave])}</td></tr>`;
                                } else {
                                    tbl.innerHTML += `<tr><th>${keys[i]}</th><td>${obj[clave]}</td></tr>`;
                                }
                            } else {
                                if (obj.productos.length > 0) {
                                    let n = 0;
                                    for (const prod in obj.productos) {
                                        tbl.innerHTML += `<tr><th></th><td><br></td></tr>`;
                                        tbl.innerHTML += `<tr><th>${keys[i]} ${n + 1}:</th><td></td></tr>`;

                                        tbl.innerHTML += `<tr><th>${keys[4]}</th><td>${obj.productos[prod].nombre}</td></tr>`;
                                        tbl.innerHTML += `<tr><th>${keys[5]}</th><td>${obj.productos[prod].cantidad}</td></tr>`;
                                        tbl.innerHTML += `<tr><th>${keys[6]}</th><td>${obj.productos[prod].precio_unitario}</td></tr>`;
                                        n++;
                                    }
                                } else {
                                    tbl.innerHTML += `<tr><th>Sin productos</th><td></td></tr>`;
                                }
                            }
                            i++;
                        }
                        content.appendChild(tbl);
                    })
                }
            },
            error: function (error) {
                Swal.fire({
                    title: `Ha ocurrido un error`,
                    icon: "error",
                    showConfirmButton: false
                });
            },
            complete: function () {
                loaderDes();
            }
        });
    });

    $("#report1d").on("click", () => {
        
        loaderAct();

        let content = d.getElementById("resultsRep");
        content.innerHTML = "";

        $.ajax({
            url: "/reports",
            type: "POST",
            data: {
                report: "1d"
            },
            success: function (response) {
                datos = response.results;
                Swal.fire({
                    title: `Se han encontrado ${datos.length} productos`,
                    icon: "success",
                    showConfirmButton: false
                });

                if (datos.length >= 1) {
                    keys = [
                        "ID", "Nombre del Producto", "Concentrado", "Nombre Formal", "Nombre Formal Simplificado",
                        "Presentacion", "Fracciones", "Fecha de Vencimiento de RS", "Numero de RS", "Situacion",
                        "Stock", "Precio"
                    ];

                    //CREACION DE LA TABLA
                    let content = d.getElementById("resultsRep");

                    datos.forEach(obj => {
                        let tbl = d.createElement("table");
                        tbl.className = "tblProd";
                        let i = 0;
                        for (const clave in obj) {
                            tbl.innerHTML += `<tr><th>${keys[i]}</th><td>${obj[clave]}</td></tr>`;
                            i++;
                        }
                        content.appendChild(tbl);
                    })
                }
            },
            error: function (error) {
                Swal.fire({
                    title: `Ha ocurrido un error`,
                    icon: "error",
                    showConfirmButton: false
                });
            },
            complete: function () {
                loaderDes();
            }
        });

    });

    $("#report1e").on("click", () => {
        console.log("reporte 1e")

        $.ajax({
            url: "/reports",
            type: "POST",
            data: {
                report: "1e"
            },
            success: function (response) {
                datos = response.results;
                Swal.fire({
                    title: `Se han encontrado ${datos.length} proveedores`,
                    icon: "success",
                    showConfirmButton: false
                });

                if (datos.length >= 1) {
                    keys = [
                        "ID", "Nombre", "Teléfono", "Email"
                    ];

                    //CREACION DE LA TABLA
                    let content = d.getElementById("resultsRep");

                    datos.forEach(obj => {
                        let tbl = d.createElement("table");
                        tbl.className = "tblProd";
                        let i = 0;
                        for (const clave in obj) {
                            tbl.innerHTML += `<tr><th>${keys[i]}</th><td>${obj[clave]}</td></tr>`;
                            i++;
                        }
                        content.appendChild(tbl);
                    })
                    
                }
            },
            error: function (error) {
                Swal.fire({
                    title: `Ha ocurrido un error`,
                    icon: "error",
                    showConfirmButton: false
                });
            },
            complete: function () {
                loaderDes();
            }
        });

    });

    $("#report1f").on("click", () => {
        console.log("reporte 1f")

        $.ajax({
            url: "/reports",
            type: "POST",
            data: {
                report: "1f"
            },
            success: function () {

            },
            error: function () {

            },
            complete: function () {

            }
        });

    });

    $("#report2").on("click", () => {

        //CARGA
        loaderAct();

        let content = d.getElementById("resultsRep");
        content.innerHTML = "";

        $.ajax({
            url: "/reports",
            type: "POST",
            data: {
                report: 2
            },
            success: function (response) {
                const datos = response.results;
                console.log(datos);

                if (datos.length >= 1) {

                    //CREAR LA TABLA
                    const tbl = d.createElement("table");

                    tbl.className = "tblProd";
                    tbl.innerHTML = `
                        <thead>
                            <tr>
                                <th>Proveedor</th>
                                <th>Pedidos</th>
                            </tr>
                        </thead>
                    `
                    const tbody = d.createElement('tbody');

                    datos.forEach(obj => {
                        let tr = d.createElement("tr");
                        let i = 0;
                        for (const clave in obj) {
                            tr.innerHTML += `<td>${obj[clave]}</td>`;
                            i++;
                        }
                        tbody.appendChild(tr);
                    })

                    tbl.appendChild(tbody);
                    content.appendChild(tbl);
                }
            },
            error: function (error) {

            },
            complete: function () {
                loaderDes();
            }
        });

    });
    
    $("#report3").on("click", () => {

        $.ajax({
            url: "/reports",
            type: "POST",
            data: {
                report: 3
            },
            success: function (response) {
            },
            error: function (error) {

            },
            complete: function () {

            }
        });

    })

    $("#report4").on("click", () => {

        //CARGA
        loaderAct();

        let content = d.getElementById("resultsRep");
        content.innerHTML = "";
        let btns = d.getElementsByClassName("btnReport");
        console.log(btns);

        $.ajax({
            url: "/reports",
            type: "POST",
            data: {
                report: 4
            },
            success: function (response) {
                
                const datos = response.results;
                console.log(datos);

                if (datos.length >= 1) {
                    keys = [
                        "Producto", "Total de Ventas"
                    ];

                    //CREAR LA TABLA
                    const tbl = d.createElement("table");

                    tbl.className = "tblProd";
                    tbl.style.height = `${content.offsetHeight}px`;
                    console.log(content.offsetHeight);

                    tbl.innerHTML = `
                        <thead>
                            <tr>
                                <th>Total de Pedidos</th>
                                <th>Proveedor</th>
                            </tr>
                        </thead>
                    `
                    const tbody = d.createElement('tbody');

                    datos.forEach(obj => {
                        let tr = d.createElement("tr");
                        let i = 0;
                        for (const clave in obj) {
                            tr.innerHTML += `<td>${obj[clave]}</td>`;
                            i++;
                        }
                        tbody.appendChild(tr);
                    })

                    tbl.appendChild(tbody);
                    content.appendChild(tbl);
                }
            },
            error: function (error) {
                alert("HA OCURRIDO UN ERROR");
            },
            complete: function () {
                loaderDes();
            }
        });

    })

    $("#report5").on("click", () => {

        loaderAct();

        $.ajax({
            url: "/reports",
            type: "POST",
            data: {
                report: 5
            },
            success: function (response) {

                let content = d.getElementById("resultsRep");
                content.innerHTML = "";

                const datos = response.results;
                console.log(datos)

                if (datos.length >= 1) {

                    //CREAR LA TABLA
                    const tbl = d.createElement("table");

                    tbl.className = "tblProd";
                    tbl.style.height = `${content.offsetHeight}px`;
                    console.log(content.offsetHeight);

                    tbl.innerHTML = `
                        <thead>
                            <tr>
                                <th>Nombre del Producto</th>
                                <th>Cantidad de Venta</th>
                            </tr>
                        </thead>
                    `
                    const tbody = d.createElement('tbody');

                    datos.forEach(obj => {
                        let tr = d.createElement("tr");
                        let i = 0;
                        for (const clave in obj) {
                            tr.innerHTML += `<td>${obj[clave]}</td>`;
                            i++;
                        }
                        tbody.appendChild(tr);
                    })

                    tbl.appendChild(tbody);
                    content.appendChild(tbl)

                }
            },
            error: function (error) {
                alert("HA OCURRIDO UN ERROR");
            },
            complete: function () {
                loaderDes();
            }
        });

    })

    $("#report6").on("click", (e) => {

        e.preventDefault();

        loaderAct();
        let fecha1 = $("#fecIniRe6").val();
        let fecha2 = $("#fecFinRe6").val();

        $.ajax({
            url: "/reports",
            type: "POST",
            data: {
                report: 6,
                fecha1: fecha1,
                fecha2: fecha2
            },
            success: function (response) {
                
                datos = response.results;

                $("#popupRe6Dat").hide();
                Swal.fire({
                    title: `Se han encontrado ${datos.length} resultados`,
                    icon: "success",
                    showConfirmButton: false
                });

                let content = d.getElementById("resultsRep");
                content.innerHTML = "";

                if (datos.length >= 1) {

                    //CREAR LA TABLA
                    const tbl = d.createElement("table");

                    tbl.className = "tblProd";
                    tbl.style.height = `${content.offsetHeight}px`;
                    console.log(content.offsetHeight);

                    tbl.innerHTML = `
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Fecha</th>
                                <th>DNI del Cliente</th>
                                <th>Productos</th>
                                <th>Precio</th>
                            </tr>
                        </thead>
                    `
                    const tbody = d.createElement('tbody');

                    datos.forEach(obj => {
                        let tr = d.createElement("tr");
                        let i = 0;
                        for (const clave in obj) {
                            if(typeof(obj[clave])==='object'){
                                let txt = "";
                                obj[clave].forEach(product => {
                                    txt += `${product.nombre}, `
                                    console.log(product.nombre);
                                })
                                tr.innerHTML += `<td>${txt}</td>`;
                            }else{
                                tr.innerHTML += `<td>${obj[clave]}</td>`;
                            
                            }
                            i++;
                        }
                        tbody.appendChild(tr);
                    })

                    tbl.appendChild(tbody);
                    content.appendChild(tbl)

                }
            },
            error: function (error) {
                Swal.fire({
                    title: `Ha ocurrido un error`,
                    icon: "error",
                    showConfirmButton: false
                });
            },
            complete: function () {
                loaderDes();
            }
        });

    })

});

const loaderAct = () => {
    load.style.display = "block";
    load.style.zIndex = 9999;
}

const loaderDes = () => {
    load.style.display = "none";
    load.style.zIndex = 0;
};

const validarFecha = (fecha) => {
    fecha = new Date(fecha).toISOString().replace('Z', '+00:00');
    fecha = new Date(fecha);
    return fecha;
}