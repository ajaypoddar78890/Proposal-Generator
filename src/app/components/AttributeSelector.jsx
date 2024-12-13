import { useState } from "react";

const ATTRIBUTE_OPTIONS = ["Title", "Description", "Image", "List", "Chart"];

export default function AttributeSelector({ onAttributeAdd }) {
  const [availableAttributes, setAvailableAttributes] =
    useState(ATTRIBUTE_OPTIONS);

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
      onAttributeAdd(attr); // Add to layout
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Allow drop
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-md w-1/3">
      <h2 className="text-xl font-semibold mb-3">Select the Category</h2>
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
    </div>
  );
}
