import { useState } from "react";

interface DisclosureProps {
  title: string;
  children: string;
}

export default function Disclosure({ title, children }: DisclosureProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentId = `disclosure-content-${title.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div>
      <button
        aria-expanded={isExpanded}
        aria-controls={contentId}
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "transparent",
          border: "none",
          cursor: "pointer",
          fontWeight: 600,
          fontSize: 16,
          padding: "8px 0",
        }}
      >
        <span style={{ display: "inline-block", transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)" }}>
          ▶
        </span>
        {title}
      </button>

      {isExpanded && (
        <div id={contentId} style={{ padding: "8px 0 8px 24px" }}>
          {children}
        </div>
      )}
    </div>
  );
}