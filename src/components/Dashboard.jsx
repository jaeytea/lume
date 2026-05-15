import JournalCard from "./JournalCard";
import { getWordCount, calcStreak } from "../utils/stats";

export default function Dashboard({
  load,
  journals,
  setSelectedJournal,
  setShowJournalModal,
}) {
  const totalEntries = journals.reduce((a, j) => a + j.entries.length, 0);

  const totalWords = journals.reduce(
    (a, j) => a + j.entries.reduce((b, e) => b + getWordCount(e.content), 0),
    0,
  );

  const streak = calcStreak(journals);

  return (
    <div id="dashboard-view" className="active">
      <div className="dashboard-greeting">
        <h1 id="greeting-text">Good morning ✨</h1>
        <p id="greeting-sub">What chapter will you write today?</p>
      </div>
      <div className="dashboard-divider"></div>
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-num" id="stat-journals">
            {journals.length}
          </div>
          <div className="stat-label">Journals</div>
        </div>
        <div className="stat-card">
          <div className="stat-num" id="stat-entries">
            {totalEntries}
          </div>
          <div className="stat-label">Entries written</div>
        </div>
        <div className="stat-card">
          <div className="stat-num" id="stat-streak">
            {streak}
          </div>
          <div className="stat-label">Day streak 🔥</div>
        </div>
        <div className="stat-card">
          <div className="stat-num" id="stat-words">
            {totalWords}
          </div>
          <div className="stat-label">Words penned</div>
        </div>
      </div>
      <div className="section-header">
        <div className="section-title">Your Journals</div>
        <button
          className="add-journal-btn"
          onClick={() => setShowJournalModal(true)}
        >
          ＋ New Journal
        </button>
      </div>
      <div id="journals-container">
        {!journals.length ? (
          <div className="empty-state fade-in">
            <div className="empty-book">📖</div>

            <h3>Your shelf is empty</h3>

            <p>Every great story starts with the first journal...</p>
          </div>
        ) : (
          <div className="journals-grid">
            {journals.map((journal) => (
              <JournalCard
                key={journal.id}
                journal={journal}
                onOpen={() => {
                  setSelectedJournal(journal);
                  load();
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
