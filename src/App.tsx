import Resume from './resume.mdx'

export default function App() {
  const handlePrint = () => window.print()

  return (
    <main className="min-h-screen bg-white text-black font-sans p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        {/* Download PDF Button (hidden on print) */}
        <div className="flex justify-end mb-4 print:hidden">
          <button
            onClick={handlePrint}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            Download PDF
          </button>
        </div>

        {/* Resume Content */}
        <div className="prose prose-neutral">
          <Resume />
        </div>
      </div>
    </main>
  )
}