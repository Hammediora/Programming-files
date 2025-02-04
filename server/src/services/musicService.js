import axios from "axios";
import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const FREESOUND_API_URL = "https://freesound.org/apiv2";
const FREESOUND_API_KEY = process.env.FREESOUND_API_KEY;

/**
 * Fetch music tracks from Freesound API
 * @param {String} query - Search keyword (e.g., "hip-hop", "jazz")
 * @param {Number} durationMin - Minimum track duration
 * @param {Number} durationMax - Maximum track duration
 */
const fetchMusicFromFreesound = async (
  query,
  durationMin = 10,
  durationMax = 30
) => {
  try {
    console.log("Fetching from Freesound...");
    const response = await axios.get(`${FREESOUND_API_URL}/search/text/`, {
      params: {
        query: query || "hip-hop", // Fallback query
        filter: `duration:[${durationMin} TO ${durationMax}]`,
        fields: "id,name,previews,duration,username",
        sort: "downloads",
        token: FREESOUND_API_KEY,
      },
    });

    if (!response.data || !response.data.results) {
      console.warn("Freesound response is empty or invalid.");
      return []; // Fallback to empty list
    }

    // Map and validate results with fallbacks
    return response.data.results.map((track) => ({
      title: track.name || "Unknown Title",
      artist: track.username || "Unknown Artist",
      duration: track.duration || 0,
      previewUrl:
        track.previews?.["preview-hq-mp3"] ||
        "https://example.com/fallback.mp3", // Fallback preview URL
      source: "Freesound",
      features: { duration: track.duration || 0 }, // Additional metadata with fallback
    }));
  } catch (error) {
    console.error(
      "Error fetching data from Freesound:",
      error.response?.data || error.message
    );
    return []; // Return an empty list on failure
  }
};


/**
 * Download a music track and save its details in the database
 * @param {Object} track - Track metadata
 */
const downloadAndSaveTrack = async (track) => {
  try {
    const { title, artist, previewUrl, source, features } = track;

    // Set up download path
    const fileName = `${title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.mp3`;
    const filePath = path.resolve("downloads", fileName);

    // Ensure 'downloads' folder exists
    if (!fs.existsSync("downloads")) {
      fs.mkdirSync("downloads");
    }

    // Download the track
    const writer = fs.createWriteStream(filePath);
    const response = await axios({
      url: previewUrl,
      method: "GET",
      responseType: "stream",
    });

    response.data.pipe(writer);

    // Wait for the file to finish downloading
    await new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    console.log(`Downloaded: ${fileName}`);

    // Save track details in the database
    const savedTrack = await prisma.track.create({
      data: {
        title,
        artist,
        url: previewUrl,
        localPath: filePath,
        source: source || "Unknown",
        features: features || {}, // Save additional metadata as JSON
      },
    });

    console.log(`Saved to database: ${savedTrack.title}`);
    return savedTrack;
  } catch (error) {
    console.error("Error downloading or saving track:", error.message);
    throw new Error("Failed to download or save track.");
  }
};

/**
 * Fetch music tracks from Jamendo API
 * @param {String} query - Search keyword (e.g., "hip-hop", "jazz")
 */
const fetchMusicFromJamendo = async (query) => {
  try {
    const JAMENDO_API_URL = "https://api.jamendo.com/v3.0/tracks";
    const response = await axios.get(JAMENDO_API_URL, {
      params: {
        client_id: process.env.JAMENDO_API_KEY,
        format: "json",
        limit: 10,
        search: query,
        include: "musicinfo",
      },
    });

    return response.data.results.map((track) => ({
      title: track.name,
      artist: track.artist_name,
      duration: track.duration,
      previewUrl: track.audio,
      source: "Jamendo",
      features: { album: track.album_name, duration: track.duration },
    }));
  } catch (error) {
    console.error("Error fetching data from Jamendo:", error.message);
    throw new Error("Failed to fetch music data from Jamendo.");
  }
};

/**
 * Fetch music files from Internet Archive S3
 * @param {String} query - Search keyword
 */
const fetchMusicFromInternetArchive = async (query) => {
  try {
    const archiveSearchUrl = `https://archive.org/advancedsearch.php`;
    const response = await axios.get(archiveSearchUrl, {
      params: {
        q: query,
        mediatype: "audio", // Correct value for media type
        output: "json", // Correct output format
        rows: 10, // Number of results to fetch
      },
    });

    const items = response.data.response.docs;
    return items.map((item) => ({
      title: item.title || "Unknown Title",
      artist: item.creator ? item.creator[0] : "Unknown Artist",
      previewUrl: `https://archive.org/download/${item.identifier}/${item.identifier}_128kb.mp3`,
      source: "Internet Archive",
      features: { identifier: item.identifier, mediatype: item.mediatype },
    }));
  } catch (error) {
    console.error(
      "Error fetching data from Internet Archive:",
      error.response?.data || error.message
    );
    throw new Error("Failed to fetch music data from Internet Archive.");
  }
};


const fetchMusicFromAllSources = async (query) => {
  const results = [];

  try {
    console.log("Fetching from Freesound...");
    const freesoundTracks = await fetchMusicFromFreesound(query);
    results.push(...freesoundTracks);
  } catch (error) {
    console.warn("Freesound failed:", error.message);
  }

  try {
    console.log("Fetching from Jamendo...");
    const jamendoTracks = await fetchMusicFromJamendo(query);
    results.push(...jamendoTracks);
  } catch (error) {
    console.warn("Jamendo failed:", error.message);
  }

  try {
    console.log("Fetching from Internet Archive...");
    const archiveTracks = await fetchMusicFromInternetArchive(query);
    results.push(...archiveTracks);
  } catch (error) {
    console.warn("Internet Archive failed:", error.message);
  }

  return results;
};

export default
{
    fetchMusicFromFreesound,
    downloadAndSaveTrack,
    fetchMusicFromJamendo,
    fetchMusicFromInternetArchive,
    fetchMusicFromAllSources
 };
