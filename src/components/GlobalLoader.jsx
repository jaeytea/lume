export default function GlobalLoader({ loading, text }) {
  if (!loading) return null;

  return (
    <div id="global-loader">
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "130px",
          height: "130px",
        }}
      >
        <div className="loader-sparkles">
          <div className="sparkle"></div>
          <div className="sparkle"></div>
          <div className="sparkle"></div>
          <div className="sparkle"></div>
          <div className="sparkle"></div>
          <div className="sparkle"></div>
        </div>

        <div className="loader-book">
          {
            <svg
              viewBox="0 0 90 70"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="10"
                y="6"
                width="70"
                height="58"
                rx="4"
                fill="#F5EDD8"
                stroke="#C9A84C"
                strokeWidth="2"
              />
              <rect
                x="10"
                y="6"
                width="70"
                height="8"
                rx="2"
                fill="#C9A84C"
                opacity="0.6"
              />
              <line
                x1="14"
                y1="24"
                x2="40"
                y2="24"
                stroke="#8B6B55"
                strokeWidth="1.2"
                opacity="0.6"
              />
              <line
                x1="14"
                y1="31"
                x2="40"
                y2="31"
                stroke="#8B6B55"
                strokeWidth="1.2"
                opacity="0.6"
              />
              <line
                x1="14"
                y1="38"
                x2="40"
                y2="38"
                stroke="#8B6B55"
                strokeWidth="1.2"
                opacity="0.6"
              />
              <line
                x1="14"
                y1="45"
                x2="34"
                y2="45"
                stroke="#8B6B55"
                strokeWidth="1.2"
                opacity="0.6"
              />
              <line
                x1="50"
                y1="24"
                x2="76"
                y2="24"
                stroke="#8B6B55"
                strokeWidth="1.2"
                opacity="0.6"
              />
              <line
                x1="50"
                y1="31"
                x2="76"
                y2="31"
                stroke="#8B6B55"
                strokeWidth="1.2"
                opacity="0.6"
              />
              <line
                x1="50"
                y1="38"
                x2="76"
                y2="38"
                stroke="#8B6B55"
                strokeWidth="1.2"
                opacity="0.6"
              />
              <line
                x1="50"
                y1="45"
                x2="70"
                y2="45"
                stroke="#8B6B55"
                strokeWidth="1.2"
                opacity="0.6"
              />
              <line
                x1="45"
                y1="6"
                x2="45"
                y2="64"
                stroke="#C9A84C"
                strokeWidth="2.5"
              />
              <text
                x="45"
                y="62"
                textAnchor="middle"
                fontSize="10"
                fill="#C9A84C"
              >
                ✦
              </text>
            </svg>
          }
        </div>
      </div>
      <div className="loader-text">{text}</div>
    </div>
  );
}
