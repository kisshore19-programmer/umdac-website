'use client'

import { useState } from 'react'

type Member = { name: string; role: string }
type DepartmentGroup = { department: string; members: Member[] }

const committeeByDepartment: DepartmentGroup[] = [
  {
    department: 'High Committee',
    members: [
      { name: 'Amer Hakim bin Ahmad Kamal Ariffin', role: 'President' },
      { name: 'Sanjeevan A/L Kumareson', role: 'Vice President' },
      { name: 'Harshini A/P Kumara Vell', role: 'Secretary' },
      { name: 'Narmathaa A/P Selvakumaran', role: 'Vice Secretary' },
      { name: 'Tronan A/L Rejendran', role: 'Treasurer' },
      { name: 'Nia Zahra binti Shamsul Muhardzi', role: 'Vice Treasurer' },
    ],
  },
  {
    department: 'Creative & Marketing',
    members: [
      { name: 'Wong Lin Wei', role: 'Director' },
      { name: 'Yeong Kai Wen', role: 'Vice Director' },
      { name: 'Lau Hiap Meng', role: 'Creative Design Associate' },
      { name: 'Kam Pue Shan', role: 'Creative Design Associate' },
      { name: 'Eireen Syafeeya Binti Efizan', role: 'Creative Design Associate' },
      { name: 'Tahzib Farhan', role: 'Creative Design Associate' },
      { name: 'Nur Fatnin Jazmina Binti Jimmy', role: 'Creative Design Associate' },
      { name: 'Liaw Kai Ze', role: 'Creative Design Associate' },
      { name: 'Naura Aliyyah Arif', role: 'Creative Design Associate' },
      { name: 'Lim Jia Qian', role: 'Creative Design Associate' },
      { name: 'Khe Jia Kang', role: 'Marketing Associate' },
      { name: 'Lean Wen Jie', role: 'Marketing Associate' },
      { name: 'Muhammad Fadil Saputra Wijaya', role: 'Marketing Associate' },
      { name: 'Wong E Jeff Japheth', role: 'Marketing Associate' },
    ],
  },
  {
    department: 'Engagement & Development',
    members: [
      { name: 'Tan Yi Jing', role: 'Director' },
      { name: 'Cyrus Lau Lik Hang', role: 'Strategy Support Associate' },
      { name: 'Yamuna A/P Palani', role: 'Strategy Support Associate' },
      { name: 'Tang Yong Chun', role: 'Engagement Programmes Associate' },
      { name: 'Aleeya Nazneen Binti Ahmed Nazri', role: 'Engagement Programmes Associate' },
      { name: 'Jasmine Chin Ying Hui', role: 'Engagement Programmes Associate' },
    ],
  },
  {
    department: 'Strategic Partnership & Relations',
    members: [
      { name: 'Nazhan Fahim Bin Mohammad Najib', role: 'Director' },
      { name: 'Muhammad Adam Harith Bin Mohd Zaki', role: 'Strategic Partnership & Relations Associate' },
      { name: 'Amirul Hisyam Bin Amir Ruddin', role: 'Strategic Partnership & Relations Associate' },
      { name: 'Iman Amirul Hakim Bin Badlishah', role: 'Strategic Partnership & Relations Associate' },
      { name: 'Lee Xin Yi', role: 'Strategic Partnership & Relations Associate' },
      { name: 'Elvira Natasha Neilson', role: 'Strategic Partnership & Relations Associate' },
    ],
  },
  {
    department: 'Logistics & Execution',
    members: [
      { name: 'Mohammad Farhad Zidane Bin Mohammad Firdaus', role: 'Director' },
      { name: 'Chin Kin Hiung', role: 'Logistics Associate' },
      { name: 'Muhammad Fathi Nuqman Bin Abd. Hakim', role: 'Logistics Associate' },
      { name: 'Mahardika Malik', role: 'Logistics Associate' },
      { name: 'Aly Zakki Yaza', role: 'Logistics Associate' },
      { name: 'Ng Yue Qhi', role: 'Logistics Associate' },
      { name: 'Aiman Nur Haikal Bin Norazmi', role: 'Logistics Associate' },
      { name: 'Muhammad Naqiuddin Bin Jani', role: 'Logistics Associate' },
    ],
  },
  {
    department: 'Event Management',
    members: [
      { name: 'Nur Farhanah Binti Mohamad Said', role: 'Director' },
      { name: 'Isaac Toh Zhen Yong', role: 'PnP Associate' },
      { name: 'Syed Azhar Bin Syed Jakirul Alam', role: 'PnP Associate' },
      { name: 'Lim Jie Shin', role: 'PnP Associate' },
      { name: 'Joshua Law Tiew Lung', role: 'PnP Associate' },
      { name: 'Husna Wajihah Binti Abu Talib', role: 'Event Operations Associate' },
      { name: 'Nur Batrisyia Binti Mohd Sukri', role: 'Event Operations Associate' },
      { name: 'Natasha Adilla Binti Hishsamsuri', role: 'Event Operations Associate' },
    ],
  },
  {
    department: 'Technical & Systems',
    members: [
      { name: 'Kisshore Nair A/L Sashitharan', role: 'Director' },
      { name: 'Chin Shi Er', role: 'Technical Associate' },
      { name: 'Shaif Ahmad Bin Tufail Ahmad', role: 'Technical Associate' },
      { name: 'Sanchay A/L Ravindran', role: 'Technical Associate' },
      { name: 'Madhaeys A/L Sathiamoorthy', role: 'Technical Associate' },
      { name: 'Muhammad Rehan Ferdian', role: 'Technical Associate' },
      { name: 'John Wong Sie Wei', role: 'Technical Associate' },
      { name: 'Wan Muhammad Hazwan Bin Wan Rozli', role: 'Technical Associate' },
    ],
  },
]

