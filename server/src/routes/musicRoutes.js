import express from "express";
import musicController from "../controllers/musicController.js";

const router = express.Router();

router.post("/analyze", musicController.analyzeTrack);
router.get("/fetch", musicController.fetchAndDownloadMusic);
router.get("/saved", musicController.getSavedTracks); // New route for saved music

export default router;
