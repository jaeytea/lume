import React, { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import AddJournalModal from "../components/modals/AddJournalModal";
import JournalCard from "../components/JournalCard";
import EntryTab from "../components/EntryTab";
import { Edit } from "lucide-react";
import EditorPanel from "../components/EditorPanel";
import AddEntryModal from "../components/modals/AddEntryModal";
import Dashboard from "../components/Dashboard";
import GlobalLoader from "../components/GlobalLoader";
import Stars from "../components/Stars";

export default function HomePage() {
  const [showJournalModal, setShowJournalModal] = useState(false);
  const [journals, setJournals] = useState([]);
  const [selectedJournal, setSelectedJournal] = useState(null);
  const [selectedEntry, setSelectedEntry] = useState(null);

  const [showEntryModal, setShowEntryModal] = useState(false);

  const updateEntry = (updatedEntry) => {
    setJournals((prev) => {
      // Find the current selected journal ID from the previous state
      const selectedJournalId = prev.find((j) =>
        j.entries.some((e) => e.id === updatedEntry.id),
      )?.id;

      if (!selectedJournalId) return prev;

      const updatedJournals = prev.map((j) =>
        j.id === selectedJournalId
          ? {
              ...j,
              entries: j.entries.map((e) =>
                e.id === updatedEntry.id ? updatedEntry : e,
              ),
            }
          : j,
      );

      // sync selected journal
      const freshJournal = updatedJournals.find(
        (j) => j.id === selectedJournalId,
      );

      setSelectedJournal(freshJournal);
      setSelectedEntry(updatedEntry);
      return updatedJournals;
    });
  };

  useEffect(() => {
    localStorage.setItem("lume-journals", JSON.stringify(journals));
  }, [journals]);

  //load journals from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("lume-journals");

      if (saved) {
        setJournals(JSON.parse(saved));
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  //loaders
  const [screen, setScreen] = useState("dashboard");
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const navigateWithLoader = (target, text = "Opening your storybook...") => {
    setLoadingText(text);
    setLoading(true);

    setTimeout(() => {
      setScreen(target); // dashboard / journal
      setLoading(false);
    }, 3000);
  };
  // console.log(selectedJournal);
  return (
    <>
      <GlobalLoader loading={loading} text={loadingText} />
      <Stars active={loading} />
      <div id="app-screen" className="screen active">
        <TopBar />

        {/* <!-- DASHBOARD --> */}
        {screen === "dashboard" && !selectedJournal && (
          <Dashboard
            load={() => navigateWithLoader("journal", "Opening...")}
            journals={journals}
            setSelectedJournal={setSelectedJournal}
            setShowJournalModal={setShowJournalModal}
          />
        )}

        {/* <!-- JOURNAL VIEW --> */}
        {screen === "journal" && selectedJournal && (
          <div id="journal-view" className={selectedJournal ? "active" : ""}>
            <div className="journal-sidebar">
              <div className="sidebar-header">
                <button
                  className="sidebar-back-btn"
                  onClick={() => {
                    (setSelectedJournal(null),
                      setSelectedEntry(null),
                      navigateWithLoader(
                        "dashboard",
                        "Closing the journal...",
                      ));
                  }}
                >
                  ← Back to journals
                </button>
                <div className="sidebar-journal-title">
                  {selectedJournal.name}
                </div>
                <div className="sidebar-journal-meta">
                  {selectedJournal.entries.length} entries
                </div>
              </div>
              <div className="sidebar-new-entry">
                <button
                  className="new-entry-btn"
                  onClick={() => setShowEntryModal(true)}
                >
                  ✦ New Entry
                </button>
                {showEntryModal && (
                  <AddEntryModal
                    onClose={() => setShowEntryModal(false)}
                    onCreate={(entry) => {
                      setJournals((prev) => {
                        return prev.map((j) =>
                          j.id === selectedJournal.id
                            ? {
                                ...j,
                                entries: [...(j.entries || []), entry],
                              }
                            : j,
                        );
                      });

                      setSelectedJournal((prev) => {
                        const updated = {
                          ...prev,
                          entries: [...(prev.entries || []), entry],
                        };

                        return updated;
                      });

                      setSelectedEntry(entry);
                    }}
                  />
                )}
              </div>

              <div className="entries-list">
                {!selectedJournal?.entries?.length ? (
                  <div
                    style={{
                      padding: "20px 12px",
                      textAlign: "center",
                      color: "var(--ink-faded)",
                      fontStyle: "italic",
                      fontSize: "14px",
                    }}
                  >
                    No entries yet...
                    <br /> Start writing!
                  </div>
                ) : (
                  [...selectedJournal.entries]
                    .reverse()
                    .map((entry) => (
                      <EntryTab
                        key={entry.id}
                        entry={entry}
                        isActive={selectedEntry?.id === entry.id}
                        onOpen={() => setSelectedEntry(entry)}
                      />
                    ))
                )}
              </div>
            </div>
            <EditorPanel
              selectedEntry={selectedEntry}
              setSelectedEntry={setSelectedEntry}
              updateEntry={updateEntry}
            />
          </div>
        )}
      </div>
      {showJournalModal && (
        <AddJournalModal
          onClose={() => setShowJournalModal(false)}
          journals={journals}
          setJournals={setJournals}
        />
      )}
    </>
  );
}
