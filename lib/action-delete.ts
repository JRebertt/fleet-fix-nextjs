import { toast } from 'sonner'

interface RomeveItemProps {
  id: string
  router: (id: string) => Promise<void>
  notify: {
    success: string
    error: string
  }
}

export async function handleRemoveItem({
  id,
  router,
  notify,
}: RomeveItemProps) {
  try {
    await router(id)
    toast.success(notify.success)
  } catch (err) {
    toast.error(notify.error)
  }
}
