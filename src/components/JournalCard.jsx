export default function JournalCard({ journal, onOpen }) {

  return (
    <div className="book-card" onDoubleClick={onOpen}>

      <div
        className="book-3d"
        style={{
          background: journal.color.bg,
        }}
      >

        <div
          className="book-spine"
          style={{
            background: journal.color.bg,
          }}
        ></div>

        <div
          className="book-cover"
          style={{
            color: journal.color.text,
          }}
        >

          <div className="book-cover-ornament">
            {journal.emoji}
          </div>

          <div className="book-title-text">
            {journal.name}
          </div>

          <div className="book-entry-count">
            {journal.entries.length} entries
          </div>

        </div>
      </div>

      <div className="book-hint">
        Double-click to open
      </div>

    </div>
  );
}