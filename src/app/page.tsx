import HomePage from './home/page'

export const dynamic = 'force-dynamic'

export default async function Page() {
  return await HomePage()
}
