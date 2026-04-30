// handlers.js (Módulo de Control/Eventos)

import almacen from './almacen.js';
import { renderizarCarrito, getProductosCargados } from './render.js'; 

const ENDPOINT_URL = 'https://jsonplaceholder.typicode.com/posts'; // Simulación de API (Tarea 6)

// --- Handlers de Carrito ---

export function handlerAgregarProducto(evento, elementosCarrito, dropdown) {
    // Usamos delegación de eventos para capturar el click en cualquier botón de la app
    if (evento.target.classList.contains('btn-agregar')) {
        const idProducto = parseInt(evento.target.dataset.id);

        // Capturamos la cantidad del input de ese producto
        const $inputCantidad = evento.target.closest('.product-actions').querySelector('.input-cantidad'); 
        const cantidad = parseInt($inputCantidad.value) || 1; 

        almacen.agregarProducto(idProducto, cantidad); // Usamos el módulo almacen
        
        renderizarCarrito(elementosCarrito); // Usamos el módulo render
        
        // Abrir el carrito si está cerrado
        if (!dropdown.classList.contains('active')) {
            dropdown.classList.add('active');
        }
    }
}

export function handlerEliminarProducto(evento, elementosCarrito) {
    const target = evento.target.closest('.btn-eliminar');
    if (target) {
        const idProducto = parseInt(target.dataset.idEliminar);
        almacen.eliminarProducto(idProducto); 
        renderizarCarrito(elementosCarrito); 
    }
}

export function handlerVaciarCarrito(elementosCarrito) {
    almacen.vaciarCarrito();
    renderizarCarrito(elementosCarrito);
}

export function handlerToggleCarrito(dropdown) {
    dropdown.classList.toggle('active');
}


// --- Handlers de Envío (Tarea 6) ---

function construirMensaje(productos, totalElemento) {
    const carrito = almacen.obtenerCarrito();
    let mensaje = `¡Hola! Me gustaría hacer el siguiente pedido:\n\n`;

    carrito.forEach(item => {
        const productoCompleto = productos.find(p => p.id === item.id);
        if (productoCompleto) {
            mensaje += `* ${productoCompleto.nombre} (x${item.cantidad})\n`;
        }
    });

    mensaje += `\nTotal Estimado: ${totalElemento.textContent}`;
    return mensaje;
}

export function handlerEnviarWhatsApp(elementosCarrito) {
    const productos = getProductosCargados();
    const mensaje = construirMensaje(productos, elementosCarrito.total);
    
    // Codificar el mensaje para la URL
    const mensajeCodificado = encodeURIComponent(mensaje);
    const telefono = "5493572543900"; // Tu número de teléfono
    
    const url = `https://wa.me/${telefono}?text=${mensajeCodificado}`;
    
    window.open(url, '_blank');
}

export async function handlerEnviarPedido(evento, elementosCarrito) {
    evento.preventDefault(); 
    
    const data = new FormData(evento.target);
    const datosFormulario = Object.fromEntries(data.entries());
    const productos = getProductosCargados();
    
    const mensajeFinal = construirMensaje(productos, elementosCarrito.total) 
        + `\n\nDatos de Contacto:\nNombre: ${datosFormulario.nombre}\nEmail: ${datosFormulario.email}\nTeléfono: ${datosFormulario.telefono || 'N/A'}\n\nNota: ${datosFormulario.mensaje}`;
    
    try {
        const response = await fetch(ENDPOINT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...datosFormulario,
                carrito: almacen.obtenerCarrito(),
                mensajeCompleto: mensajeFinal
            }),
        });

        if (response.ok) {
            alert('✅ Pedido/Consulta enviada con éxito! Revisa la consola.');
            console.log("--- MENSAJE COMPLETO ENVIADO (Simulación) ---");
            console.log(mensajeFinal);
            almacen.vaciarCarrito(); 
            renderizarCarrito(elementosCarrito);
            evento.target.reset(); 
        } else {
            throw new Error(`Error en el servicio: ${response.status}`);
        }
    } catch (error) {
        console.error("Fallo el envío:", error);
        alert('❌ Error al enviar el pedido. Intenta más tarde.');
    }
}