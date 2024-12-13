export default function ProposalLayout({ attributes }) {
    return (
      <div className="bg-white p-4 shadow-md rounded-md w-2/3">
        <h2 className="text-xl font-semibold mb-3">Proposal Preview</h2>
        <div className="border border-gray-300 p-4" style={{ width: "210mm", height: "297mm" }}>
          {attributes.map((attr, index) => (
            <div
              key={index}
              className="p-2 mb-2 border border-dashed border-gray-400"
            >
              <strong>{attr}</strong>: This is a placeholder for {attr}.
            </div>
          ))}
        </div>
      </div>
    );
  }
  