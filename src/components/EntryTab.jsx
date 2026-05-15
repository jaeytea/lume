export default function EntryTab({ entry, onOpen, isActive }) {
  const handleContextMenu = (e) => {
    if (window.showCtxMenu) {
      window.showCtxMenu(e, entry.id);
    }
  };

  return (
    <div
      className={`entry-tab ${isActive ? "active" : ""}`}
      onClick={onOpen}
      onContextMenu={handleContextMenu}
      data-id={entry.id}
    >
      <div className="entry-tab-content">
        <div className="entry-tab-title">{entry.title}</div>

        <div className="entry-tab-date">
          {new Date(entry.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
