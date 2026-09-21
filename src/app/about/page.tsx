'use client'

import { useState } from 'react' 

type Member = {
  name: string
  role: string
  image?: string
  imagePosition?: string
  linkedin?: string
}
type DepartmentGroup = { department: string; members: Member[] }

const committeeByDepartment: DepartmentGroup[] = [
  {
    department: 'High Committee',
    members: [
      {
        name: 'Amer Hakim bin Ahmad Kamal Ariffin',
        role: 'President',
        image: '/members/amer_hakim.png',
        imagePosition: 'center 15%',
      },
      {
        name: 'Sanjeevan A/L Kumareson',
        role: 'Vice President',
        image: '/members/sanjeevan.png',
        imagePosition: 'center 15%',
      },
      {
        name: 'Harshini A/P Kumara Vell',
        role: 'Secretary',
        image: '/members/harshini.jpg',
        imagePosition: 'center 20%',
      },
      {
        name: 'Narmathaa A/P Selvakumaran',
        role: 'Vice Secretary',
        image: '/members/narmatha.png',
        imagePosition: 'center 15%',
      },
      {
        name: 'Tronan A/L Rejendran',
        role: 'Treasurer',
        image: '/members/tronan.png',
        imagePosition: 'center 15%',
      },
      {
        name: 'Nia Zahra binti Shamsul Muhardzi',
        role: 'Vice Treasurer',
        image: '/members/nia_zahra.jpg',
        imagePosition: 'center 15%',
      },
    ],
  },
  {
    department: 'Creative & Marketing',
    members: [
      { name: 'Wong Lin Wei', role: 'Director', image: '/members/C&M/Wong Lin Wei_Director(Edited).jpg' },
      { name: 'Yeong Kai Wen', role: 'Vice Director', image: '/members/C&M/Yeong Kai Wen_Vice Director (Edited).jpg' },
      { name: 'Lau Hiap Meng', role: 'Creative Design Associate', image: '/members/C&M/Lau Hiap Meng_Creative Design Associate (Edited).jpg' },
      { name: 'Kam Pue Shan', role: 'Creative Design Associate', image: '/members/C&M/Kam Pue Shan_Creative Design Associate (Edited).jpg' },
      { name: 'Eireen Syafeeya Binti Efizan', role: 'Creative Design Associate', image: '/members/C&M/Eireen Syafeeya Binti Efizan_Creative Design Associate (Edited).jpg' },
      { name: 'Tahzib Farhan', role: 'Creative Design Associate', image: '/members/C&M/Tahzib Farhan_Creative Design Associate (Edited).jpg' },
      { name: 'Nur Fatnin Jazmina Binti Jimmy', role: 'Creative Design Associate', image: '/members/C&M/Nur Fatnin Jazmina binti Jimmy_Creative Design Associates (Edited).jpg' },
      { name: 'Liaw Kai Ze', role: 'Creative Design Associate', image: '/members/C&M/Liaw Kai Ze_Creative Design Associate (Edited).jpg' },
      { name: 'Naura Aliyyah Arif', role: 'Creative Design Associate', image: '/members/C&M/Arif Naura Aliyyah_Creative Design Associate (Edited).png' },
      { name: 'Lim Jia Qian', role: 'Creative Design Associate', image: '/members/C&M/Lim Jia Qian_Creative Design Associate (Edited).jpg' },
      { name: 'Khe Jia Kang', role: 'Marketing Associate', image: '/members/C&M/Khe Jia Kang_Marketing Associates (Edited).jpg' },
      { name: 'Lean Wen Jie', role: 'Marketing Associate', image: '/members/C&M/Lean Wen Jie_Creative Design Associate (Edited).jpg' },
      { name: 'Muhammad Fadil Saputra Wijaya', role: 'Marketing Associate', image: '/members/C&M/Muhammad Fadil Saputra Wijaya_Creative Design Associate (Edited).jpg' },
      { name: 'Wong E Jeff Japheth', role: 'Marketing Associate', image: '/members/C&M/Wong E Jeff Japheth_Creative Design Associate (Edited).jpg' },
    ],
  },
  {
    department: 'Engagement & Development',
    members: [
      { name: 'Tan Yi Jing', role: 'Director', image: '/members/E&D/Tan Yi Jing_Director (Edited).jpg' },
      { name: 'Cyrus Lau Lik Hang', role: 'Strategy Support Associate', image: '/members/E&D/Cyrus Lau Lik Hang_Strategy Support Associate (Edited).jpg' },
      { name: 'Yamuna A/P Palani', role: 'Strategy Support Associate', image: '/members/E&D/Yamuna A_P Palani_Strategy Support Associate (Edited).jpg' },
      { name: 'Tang Yong Chun', role: 'Engagement Programmes Associate', image: '/members/E&D/Tang Yong Chun_Engagement Programmes Associate (Edited).jpg' },
      { name: 'Aleeya Nazneen Binti Ahmed Nazri', role: 'Engagement Programmes Associate', image: '/members/E&D/Aleeya Nazneen_Engagement Programmes Associate (Edited).jpg' },
      { name: 'Jasmine Chin Ying Hui', role: 'Engagement Programmes Associate', image: '/members/E&D/Jasmine Chin Ying Hui_Engagement Programmes Asociate (Edited).jpg' },
    ],
  },
  {
    department: 'Strategic Partnership & Relations',
    members: [
      { name: 'Nazhan Fahim Bin Mohammad Najib', role: 'Director', image: '/members/SPR/Nazhan Fahim Bin Mohammad Najib_Director (Edited).jpg' },
      { name: 'Muhammad Adam Harith Bin Mohd Zaki', role: 'Strategic Partnership & Relations Associate', image: '/members/SPR/Muhamad Adam Harith Bin Mohd Zaki HARITH _Strategic Partnership & Relations Associate (Edited).jpg' },
      { name: 'Amirul Hisyam Bin Amir Ruddin', role: 'Strategic Partnership & Relations Associate', image: '/members/SPR/Amirul Hisyam Bin Amir Ruddin_Strategic Partnership & Relations Associate (Edited).jpg' },
      { name: 'Iman Amirul Hakim Bin Badlishah', role: 'Strategic Partnership & Relations Associate', image: '/members/SPR/Iman Amirul Hakim Bin Badlishah _Strategic Partnership & Relations Associate (Edited).jpg' },
      { name: 'Lee Xin Yi', role: 'Strategic Partnership & Relations Associate', image: '/members/SPR/Lee Xin Yi_ Strategic Partnership & Relations Associate  (Edited).jpg' },
      { name: 'Elvira Natasha Neilson', role: 'Strategic Partnership & Relations Associate', image: '/members/SPR/Elvira Natasha Neilson_Strategic Partnership & Relations Associate (Edited).jpg' },
    ],
  },
  {
    department: 'Logistics & Execution',
    members: [
      { name: 'Mohammad Farhad Zidane Bin Mohammad Firdaus', role: 'Director', image: '/members/L&E/Mohammad Farhad Zidane Bin Mohammad Firdaus_Director (Edited).jpg' },
      { name: 'Chin Kin Hiung', role: 'Logistics Associate', image: '/members/L&E/Chin Kin Hiung_Logistic Associate (Edited).jpg' },
      { name: 'Muhammad Fathi Nuqman Bin Abd. Hakim', role: 'Logistics Associate', image: '/members/L&E/Muhammad Fathi Nuqman Bin Abd.Hakim_Logistics Associate (Edited).jpg' },
      { name: 'Mahardika Malik', role: 'Logistics Associate', image: '/members/L&E/Mahardika Malik_Logistics Associates (Edited).jpg' },
      { name: 'Aly Zakki Yaza', role: 'Logistics Associate', image: '/members/L&E/Aly Zakki Yaza_Logistic Associate (Edited).jpg' },
      { name: 'Ng Yue Qhi', role: 'Logistics Associate', image: '/members/L&E/Ng Yue Qhi_Logistic Associate (Edited).jpg' },
      { name: 'Aiman Nur Haikal Bin Norazmi', role: 'Logistics Associate', image: '/members/L&E/Aiman Nur Haikal Bin Norazmi_Logistic Associate (Edited).jpg' },
      { name: 'Muhammad Naqiuddin Bin Jani', role: 'Logistics Associate', image: '/members/L&E/Muhammad Naqiuddin Bin Jani_Logistic Associate (Edited).jpg' },
    ],
  },
  {
    department: 'Event Management',
    members: [
      { name: 'Nur Farhanah Binti Mohamad Said', role: 'Director', image: '/members/EM/Nur Farhanah Binti Mohamad Said_Director (Edited).jpg' },
      { name: 'Isaac Toh Zhen Yong', role: 'PnP Associate', image: '/members/EM/Isaac Toh Zhen Yong_PnP Associates (Edited).jpg' },
      { name: 'Syed Azhar Bin Syed Jakirul Alam', role: 'PnP Associate', image: '/members/EM/Syed Azhar Bin Syed Jakirul Alam_PnP Associates (Edited).jpg' },
      { name: 'Lim Jie Shin', role: 'PnP Associate', image: '/members/EM/Lim Jie Shin_PnP Associate (Edited).jpg' },
      { name: 'Joshua Law Tiew Lung', role: 'PnP Associate', image: '/members/EM/Joshua Law Tiew Lung_PnP Associate (Edited).jpg' },
      { name: 'Husna Wajihah Binti Abu Talib', role: 'Event Operations Associate', image: '/members/EM/Husna Wajihah Binti Abu Talib_Event Operations Associate (Edited).jpg' },
      { name: 'Nur Batrisyia Binti Mohd Sukri', role: 'Event Operations Associate', image: '/members/EM/Nur Batrisyia Binti Mohd Sukri_Event Operations Associates (Edited).jpg' },
      { name: 'Natasha Adilla Binti Hishsamsuri', role: 'Event Operations Associate', image: '/members/EM/Natasha Adilla Binti Hishsamsuri_Event Operations Associates (Edited).jpg' },
    ],
  },
  {
    department: 'Technical & Systems',
    members: [
      { name: 'Kisshore Nair A/L Sashitharan', role: 'Director', image: '/members/T&S/Kisshore_Director (Edited).jpg' },
      { name: 'Chin Shi Er', role: 'Technical Associate', image: '/members/T&S/Chin Shi Er_Technical Associate (Edited).jpg' },
      { name: 'Shaif Ahmad Bin Tufail Ahmad', role: 'Technical Associate', image: '/members/T&S/Shaif Ahmad Bin Tufail Ahmad_Technical Associate (Edited).jpg' },
      { name: 'Sanchay A/L Ravindran', role: 'Technical Associate', image: '/members/T&S/Sanchay A_L Ravindran_Technical Associate (Edited).jpg' },
      { name: 'Madhaeys A/L Sathiamoorthy', role: 'Technical Associate', image: '/members/T&S/Madhaeys A_L Sathiamoorthy_Technical Associate (Edited).jpg' },
      { name: 'Muhammad Rehan Ferdian', role: 'Technical Associate', image: '/members/T&S/Muhammad Rehan Ferdian_Technical  Associate (Edited).jpg' },
      { name: 'John Wong Sie Wei', role: 'Technical Associate', image: '/members/T&S/John Wong Sie Wei_Technical Associate (Edited).jpg' },
      { name: 'Wan Muhammad Hazwan Bin Wan Rozli', role: 'Technical Associate', image: '/members/T&S/Wan Muhammad Hazwan BIn Wan Rozli_Technical Associate (Edited).jpg' },
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
  image,
  imagePosition = 'center 20%',
  onSelect,
  isSelected = false,
}: {
  name: string
  role: string
  image?: string
  imagePosition?: string
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
          className={`relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 border-slate-900 text-lg font-black uppercase ${
            isSelected ? 'bg-slate-900 text-white' : 'bg-purple-100 text-slate-900'
          }`}
        >
          {image ? (
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover"
              style={{ objectPosition: imagePosition }}
            />
          ) : (
            name
              .split(' ')
              .slice(0, 2)
              .map((part) => part[0])
              .join('')
          )}
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
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div className="space-y-10">
            {committeeByDepartment.map(({ department, members }) => (
              <div key={department}>
                <p className="mb-4 text-base sm:text-lg font-black uppercase tracking-wide text-purple-600">
                  {department}
                </p>
                <div className="grid gap-5 md:grid-cols-2">
                  {members.map((member) => (
                    <CommitteeCard
                      key={member.name}
                      name={member.name}
                      role={member.role}
                      image={member.image}
                      imagePosition={member.imagePosition}
                      onSelect={() => setSelected({ ...member, department })}
                      isSelected={selected.name === member.name}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Sticky Member Detail Panel */}
          <aside className="h-fit overflow-hidden rounded-2xl border-4 border-slate-900 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] lg:sticky lg:top-24">
            {/* Image Header with bottom fade */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900">
              {selected.image ? (
                <>
                  <img
                    src={selected.image}
                    alt={selected.name}
                    className="h-full w-full object-cover object-top"
                  />
                  {/* Gentle bottom-only fade to card body */}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent pointer-events-none" />
                </>
              ) : (
                <div className="relative flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-4 text-center">
                  <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_center,_#c084fc_1px,_transparent_1px)] [background-size:20px_20px]" />
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-white/25 bg-white/10 text-2xl font-black uppercase text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] backdrop-blur-md">
                    {selected.name
                      .split(' ')
                      .slice(0, 2)
                      .map((part) => part[0])
                      .join('')}
                  </div>
                </div>
              )}
              
              <span className="absolute top-3 left-3 z-10 rounded-lg border border-white/20 bg-slate-900/80 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white backdrop-blur">
                {selected.department}
              </span>
            </div>

            {/* Member Details */}
            <div className="p-5 sm:p-6 bg-slate-900/90 backdrop-blur-sm border-t border-white/10">
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white leading-tight">
                {selected.name}
              </h3>
              <p className="mt-1 text-sm sm:text-base font-bold text-purple-300">
                {selected.role}
              </p>

              <div className="mt-5 pt-4 border-t border-white/10">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-300">Contact:</p>
                <a
                  href={selected.linkedin || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2.5 inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-white bg-white/15 px-4 py-2.5 text-xs sm:text-sm font-black uppercase tracking-wider text-white backdrop-blur transition hover:bg-white hover:text-slate-900 active:translate-y-0.5 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3" />
                  </svg>
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
