// src/index.js
const { analyzeBPM } = require("./analyzers/bpmAnalyzer");
const { applyReverb } = require("./effects/reverbEffect");
const { mixTracks } = require("./mixers/mixEngine");

(async () => {
  const testTrack = "./test-track.mp3";

  console.log("Starting Audio Engine...\n");

  // 1. Analyze BPM
  const bpm = await analyzeBPM(testTrack);
  console.log(`Detected BPM: ${bpm}`);

  // 2. Apply Reverb Effect
  const reverbOutput = "./output/reverb-track.mp3";
  await applyReverb(testTrack, reverbOutput);
  console.log(`Reverb effect applied. Output: ${reverbOutput}`);

  // 3. Mix Two Tracks
  const track1 = "./test-track.mp3";
  const track2 = "./test-track-2.mp3";
  const mixOutput = "./output/mix-track.mp3";
  await mixTracks(track1, track2, mixOutput);
  console.log(`Tracks mixed successfully. Output: ${mixOutput}`);
})();
