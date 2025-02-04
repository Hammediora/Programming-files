import React from "react";
import { Box, Typography, Button, Container, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="md"
      className="min-h-screen flex items-center justify-center"
    >
      <Paper elevation={3} className="p-8 bg-gray-800 text-white rounded-lg">
        <Box textAlign="center">
          <Typography variant="h3" color="primary" gutterBottom>
            🎧 Welcome to AI DJ
          </Typography>
          <Typography variant="h6" color="textSecondary" paragraph>
            Your personal AI-powered DJ that mixes tracks seamlessly with
            advanced beat analysis and real-time transitions.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate("/mixer")}
            className="mt-4"
          >
            Start Mixing
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Home;
