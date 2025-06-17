//variables globales
let product = null;
let idSeleccionado = null;

// === Elementos DOM
const elementosApuntador = document.querySelectorAll('.apuntador');
const btnCalcular = document.getElementById('btn-calcular');
const btnGuardar = document.getElementById('btn-guardar');
const btnModificar = document.getElementById("btn-modificar");
const btnEliminar = document.getElementById("btn-eliminar");

// Estado es los botones inical deshabilitado
btnGuardar.disabled = true;
btnModificar.disabled = true;
btnEliminar.disabled = true;

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

function crearProducto(nombreProducto, costoPaquete, pzas, precioVenta, cantidad, inversion, plusvalia, total, costoUnitaro, gananciaUnitaria, paquetes, pzas_sueltas) {
    //Creamos el objeto
    product = {
        id: Date.now(),
        nombreProducto: nombreProducto,
        costoPaquete: costoPaquete,
        pzas: pzas,
        precioVenta: precioVenta,
        cantidad: cantidad,
        inversion: inversion,
        plusvalia: plusvalia,
        total: total,
        costoUnitaro: costoUnitaro,
        gananciaUnitaria: gananciaUnitaria,
        paquetes: paquetes,
        pzas_sueltas: pzas_sueltas,
    };

}

function mostrarResumen(producto) {
    document.getElementById("resumen").innerHTML =
        `
       === Resumen === <br>
    Nombre del producto: ${producto.nombreProducto} <br>
     Inventario: ${producto.cantidad} <br><br>

    <strong> Inversión: $${Math.round(producto.inversion * 100) / 100}</strong><br>
    <strong>Plusvalía: $${Math.round(producto.plusvalia * 100) / 100}</strong><br>
     Total: $${Math.round(producto.total * 100) / 100}<br><br>

    Costo unitario: $${Math.round(producto.costoUnitaro * 100) / 100} <br>
      Ganancia Unitaria: $${Math.round(producto.gananciaUnitaria * 100) / 100} <br>
    Costo Paquete: $${Math.round(producto.costoPaquete * 100) / 100}<br><br>
  
          Paquetes: ${producto.paquetes} <br>
     Pzas: ${producto.pzas_sueltas} <br>
    `
}

function limpiarResumen() {
    document.getElementById("resumen").innerHTML = "";
}

function limpiarInputs() {
    let matches = document.querySelectorAll("input");

    matches.forEach(input => {
        input.value = "";
        input.placeholder = "";
    });
}

function cargarInventario() {
    // varable para la info de los productos
    let productosDelInventario = 0;

    //variables para calcular el resumen de inventario
    let gananciaTotal = 0, inversionTotal = 0, total = 0, inventarioTotal = 0;

    //obtenemos el array d eobjeto y lo parseamos
    let productos = JSON.parse(localStorage.getItem("productos")) || [];

    let contenedorListaProductos = document.getElementById("contenedor-lista-productos");
    let contenedorResumenInventario = document.getElementById("resumen-inventario");
    contenedorListaProductos.innerHTML = "";// lo limpiamos
    contenedorResumenInventario.innerHTML = "";

    productos.forEach((producto, index) => {
        //Se incrementa el contador de productos en 1
        ++productosDelInventario;

        let div = document.createElement("div");
        div.className = "producto";
        div.dataset.id = index;

        let p = document.createElement("p");
        p.innerHTML = `
            ${++index}. ${producto.nombreProducto}, <strong>${producto.cantidad} pzas</strong>, Plusvalia ($): ${(producto.plusvalia)}  
        `;
        div.appendChild(p);

        div.addEventListener("click", () => {

            // Quitar la clase 'seleccionado a todos los productos' de todos los productos
            document.querySelectorAll(".producto p").forEach(p => p.classList.remove("seleccionado"));

            // Agregar 's' solo al que se hizo clic
            p.classList.add("seleccionado");

            rellenarFormulario(producto);
        });
        contenedorListaProductos.appendChild(div);
    });

    productos.forEach(producto => {
        inventarioTotal += producto.cantidad;
    });

    let p2 = document.createElement("p2");
    let p3 = document.createElement("p3");
    p2.innerHTML = `<br>Productos del Inventario: ${productosDelInventario}`;
    p3.innerHTML = `Inventario Total: ${inventarioTotal}`;
    contenedorListaProductos.appendChild(p2);
    contenedorListaProductos.appendChild(p3);

    productos.forEach(producto => {
        inversionTotal += producto.inversion;
    });

    let pInversionTotal = document.createElement("p");
    pInversionTotal.innerHTML = `Inversión total ($): ${inversionTotal.toFixed(2)}`;
    contenedorResumenInventario.appendChild(pInversionTotal);

    productos.forEach(producto => {
        gananciaTotal += producto.plusvalia;
    });

    let pgananciaTotal = document.createElement("p");
    pgananciaTotal.innerHTML = `Ganancia total ($): ${gananciaTotal.toFixed(2)}`;
    contenedorResumenInventario.appendChild(pgananciaTotal);

    let pTotal = document.createElement("p");
    pTotal.innerHTML = `Total ($): $${(inversionTotal + gananciaTotal).toFixed(2)} <br> <br><br>`;
    contenedorResumenInventario.appendChild(pTotal);
}

