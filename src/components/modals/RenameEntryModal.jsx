import { useState, useEffect } from "react";

export default function RenameEntryModal({ onClose, entry, onRename }) {
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    if (entry) {
      setNewTitle(entry.title);
    }
  }, [entry]);

  const handleRename = () => {
    if (!newTitle.trim()) return;
    onRename(newTitle.trim());
    onClose();
  };

  const handleCancel = () => {
    setNewTitle("");
    onClose();
  };

  if (!entry) return null;

  return (
    <div className="modal-overlay open" id="modal-rename-entry">
      <div className="modal">
        <button className="modal-close" onClick={handleCancel}>
          ✕
        </button>
        <div className="modal-icon">✏️</div>
        <h2>Rename Entry</h2>
        <div className="modal-field">
          <input
            type="text"
            className="modal-input"
            id="inp-rename-entry"
            placeholder="New title..."
            maxLength="80"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleRename()}
            autoFocus
          />
        </div>
        <div className="modal-actions">
          <button className="modal-btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
          <button className="modal-btn-primary" onClick={handleRename}>
            Rename ✦
          </button>
        </div>
      </div>
    </div>
  );
}
