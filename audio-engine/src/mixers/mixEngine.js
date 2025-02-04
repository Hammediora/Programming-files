const ffmpeg = require("fluent-ffmpeg");

const mixTracks = (track1, track2, outputPath) => {
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(track1)
      .input(track2)
      .complexFilter("amix=inputs=2:duration=shortest")
      .on("end", () => {
        console.log("Tracks mixed successfully.");
        resolve();
      })
      .on("error", (err) => {
        console.error("Error mixing tracks:", err);
        reject(err);
      })
      .save(outputPath);
  });
};

export default { mixTracks };   
