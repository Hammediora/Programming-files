import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1db954", // Spotify green
    },
    secondary: {
      main: "#282828",
    },
    background: {
      default: "#121212",
      paper: "#282828",
    },
    text: {
      primary: "#ffffff",
      secondary: "#aaaaaa",
    },
  },
});

export default theme;
