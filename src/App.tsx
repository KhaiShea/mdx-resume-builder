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

  return (
    <main className={`min-h-screen bg-white text-black ${font} p-6 md:p-12`}>
      <div className="max-w-3xl mx-auto">
        {/* Editable Controls */}
        <div className="flex flex-col gap-4 mb-8 print:hidden">
          {/* Name Input */}
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-3xl font-bold border px-4 py-2 rounded"
            placeholder="Your Name"
          />

          {/* Font Selector */}
          <select
            value={font}
            onChange={(e) => setFont(e.target.value)}
            className="border px-4 py-2 rounded"
          >
            <option value="font-sans">Sans</option>
            <option value="font-serif">Serif</option>
            <option value="font-mono">Monospace</option>
          </select>
        </div>

        {/* Resume Preview */}
        <div className="prose prose-neutral">
          <h1>{name}</h1>

          {sections.map((section) => (
            <section key={section.id}>
              <h2>{section.title}</h2>

              {/* Markdown Editor */}
              <textarea
                className="w-full h-32 border rounded p-2 font-mono mb-2 print:hidden"
                value={section.content}
                onChange={(e) =>
                  updateSection(section.id, e.target.value)
                }
              />

              {/* Live Preview */}
              <ReactMarkdown>{section.content}</ReactMarkdown>
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}
