import ResumeCanvas from './ResumeCanvas'

export default function ResumeBuilderLayout() {
  return (
    <div className="h-screen w-screen grid grid-cols-[280px_1fr_320px] bg-gray-100 text-gray-900 font-sans">
      {/* Sidebar (left) */}
      <aside className="p-6 border-r border-gray-300 bg-white">
        <h2 className="font-bold text-lg mb-4">Components</h2>
        <ul className="space-y-2 text-sm text-blue-600">
          <li className="cursor-pointer hover:underline">Heading</li>
          <li className="cursor-pointer hover:underline">Paragraph</li>
          <li className="cursor-pointer hover:underline">Skills List</li>
          <li className="cursor-pointer hover:underline">Experience Item</li>
        </ul>
      </aside>

      {/* Resume Canvas (center) */}
      <main className="p-10 overflow-y-auto bg-white rounded-xl shadow-md m-6">
        <ResumeCanvas />
      </main>

      {/* Style Controls (right) */}
      <aside className="p-6 border-l border-gray-300 bg-white">
        <h2 className="font-bold text-lg mb-4">Style Panel</h2>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Font Size</label>
          <select className="w-full border rounded px-2 py-1 text-sm">
            <option>Small</option>
            <option>Medium</option>
            <option>Large</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Text Style</label>
          <div className="flex space-x-2">
            <button className="border px-2 py-1 text-sm font-bold">B</button>
            <button className="border px-2 py-1 text-sm italic">I</button>
            <button className="border px-2 py-1 text-sm underline">U</button>
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Alignment</label>
          <div className="flex space-x-2">
            <button className="border px-2 py-1 text-sm">Left</button>
            <button className="border px-2 py-1 text-sm">Center</button>
            <button className="border px-2 py-1 text-sm">Right</button>
          </div>
        </div>
      </aside>
    </div>
  )
}
