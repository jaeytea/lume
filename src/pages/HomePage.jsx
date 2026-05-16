import React, { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import AddJournalModal from "../components/modals/AddJournalModal";
import RenameEntryModal from "../components/modals/RenameEntryModal";
import DeleteEntryModal from "../components/modals/DeleteEntryModal";
import JournalCard from "../components/JournalCard";
import EntryTab from "../components/EntryTab";
import { Delete, Edit } from "lucide-react";
import EditorPanel from "../components/EditorPanel";
import AddEntryModal from "../components/modals/AddEntryModal";
import Dashboard from "../components/Dashboard";
import GlobalLoader from "../components/GlobalLoader";
import Stars from "../components/Stars";
import ContextMenu from "../components/ContextMenu";
import { QUOTES } from "../utils/constants";

export default function HomePage({ isGuest, user, onLogout }) {
  const [showJournalModal, setShowJournalModal] = useState(false);
  const [journals, setJournals] = useState([]);
  const [selectedJournal, setSelectedJournal] = useState(null);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [showEntryModal, setShowEntryModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [entryToRename, setEntryToRename] = useState(null);
  const [notificationMsg, setNotificationMsg] = useState("");

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

  const handleShowRenameModal = (entry) => {
    setEntryToRename(entry);
    setShowRenameModal(true);
  };

  const handleConfirmRename = (newTitle) => {
    if (!entryToRename) return;

    const renamedEntry = {
      ...entryToRename,
      title: newTitle,
      updatedAt: Date.now(),
    };

    updateEntry(renamedEntry);
    setShowRenameModal(false);
    setEntryToRename(null);
  };

  const handleDeleteEntry = (entry) => {
    setJournals((prev) => {
      const updatedJournals = prev.map((j) =>
        j.id === selectedJournal.id
          ? {
              ...j,
              entries: j.entries.filter((e) => e.id !== entry.id),
            }
          : j,
      );

      // Sync selectedJournal with updated entries
      const freshJournal = updatedJournals.find(
        (j) => j.id === selectedJournal.id,
      );
      if (freshJournal) {
        setSelectedJournal(freshJournal);
      }

      if (selectedEntry?.id === entry.id) {
        setSelectedEntry(null);
      }

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

  //delete entry confirmation
  const [entryToDelete, setEntryToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Guest mode limits: 2 journals max, 1 entry per journal
  const GUEST_JOURNAL_LIMIT = 2;
  const GUEST_ENTRIES_PER_JOURNAL = 1;

  const canCreateJournal = () => {
    if (!isGuest) return true;
    return journals.length < GUEST_JOURNAL_LIMIT;
  };

  const canCreateEntry = () => {
    if (!isGuest) return true;
    if (!selectedJournal) return false;
    return selectedJournal.entries.length < GUEST_ENTRIES_PER_JOURNAL;
  };

  const handleShowDeleteModal = (entry) => {
    setEntryToDelete(entry);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (!entryToDelete) return;

    handleDeleteEntry(entryToDelete);
    setShowDeleteModal(false);
    setEntryToDelete(null);
  };

  return (
    <>
      <GlobalLoader loading={loading} text={loadingText} />
      {/* <Stars active={loading} /> */}
      <div id="app-screen" className="screen active">
        <TopBar user={user} isGuest={isGuest} onLogout={onLogout} />

        {/* <!-- DASHBOARD --> */}
        {screen === "dashboard" && !selectedJournal && (
          <Dashboard
            load={() => navigateWithLoader("journal", "Opening your storybook")}
            journals={journals}
            setSelectedJournal={setSelectedJournal}
            setShowJournalModal={() => {
              if (!canCreateJournal()) {
                alert("Guest mode: Maximum 2 journals allowed");
                return;
              }
              setShowJournalModal(true);
            }}
            isGuest={isGuest}
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
                    setSelectedJournal(null);
                    setSelectedEntry(null);
                    const randomQuote =
                      QUOTES[Math.floor(Math.random() * QUOTES.length)];

                    navigateWithLoader("dashboard", randomQuote);
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
                  onClick={() => {
                    if (!canCreateEntry()) {
                      alert("Guest mode: Maximum 1 entry per journal");
                      return;
                    }
                    setShowEntryModal(true);
                  }}
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
            <ContextMenu
              entries={selectedJournal?.entries || []}
              selectedJournal={selectedJournal}
              selectedEntry={selectedEntry}
              onShowRenameModal={handleShowRenameModal}
              onShowDeleteModal={handleShowDeleteModal}
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
      {showRenameModal && (
        <RenameEntryModal
          entry={entryToRename}
          onClose={() => {
            setShowRenameModal(false);
            setEntryToRename(null);
          }}
          onRename={handleConfirmRename}
        />
      )}
      {showDeleteModal && (
        <DeleteEntryModal
          entry={entryToDelete}
          onClose={() => {
            setShowDeleteModal(false);
            setEntryToDelete(null);
          }}
          onDelete={handleConfirmDelete}
        />
      )}
    </>
  );
}
