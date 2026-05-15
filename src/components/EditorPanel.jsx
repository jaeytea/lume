import { useEffect, useState, useRef } from "react";

export default function EditorPanel({
  selectedEntry,
  setSelectedEntry,
  updateEntry,
}) {
  const getWordCount = (text = "") => {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  };
  const editorRef = useRef(null);

  useEffect(() => {
    if (!selectedEntry) return;
    if (editorRef.current) {
      editorRef.current.innerHTML = selectedEntry?.content || "";
    }
  }, [selectedEntry?.id]);

  //autosave
  const [saveStatus, setSaveStatus] = useState("saved");
  useEffect(() => {
    if (!selectedEntry) return;

    if (saveStatus !== "unsaved") return;

    setSaveStatus("saving");

    const timer = setTimeout(() => {
      updateEntry(selectedEntry);
      setSaveStatus("saved");
    }, 6000);

    return () => clearTimeout(timer);
  }, [selectedEntry, saveStatus]);

  const handleSave = () => {
    if (!selectedEntry) return;

    setSaveStatus("saving");

    updateEntry({
      ...selectedEntry,
      updatedAt: Date.now(),
    });

    setTimeout(() => {
      setSaveStatus("saved");
    }, 300);
  };

  //formatting text

  const format = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const insertHR = () => {
    document.execCommand(
      "insertHTML",
      false,
      `<hr style="border:none;border-top:1px solid var(--gold);margin:24px 0;opacity:0.5;"/>`,
    );
  };
  const insertQuote = () => {
    document.execCommand(
      "insertHTML",
      false,
      `<blockquote style="border-left:3px solid var(--gold);margin:16px 0;padding:8px 16px;font-style:italic;">
      Your quote here...
    </blockquote>`,
    );
  };
  const insertDate = () => {
    const d = new Date().toLocaleDateString();

    document.execCommand("insertHTML", false, `<em>${d}</em>&nbsp;`);
  };

  return (
    <div className="editor-area">
      {!selectedEntry ? (
        <div className="editor-empty-state" id="editor-empty">
          <div className="icon">🪶</div>
          <h3>Select an entry to begin</h3>
          <p>Or create a new entry using the button on the left</p>
        </div>
      ) : (
        <div
          id="editor-panel"
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            overflow: "hidden",
          }}
        >
          <div className="editor-toolbar">
            <div className="toolbar-group">
              <button
                className="tool-btn"
                title="Bold"
                onClick={() => format("bold")}
              >
                <b>B</b>
              </button>
              <button
                className="tool-btn"
                id="tb-italic"
                title="Italic"
                onClick={() => format("italic")}
              >
                <i>I</i>
              </button>
              <button
                className="tool-btn"
                id="tb-underline"
                title="Underline"
                onClick={() => format("underline")}
              >
                <u>U</u>
              </button>
              <button
                className="tool-btn"
                id="tb-strike"
                title="Strike"
                onClick={() => format("strikeThrough")}
              >
                S̶
              </button>
            </div>
            <div className="toolbar-group">
              <button
                className="tool-btn"
                id="tb-h2"
                title="Heading"
                onClick={() => format("formatBlock", "h2")}
              >
                H₁
              </button>
              <button
                className="tool-btn"
                id="tb-h3"
                title="Subheading"
                onClick={() => format("formatBlock", "h3")}
              >
                H₂
              </button>
              <button
                className="tool-btn"
                id="tb-ul"
                title="List"
                onClick={() => format("insertUnorderedList")}
              >
                ≡
              </button>
              <button
                className="tool-btn"
                id="tb-ol"
                title="Numbered"
                onClick={() => format("insertOrderedList")}
              >
                ①
              </button>
            </div>
            <div className="toolbar-group">
              <button
                className="tool-btn"
                id="tb-quote"
                title="Quote"
                onClick={() => insertQuote()}
              >
                ❝
              </button>
              <button
                className="tool-btn"
                id="tb-hr"
                title="Divider"
                onClick={() => insertHR()}
              >
                —
              </button>
            </div>
            <div className="toolbar-group">
              <button
                className="tool-btn"
                id="tb-image"
                title="Insert image"
                // onClick={() => format("insertImage")}
              >
                🖼
              </button>
              <button
                className="tool-btn"
                id="tb-date"
                title="Insert date"
                onClick={() => insertDate()}
              >
                📅
              </button>
            </div>
          </div>
          <input
            className="editor-entry-title-inp"
            value={selectedEntry?.title || ""}
            onChange={(e) => {
              setSaveStatus("unsaved");
              setSelectedEntry({
                ...selectedEntry,
                title: e.target.value,
                updatedAt: Date.now(),
              });
            }}
          />{" "}
          <div className="editor-meta" id="editor-meta">
            Written on{" "}
            {selectedEntry?.createdAt
              ? new Date(selectedEntry.createdAt).toLocaleDateString()
              : "—"}
          </div>
          <div className="editor-content-wrap">
            <div
              ref={editorRef}
              className="editor-content"
              data-placeholder="Begin your story here... Let the words flow like ink on parchment."
              contentEditable
              suppressContentEditableWarning
              onInput={(e) => {
                setSaveStatus("unsaved");
                setSelectedEntry({
                  ...selectedEntry,
                  content: e.currentTarget.innerHTML,
                  updatedAt: Date.now(),
                });
              }}
            ></div>
          </div>
          <div className="editor-bottom">
            <div className="autosave-indicator">
              <div className="autosave-dot" id="as-dot"></div>
              <span id="as-text">
                {saveStatus === "saved" && "All changes saved"}
                {saveStatus === "saving" && "Saving..."}
                {saveStatus === "unsaved" && "Unsaved changes"}
              </span>
            </div>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <span
                id="word-count"
                style={{
                  fontSize: "13px",
                  color: "var(--ink-faded)",
                  fontStyle: "italic",
                }}
              >
                {getWordCount(
                  selectedEntry?.content?.replace(/<[^>]*>/g, "") || "",
                )}{" "}
                words
              </span>
              <button className="save-btn" onClick={handleSave}>
                💾 Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
