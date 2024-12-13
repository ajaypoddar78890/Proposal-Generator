import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function ProposalLayout({ attributes }) {
  const printRef = useRef(null);
  const backgroundImageUrl = "/assets/layout.webp";

  const exportToPDF = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element, {
      useCORS: true, // Ensures cross-origin images are rendered
      scale: 2, // Increases resolution
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("portrait", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("proposal.pdf");
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-md w-2/3">
      <h2 className="text-xl font-semibold mb-3">Proposal Preview</h2>
      <div
        ref={printRef}
        className="border border-gray-300 p-4 relative mylayout"
        style={{
          width: "210mm",
          height: "297mm",
          backgroundImage: `url(${backgroundImageUrl})`, // Add background image
          backgroundSize: "cover", // Ensure it covers the entire area
          backgroundRepeat: "no-repeat", // Prevent tiling
          backgroundPosition: "center", // Center the image
        }}
      >
        {attributes.map((attr, index) => (
          <div
            key={index}
            className="p-2 mt-52 border border-dashed border-gray-400 bg-white bg-opacity-80 rounded-md"
          >
            <strong>{attr}</strong>: This is a placeholder for {attr}.
          </div>
        ))}
      </div>
      <button
        onClick={exportToPDF}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        Export to PDF
      </button>
    </div>
  );
}
