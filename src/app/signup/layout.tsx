import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create your UMDAC member profile and join the community.',
}

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