function restablecerBotones() {
    btnCalcular.disabled = false;
    btnGuardar.disabled = true;
    btnModificar.disabled = true;
    btnEliminar.disabled = true;
}

function rellenarFormulario(producto) {
    //asignamos el id al idSeleccionado global
    idSeleccionado = producto.id || null;

    document.getElementById("inp-nombre").value = producto.nombreProducto;
    document.getElementById("inp-pzas").value = producto.pzas;
    document.getElementById("inp-costo-paquete").value = producto.costoPaquete;
    document.getElementById("inp-precio-venta").value = producto.gananciaUnitaria + producto.costoUnitaro;
    document.getElementById("inp-cantidad").value = producto.cantidad;

    mostrarResumen(producto);

    btnCalcular.disabled = true;
    btnModificar.disabled = false;
    btnEliminar.disabled = false;
    console.log("rellenar formulario");
    console.log(idSeleccionado);

}

function obtenerArrayProductos() {
    return JSON.parse(localStorage.getItem("productos")) || [];
}

function validarInputs(nombreProducto, costoPaquete, pzas, cantidad, precioVenta) {
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

        alert("Error, ingresa la informaicón correcta")
        return false;
    }
    return true;
}

function eliminarProducto() {
    if (idSeleccionado === null) {
        alert("el prodcuto no tine id");
        return;
    }

    let confirmacion = confirm("¿Estás seguro de eliminar este producto?");

    if (!confirmacion) {
        return;
    }

    let productos = obtenerArrayProductos();

    let target = productos.findIndex(producto => producto.id === idSeleccionado);

    if (target !== -1) {
        productos.splice(target, 1);
        localStorage.setItem("productos", JSON.stringify(productos));
        cargarInventario();
        limpiarResumen();
        limpiarInputs();
    } else {
        alert(`, no se elimino.`);
    }

    idSeleccionado = null;

    restablecerBotones();
}

function modificarProducto() {
    let productos = JSON.parse(localStorage.getItem("productos"));


    let confirmacion = confirm("¿Estás seguro de modificar este producto?");


    if (!confirmacion) {
        return;
    }

    let index = productos.findIndex(p => p.id === idSeleccionado);

    if (index === -1) {
        alert("Producto no encontrado en el inventario.");
        return;
    }

    // Asignar el mismo ID al nuevo objeto actualizado
    product.id = idSeleccionado;

    // Reemplazar el objeto antiguo por el nuevo
    productos[index] = product;

    // Guardar en localStorage
    localStorage.setItem("productos", JSON.stringify(productos));

    // Recargar UI
    cargarInventario();
    limpiarResumen();
    limpiarInputs();
    restablecerBotones();
    idSeleccionado = null;
}

function obtenerValoresInputs() {
    const nombreProducto = document.getElementById("inp-nombre").value;
    const costoPaquete = parseFloat(document.getElementById("inp-costo-paquete").value);
    const pzas = parseFloat(document.getElementById("inp-pzas").value);
    const cantidad = parseInt(document.getElementById("inp-cantidad").value)
    const precioVenta = parseFloat(document.getElementById("inp-precio-venta").value);

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


    return {
        nombreProducto,
        pzas,
        cantidad,
        inversion,
        plusvalia,
        total,
        costoUnitaro,
        gananciaUnitaria,
        costoPaquete,
        paquetes,
        precioVenta,
        pzas_sueltas
    };
}

// === Eventos
window.addEventListener('DOMContentLoaded', cargarInventario);

btnCalcular.addEventListener("click", function () {
    let {
        nombreProducto, costoPaquete, pzas, precioVenta, cantidad, inversion, plusvalia, total, costoUnitaro, gananciaUnitaria, paquetes, pzas_sueltas
    } = obtenerValoresInputs();

    let confirmacion = validarInputs(nombreProducto, costoPaquete, pzas, cantidad, precioVenta);
    if (!confirmacion) {
        return;
    }

    crearProducto(nombreProducto, costoPaquete, pzas, precioVenta, cantidad, inversion, plusvalia, total, costoUnitaro, gananciaUnitaria, paquetes, pzas_sueltas);
    mostrarResumen(product);

    btnGuardar.disabled = false;
});

btnGuardar.addEventListener("click", function () {
    guardarProducto();
    cargarInventario();
    const inputs = document.querySelectorAll("input");

    inputs.forEach(input => {
        input.value = "";
        input.placeholder = "";
    });

    limpiarResumen();

    btnGuardar.disabled = true;
});

btnEliminar.addEventListener("click", function () {
    eliminarProducto();
});

btnModificar.addEventListener("click", function () {
    let {
       nombreProducto, costoPaquete, pzas, precioVenta, cantidad, inversion, plusvalia, total, costoUnitaro, gananciaUnitaria, paquetes, pzas_sueltas
    } = obtenerValoresInputs();

    let confirmacion = validarInputs(nombreProducto, costoPaquete, pzas, cantidad, precioVenta);

    if (!confirmacion) {
        return;
    }

    crearProducto(
       nombreProducto, costoPaquete, pzas, precioVenta, cantidad, inversion, plusvalia, total, costoUnitaro, gananciaUnitaria, paquetes, pzas_sueltas);

    modificarProducto();
});

// === funcionando jaja
navegacionConEnter(elementosApuntador);