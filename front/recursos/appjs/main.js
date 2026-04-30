// main.js (Punto de Entrada de la Aplicación)

// Importamos todas las funciones (Instanciación de Módulos - SP5/H3)
import { renderizarProductos, renderizarCarrito } from './render.js';
import * as handlers from './handlers.js'; // Importa todos los handlers


// --- Instancia de Referencias del DOM (simulando una Clase) ---
const dom = {
    // Contenedores de productos
    papeleria: document.getElementById('lista-papeleria'),
    escritura: document.getElementById('lista-escritura'),
    accesorios: document.getElementById('lista-accesorios'),
    
    // Elementos del carrito (Carro visible, Botones)
    btnVaciar: document.getElementById('emptyCart'),
    btnAbrir: document.getElementById('carrito'),
    dropdown: document.querySelector('.cart'),
    contenedorCarrito: document.getElementById('contentProducts'),
    btnWhatsApp: document.getElementById('sendWhatsApp'), // Agregado para WhatsApp
    
    // Elementos para pasar al renderizado y handlers
    uiCarrito: {
        contenido: document.getElementById('contentProducts'),
        total: document.getElementById('total'),
        contador: document.getElementById('cartCount')
    },

    // Formulario contacto
    formContacto: document.getElementById('form-contacto')
};


async function inicializarApp() {
    
    // 1. ASIGNACIÓN DE EVENTOS GENERALES (Carrito)
    
    dom.btnVaciar.addEventListener('click', () => handlers.handlerVaciarCarrito(dom.uiCarrito));
    dom.btnAbrir.addEventListener('click', () => handlers.handlerToggleCarrito(dom.dropdown));
    
    // Delegación para eliminar productos
    dom.contenedorCarrito.addEventListener('click', (e) => handlers.handlerEliminarProducto(e, dom.uiCarrito));
    
    // Evento para el botón de WhatsApp (si existe)
    if (dom.btnWhatsApp) {
        dom.btnWhatsApp.addEventListener('click', () => handlers.handlerEnviarWhatsApp(dom.uiCarrito));
    }


    // 2. LÓGICA DE PRODUCTOS (Solo si estamos en productos.html)
    if (dom.papeleria) {
        const contenedores = {
            contPapeleria: dom.papeleria,
            contEscritura: dom.escritura,
            contAccesorios: dom.accesorios
        };

        // 1. Carga y Renderizado de productos
        await renderizarProductos(contenedores);

        // 2. Delegación de eventos para el botón "Agregar Producto"
        document.addEventListener('click', (e) => handlers.handlerAgregarProducto(e, dom.uiCarrito, dom.dropdown));
        
        // Lógica de Scroll (Copiar y pegar la que ya tenía tu archivo anterior)
        if (window.location.hash) {
            const idSeccion = window.location.hash; 
            const elemento = document.querySelector(idSeccion);
            if (elemento) {
                setTimeout(() => {
                    elemento.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        }
    }
    
    // 3. LÓGICA DE CONTACTO (Solo si estamos en contacto.html)
    if (dom.formContacto) {
        dom.formContacto.addEventListener('submit', (e) => handlers.handlerEnviarPedido(e, dom.uiCarrito));
    }

    // 4. Dibujar el carrito inicialmente (con datos de localStorage)
    renderizarCarrito(dom.uiCarrito);
}
// Lógica del Menú Hamburguesa
const btnMenu = document.getElementById('btnMenu');
const menuColapsable = document.getElementById('menuColapsable');

if (btnMenu && menuColapsable) {
    btnMenu.addEventListener('click', () => {
        menuColapsable.classList.toggle('activo');
    });
}


function iniciarLluviaJapon() {
    const emojis = ['🎒', '📚', '✏️', '🏫', '🍎', '📐', '🚌', '📝'];
    
    setInterval(() => {
        // Creamos el elemento
        const elemento = document.createElement('div');
        elemento.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        elemento.classList.add('emoji-cayendo');
        
        // Posición horizontal aleatoria (de 0% a 100% de la pantalla)
        elemento.style.left = Math.random() * 100 + 'vw';
        
        // Velocidad aleatoria de caída (entre 4 y 8 segundos)
        elemento.style.animationDuration = Math.random() * 4 + 4 + 's'; 
        
        // Tamaño aleatorio para dar profundidad
        elemento.style.fontSize = (Math.random() * 1 + 1) + 'rem';
        
        document.body.appendChild(elemento);
        
        // Limpiamos el emoji después de 8 segundos para no consumir memoria
        setTimeout(() => {
            elemento.remove();
        }, 8000);
        
    }, 600); // Cae un emoji nuevo cada 600 milisegundos (ajustalo para más o menos lluvia)
}

iniciarLluviaJapon();

// Iniciar la aplicación
inicializarApp();




