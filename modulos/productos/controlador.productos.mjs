import productosService from '../services/productosService.js';

// GET TODOS
async function obtenerProductos(req, res) {
    try {
        const productos = await productosService.obtenerProductos();
        res.json(productos);
    } catch (error) {
        res.status(500).json({
            error: 'Error al obtener productos'
        });
    }
}

// GET POR ID
async function obtenerProductoPorId(req, res) {
    try {
        const producto = await productosService.obtenerProductoPorId(req.params.id);

        if (!producto) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });
        }

        res.json(producto);
    } catch (error) {
        res.status(500).json({
            error: 'Error al obtener producto'
        });
    }
}

// POST
async function crearProducto(req, res) {
    try {
        const nuevoProducto = await productosService.crearProducto(req.body);

        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(500).json({
            error: 'Error al crear producto'
        });
    }
}

// PUT
async function actualizarProducto(req, res) {
    try {
        const productoActualizado = await productosService.actualizarProducto(
            req.params.id,
            req.body
        );

        res.json(productoActualizado);
    } catch (error) {
        res.status(500).json({
            error: 'Error al actualizar producto'
        });
    }
}

// DELETE
async function eliminarProducto(req, res) {
    try {
        await productosService.eliminarProducto(req.params.id);

        res.json({
            mensaje: 'Producto eliminado'
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error al eliminar producto'
        });
    }
}

export default {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};