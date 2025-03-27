import { create } from 'zustand'

type Section = {
  id: string
  title: string
  content: string
}

type ResumeState = {
  name: string
  font: string
  sections: Section[]
  setName: (name: string) => void
  setFont: (font: string) => void
  updateSection: (id: string, content: string) => void
  reorderSections: (newOrder: Section[]) => void
}

export const useResumeStore = create<ResumeState>((set) => ({
  name: 'Your Name',
  font: 'font-sans',
  sections: [
    {
      id: 'skills',
      title: 'Skills',
      content: '- React\n- TypeScript\n- Tailwind CSS',
    },
    {
      id: 'experience',
      title: 'Experience',
      content: '**Frontend Intern** at CoolCompany (2023)\n\nBuilt a component library using React + Tailwind.',
    },
  ],
  setName: (name) => set({ name }),
  setFont: (font) => set({ font }),
  updateSection: (id, content) =>
    set((state) => ({
      sections: state.sections.map((s) =>
        s.id === id ? { ...s, content } : s
      ),
    })),
  reorderSections: (newOrder) => set({ sections: newOrder }),
}))
