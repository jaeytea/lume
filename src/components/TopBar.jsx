import { useEffect, useRef, useState } from "react";

export default function TopBar({ user, isGuest, onLogout }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleSignOut = () => {
    if (onLogout) {
      onLogout();
    }
  };

  const userName = user?.name || "Guest";
  const userInitial = userName.charAt(0).toUpperCase();
  return (
    <div className="topbar">
      <div className="topbar-logo" id="logo-home">
        <span className="topbar-logo-icon">📖</span>
        <span className="topbar-logo-text">Lumé</span>
      </div>
      <div className="topbar-actions">
        {/* <button className="topbar-btn" id="topbar-new-journal">＋ New Journal</button> */}
        <div style={{ position: "relative" }}>
          <div className="user-avatar" id="user-avatar">
            <span id="user-initials" onClick={toggleDropdown}>
              {userInitial}
            </span>
          </div>
          {showDropdown && (
            <div
              className="user-dropdown open"
              ref={dropdownRef}
              id="user-dropdown"
            >
              <div className="dropdown-item" id="dd-name">
                👤 {userName} {isGuest && "(Guest)"}
              </div>
              <div
                style={{
                  height: "1px",
                  background: "var(--border)",
                  margin: "4px 0",
                }}
              ></div>
              <div className="dropdown-item" id="dd-home">
                🏠 Dashboard
              </div>
              <div
                className="dropdown-item danger"
                id="dd-logout"
                onClick={handleSignOut}
              >
                🚪 Sign out
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
