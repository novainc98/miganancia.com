// === Elementos DOM
const calcularBtn = document.getElementById('btn-calcular');
const elementosApuntador = document.querySelectorAll('.apuntador');


// === Funciones
function navegacionConEnter(listaDeElementos) {
    let contadorEnter = 0;

    listaDeElementos.forEach((elemento, index) => {
        elemento.addEventListener('keydown', (evento) => {
            if (evento.key === 'Enter') {
                evento.preventDefault();

                // Si el actual es un botón
                if (elemento.tagName === 'BUTTON') {
                    contadorEnter++;
                    if (contadorEnter === 1) {
                        elemento.click(); // simula hacer clic en el botón
                        elemento.blur();
                        contadorEnter = 0; // reinicia el contador
                    }
                } else {
                    contadorEnter = 0; // reinicia si no es botón
                    const siguiente = listaDeElementos[index + 1];
                    if (siguiente) siguiente.focus();
                }
            }
        });
    });
}

// === Eventos
calcularBtn.addEventListener("click", function () {
    const nombre = document.getElementById("inp-nombre").value;
    const precio = parseFloat(document.getElementById("inp-precio").value);
    const cantidad = parseInt(document.getElementById("inp-cantidad").value)
    const precioVenta = parseFloat(document.getElementById("inp-precio-venta").value);

    const campos = document.querySelectorAll("input");
    campos.forEach(campo => campo.classList.remove("error"));

    if ( nombre === "" || isNaN(precio) || isNaN(cantidad) || isNaN(precioVenta)) {
        if (nombre === "") document.getElementById("inp-nombre").classList.add("error");
        if (isNaN(precio)) document.getElementById("inp-precio").classList.add("error");
        if (isNaN(cantidad)) document.getElementById("inp-cantidad").classList.add("error");
        if (isNaN(precioVenta)) document.getElementById("inp-precio-venta").classList.add("error");
        alert('Los campos deben estar completos');
        return;
    }

    let costoTotal = precio;
    let costoUnitaro = costoTotal / cantidad;
    let gananciaUnitaria = precioVenta - costoUnitaro;
    let gananciaTotal = gananciaUnitaria * cantidad;


    document.getElementById("resultados").innerHTML =
    `
    Nombre: ${nombre}<br>
    Costo unitario: $${Math.round(costoUnitaro * 100) / 100} <br>
    Ganancia Unitaria: $${Math.round(gananciaUnitaria * 100) / 100} <br>
    Ganancia Total $${Math.round(gananciaTotal * 100) / 100}
    `

    console.log({nombre});
    console.log({ costoTotal });
    console.log({ costoUnitaro });
    console.log({ gananciaUnitaria });
    console.log({ gananciaTotal });

});


// === funcionando jaja
navegacionConEnter(elementosApuntador);