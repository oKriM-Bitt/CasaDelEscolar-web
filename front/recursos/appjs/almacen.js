// --- Configuración ---
const CARRITO_STORAGE_KEY = 'la-casa-del-escolar-carrito';
// const PRODUCTOS_URL = "./recursos/json/productos.json"; // Ruta al JSON
// mockapi
const PRODUCTOS_URL = '/api/productos'; // Tu enlace de MockAPI

// --- Lógica de Persistencia ---
function cargarCarrito() {
    const carritoGuardado = localStorage.getItem(CARRITO_STORAGE_KEY);
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
}

function guardarCarrito() {
    localStorage.setItem(CARRITO_STORAGE_KEY, JSON.stringify(carrito));
}

// Inicializamos el carrito
const carrito = cargarCarrito();

// --- Funciones del Carrito ---
function obtenerCarrito() {
    return carrito;
}

function agregarProducto(idProducto, cantidad = 1) { 
    const productoExistente = carrito.find(item => item.id === idProducto);
    if (productoExistente) {
        productoExistente.cantidad += cantidad;
    } else {
        carrito.push({
            id: idProducto,
            cantidad: cantidad 
        });
    }
    guardarCarrito(); 
}

function eliminarProducto(idProducto) {
    const index = carrito.findIndex(item => item.id === idProducto);
    if (index !== -1) {
        carrito.splice(index, 1);
        guardarCarrito();
    }
}

function vaciarCarrito() {
    carrito.length = 0;
    guardarCarrito();
}

// --- Función Fetch ---
async function fetchProductos() {
    try {
        const response = await fetch(PRODUCTOS_URL);
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        const productos = await response.json();
        return productos;
    } catch (error) {
        console.error("Error al cargar los productos:", error);
        return [];
    }
}

// --- Exportación ---
export default {
    obtenerCarrito,
    agregarProducto,
    eliminarProducto,
    vaciarCarrito,
    fetchProductos 
};