import { useState } from "react";

const ATTRIBUTE_OPTIONS = ["Title", "Description", "Image", "List", "Chart"];

export default function AttributeSelector({ onAttributeAdd }) {
  const [availableAttributes, setAvailableAttributes] =
    useState(ATTRIBUTE_OPTIONS);
  const [selectedAttributes, setSelectedAttributes] = useState([]);

  // Handle drag start
  const handleDragStart = (e, attr) => {
    e.dataTransfer.setData("attribute", attr); // Store dragged attribute
  };

  // Handle drop in the layout
  const handleDrop = (e) => {
    e.preventDefault();
    const attr = e.dataTransfer.getData("attribute");
    if (attr) {
      setAvailableAttributes((prev) => prev.filter((item) => item !== attr)); // Remove from available attributes
      setSelectedAttributes((prev) => [...prev, attr]); // Track selected attributes
      onAttributeAdd(attr); // Add to layout
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Allow drop
  };

  // Handle export and clear
  const handleExport = () => {
    if (selectedAttributes.length > 0) {
      const data = JSON.stringify(selectedAttributes, null, 2);
      const blob = new Blob([data], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "attributes.json";
      link.click();
      URL.revokeObjectURL(url); // Clean up
    } else {
      alert("No attributes to export!");
    }
  };

  // Clear selected attributes
  const handleClear = () => {
    setAvailableAttributes([...ATTRIBUTE_OPTIONS]); // Reset available attributes
    setSelectedAttributes([]); // Clear selected attributes
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-md w-1/3">
      <h2 className="text-xl font-semibold mb-3">Add more Attributes</h2>
      <div
        className="border border-gray-300 p-4 space-y-2"
        onDrop={handleDrop} // Handle dropping of attributes
        onDragOver={handleDragOver}
        style={{ minHeight: "200px", backgroundColor: "#f8f9fa" }}
      >
        {availableAttributes.map((attr) => (
          <div
            key={attr}
            draggable
            onDragStart={(e) => handleDragStart(e, attr)} // Pass attribute during drag
            className="p-2 border border-gray-300 rounded bg-gray-100 cursor-pointer"
          >
            {attr}
          </div>
        ))}
      </div>
      <div className="mt-4 space-x-2"></div>
    </div>
  );
}
