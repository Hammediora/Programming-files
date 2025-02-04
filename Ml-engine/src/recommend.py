# src/recommend.py
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

def recommend_next_track(current_track_features, all_tracks_features):
    current = np.array([list(current_track_features.values())])
    tracks = np.array([list(track.values()) for track in all_tracks_features])
    
    similarities = cosine_similarity(current, tracks)
    most_similar_index = np.argmax(similarities)
    return most_similar_index

if __name__ == "__main__":
    # Mock data
    current_features = {"tempo": 120, "chroma": 0.75, "energy": 0.3}
    all_tracks = [
        {"tempo": 125, "chroma": 0.80, "energy": 0.35},
        {"tempo": 90, "chroma": 0.50, "energy": 0.20},
        {"tempo": 122, "chroma": 0.78, "energy": 0.32},  # Most similar
    ]
    index = recommend_next_track(current_features, all_tracks)
    print(f"Recommended Track Index: {index}")
