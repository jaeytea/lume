import { useState, useEffect, useRef } from "react";

export default function ContextMenu({
  entries = [],
  selectedJournal,
  selectedEntry,
  onShowRenameModal,
  onShowDeleteModal,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [targetEntryId, setTargetEntryId] = useState(null);
  const menuRef = useRef(null);

  // Show context menu at mouse position
  const showCtxMenu = (event, entryId) => {
    event.preventDefault();
    setTargetEntryId(entryId);
    setPosition({ x: event.clientX, y: event.clientY });
    setIsOpen(true);
  };

  // Hide context menu
  const hideCtxMenu = () => {
    setIsOpen(false);
    setTargetEntryId(null);
  };

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        hideCtxMenu();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  // Expose showCtxMenu globally
  useEffect(() => {
    window.showCtxMenu = showCtxMenu;
  }, []);

  // Handle rename action
  const handleRename = () => {
    const entry = entries.find((e) => e.id === targetEntryId);
    if (!entry) return;

    if (onShowRenameModal) {
      onShowRenameModal(entry);
    }

    hideCtxMenu();
  };

  // Handle delete action
  const handleDelete = () => {
    const entry = entries.find((e) => e.id === targetEntryId);
    if (!entry) return;
    if (onShowDeleteModal) {
      onShowDeleteModal(entry);
    }

    hideCtxMenu();
  };

  return (
    <>
      {/* Context menu */}
      <div
        ref={menuRef}
        className={`ctx-menu ${isOpen ? "open" : ""}`}
        id="ctx-menu"
        style={{
          position: "fixed",
          left: `${position.x}px`,
          top: `${position.y}px`,
          display: isOpen ? "block" : "none",
        }}
      >
        <div className="ctx-item" id="ctx-rename" onClick={handleRename}>
          ✏️ Rename entry
        </div>
        <div className="ctx-item danger" id="ctx-delete" onClick={handleDelete}>
          🗑️ Delete entry
        </div>
      </div>
    </>
  );
}
