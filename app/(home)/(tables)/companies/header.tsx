export default async function Header() {
  return (
    <>
      <div className="flex justify-between w-full gap-2">
        {/* <div className="flex h-16 items-center px-4">
          <TeamSwitcher />
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div> */}
        <h1 className="text-3xl font-bold pb-6">Empresa</h1>
      </div>
    </>
  )
}
