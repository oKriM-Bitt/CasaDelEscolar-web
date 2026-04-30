// app.js - Punto de entrada del servidor

import express from "express";
import productosRouter from './routes/productos.js';

const app = express();

// Middleware para parsear JSON en las peticiones entrantes
app.use(express.json());

// Servir archivos estáticos (HTML, CSS, imágenes, JS del frontend)
// Le decimos a Express que la carpeta raíz del proyecto es pública
app.use(express.static("front"));

// Rutas de la API
app.use("/api/productos", productosRouter);

// Iniciamos el servidor
app.listen(3000, () => {
    console.log(`Servidor corriendo en http://localhost:3000`);
});
