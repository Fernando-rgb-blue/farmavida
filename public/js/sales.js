const d = document;

const btnAdd = d.getElementById("addButton");
const btnCha = d.getElementById("chaButton");
const btnDel = d.getElementById("delButton");

// btnAdd.addEventListener("click", (e) => {
//     let ventanaEmergente1 = d.getElementById("popupAddProd");
//     ventanaEmergente1.style.display = "block";
// });

btnDel.addEventListener("click", (e) => {
    let ventanaEmergente2 = d.getElementById("popupDel");
    ventanaEmergente2.style.display = "block";
});

// btnCha.addEventListener("click", (e) => {
//     let ventanaEmergente3 = d.getElementById("popupChaProd");
//     ventanaEmergente3.style.display = "block";
// });