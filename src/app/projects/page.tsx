import { ProjectCard, SectionHeading } from '@/components/umdac-ui'

const projects = [
  {
    title: 'Campus Energy Forecast',
    description: 'A student-led data story exploring energy demand and consumption patterns across campus facilities.',
    tags: ['Data Analytics', 'Visualization', 'Programming'],
    href: '/projects/campus-energy-forecast',
  },
  {
    title: 'AI Research Matchmaker',
    description: 'An intelligent project recommendation concept that helps students find suitable research and project opportunities.',
    tags: ['AI', 'ML', 'NLP'],
    href: '/projects/ai-research-matchmaker',
  },
  {
    title: 'Sustainable Mobility Dashboard',
    description: 'A dashboard project focused on transport trends, campus mobility patterns, and policy-informed insights.',
    tags: ['Visualization', 'Data Analytics', 'AI'],
    href: '/projects/sustainable-mobility-dashboard',
  },
]

export default function ProjectsPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
        <SectionHeading
          eyebrow="Projects"
          title="A showcase of student-led data and AI work"
          description="This space is designed for future project sharing, case study writing, and public-facing innovation highlights from the UMDAC community."
        />
      </section>

      <section className="mt-20">
        <div className="grid gap-6 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </section>
    </main>
  )
}
