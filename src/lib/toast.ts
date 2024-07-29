import { toast } from 'sonner'

interface ToastProps {
  success: boolean
  title: string
  description?: string
  actionLabel?: string
  actionOnClick?: () => void
  onClose?: () => void
}

export function Toast({
  success,
  title,
  description,
  actionLabel = 'Fechar',
  actionOnClick = () => console.log('Fechar'),
  onClose,
}: ToastProps) {
  if (success) {
    toast(title, {
      description,
      action: {
        label: actionLabel,
        onClick: actionOnClick,
      },
    })
    if (onClose) {
      setTimeout(() => onClose(), 2000)
    }
  }
}
