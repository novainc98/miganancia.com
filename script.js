//variables globales
let product = null;

// === Elementos DOM
const elementosApuntador = document.querySelectorAll('.apuntador');
const btnCalcular = document.getElementById('btn-calcular');
const btnGuardar = document.getElementById('btn-guardar');
const btnModificar = document.getElementById("btn-modificar");

// Estado es los botones inical deshabilitado
btnGuardar.disabled = true;
btnModificar.disabled = true;

/* const elementosApuntador = [
    document.getElementById("inp-nombre"),
    document.getElementById("inp-pzas"),
    document.getElementById("inp-costo-paquete"),
    document.getElementById("inp-precio-venta"),
    document.getElementById("inp-cantidad"),
    document.getElementById("btn-calcular")
]; */


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
    return isNaN(numero) || numero < 1;
}

function guardarProducto() {
    // Obtenemos el objeto de productos o un array de objetos (el inventario completo)
    let productos = JSON.parse(localStorage.getItem("productos")) || [];

    //Guardamos el objeto en el array
    productos.push(product);

    localStorage.setItem("productos", JSON.stringify(productos))
}

function crearProducto(nombreProducto, pzas, cantidad, inversion, plusvalia, total, costoUnitaro, gananciaUnitaria, costoPaquete, paquetes, pzas_sueltas) {
    //Creamos el objeto
    product = {
        nombreProducto: nombreProducto,
        pzas:pzas,
        cantidad: cantidad,
        inversion: inversion,
        plusvalia: plusvalia,
        total: total,
        costoUnitaro: costoUnitaro,
        gananciaUnitaria: gananciaUnitaria,
        costoPaquete: costoPaquete,
        paquetes: paquetes,
        pzas_sueltas: pzas_sueltas
    };
}

function mostrarResumen(producto){
        document.getElementById("resumen").innerHTML =
        `
       === Resumen === <br>
    Nombre del producto: ${producto.nombreProducto} <br>
     Inventario: ${producto.cantidad} <br><br>

    Inversión: $${Math.round(producto.inversion * 100) / 100}<br>
    <strong>Plusvalía: $${Math.round(producto.plusvalia * 100) / 100}</strong><br>
     Total: $${Math.round(producto.total * 100) / 100}<br><br>

    Costo unitario: $${Math.round(producto.costoUnitaro * 100) / 100} <br>
      Ganancia Unitaria: $${Math.round(producto.gananciaUnitaria * 100) / 100} <br>
    Costo Paquete: $${Math.round(producto.costoPaquete * 100) / 100}<br><br>
  
          Paquetes: ${producto.paquetes} <br>
     Pzas: ${producto.pzas_sueltas} <br>
    `

}

function limpiarResumen(){
    document.getElementById("resumen").innerHTML = "";
}

function cargarProductos() {
    //obtenemos el array d eobjeto y lo parseamos
    let productos = JSON.parse(localStorage.getItem("productos")) || [];
    let contenedorListaProductos = document.getElementById("contenedor-lista-productos");
    contenedorListaProductos.innerHTML = "";// lo limpiamos

    productos.forEach((producto, index) => {
        let div = document.createElement("div");
        div.className = "producto";
        div.dataset.id = index;
        div.innerHTML = `
            <p>${++index}. ${producto.nombreProducto}, <strong>${producto.cantidad} pzas</strong>, Plusvalia ($): ${producto.plusvalia} </p> 
        `;
        div.addEventListener("click", () => {
            rellenarFormulario(producto);
        });
        contenedorListaProductos.appendChild(div);
    });

}

function rellenarFormulario(producto) {
    document.getElementById("inp-nombre").value = producto.nombreProducto;
    document.getElementById("inp-pzas").value = producto.pzas;
    document.getElementById("inp-costo-paquete").value = producto.costoPaquete;
    document.getElementById("inp-precio-venta").value = producto.gananciaUnitaria + producto.costoUnitaro;
    document.getElementById("inp-cantidad").value = producto.cantidad;

    mostrarResumen(producto);

    btnCalcular.disabled = true;
    btnModificar.disabled= false;
}



// === Eventos
window.addEventListener('DOMContentLoaded', cargarProductos);

btnCalcular.addEventListener("click", function () {
    const nombreProducto = document.getElementById("inp-nombre").value;
    const costoPaquete = parseFloat(document.getElementById("inp-costo-paquete").value);
    const pzas = parseFloat(document.getElementById("inp-pzas").value);
    const cantidad = parseInt(document.getElementById("inp-cantidad").value)
    const precioVenta = parseFloat(document.getElementById("inp-precio-venta").value);

    const entradas = document.querySelectorAll("input");
    entradas.forEach(entrada => entrada.classList.remove("error"));

    if (cadenaVacio(nombreProducto) || noEsNumero(costoPaquete) || noEsNumero(pzas) || noEsNumero(cantidad) || noEsNumero(precioVenta)) {
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

    crearProducto(nombreProducto,pzas,cantidad, inversion, plusvalia, total, costoUnitaro, gananciaUnitaria, costoPaquete, paquetes, pzas_sueltas);
    mostrarResumen(product);

    btnGuardar.disabled = false;
});

btnGuardar.addEventListener("click", function () {
    guardarProducto();
     cargarProductos();
    const inputs = document.querySelectorAll("input");

    inputs.forEach(input => {
        input.value = "";
        input.placeholder = "";
    });

    limpiarResumen();

    btnGuardar.disabled = true;
});

// === funcionando jaja
navegacionConEnter(elementosApuntador);