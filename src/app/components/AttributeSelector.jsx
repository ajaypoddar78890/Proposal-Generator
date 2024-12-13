import { useState } from "react";

const ATTRIBUTE_OPTIONS = ["Title", "Description", "Image", "List", "Chart"];

export default function AttributeSelector({ onAdd }) {
  const [selected, setSelected] = useState("");

  const handleAddClick = () => {
    if (selected) {
      onAdd(selected);
      setSelected(""); // Reset selection
    }
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-md w-1/3">
      <h2 className="text-xl font-semibold mb-3">Add Attributes</h2>
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="p-2 border border-gray-300 rounded w-full mb-2"
      >
        <option value="">Select an Attribute</option>
        {ATTRIBUTE_OPTIONS.map((attr) => (
          <option key={attr} value={attr}>
            {attr}
          </option>
        ))}
      </select>
      <button
        onClick={handleAddClick}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add
      </button>
    </div>
  );
}
