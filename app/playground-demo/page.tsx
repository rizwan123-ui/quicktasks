"use client";

import { useState } from "react";
import Modal from "../../playground/components/Modal";
import Tabs from "../../playground/components/Tabs";
import Disclosure from "../../playground/components/Disclosure";

export default function PlaygroundDemoPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tabsData = [
    { id: "overview", label: "Overview", content: "This is the overview panel content." },
    { id: "details", label: "Details", content: "This is the details panel content." },
    { id: "settings", label: "Settings", content: "This is the settings panel content." },
  ];

  return (
    <main style={{ padding: 32, maxWidth: 640, margin: "0 auto" }}>
      <h1>Accessibility Playground</h1>

      <section style={{ marginBottom: 40 }}>
        <h2>Modal Dialog</h2>
        <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Example Modal">
          <p>This is the modal content. Try pressing Tab to see focus stay trapped, and Escape to close.</p>
          <input type="text" placeholder="Test input" style={{ marginTop: 8 }} />
        </Modal>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2>Tabs</h2>
        <Tabs tabs={tabsData} />
      </section>

      <section>
        <h2>Disclosure</h2>
        <Disclosure title="Click to expand">
          This is the hidden content that appears when the disclosure is expanded.
        </Disclosure>
      </section>
    </main>
  );
}