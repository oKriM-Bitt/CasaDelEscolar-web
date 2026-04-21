// services/productosService.js - Comunicación con la API externa (MockAPI)

const PRODUCTOS_URL = "https://69deafb5d6de26e11928224d.mockapi.io/productos";

async function obtenerProductos() {
    const response = await fetch(PRODUCTOS_URL);

    if (!response.ok) {
        throw new Error(`Error al contactar MockAPI: ${response.status}`);
    }

    const productos = await response.json();
    return productos;
}

export default { obtenerProductos };
