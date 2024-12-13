import { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import AttributeSelector from "./AttributeSelector";

export default function ProposalLayout() {
  const [items, setItems] = useState([]);
  const printRef = useRef(null);
  const backgroundImageUrl = "/assets/layout.webp";

  // Handle drag-and-drop events
  const handleDragStart = (e, attr) => {
    e.dataTransfer.setData("attribute", attr);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const attr = e.dataTransfer.getData("attribute");
    if (attr) {
      setItems((prev) => [...prev, attr]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Export to PDF
  const exportToPDF = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element, { useCORS: true, scale: 1.5 });
    const imgData = canvas.toDataURL("image/jpeg", 0.7);
    const pdf = new jsPDF("portrait", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("proposal.pdf");
  };

  return (
    <div className="flex space-x-4">
      {/* <AttributeSelector onDragStart={handleDragStart} /> */}
      <div className="bg-white p-4 shadow-md rounded-md w-2/2">
        <h2 className="text-xl font-semibold mb-3">Proposal Preview</h2>
        <div
          ref={printRef}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border border-gray-300  p-4 relative mylayout space-y-4"
          style={{
            width: "210mm",
            height: "297mm",
            backgroundImage: `url(${backgroundImageUrl})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="p-4 border mt-52 border-dashed border-gray-400 bg-white bg-opacity-80 rounded-md"
            >
              <strong>{item}</strong>: This is a placeholder for {item}.
            </div>
          ))}
        </div>

        {/* Place the Export to PDF button at the end */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={exportToPDF}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Export to PDF
          </button>
        </div>
      </div>
    </div>
  );
}
