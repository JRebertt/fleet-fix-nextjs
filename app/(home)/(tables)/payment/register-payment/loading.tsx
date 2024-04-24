import { Skeleton } from '@/components/ui/skeleton'

export default function RegisterPaymentLoading() {
  return (
    <section className="flex h-full justify-center items-center p-4">
      <div className="w-full max-w-xl">
        <h1 className="text-lg font-bold mb-4">Registrar Pagemento</h1>

        <Skeleton className="w-full mb-4 h-[40px]" />
        <Skeleton className="w-full mb-4 h-[90px]" />

        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <Skeleton className="w-full h-[40px]" />
          <Skeleton className="w-full h-[40px]" />
        </div>

        <Skeleton className="w-full h-[40px]" />
      </div>
    </section>
  )
}
