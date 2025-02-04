// src/effects/reverbEffect.js
const ffmpeg = require("fluent-ffmpeg");

const applyReverb = (inputPath, outputPath) => {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .audioFilters("aecho=0.8:0.9:1000:0.3") // Reverb-like effect
      .on("end", () => {
        console.log("Reverb effect applied.");
        resolve();
      })
      .on("error", (err) => {
        console.error("Error applying reverb:", err);
        reject(err);
      })
      .save(outputPath);
  });
};

export default { applyReverb };
