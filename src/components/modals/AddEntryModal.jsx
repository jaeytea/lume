import { useState } from "react";

{/* <!-- NEW ENTRY MODAL --> */}

export default function AddEntryModal({onClose, onCreate}) {

    const [title, setTitle] = useState("");
    const handleCreate = () => {
         if (!title.trim()) return;

    onCreate({
      id: crypto.randomUUID(),
      title,
      content: "",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    setTitle("");
    onClose();
    }

  return (
    
 <div className="modal-overlay open" id="modal-new-entry">
  <div className="modal">
    <button className="modal-close" onClick={onClose}>
      ✕
    </button>
    <div className="modal-icon">🪶</div>
    <h2>New Entry</h2>
    <p>What shall we call this chapter?</p>
    <div className="modal-field">
      <input type="text" className="modal-input" placeholder="Entry title..." maxLength="80" value={title}
          onChange={(e) => setTitle(e.target.value)}/>
    </div>
    <div className="modal-actions">
      <button className="modal-btn-secondary" onClick={onClose}>
        Cancel
      </button>
      <button className="modal-btn-primary" id="btn-create-entry" onClick={handleCreate}>
        Begin Writing ✦
      </button>
    </div>
  </div>
</div> );
}