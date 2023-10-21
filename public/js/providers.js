const d = document;
let load = d.getElementById("loader");

//JQUERY
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
    });

    //PARA CERRAR LOS POPUPS
    $("#closeAddProv").on("click", function (e) {
        $("#popupAddProv").hide();
    });

    $("#closeChaProv").on("click", function (e) {
        $("#popupChaProv").hide();
    });

    $("#closeDelProv").on("click", function (e) {
        $("#popupDelProv").hide();
    });


    //PARA VERIFICAR QUE SE ESTÉ INGRESANDO LOS DATOS CORRECTOS EN LOS CAMPOS EN MODIFICAR PRODUCTO
    $("#formChaProv").on('input', function () {
        let flag = true;
        if ($("#ideProvCha").val() === "") flag = false;
        $("#btnSubmitCha").prop("disabled", !flag)
    })

    //PARA VERIFICAR QUE SE ESTÉ INGRESANDO LOS DATOS CORRECTOS EN LOS CAMPOS EN ELIMINAR PRODUCTO
    $("#formDelProv").on('input', function () {
        let flag = true;
        if ($("#ideProvDel").val() === "") flag = false;
        $("#btnSubmitDel").prop("disabled", !flag)
    })

    //PARA VERIFICAR QUE SE ESTÉ INGRESANDO LOS DATOS CORRECTOS EN LOS CAMPOS EN AÑADIR PRODUCTO
    $("#formAddProv").on('input', function () {

        let flag = true;

        if ($("#ideProvAdd").val() == "") flag = false;
        if ($("#nomProvAdd").val() == "") flag = false;
        if ($("#telfProvAdd").val() == "") flag = false;
        if ($("#emailProdAdd").val() == "") flag = false;

        $("#btnSubmitAdd").prop("disabled", !flag);

    })

    //PARA VERIFICAR QUE SE ESTÉ INGRESANDO LOS DATOS CORRECTOS EN LOS CAMPOS EN BUSCAR PRODUCTO
    $("#formSeaProv").on('input', function () {
        console.log($("#provSea").val());
        let flag = true;
        if ($("#provSea").val() === "") flag = false;
        $("#btnSubmitSea").prop("disabled", !flag);
    })
    //CAPTURAR LOS DATOS

    //PARA CAPTURAR LOS DATOS DE ENVIO DEL FORMULARIO DE BUSCAR PRODUCTO
    $("#btnSubmitSea").on('click', function (e) {

        e.preventDefault();

        loaderAct();

        //ELIMINAR EL CONTENIDO DE LAS TABLAS
        $("#contentTable").empty();

        const val = $("#provSea").val();
        const cat = $("#catProvSea").val();

        $.ajax({
            url: "/providers",
            type: "POST",
            data: {
                formId: "form1",
                val: val,
                key: cat
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
                        "ID", "Nombre del Proveedor", "Telefono", "Email"
                    ];

                    //CREACION DE LA TABLA
                    let content = d.getElementById("contentTable");

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

        })

    });

    //PARA CAPTURAR LOS DATOS DE ENVIO DEL FORMULARIO DE AGREGAR PRODUCTO
    $("#btnSubmitAdd").on("click", function (e) {

        e.preventDefault();
        loaderAct();

        const _id = $("#ideProvAdd").val();
        const nomProv = $("#nomProvAdd").val();
        const telfProv = $("#telfProvAdd").val();
        const emailProv = $("#emailProvAdd").val();
       

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
            success: function (response) {
                Swal.fire({
                    title: `Se han agregado los datos correctamente`,
                    icon: "success",
                    showConfirmButton: false
                });
            },
            error: function (xhr, status, error) {
                Swal.fire({
                    title: `Ha ocurrido un error`,
                    icon: "error",
                    showConfirmButton: false
                });
            },
            complete: function () {
                loaderDes();
            }
        })

    })

    //PARA CAPTURAR LOS DATOS DE ENVIO DEL FORMULARIO DE MODIFICAR PRODUCTO
    $("#btnSubmitCha").on("click", function (e) {

        e.preventDefault();
        loaderAct();


        const _id = $("#ideProvCha").val();
        const nomProv = $("#nomProvCha").val();
        const telfProv = $("#telfProvCha").val();
        const emailProv = $("#emailProvCha").val();

        $.ajax({
            url: "/providers",
            type: "POST",
            data: {
                formId: "form4",
                _id: _id,
                nombre: nomProv,
                telefono: telfProv,
                email: emailProv,
                
            },
            success: function (response) {
                Swal.fire({
                    title: `Se han modificado los datos correctamente`,
                    icon: "success",
                    showConfirmButton: false
                });
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

    //PARA CAPTURAR LOS DATOS CUANDO SE ENVIE EL FORMULARIO DE ELIMINAR DATOS
    $("#btnSubmitDel").on("click", function (e) {

        e.preventDefault();

        loaderAct();

        const _id = $("#ideProvDel").val();

        $.ajax({
            url: "/providers",
            type: "POST",
            data: {
                formId: "form3",
                _id: _id
            },
            success: function (response) {
                Swal.fire({
                    title: `Se han eliminado los datos correctamente`,
                    icon: "success",
                    showConfirmButton: false
                });
            },
            error: function (xhr, status, error) {
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

});

//FUNCION PARA VALIDA NUMERO
function validarNumero(valor) {
    // Validar si el valor es un número decimal o entero
    return /^(\d+|\d+\.\d+)$/.test(valor);
}

const loaderAct = () => {
    load.style.display = "block";
    load.style.zIndex = 9999;
}

const loaderDes = () => {
    load.style.display = "none";
    load.style.zIndex = 0;
}