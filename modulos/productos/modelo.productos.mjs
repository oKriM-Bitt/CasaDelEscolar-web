// Aca se supone que iria la futura base de datos 
// import pool from '../config/database.js'; 

// GET TODOS
const obtenerProductos = async () => {
    // Ejemplo real con PostgreSQL:
    // const respuesta = await pool.query('SELECT * FROM productos');
    // return respuesta.rows;
    
    return [{ id: 1, nombre: "Cuaderno", precio: 3500 }]; // Dato simulado temporal
};

// GET POR ID
const obtenerProductoPorId = async (id) => {
    // Ejemplo real con PostgreSQL:
    // const respuesta = await pool.query('SELECT * FROM productos WHERE id = $1', [id]);
    // return respuesta.rows[0];
    
    return { id, nombre: "Cuaderno", precio: 3500 }; // Dato simulado temporal
};

// POST
const crearProducto = async (datosProducto) => {
    // Extraemos los datos que nos mandó el controlador
    const { nombre, precio, descripcion } = datosProducto;
    
    // Ejemplo real con PostgreSQL:
    // const respuesta = await pool.query(
    //     'INSERT INTO productos (nombre, precio, descripcion) VALUES ($1, $2, $3) RETURNING *',
    //     [nombre, precio, descripcion]
    // );
    // return respuesta.rows[0];
    
    return { id: 2, ...datosProducto }; // Dato simulado temporal
};

// PUT
const actualizarProducto = async (id, datosNuevos) => {
    const { nombre, precio } = datosNuevos;
    
    // Ejemplo real con PostgreSQL:
    // const respuesta = await pool.query(
    //     'UPDATE productos SET nombre = $1, precio = $2 WHERE id = $3 RETURNING *',
    //     [nombre, precio, id]
    // );
    // return respuesta.rows[0];
    
    return { id, ...datosNuevos }; // Dato simulado temporal
};

// DELETE
const eliminarProducto = async (id) => {
    // Ejemplo real con PostgreSQL:
    // await pool.query('DELETE FROM productos WHERE id = $1', [id]);
    
    return true; // Retornamos true para confirmar que se borró
};

// Exportamos las 5 funciones exactamente con los nombres de controlador.productos.mjs para que el controlador pueda importarlas
export default {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};