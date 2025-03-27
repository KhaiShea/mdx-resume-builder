import { useResumeStore } from './store/useResumeStore'
import ReactMarkdown from 'react-markdown'

export default function App() {
  const {
    name,
    font,
    sections,
    setName,
    setFont,
    updateSection,
  } = useResumeStore()

  const handlePrint = () => window.print()

  return (
    <main className="min-h-screen bg-white text-black p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        {/* Download PDF Button */}
        <div className="flex justify-end mb-4 print:hidden">
          <button
            onClick={handlePrint}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            Download PDF
          </button>
        </div>

        {/* Resume Controls */}
        <div className="flex flex-col gap-4 mb-8 print:hidden">
          {/* Name input */}
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-3xl font-bold border px-4 py-2 rounded"
            placeholder="Your Name"
          />

          {/* Font selector */}
          <select
            value={font}
            onChange={(e) => setFont(e.target.value)}
            className="border px-4 py-2 rounded"
          >
            <option value="font-sans">Sans (Inter)</option>
            <option value="font-serif">Serif (Roboto Serif)</option>
            <option value="font-mono">Mono (JetBrains Mono)</option>
          </select>
        </div>

        {/* Resume Preview */}
        <div className={`prose prose-neutral ${font}`}>
          <h1>{name}</h1>

          {sections.map((section) => (
            <section key={section.id}>
              <h2>{section.title}</h2>

              <textarea
                className="w-full h-32 border rounded p-2 font-mono mb-2 print:hidden"
                value={section.content}
                onChange={(e) =>
                  updateSection(section.id, e.target.value)
                }
              />

              <ReactMarkdown>{section.content}</ReactMarkdown>
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}
