import axios from "axios";

const API_URL = "http://localhost:5000/api/music";

// Analyze a track (POST request)
export const analyzeTrack = async (trackUrl) => {
  try {
    const response = await axios.post(`${API_URL}/analyze`, { trackUrl });
    return response.data;
  } catch (error) {
    console.error("Error analyzing track:", error);
    return null;
  }
};

// Fetch music data (GET request)
export const fetchMusicData = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/fetch`, { params: { query } });
    return response.data;
  } catch (error) {
    console.error("Error fetching music data:", error);
    return null;
  }
};

export const getSavedTracks = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/music/saved");
    return response.data.tracks; // Return the 'tracks' array
  } catch (error) {
    console.error("Error fetching saved tracks:", error);
    return null;
  }
};
