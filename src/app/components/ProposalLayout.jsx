import { useState, useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import AttributeSelector from "./AttributeSelector";

export default function ProposalLayout() {
  const [items, setItems] = useState([]); // Stores added attributes
  const printRef = useRef(null);

  // Handle drag-and-drop events
  const handleDragStart = (e, attr) => {
    e.dataTransfer.setData("attribute", attr); // Store dragged attribute
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const attr = e.dataTransfer.getData("attribute"); // Retrieve dragged attribute
    if (attr) {
      setItems((prev) => [...prev, attr]); // Add attribute to layout
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Allow drop
  };

  // Export layout to PDF with background image
  const exportToPDF = () => {
    const layoutContent = printRef.current;

    // Use html2canvas to capture the layout content (including background)
    html2canvas(layoutContent).then((canvas) => {
      const doc = new jsPDF();

      // Add the captured canvas as an image to the PDF
      doc.addImage(canvas.toDataURL("image/png"), "PNG", 10, 10, 180, 250); // Adjust position and size

      // Save the generated PDF
      doc.save("proposal-layout.pdf");
    });
  };

  return (
    <div className="flex space-x-4">
      {/* Attribute Selector */}
      {/* <AttributeSelector onDragStart={handleDragStart} /> */}

      {/* Proposal Layout */}
      <div className="bg-white p-4 shadow-md rounded-md w-2/2">
        <h2 className="text-xl font-semibold mb-3">Proposal Layout</h2>
        <div
          ref={printRef}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border border-gray-300 p-4 relative mylayout space-y-4"
          style={{
            width: "210mm",
            height: "297mm",
            backgroundColor: "#f8f9fa",
            backgroundImage: "url('/assets/layout.webp')", // Ensure the background image is set correctly
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              draggable // Make the added items draggable for reuse
              onDragStart={(e) => handleDragStart(e, item)}
              className="p-4 border border-dashed border-gray-400 bg-white bg-opacity-80 rounded-md cursor-move mt-52"
            >
              <strong>{item}</strong>: This is a placeholder for {item}.
            </div>
          ))}
        </div>
      </div>

     
       
    </div>
  );
}
