import { useState, useEffect } from "react";

const VIBES = [
  { emoji: "😄", label: "Happy" },
  { emoji: "😌", label: "Calm" },
  { emoji: "🔥", label: "Energized" },
  { emoji: "😴", label: "Tired" },
  { emoji: "😤", label: "Frustrated" },
  { emoji: "🥳", label: "Excited" },
  { emoji: "😢", label: "Sad" },
  { emoji: "🤔", label: "Thoughtful" },
  { emoji: "😶", label: "Unaware" },
  { emoji: "😏", label: "Mischievous" },
  { emoji: "😬", label: "Anxious" },
  { emoji: "🥱", label: "Bored" },
  { emoji: "😎", label: "Confident" },
  { emoji: "🤯", label: "Overwhelmed" },
  { emoji: "😇", label: "Grateful" },
  { emoji: "😒", label: "Meh" },
  { emoji: "🤩", label: "Inspired" },
  { emoji: "😳", label: "Embarrassed" },
  { emoji: "🧐", label: "Curious" },
  { emoji: "😑", label: "Numb" },
  { emoji: "🤗", label: "Affectionate" },
  { emoji: "😠", label: "Angry" },
  { emoji: "🥺", label: "Vulnerable" },
  { emoji: "😪", label: "Melancholy" },
];

const VIBE_GRADIENTS = {
  Happy:       "linear-gradient(135deg, #a8edea, #fed6e3)",
  Calm:        "linear-gradient(135deg, #d0f0fd, #a8d8f0)",
  Energized:   "linear-gradient(135deg, #f9d423, #ff4e50)",
  Tired:       "linear-gradient(135deg, #c9d6df, #e2ebf0)",
  Frustrated:  "linear-gradient(135deg, #f7971e, #ffd200)",
  Excited:     "linear-gradient(135deg, #f953c6, #b91d73)",
  Sad:         "linear-gradient(135deg, #145277, #1a6e9e)",
  Thoughtful:  "linear-gradient(135deg, #c2e9fb, #a1c4fd)",
  Unaware:     "linear-gradient(135deg, #e0e0e0, #cfcfcf)",
  Mischievous: "linear-gradient(135deg, #43e97b, #38f9d7)",
  Anxious:     "linear-gradient(135deg, #ffecd2, #fcb69f)",
  Bored:       "linear-gradient(135deg, , #bdbdbd)",
  Confident:   "linear-gradient(135deg, #4facfe, #00f2fe)",
  Overwhelmed: "linear-gradient(135deg, #d9afd9, #97d9e1)",
  Grateful:    "linear-gradient(135deg, #fddb92, #d1fdff)",
  Meh:         "linear-gradient(135deg, #e0e0e0, #eeeeee)",
  Inspired:    "linear-gradient(135deg, #f6d365, #fda085)",
  Embarrassed: "linear-gradient(135deg, #fbc2eb, #a6c1ee)",
  Curious:     "linear-gradient(135deg, #84fab0, #8fd3f4)",
  Numb:        "linear-gradient(135deg, #bdc3c7, #2c3e50)",
  Affectionate:"linear-gradient(135deg, #ff9a9e, #fecfef)",
  Angry:       "linear-gradient(135deg, #ff416c, #ff4b2b)",
  Vulnerable:  "linear-gradient(135deg, #e0c3fc, #8ec5fc)",
  Melancholy:  "linear-gradient(135deg, #4b6cb7, #182848)",
};

const today = () => new Date().toISOString().split("T")[0];

export default function App() {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("vibe");
    if (stored) {
      const { vibe, date } = JSON.parse(stored);
      if (date === today()) setSelected(vibe);
    }
  }, []);

  const selectVibe = (vibe) => {
    setSelected(vibe);
    localStorage.setItem("vibe", JSON.stringify({ vibe, date: today() }));
  };

  const reset = () => {
    setSelected(null);
    localStorage.removeItem("vibe");
  };

  return (
    <div style={{
        ...styles.container,
        background: selected ? VIBE_GRADIENTS[selected.label] : styles.container.background,
        transition: "background 0.8s ease",
      }}>
      <h1 style={styles.title}>What's your vibe today?</h1>

      <div style={styles.grid}>
        {VIBES.map(({ emoji, label }) => (
          <button
            key={label}
            onClick={() => selectVibe({ emoji, label })}
            style={{
              ...styles.card,
              ...(selected?.label === label ? styles.cardSelected : {}),
            }}
          >
            <span style={styles.emoji}>{emoji}</span>
            <span style={styles.label}>{label}</span>
          </button>
        ))}
      </div>

      <p style={styles.status}>
        {selected
          ? `${selected.emoji} You're feeling ${selected.label} today`
          : "No vibe selected yet for today."}
      </p>

      {selected && (
        <button onClick={reset} style={styles.reset}>
          Reset Vibe
        </button>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Segoe UI', sans-serif",
    background: "linear-gradient(135deg, #f5f5f5, #e8e8e8)",
    padding: "2rem",
  },
  title: {
    fontSize: "2.2rem",
    fontWeight: 700,
    marginBottom: "2rem",
    color: "rgba(0,0,0,0.75)",
    letterSpacing: "-0.5px",
    textShadow: "0 1px 4px rgba(0,0,0,0.1)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "0.75rem",
    marginBottom: "2rem",
    maxWidth: "600px",
    width: "100%",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0.9rem 0.5rem",
    borderRadius: "16px",
    border: "none",
    background: "rgba(255,255,255,0.35)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    cursor: "pointer",
    transition: "transform 0.15s ease, box-shadow 0.15s ease, background 0.2s ease",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  },
  cardSelected: {
    background: "rgba(255,255,255,0.7)",
    transform: "scale(1.08)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
  },
  emoji: { fontSize: "2rem" },
  label: { fontSize: "0.78rem", marginTop: "0.4rem", color: "rgba(0,0,0,0.6)", fontWeight: 500 },
  status: {
    fontSize: "1.1rem",
    fontWeight: 600,
    color: "rgba(0,0,0,0.65)",
    marginBottom: "1rem",
    textAlign: "center",
    textShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  reset: {
    padding: "0.5rem 1.4rem",
    borderRadius: "999px",
    border: "none",
    background: "rgba(0,0,0,0.18)",
    color: "#fff",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: 600,
    backdropFilter: "blur(6px)",
    letterSpacing: "0.3px",
  },
};