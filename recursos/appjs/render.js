// render.js (Módulo de Vistas/Renderizado)

import almacen from './almacen.js'; 

// Cache para guardar los productos una vez que se cargan, y que el carrito los pueda usar.
let productosCache = [];

export function getProductosCargados() {
    return productosCache;
}

// --- Renderizado de Productos ---

/** * Renderiza la lista de productos en la página 'productos.html'.
 */
export async function renderizarProductos(contenedores) {
    const { contPapeleria, contEscritura, contAccesorios } = contenedores;

    contPapeleria.innerHTML = 'Cargando productos...';
    contEscritura.innerHTML = 'Cargando productos...';
    contAccesorios.innerHTML = 'Cargando productos...';

    // Ahora usamos el fetchProductos que está dentro de almacen.js
    productosCache = await almacen.fetchProductos();

    contPapeleria.innerHTML = '';
    contEscritura.innerHTML = '';
    contAccesorios.innerHTML = '';
    
    productosCache.forEach((producto) => {
        const plantillaProducto = `
            <article class="producto">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <span class="precio">$${producto.precio.toLocaleString('es-CL')}</span>
                
                <div class="product-actions">
                    <input type="number" 
                           class="input-cantidad" 
                           value="1" min="1" max="99"> 
                    
                    <button class="btn-agregar" data-id="${producto.id}">
                        Agregar al Carrito
                    </button>
                </div>
            </article>
        `;

        switch (producto.categoria) {
            case 'papeleria':
                contPapeleria.innerHTML += plantillaProducto;
                break;
            case 'escritura':
                contEscritura.innerHTML += plantillaProducto;
                break;
            case 'accesorios':
                contAccesorios.innerHTML += plantillaProducto;
                break;
        }
    });
}

// --- Renderizado de Carrito ---

/**
 * Renderiza el carrito desplegable y actualiza el total/contador.
 */
export function renderizarCarrito(elementosCarrito) {
    const { contenido, total, contador } = elementosCarrito;
    const carrito = almacen.obtenerCarrito(); 
    
    contenido.innerHTML = '';
    let precioTotal = 0;

    if (carrito.length === 0) {
        contenido.innerHTML = '<tr><td colspan="5">Tu carrito está vacío.</td></tr>';
        total.textContent = '$0.00';
        contador.textContent = '0';
        return;
    }

    carrito.forEach((item) => {
        // Obtenemos info completa del producto desde el cache
        const productoInfo = productosCache.find(p => p.id === item.id); 
        
        if (productoInfo) {
            const subtotal = productoInfo.precio * item.cantidad;
            precioTotal += subtotal;

            const plantillaItem = `
                <tr>
                    <td><img src="${productoInfo.imagen}" alt="${productoInfo.nombre}" width="50"></td>
                    <td>${productoInfo.nombre}</td>
                    <td>$${productoInfo.precio.toLocaleString('es-CL')}</td>
                    <td>${item.cantidad}</td>
                    <td>
                        <button class="btn-eliminar" data-id-eliminar="${item.id}">
                             <i class="fa-solid fa-trash-can"></i> 
                        </button>
                    </td>
                </tr>
            `;
            contenido.innerHTML += plantillaItem;
        }
    });

    total.textContent = `$${precioTotal.toLocaleString('es-CL')}`;
    contador.textContent = carrito.reduce((acc, item) => acc + item.cantidad, 0);
}