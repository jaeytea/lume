import { useEffect } from "react";

export default function DeleteEntryModal({ onClose, entry, onDelete }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const handleDelete = () => {
    onDelete(entry.id);
    onClose();
  };

  if (!entry) return null;

  return (
    <div className="modal-overlay open" id="modal-delete-entry">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <div className="modal-icon">🗑️</div>

        <h2>Delete Entry</h2>

        <p className="modal-text">Delete this entry? This cannot be undone.</p>

        <div className="modal-actions">
          <button className="modal-btn-secondary" onClick={onClose}>
            Cancel
          </button>

          <button className="modal-btn-primary" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
