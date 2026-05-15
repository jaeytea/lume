export default function EntryTab({
  entry,
  onOpen,
  isActive,
}) {

  return (
    <div
      className={`entry-tab ${
        isActive ? "active" : ""
      }`}
      onClick={onOpen}
    >

      <div className="entry-tab-content">

        <div className="entry-tab-title">
          {entry.title}
        </div>

        <div className="entry-tab-date">
          {new Date(entry.createdAt)
            .toLocaleDateString()}
        </div>

      </div>

    </div>
  );
}