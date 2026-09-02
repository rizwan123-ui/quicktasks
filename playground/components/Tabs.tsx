import { useState, useRef, KeyboardEvent } from "react";

interface Tab {
  id: string;
  label: string;
  content: string;
}

interface TabsProps {
  tabs: Tab[];
}

export default function Tabs({ tabs }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function handleKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    let newIndex = activeIndex;

    if (e.key === "ArrowRight") {
      newIndex = (activeIndex + 1) % tabs.length;
    } else if (e.key === "ArrowLeft") {
      newIndex = (activeIndex - 1 + tabs.length) % tabs.length;
    } else if (e.key === "Home") {
      newIndex = 0;
    } else if (e.key === "End") {
      newIndex = tabs.length - 1;
    } else {
      return;
    }

    e.preventDefault();
    setActiveIndex(newIndex);
    tabRefs.current[newIndex]?.focus();
  }

  return (
    <div>
      <div role="tablist" aria-label="Example tabs" style={{ display: "flex", gap: 4, borderBottom: "1px solid #ccc" }}>
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={activeIndex === index}
            aria-controls={`panel-${tab.id}`}
            tabIndex={activeIndex === index ? 0 : -1}
            onClick={() => setActiveIndex(index)}
            onKeyDown={handleKeyDown}
            style={{
              padding: "8px 16px",
              border: "none",
              borderBottom: activeIndex === index ? "2px solid #2563EB" : "2px solid transparent",
              background: "transparent",
              fontWeight: activeIndex === index ? 600 : 400,
              cursor: "pointer",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {tabs.map((tab, index) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          hidden={activeIndex !== index}
          tabIndex={0}
          style={{ padding: 16 }}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}