import almacen from './almacen.js';

const tbodyAdmin = document.getElementById('adminContentProducts');

async function renderizarTablaAdmin() {
    if (!tbodyAdmin) return;

    // Estado de carga
    tbodyAdmin.innerHTML = '<tr><td colspan="8" style="text-align: center;">Cargando inventario...</td></tr>';

    // Obtenemos los productos usando tu Fetch ya configurado
    const productos = await almacen.fetchProductos();

    tbodyAdmin.innerHTML = '';

    productos.forEach(prod => {
        // MockAPI a veces no trae 'stock', simulamos uno mayor a 0 para el diseño si no existe
        const stockActual = prod.stock || Math.floor(Math.random() * 50) + 1; 
        const claseStock = stockActual < 10 ? 'alert' : 'normal';

        const fila = `
            <tr>
                <td>#${prod.id}</td>
                <td>
                    <img src="${prod.imagen}" alt="${prod.nombre}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px;">
                </td>
                <td>${prod.nombre}</td>
                <td style="text-transform: capitalize;">${prod.categoria}</td>
                <td>Casa Central</td>
                <td><span class="badge-stock ${claseStock}">${stockActual}</span></td>
                <td>$${prod.precio.toLocaleString('es-CL')}</td>
                <td class="acciones-td">
                    <button class="btn-icon edit" title="Editar"><i class="fa-solid fa-pen"></i></button>
                    <button class="btn-icon delete" title="Eliminar"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        `;
        tbodyAdmin.innerHTML += fila;
    });
}

// Inicializar al cargar el DOM
document.addEventListener('DOMContentLoaded', renderizarTablaAdmin);