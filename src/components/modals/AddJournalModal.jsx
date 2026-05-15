import { useState } from "react";
import { COLORS, EMOJIS } from "../../utils/constants";

export default function AddJournalModal({ onClose, journals, setJournals }) {
  const [journalName, setJournalName] = useState("");
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

  const [selectedEmoji, setSelectedEmoji] = useState("📖");
  function createJournal() {
    if (!journalName.trim()) return;

    const newJournal = {
      id: crypto.randomUUID(),
      name: journalName,
      color: selectedColor,
      emoji: selectedEmoji,
      entries: [],
    };

    setJournals([newJournal, ...journals]);

    onClose();
  }

  return (
    <>
      <div className="modal-overlay open">
        <div className="modal">
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
          <div className="modal-icon">📚</div>
          <h2>Create a New Journal</h2>
          <p>Give your journal a name and personality</p>
          <div className="modal-field">
            <label className="modal-label">Journal name</label>
            <input
              type="text"
              className="modal-input"
              placeholder="e.g. Dreams &amp; Musings..."
              maxLength="50"
              value={journalName}
              onChange={(e) => setJournalName(e.target.value)}
            />
          </div>
          <div className="modal-field">
            <label className="modal-label">Cover color</label>
            <div className="color-picker-row">
              {COLORS.map((color, index) => (
                <div
                  key={index}
                  className={`color-swatch ${
                    selectedColor.bg === color.bg ? "selected" : ""
                  }`}
                  style={{
                    background: color.bg,
                  }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>
          <div className="modal-field">
            <label className="modal-label">Cover icon</label>
            <div className="emoji-picker-row">
              {EMOJIS.map((emoji, index) => (
                <div
                  key={index}
                  className={`emoji-opt ${
                    selectedEmoji === emoji ? "selected" : ""
                  }`}
                  onClick={() => setSelectedEmoji(emoji)}
                >
                  {emoji}
                </div>
              ))}
            </div>
          </div>
          <div className="modal-actions">
            <button className="modal-btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="modal-btn-primary" onClick={createJournal}>
              Create Journal ✦
            </button>
          </div>
        </div>
      </div>

      {/* <input type="file" id="image-upload" accept="image/*" multiple style={{"display":"none"}}/> */}
    </>
  );
}
