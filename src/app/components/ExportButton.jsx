import jsPDF from "jspdf";

export default function ExportButton({ attributes }) {
  const exportToPDF = () => {
    const pdf = new jsPDF();

    // Add content to the PDF
    pdf.setFontSize(16);
    pdf.text("Proposal Document", 10, 10); // Title

    attributes.forEach((attr, index) => {
      pdf.setFontSize(14);
      pdf.text(`${index + 1}. ${attr}`, 10, 20 + index * 10);
    });

    // Save the PDF
    pdf.save("proposal.pdf");
  };

  return (
    <div className="mt-4">
      <button
        onClick={exportToPDF}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Export as PDF
      </button>
    </div>
  );
}