// Flattened list used for cards + selection.
const committee = committeeByDepartment.flatMap(({ department, members }) =>
  members.map((member) => ({ ...member, department }))
)

function SectionHeading({
  eyebrow,
  title,
  description,
  isDark = false,
}: {
  eyebrow: string
  title: string
  description?: string
  isDark?: boolean
}) {
  return (
    <div className="mb-8 max-w-2xl">
      <p className={`mb-2 text-xs font-black uppercase tracking-widest ${isDark ? 'text-white/80' : 'text-purple-600'}`}>
        {eyebrow}
      </p>
      <h2 className={`text-3xl font-black uppercase tracking-tight md:text-5xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
        {title}
      </h2>
      {description ? (
        <p className={`mt-4 text-base font-semibold leading-relaxed ${isDark ? 'text-white/90' : 'text-slate-700'}`}>
          {description}
        </p>
      ) : null}
    </div>
  )
}

function CommitteeCard({
  name,
  role,
  onSelect,
  isSelected = false,
}: {
  name: string
  role: string
  onSelect: () => void
  isSelected?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isSelected}
      className={`group w-full rounded-2xl border-2 p-4 text-left transition hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
        isSelected
          ? 'border-slate-900 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]'
          : 'border-slate-900 bg-white shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]'
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 border-slate-900 text-lg font-black uppercase ${
            isSelected ? 'bg-slate-900 text-white' : 'bg-purple-100 text-slate-900'
          }`}
        >
          {name
            .split(' ')
            .slice(0, 2)
            .map((part) => part[0])
            .join('')}
        </div>
        <div>
          <p
            className={`text-lg font-black uppercase tracking-tight ${
              isSelected ? 'text-white' : 'text-slate-900'
            }`}
          >
            {name}
          </p>
          <p
            className={`text-sm font-bold ${
              isSelected ? 'text-white/80' : 'text-purple-600'
            }`}
          >
            {role}
          </p>
        </div>
      </div>
    </button>
  )
}

export default function AboutPage() {
  const [selected, setSelected] = useState(committee[0])

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-2xl border-4 border-slate-900 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-6 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] md:p-10">
        <SectionHeading
          eyebrow="About UMDAC"
          title="We help students turn data curiosity into real capability"
          description="UMDAC is a student-driven community focused on analytics, AI, and technological problem-solving. We create pathways for learning, collaboration, and career growth within the university ecosystem."
          isDark={true}
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border-2 border-slate-900 bg-purple-50 p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
            <p className="text-xs font-black uppercase tracking-widest text-purple-600">
              Mission
            </p>
            <p className="mt-4 text-base font-semibold leading-relaxed text-slate-700">
              To make data and analytics skills accessible, practical, and empowering for all students.
            </p>
          </div>
          <div className="rounded-xl border-2 border-slate-900 bg-purple-50 p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
            <p className="text-xs font-black uppercase tracking-widest text-purple-600">
              Purpose
            </p>
            <p className="mt-4 text-base font-semibold leading-relaxed text-slate-700">
              To empower members through projects, workshops, mentorship, and meaningful community building.
            </p>
          </div>
          <div className="rounded-xl border-2 border-slate-900 bg-purple-50 p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
            <p className="text-xs font-black uppercase tracking-widest text-purple-600">
              Impact
            </p>
            <p className="mt-4 text-base font-semibold leading-relaxed text-slate-700">
              To connect theory with application so members can grow into confident, industry-ready contributors.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-20">
        <SectionHeading
          eyebrow="Leadership"
          title="Meet the committee"
          description="Our committee members support the club’s learning culture, events, and member experience across the academic year."
        />
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-10">
            {committeeByDepartment.map(({ department, members }) => (
              <div key={department}>
                <p className="mb-4 text-xs font-black uppercase tracking-widest text-purple-600">
                  {department}
                </p>
                <div className="grid gap-5 md:grid-cols-2">
                  {members.map((member) => (
                    <CommitteeCard
                      key={member.name}
                      name={member.name}
                      role={member.role}
                      onSelect={() => setSelected({ ...member, department })}
                      isSelected={selected.name === member.name}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <aside className="rounded-2xl border-4 border-slate-900 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-6 text-white shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
            <p className="text-xs font-black uppercase tracking-widest text-white/80">
              Selected member
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl border-2 border-slate-900 bg-slate-900 text-lg font-black text-white">
                {selected.name
                  .split(' ')
                  .slice(0, 2)
                  .map((part) => part[0])
                  .join('')}
              </div>
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-white">
                  {selected.name}
                </h3>
                <p className="text-sm font-bold text-white/80">{selected.role}</p>
              </div>
            </div>
            <div className="mt-8 space-y-4 rounded-xl border-2 border-slate-900 bg-slate-900 p-4 text-sm text-white/80">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-white">
                  Contact
                </p>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-wide text-white transition hover:bg-white hover:text-slate-900"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
