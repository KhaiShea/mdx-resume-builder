import { useResumeStore } from './store/useResumeStore'
import ReactMarkdown from 'react-markdown'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function SortableSection({ id, children }: { id: string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        cursor-move rounded-md p-4 transition
        border border-transparent
        hover:border-blue-300 hover:shadow-md hover:scale-[1.01]
        ${isDragging ? 'animate-pulse opacity-70' : ''}
      `}
    >
      {children}
    </div>
  );
}

export default function App() {
  const {
    name,
    font,
    sections,
    setName,
    setFont,
    updateSection,
    reorderSections,
  } = useResumeStore()

  const sensors = useSensors(useSensor(PointerSensor))

  const handlePrint = () => window.print()

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 md:p-12">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        {/* PDF & Controls */}
        <div className="flex justify-end mb-4 print:hidden">
          <button
            onClick={handlePrint}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            Download PDF
          </button>
        </div>

        <div className="flex flex-col gap-4 mb-8 print:hidden">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-3xl font-bold border px-4 py-2 rounded"
            placeholder="Your Name"
          />

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

        <div className={`prose prose-neutral ${font}`}>
          <h1>{name}</h1>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={({ active, over }) => {
              if (active.id !== over?.id) {
                const oldIndex = sections.findIndex(s => s.id === active.id)
                const newIndex = sections.findIndex(s => s.id === over?.id)
                reorderSections(arrayMove(sections, oldIndex, newIndex))
              }
            }}
          >
            <SortableContext items={sections.map(s => s.id)} strategy={verticalListSortingStrategy}>
              {sections.map((section) => (
                <SortableSection key={section.id} id={section.id}>
                  <section className="transition-all duration-300 ease-in-out">
                    <h2>{section.title}</h2>
                    <textarea
                      className="w-full h-32 border rounded p-2 font-mono mb-2 print:hidden"
                      value={section.content}
                      onChange={(e) => updateSection(section.id, e.target.value)}
                    />
                    <ReactMarkdown>{section.content}</ReactMarkdown>
                  </section>
                </SortableSection>
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </main>
  )
}