import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Container,
  Divider,
} from "@mui/material";
import {
  analyzeTrack,
  fetchMusicData,
  getSavedTracks,
} from "../../services/musicService.js";
import AutocompleteInput from "./autoComplete.js";

function Mixer() {
  const [trackUrl, setTrackUrl] = useState("");
  const [trackAnalysis, setTrackAnalysis] = useState(null);
  const [query, setQuery] = useState("");
  const [musicTracks, setMusicTracks] = useState([]);
  const [savedTracks, setSavedTracks] = useState([]);

  // Analyze a track
  const handleAnalyzeTrack = async () => {
    const result = await analyzeTrack(trackUrl);
    setTrackAnalysis(result);
  };

  // Fetch music and download it
  const handleFetchMusic = async () => {
  if (!query.trim()) {
    alert("Please enter a search query before fetching music!");
    return;
  }

  try {
    const result = await fetchMusicData(query);
    if (result?.tracks) {
      setMusicTracks(result.tracks);
    } else {
      alert("No tracks found for the query.");
    }
  } catch (error) {
    console.error("Error fetching music data:", error);
    alert("Failed to fetch music. Please try again.");
  }
};

  // Fetch saved tracks
 const handleFetchSavedTracks = async () => {
   try {
     const result = await getSavedTracks();
     if (result) {
       setSavedTracks(result); 
     } else {
       alert("No saved tracks found.");
     }
   } catch (error) {
     console.error("Error fetching saved tracks:", error);
     alert("Failed to load saved tracks.");
   }
 };


  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography
        variant="h3"
        color="primary"
        align="center"
        gutterBottom
        fontWeight="bold"
      >
        🎶 AI DJ Mixer 🎶
      </Typography>

      {/* Analyze a Track */}
      <Paper
        elevation={4}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 3,
          backgroundColor: "background.paper",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Analyze a Track
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <AutocompleteInput value={trackUrl} onChange={setTrackUrl} />
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleAnalyzeTrack}
          >
            Analyze
          </Button>
        </Box>
        {trackAnalysis && (
          <Box mt={3}>
            <Typography>BPM: {trackAnalysis.bpm}</Typography>
            <Typography>Key: {trackAnalysis.key}</Typography>
            <Typography>Energy: {trackAnalysis.energy}</Typography>
          </Box>
        )}
      </Paper>

      <Divider sx={{ my: 4 }} />

      {/* Fetch Music */}
      <Paper
        elevation={4}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 3,
          backgroundColor: "background.paper",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Fetch Music
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <AutocompleteInput value={query} onChange={setQuery} />
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleFetchMusic}
          >
            Fetch
          </Button>
        </Box>
        {musicTracks.length > 0 && (
          <Box mt={3}>
            {musicTracks.map((track, index) => (
              <Typography key={index}>
                🎵 {track.title} by {track.artist}
              </Typography>
            ))}
          </Box>
        )}
      </Paper>

      <Divider sx={{ my: 4 }} />

      {/* Fetch Saved Tracks */}
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 3,
          backgroundColor: "background.paper",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Saved Tracks
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={handleFetchSavedTracks}
        >
          Load Saved Tracks
        </Button>
        {savedTracks.length > 0 && (
          <Box mt={3}>
            {savedTracks.map((track) => (
              <Typography key={track.id}>
                🎧 {track.title} by {track.artist} (Source: {track.source})
              </Typography>
            ))}
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default Mixer;
