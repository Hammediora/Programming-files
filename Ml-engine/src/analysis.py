# src/analysis.py
import librosa
import numpy as np

def extract_features(audio_path):
    try:
        y, sr = librosa.load(audio_path)
        tempo, _ = librosa.beat.beat_track(y=y, sr=sr)
        chroma = librosa.feature.chroma_stft(y=y, sr=sr).mean()
        energy = np.mean(librosa.feature.rms(y=y))
        return {
            "tempo": round(tempo),
            "chroma": round(chroma, 2),
            "energy": round(energy, 4),
        }
    except Exception as e:
        print(f"Error extracting features: {e}")
        return None

if __name__ == "__main__":
    test_audio = "../test-track.mp3"
    features = extract_features(test_audio)
    print("Extracted Features:", features)
