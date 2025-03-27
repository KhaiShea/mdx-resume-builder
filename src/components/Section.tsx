type SectionProps = {
    title: string
    children: React.ReactNode
  }
  
  export default function Section({ title, children }: SectionProps) {
    return (
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2 border-b pb-1">{title}</h2>
        <div className="space-y-2">{children}</div>
      </section>
    )
  }  