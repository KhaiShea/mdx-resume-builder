import Resume from './resume.mdx'

export default function App() {
  return (
    <main className="min-h-screen bg-white text-black font-sans p-6 md:p-12">
      <div className="max-w-3xl mx-auto prose prose-neutral">
        <Resume />
      </div>
    </main>
  )
}