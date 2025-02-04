import React from "react";
import { Box, Button } from "@mui/material";

function Controls() {
  return (
    <Box className="flex justify-around w-full">
      <Button variant="contained" color="primary">
        Reverb
      </Button>
      <Button variant="contained" color="primary">
        Beat Drop
      </Button>
      <Button variant="contained" color="primary">
        Crossfade
      </Button>
    </Box>
  );
}

export default Controls;
