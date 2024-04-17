import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="max-w-[74rem] px-8">
      <div className="flex justify-between py-4">
        <Skeleton className="w-96 h-10 rounded-md" />
        <Skeleton className="w-32 h-10 rounded-md" />
      </div>

      <Skeleton className="w-full h-80 rounded-md" />

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex items-center space-x-2">
          <Skeleton className="w-28 h-5 rounded-md" />
          <Skeleton className="w-20 h-9 rounded-md" />
        </div>
        <Skeleton className="w-20 h-9 rounded-md" />
        <Skeleton className="w-20 h-9 rounded-md" />
      </div>
    </div>
  )
}
