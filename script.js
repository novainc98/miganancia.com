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

function cadenaVacio(cadena) {
    return cadena.length < 4 || !isNaN(cadena);
}

function noEsNumero (numero){
    return isNaN(numero);
}

// === Eventos
calcularBtn.addEventListener("click", function () {
    const nombreProducto = document.getElementById("inp-nombre").value;
    const precio = parseFloat(document.getElementById("inp-precio").value);
    const cantidad = parseInt(document.getElementById("inp-cantidad").value)
    const precioVenta = parseFloat(document.getElementById("inp-precio-venta").value);

    const entradas = document.querySelectorAll("input");
    entradas.forEach(entrada => entrada.classList.remove("error"));

    if (cadenaVacio(nombreProducto) || isNaN(precio) || isNaN(cantidad) || isNaN(precioVenta)) {
        if (cadenaVacio(nombreProducto)) {
            const inputNombreProducto = document.getElementById("inp-nombre");
            inputNombreProducto.classList.add("error");
            inputNombreProducto.value = "";
            inputNombreProducto.placeholder = "..."
        }

        if(noEsNumero(precio)){
            const inputPrecio = document.getElementById("inp-precio");
            inputPrecio.classList.add("error");
            inputPrecio.value = "";
            inputPrecio.placeholder = "..."
        }

         if(noEsNumero(cantidad)){
            const inputPrecio = document.getElementById("inp-cantidad");
            inputPrecio.classList.add("error");
            inputPrecio.value = "";
            inputPrecio.placeholder = "..."
        }

          if(noEsNumero(precioVenta)){
            const inputPrecio = document.getElementById("inp-precio-venta");
            inputPrecio.classList.add("error");
            inputPrecio.value = "";
            inputPrecio.placeholder = "..."
        }

        alert("Eror ingresa la informaicón correcta")
        return;
    }

    let costoTotal = precio;
    let costoUnitaro = costoTotal / cantidad;
    let gananciaUnitaria = precioVenta - costoUnitaro;
    let gananciaTotal = gananciaUnitaria * cantidad;


    document.getElementById("resultados").innerHTML =
        `
    Nombre del producto: ${nombreProducto} <br>     
    Costo unitario: $${Math.round(costoUnitaro * 100) / 100} <br>
    Ganancia Unitaria: $${Math.round(gananciaUnitaria * 100) / 100} <br>
    Ganancia Total $${Math.round(gananciaTotal * 100) / 100}
    `
/* 
    console.log({nombreProducto});
    console.log({ costoTotal });
    console.log({ costoUnitaro });
    console.log({ gananciaUnitaria });
    console.log({ gananciaTotal }); */

});


// === funcionando jaja
navegacionConEnter(elementosApuntador);