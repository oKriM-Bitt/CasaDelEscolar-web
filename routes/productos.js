// routes/productos.js - Define las rutas relacionadas a productos

import express from "express";
import productosService from "../services/productosService.js";

const router = express.Router();

// GET /api/productos - Devuelve todos los productos
router.get("/", async (req, res) => {
    try {
        const productos = await productosService.obtenerProductos();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los productos" });
    }
});

export default router;
