import React, { useState } from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";

function Player() {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <Card className="w-full bg-gray-800 text-white">
      <CardContent>
        <Typography variant="h6" align="center">
          Now Playing: Track Name
        </Typography>
        <Box className="flex justify-center mt-4">
          <Button variant="contained" color="primary" onClick={togglePlay}>
            {isPlaying ? "Pause" : "Play"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default Player;
