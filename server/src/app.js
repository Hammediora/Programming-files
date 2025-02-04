import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path"; // Import the path module
import routes from "./routes/index.js"; // Import your routes

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Built-in body parsing for JSON
app.use(express.urlencoded({ extended: true })); // Built-in body parsing for form data

// Serve downloaded files
app.use("/downloads", express.static(path.resolve("downloads")));

// Routes
app.use("/api", routes);

// Base Route
app.get("/", (req, res) => {
  res.send("Welcome to the AI DJ Backend API!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
