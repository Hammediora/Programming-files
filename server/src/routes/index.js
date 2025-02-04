// src/routes/index.js
import express from "express";
import musicRoutes from "./musicRoutes.js";

const router = express.Router();

router.use("/music", musicRoutes);

export default router;
