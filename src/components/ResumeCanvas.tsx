import { useEffect, useRef } from 'react'
import { useResumeStore } from '../store/useResumeStore'
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
import ReactMarkdown from 'react-markdown'

function SortableSection({ id, children }: { id: string; children: React.ReactNode }) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative rounded-md border border-gray-300 bg-white p-4 mb-4"
    >
      {/* Drag handle in the top-right */}
      <button
        {...attributes}
        {...listeners}
        className="absolute top-2 right-2 text-gray-400 hover:text-blue-500 cursor-move"
        title="Drag to reorder"
      >
        ⠿
      </button>

      {children}
    </div>
  )
}

export default function ResumeCanvas() {
  const {
    name,
    font,
    sections,
    setName,
    updateSection,
    reorderSections,
  } = useResumeStore()

  const sensors = useSensors(useSensor(PointerSensor))

  return (
    <div className={`prose prose-neutral ${font}`}>
      {/* Editable name input */}
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="text-3xl font-bold mb-2 border-b w-full outline-none focus:ring-0 focus:border-blue-500"
        placeholder="Your Name"
      />

      <h1 className="text-3xl font-bold mt-2 text-gray-800">{name}</h1>

      {/* Drag-and-drop sections */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={({ active, over }) => {
          if (active.id !== over?.id) {
            const oldIndex = sections.findIndex((s) => s.id === active.id)
            const newIndex = sections.findIndex((s) => s.id === over?.id)
            reorderSections(arrayMove(sections, oldIndex, newIndex))
          }
        }}
      >
        <SortableContext
          items={sections.map((s) => s.id)}
          strategy={verticalListSortingStrategy}
        >
          {sections.map((section) => {
            const divRef = useRef<HTMLDivElement>(null)

            useEffect(() => {
              if (
                divRef.current &&
                divRef.current.innerText !== section.content
              ) {
                divRef.current.innerText = section.content
              }
            }, [section.content])

            return (
              <SortableSection key={section.id} id={section.id}>
                <section className="transition-all duration-300 ease-in-out">
                  <h2 className="text-xl font-semibold mb-2">{section.title}</h2>

                  {/* Editable content */}
                  <div
                    ref={divRef}
                    contentEditable
                    suppressContentEditableWarning
                    className="w-full min-h-[3rem] border rounded p-3 font-mono mb-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition print:hidden"
                    onInput={() => {
                      if (divRef.current) {
                        updateSection(section.id, divRef.current.innerText)
                      }
                    }}
                  />

                  {/* Live Markdown Preview (non-editable) */}
                  <div className="text-gray-700 text-sm">
                    <ReactMarkdown>{section.content}</ReactMarkdown>
                  </div>

                  {/* Print-only markdown */}
                  <div className="hidden print:block">
                    <ReactMarkdown>{section.content}</ReactMarkdown>
                  </div>
                </section>
              </SortableSection>
            )
          })}
        </SortableContext>
      </DndContext>
    </div>
  )
}
