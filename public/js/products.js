const d = document;
let load = d.getElementById("loader");

//JQUERY
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
    });

    //PARA CERRAR LOS POPUPS
    $("#closeAddProd").on("click", function (e) {
        $("#popupAddProd").hide();
    });

    $("#closeChaProd").on("click", function (e) {
        $("#popupChaProd").hide();
    });

    $("#closeDelProd").on("click", function (e) {
        $("#popupDelProd").hide();
    });

    //PARA CAMBIAR LOS TIPO DE INPUTS CUANDO SE CAMBIE EL TIPO DE DATO A BUSCAR
    $('#catProdSea').on('change', function () {
        const selectedValue = $(this).val();
        const searchBar = $('#prodSea');
        searchBar.val("")

        switch (selectedValue) {
            case "_id":
            case "Stock":
                const codeNumber = '<input type="number" id="prodSea" name="searchBar" placeholder="Buscar">'
                searchBar.replaceWith(codeNumber);
                break;
            case "Fec_Vcto_Reg_Sanitario":
                const codeDate = '<input type="date" id="prodSea" name="searchBar" placeholder="Buscar">'
                searchBar.replaceWith(codeDate);
                break;
            case "Situacion":
                codeSelect = '<select id="prodSea" name="searchBar"><option value=""></option><option value="ACT">Activado</option><option value="DES">Desactivado</option></select>'
                searchBar.replaceWith(codeSelect);
                break;
            default:
                const codeText = '<input type="text" id="prodSea" name="searchBar" placeholder="Buscar">';
                searchBar.replaceWith(codeText);
        }

    });

    //PARA VERIFICAR QUE SE ESTÉ INGRESANDO LOS DATOS CORRECTOS EN LOS CAMPOS EN MODIFICAR PRODUCTO
    $("#formChaProd").on('input', function () {
        let flag = true;
        if ($("#ideProdCha").val() === "") flag = false;
        $("#btnSubmitCha").prop("disabled", !flag)
    })

    //PARA VERIFICAR QUE SE ESTÉ INGRESANDO LOS DATOS CORRECTOS EN LOS CAMPOS EN ELIMINAR PRODUCTO
    $("#formDelProd").on('input', function () {
        let flag = true;
        if ($("#ideProdDel").val() === "") flag = false;
        $("#btnSubmitDel").prop("disabled", !flag)
    })

    //PARA VERIFICAR QUE SE ESTÉ INGRESANDO LOS DATOS CORRECTOS EN LOS CAMPOS EN AÑADIR PRODUCTO
    $("#formAddProd").on('input', function () {

        let flag = true;

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

    })

    //PARA VERIFICAR QUE SE ESTÉ INGRESANDO LOS DATOS CORRECTOS EN LOS CAMPOS EN BUSCAR PRODUCTO
    $("#formSeaProd").on('input', function () {
        console.log($("#prodSea").val());
        let flag = true;
        if ($("#prodSea").val() === "") flag = false;
        $("#btnSubmitSea").prop("disabled", !flag);
    })
    //CAPTURAR LOS DATOS

    //PARA CAPTURAR LOS DATOS DE ENVIO DEL FORMULARIO DE BUSCAR PRODUCTO
    $("#btnSubmitSea").on('click', function (e) {

        e.preventDefault();

        loaderAct();

        //ELIMINAR EL CONTENIDO DE LAS TABLAS
        $("#contentTable").empty();

        const val = $("#prodSea").val();
        const cat = $("#catProdSea").val();

        $.ajax({
            url: "/products",
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
                        "ID", "Nombre del Producto", "Concentrado", "Nombre Formal", "Nombre Formal Simplificado",
                        "Presentacion", "Fracciones", "Fecha de Vencimiento de RS", "Numero de RS", "Situacion",
                        "Stock", "Precio"
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

        const _id = $("#ideProdAdd").val();
        const nomProd = $("#nomProdAdd").val();
        const conProd = $("#conProdAdd").val();
        const nomForProd = $("#nomForProdAdd").val();
        const nomForSimProd = $("#nomForSimProdAdd").val();
        const presProd = $("#presProdAdd").val();
        const fraProd = $("#fraProdAdd").val();
        const fecVenRegProd = $("#fecVenRegProdAdd").val();
        const numRegProd = $("#numRegProdAdd").val();
        const sitProd = $("#sitProdAdd").val();
        const stoProd = $("#stoProdAdd").val();
        const precProd = $("#precProdAdd").val();

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

        const _id = $("#ideProdCha").val();
        const nomProd = $("#nomProdCha").val();
        const conProd = $("#conProdCha").val();
        const nomForProd = $("#nomForProdCha").val();
        const nomForSimProd = $("#nomForSimProdCha").val();
        const presProd = $("#presProdCha").val();
        const fraProd = $("#fraProdCha").val();
        const fecVenRegProd = $("#fecVenRegProdCha").val();
        const numRegProd = $("#numRegProdCha").val();
        const sitProd = $("#sitProdCha").val();
        const stoProd = $("#stoProdCha").val();
        const precProd = $("#precProdCha").val();
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

        const _id = $("#ideProdDel").val();

        $.ajax({
            url: "/products",
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



