import { Skeleton } from '@/components/ui/skeleton'

export default function HomeLoading() {
  return (
    <div className="px-4 grid sm:grid-cols-3 justify-items-center gap-6">
      {[...Array(9)].map((_, index) => (
        <Skeleton key={index} className="max-w-96 w-full min-h-48" />
      ))}
    </div>
  )
}
