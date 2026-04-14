import almacen from './almacen.js';

// --- REFERENCIAS AL DOM ---
const $contenidoCarrito = document.getElementById('contentProducts');
const $totalCarrito = document.getElementById('total');
const $btnVaciarCarrito = document.getElementById('emptyCart');
const $cartCount = document.getElementById('cartCount');
const $btnCarrito = document.getElementById('carrito');
const $dropdownCarrito = document.querySelector('.cart'); // Ojo, puede estar dentro del btn

// --- VARIABLES GLOBALES ---
let productosCargados = [];

// --- RENDERIZADO DE PRODUCTOS (Lógica del Final con inputs) ---
async function renderizarProductos(contPapeleria, contEscritura, contAccesorios) {
    // Mensajes de carga
    if(contPapeleria) contPapeleria.innerHTML = '<p>Cargando...</p>';
    if(contEscritura) contEscritura.innerHTML = '<p>Cargando...</p>';
    if(contAccesorios) contAccesorios.innerHTML = '<p>Cargando...</p>';

    // 1. Fetch
    productosCargados = await almacen.fetchProductos();

    // 2. Limpieza
    if(contPapeleria) contPapeleria.innerHTML = '';
    if(contEscritura) contEscritura.innerHTML = '';
    if(contAccesorios) contAccesorios.innerHTML = '';

    // 3. Dibujado
    productosCargados.forEach((producto) => {
        const plantillaProducto = `
            <article class="producto">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <span class="precio">$${producto.precio.toLocaleString('es-CL')}</span>
                
                <div class="product-actions">
                    <input type="number" class="input-cantidad" value="1" min="1" max="99"> 
                    <button class="btn-agregar" data-id="${producto.id}">
                        Agregar
                    </button>
                </div>
            </article>
        `;

        switch (producto.categoria) {
            case 'papeleria':
                if(contPapeleria) contPapeleria.innerHTML += plantillaProducto;
                break;
            case 'escritura':
                if(contEscritura) contEscritura.innerHTML += plantillaProducto;
                break;
            case 'accesorios':
                if(contAccesorios) contAccesorios.innerHTML += plantillaProducto;
                break;
        }
    });
}

// --- RENDERIZADO DEL CARRITO (Lógica del Final con papelera) ---
function renderizarCarrito() {
    const carrito = almacen.obtenerCarrito(); 
    
    // Si aún no cargaron los productos (ej: entraste directo al home), cargarlos primero
    if (productosCargados.length === 0) {
         almacen.fetchProductos().then(prods => {
             productosCargados = prods;
             renderizarCarrito(); 
         });
         return;
    }

    $contenidoCarrito.innerHTML = '';
    let total = 0;

    if (carrito.length === 0) {
        $contenidoCarrito.innerHTML = '<tr><td colspan="5" style="text-align:center; padding:1rem;">Tu carrito está vacío.</td></tr>';
        $totalCarrito.textContent = '$0.00';
        $cartCount.textContent = '0';
        return;
    }

    carrito.forEach((item) => {
        const productoCompleto = productosCargados.find(prod => prod.id === item.id);
        
        if (productoCompleto) {
            const subtotal = productoCompleto.precio * item.cantidad;
            total += subtotal;

            const plantillaItem = `
                <tr>
                    <td><img src="${productoCompleto.imagen}" alt="${productoCompleto.nombre}" width="50"></td>
                    <td>${productoCompleto.nombre}</td>
                    <td>$${productoCompleto.precio.toLocaleString('es-CL')}</td>
                    <td>${item.cantidad}</td>
                    <td>
                        <button class="btn-eliminar" data-id-eliminar="${item.id}">
                             <i class="fa-solid fa-trash-can"></i> 
                        </button>
                    </td>
                </tr>
            `;
            $contenidoCarrito.innerHTML += plantillaItem;
        }
    });
    $totalCarrito.textContent = `$${total.toLocaleString('es-CL')}`;
    $cartCount.textContent = carrito.reduce((acc, item) => acc + item.cantidad, 0);
}

