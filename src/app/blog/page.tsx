import { BlogCard, SectionHeading } from '@/components/umdac-ui'

const stories = [
  {
    title: 'From confusion to confidence: building a first data portfolio',
    category: 'Case Study',
    date: '12 August 2026',
    excerpt: 'A member-led reflection on learning the fundamentals, picking a project, and building momentum through small wins.',
    href: '/blog/from-confusion-to-confidence',
  },
  {
    title: 'What we learned from our AI and society panel',
    category: 'Workshop Recap',
    date: '21 September 2026',
    excerpt: 'Key takeaways from member questions, speaker advice, and the practical realities of AI adoption in society.',
    href: '/blog/ai-and-society-panel',
  },
  {
    title: 'Project sprint reflections: turning ideas into prototypes',
    category: 'Project Update',
    date: '5 October 2026',
    excerpt: 'A short highlight of how the team moved from problem framing to an early prototype and user feedback cycle.',
    href: '/blog/project-sprint-reflections',
  },
]

export default function BlogPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
        <SectionHeading
          eyebrow="Stories"
          title="Lessons, recaps, and case studies from the community"
          description="This archive is ready for future workshop recaps, project write-ups, and member reflections from UMDAC initiatives."
        />
      </section>

      <section className="mt-20">
        <div className="grid gap-6 lg:grid-cols-3">
          {stories.map((story) => (
            <BlogCard key={story.title} {...story} />
          ))}
        </div>
      </section>
    </main>
  )
}
