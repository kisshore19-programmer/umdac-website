import { FaqItem, SectionHeading } from '@/components/umdac-ui'

const faqs = [
  {
    question: 'Does UMDAC have any annual events?',
    answer: 'Yes. UMDAC runs recurring events throughout the year, including onboarding sessions, workshops, project showcases, leadership talks, and annual community events that bring members together.',
  },
  {
    question: 'What are the benefits of joining UMDAC?',
    answer: 'Members gain access to learning opportunities, practical projects, mentorship, networking, and a supportive community focused on data, analytics, and AI growth.',
  },
  {
    question: 'What does UMDAC do?',
    answer: 'UMDAC helps students build technical skills through Data Debut, DataDev, and Data@ activities, combining education, projects, and industry exposure in one student community.',
  },
  {
    question: 'Who can participate in UMDAC events?',
    answer: 'Most UMDAC events are open to UM students and interested members from the wider student community, while some sessions may be tailored for beginner, intermediate, or project-focused participants.',
  },
  {
    question: 'How can I register for events?',
    answer: 'You can browse upcoming events on the Events page, review details, and register through the event registration flow when the event is open for sign-ups.',
  },
  {
    question: 'Do I need to be an expert in data or AI to join?',
    answer: 'No. UMDAC welcomes students at different stages of learning. Beginners are encouraged to start with foundational events and workshops, while more experienced members can take on project work and leadership roles.',
  },
]

export default function FaqPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions students usually ask"
          description="A quick overview of the club, its events, and the kind of experience members can expect."
        />

        <div className="mt-8 space-y-4">
          {faqs.map((faq) => (
            <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </section>
    </main>
  )
}