// --- HANDLERS ---
function handlerAgregarProducto(evento) {
    if (evento.target.classList.contains('btn-agregar')) {
        const idProducto = parseInt(evento.target.dataset.id);
        // Buscar el input de cantidad hermano
        const $input = evento.target.parentElement.querySelector('.input-cantidad');
        const cantidad = parseInt($input ? $input.value : 1) || 1; 

        almacen.agregarProducto(idProducto, cantidad); 
        renderizarCarrito(); 
        
        // Mostrar carrito brevemente (feedback visual)
        const cartDropdown = document.querySelector('.cart');
        if (cartDropdown && !cartDropdown.classList.contains('active')) {
            cartDropdown.classList.add('active');
            setTimeout(() => cartDropdown.classList.remove('active'), 2500);
        }
    }
}

function handlerEliminarProducto(evento) {
    const btn = evento.target.closest('.btn-eliminar');
    if (btn) {
        const idProducto = parseInt(btn.dataset.idEliminar);
        almacen.eliminarProducto(idProducto); 
        renderizarCarrito();
    }
}

function handlerVaciarCarrito() {
    almacen.vaciarCarrito();
    renderizarCarrito();
}

function handlerToggleCarrito() {
    const cartDropdown = document.querySelector('.cart');
    cartDropdown.classList.toggle('active');
}

// --- MENÚ HAMBURGUESA (Estilo TP4) ---
function inicializarMenu() {
    const $btnMenu = document.getElementById('btnMenu');
    const $menuColapsable = document.getElementById('menuColapsable');
    if ($btnMenu && $menuColapsable) {
        $btnMenu.addEventListener('click', () => {
            $menuColapsable.classList.toggle('activo');
        });
    }
}

// --- WHATSAPP (Lógica del Final) ---
function handlerEnviarWhatsApp() {
    const carrito = almacen.obtenerCarrito();
    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    let mensaje = "Hola! Quiero hacer este pedido:%0A%0A";
    let total = 0;
    carrito.forEach(item => {
        const producto = productosCargados.find(p => p.id === item.id);
        if (producto) {
            const subtotal = producto.precio * item.cantidad;
            total += subtotal;
            mensaje += `🛒 ${producto.nombre} (x${item.cantidad})%0A`;
        }
    });

    mensaje += `%0ATOTAL: $${total.toLocaleString('es-CL')}`;
    const telefono = "3572543900"; // Tu número
    const url = `https://wa.me/${telefono}?text=${mensaje}`;
    window.open(url, "_blank");
}

// --- INICIALIZACIÓN PRINCIPAL ---
async function inicializarApp() {
    
    inicializarMenu();
    
    // Carga inicial de productos
    productosCargados = await almacen.fetchProductos();

    // Eventos Globales del Carrito
    if ($btnVaciarCarrito) $btnVaciarCarrito.addEventListener('click', handlerVaciarCarrito);
    if ($btnCarrito) $btnCarrito.addEventListener('click', handlerToggleCarrito);
    if ($contenidoCarrito) $contenidoCarrito.addEventListener('click', handlerEliminarProducto);
    
    const $btnWhatsApp = document.getElementById("sendWhatsApp");
    if ($btnWhatsApp) $btnWhatsApp.addEventListener("click", handlerEnviarWhatsApp);

    // Evento Delegado para Agregar Productos
    document.addEventListener('click', handlerAgregarProducto);

    // Lógica Específica de Página Productos
    const $listaPapeleria = document.getElementById('lista-papeleria');
    if ($listaPapeleria) {
        const $listaEscritura = document.getElementById('lista-escritura');
        const $listaAccesorios = document.getElementById('lista-accesorios');
        
        // 1. Esperamos a que se dibujen los productos (await es clave aquí)
        await renderizarProductos($listaPapeleria, $listaEscritura, $listaAccesorios);

        // 2. FIX DE SCROLL: Si la URL tiene un #hash (ej: #accesorios), bajamos ahí
        if (window.location.hash) {
            const idSeccion = window.location.hash; // Ej: "#accesorios"
            const elemento = document.querySelector(idSeccion);
            if (elemento) {
                // Pequeña pausa para asegurar que el navegador renderizó
                setTimeout(() => {
                    elemento.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        }
    }

    // Dibujar carrito inicial
    renderizarCarrito();
}

inicializarApp();