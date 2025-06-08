// === Elementos DOM
const calcularBtn = document.getElementById('btn-calcular');


// === Eventos
calcularBtn.addEventListener("click", function(){
    const precio = parseFloat(document.getElementById("inp-precio").value);
    const cantidad = parseInt(document.getElementById("inp-cantidad").value)
    const precioVenta = parseFloat(document.getElementById("inp-precio-venta").value);


    let costoTotal = precio;
    let costoUnitaro=  costoTotal/cantidad;
    let ganaciaUnitaria = precioVenta -costoUnitaro;
    let gananciaTotal = ganaciaUnitaria*cantidad;


    document.getElementById("resultados").innerHTML = 
    `
    Costo unitario: $${costoUnitaro} <br>
    Ganancia Unitaria: $${ganaciaUnitaria} <br>
    Ganancia Total $${gananciaTotal}
    `
});





