import { MainNav } from '@/components/main-nav'
import TeamSwitcher from '@/components/team-switcher'
import { UserNav } from '@/components/user-nav'

export default async function Header() {
  return (
    <>
      <div className="">
        {/* <div className="flex h-16 items-center px-4">
          <TeamSwitcher />
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div> */}
        <h1 className="text-3xl font-bold pb-6">Pagamentos</h1>
      </div>
    </>
  )
}
