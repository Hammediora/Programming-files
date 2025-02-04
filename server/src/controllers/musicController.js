import axios from "axios";
import fs from "fs";
import path from "path";
import musicService from "../services/musicService.js";
import prisma from "../utils/prisma.js";



// Analyze a music track
const analyzeTrack = async (req, res) => {
  try {
    const { trackUrl } = req.body;

    if (!trackUrl) {
      return res.status(400).json({ message: "Track URL is required." });
    }

    const mockAnalysis = {
      bpm: 120,
      key: "C Major",
      energy: "High",
    };

    console.log(`Track analyzed: ${trackUrl}`);
    res.status(200).json({
      message: "Track analyzed successfully!",
      trackUrl,
      ...mockAnalysis,
    });
  } catch (error) {
    console.error("Error analyzing track:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

// Fetch music data based on query
const fetchAndDownloadMusic = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === "") {
      return res
        .status(400)
        .json({ message: "Query parameter is required and cannot be empty." });
    }

    const musicTracks = await musicService.fetchMusicFromAllSources(query);

    if (musicTracks.length === 0) {
      return res
        .status(404)
        .json({ message: "No tracks found for the query." });
    }

    // Logic to download and save tracks
    const savedTracks = [];
    for (const track of musicTracks) {
      try {
        const savedTrack = await musicService.downloadAndSaveTrack(track);
        savedTracks.push(savedTrack);
      } catch (error) {
        console.warn(`Failed to download or save track: ${track.title}`);
      }
    }

    res.status(200).json({
      message: "Tracks downloaded and saved successfully!",
      tracks: savedTracks,
    });
  } catch (error) {
    console.error("Error in fetchAndDownloadMusic:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Fetch saved tracks from the database
const getSavedTracks = async (req, res) => {
  try {
    const tracks = await prisma.track.findMany({
      select: {
        id: true,
        title: true,
        artist: true,
        url: true,
        localPath: true,
        source: true,
        createdAt: true,
      },
    });

    res.status(200).json({
      message: "Saved tracks retrieved successfully!",
      tracks,
    });
  } catch (error) {
    console.error("Error fetching saved tracks:", error.message);
    res.status(500).json({ message: "Failed to retrieve saved tracks." });
  }
};

export default { analyzeTrack, fetchAndDownloadMusic, getSavedTracks };
