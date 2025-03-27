import { useResumeStore } from './store/useResumeStore'
import ReactMarkdown from 'react-markdown'

export default function App() {
  const { name, font, sections } = useResumeStore()

  return (
    <main className={`min-h-screen bg-white text-black ${font} p-6 md:p-12`}>
      <div className="max-w-3xl mx-auto prose prose-neutral">
        <h1>{name}</h1>

        {sections.map((section) => (
          <section key={section.id}>
            <h2>{section.title}</h2>
            <ReactMarkdown>{section.content}</ReactMarkdown>
          </section>
        ))}
      </div>
    </main>
  )
}
