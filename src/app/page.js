"use client"

import { useState } from "react";
import AttributeSelector from "./components/AttributeSelector";
import ProposalLayout from "./components/ProposalLayout";
import ExportButton from "./components/ExportButton";

export default function Home() {
  const [attributes, setAttributes] = useState([]);

  const handleAddAttribute = (attribute) => {
    setAttributes((prev) => [...prev, attribute]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Next.js Proposal Generator</h1>
      <div className="flex gap-4">
        <AttributeSelector onAdd={handleAddAttribute} />
        <ProposalLayout attributes={attributes} />
      </div>
      <ExportButton attributes={attributes} />
    </div>
  );
}
