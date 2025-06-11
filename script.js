// === Elementos DOM
const calcularBtn = document.getElementById('btn-calcular');
// const elementosApuntador = document.querySelectorAll('.apuntador');
const elementosApuntador = [
    document.getElementById("inp-nombre"),
    document.getElementById("inp-pzas"),
    document.getElementById("inp-costo-paquete"),
    document.getElementById("inp-precio-venta"),
    document.getElementById("inp-cantidad"),
    document.getElementById("btn-calcular")
];


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

function noEsNumero(numero) {
    return isNaN(numero);
}

// === Eventos
calcularBtn.addEventListener("click", function () {
    const nombreProducto = document.getElementById("inp-nombre").value;
    const costoPaquete = parseFloat(document.getElementById("inp-costo-paquete").value);
    const pzas = parseFloat(document.getElementById("inp-pzas").value);
    const cantidad = parseInt(document.getElementById("inp-cantidad").value)
    const precioVenta = parseFloat(document.getElementById("inp-precio-venta").value);

    const entradas = document.querySelectorAll("input");
    entradas.forEach(entrada => entrada.classList.remove("error"));

    if (cadenaVacio(nombreProducto) || isNaN(costoPaquete) || isNaN(pzas) || isNaN(cantidad) || isNaN(precioVenta)) {
        if (cadenaVacio(nombreProducto)) {
            const inputNombreProducto = document.getElementById("inp-nombre");
            inputNombreProducto.classList.add("error");
            inputNombreProducto.value = "";
            inputNombreProducto.placeholder = "..."
        }

        if (noEsNumero(cantidad)) {
            const inputPrecio = document.getElementById("inp-cantidad");
            inputPrecio.classList.add("error");
            inputPrecio.value = "";
            inputPrecio.placeholder = "..."
        }

        if (noEsNumero(costoPaquete)) {
            const costoPaquete = document.getElementById("inp-costo-paquete");
            costoPaquete.classList.add("error");
            costoPaquete.value = "";
            costoPaquete.placeholder = "..."
        }

        if (noEsNumero(pzas)) {
            const pzas = document.getElementById("inp-pzas");
            pzas.classList.add("error");
            pzas.value = "";
            pzas.placeholder = "..."
        }

        if (noEsNumero(precioVenta)) {
            const precioVenta = document.getElementById("inp-precio-venta");
            precioVenta.classList.add("error");
            precioVenta.value = "";
            precioVenta.placeholder = "..."
        }

        alert("Eror ingresa la informaicón correcta")
        return;
    }

    let costoUnitaro = costoPaquete / pzas;
    let gananciaUnitaria = precioVenta - costoUnitaro;
    let inversion = cantidad * costoUnitaro;
    let plusvalia = cantidad * gananciaUnitaria;
    let total = inversion + plusvalia;

    let paquetes, pzas_sueltas;

    let enteros = Math.floor(cantidad / pzas); 
    paquetes = enteros;
    // calcula pzas sueltas
    pzas_sueltas = cantidad % pzas;

    document.getElementById("resumen").innerHTML =
        `
       === Resumen === <br>
    Nombre del producto: ${nombreProducto} <br>
     Inventario: ${cantidad} <br><br>

    Inversión: $${Math.round(inversion * 100) / 100}<br>
    <strong>Plusvalía: $${Math.round(plusvalia * 100) / 100}</strong><br>
     Total: $${Math.round(total * 100) / 100}<br><br>

    Costo unitario: $${Math.round(costoUnitaro * 100) / 100} <br>
      Ganancia Unitaria: $${Math.round(gananciaUnitaria * 100) / 100} <br>
    Costo Paquete: $${Math.round(costoPaquete * 100) / 100}<br><br>
  
          Paquetes: ${paquetes} <br>
     Pzas: ${pzas_sueltas} <br>
    `
});

// === funcionando jaja
navegacionConEnter(elementosApuntador);