// tests/bpmAnalyzer.test.js
const { analyzeBPM } = require("../src/analyzers/bpmAnalyzer");

test("BPM Analyzer should return a BPM value", async () => {
  const bpm = await analyzeBPM("./test-track.mp3");
  expect(bpm).toBeGreaterThan(0);
});
