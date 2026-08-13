import { signUpAction } from '../actions/auth'

export default function SignUpPage() {
  return (
    <div style={{ padding: '2rem', maxWidth: '400px' }}>
      <h1>Sign Up (Backend Test Page)</h1>
      
      <form action={signUpAction} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input name="full_name" placeholder="Full Name" required />
        <input name="email" type="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" required />
        
        <input name="university" placeholder="University (e.g. Universiti Malaya)" required />
        <input name="faculty" placeholder="Faculty" required />
        <input name="major" placeholder="Major (e.g. Computer Science)" required />
        
        <input name="year_of_study" type="number" placeholder="Year of Study (e.g. 2)" required />
        <input name="semester" type="number" placeholder="Semester (e.g. 1)" required />

        <button type="submit">Register Test User</button>
      </form>
    </div>
  )
}