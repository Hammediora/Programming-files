# src/transitions.py
def suggest_transition(tempo1, tempo2):
    if abs(tempo1 - tempo2) < 5:
        return "Smooth Crossfade"
    elif tempo1 < tempo2:
        return "Beat Drop Transition"
    else:
        return "Fade-Out and Fade-In"

if __name__ == "__main__":
    print(suggest_transition(120, 125))  # Example usage
