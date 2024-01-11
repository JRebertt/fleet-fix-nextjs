import { cn } from '@/lib/utils'
import { CircularProgress, CircularProgressProps } from '@nextui-org/react'

interface Props extends CircularProgressProps {
  value: number
}
export default function CustomProgress({ value, ...props }: Props) {
  function getColorClasses(value: number) {
    if (value < 30) {
      return {
        indicatorClass: 'stroke-red-500',
        trackClass: 'stroke-red-500/10',
      }
    } else if (value <= 95) {
      return {
        indicatorClass: 'stroke-yellow-500',
        trackClass: 'stroke-yellow-500/10',
      }
    } else {
      return {
        indicatorClass: 'stroke-green-500',
        trackClass: 'stroke-green-500/10',
      }
    }
  }

  const { indicatorClass, trackClass } = getColorClasses(value)

  return (
    <CircularProgress
      classNames={{
        svg: 'w-24 h-24 sm:w-36 sm:h-36 drop-shadow-md',
        indicator: cn('stroke-green-5001', indicatorClass),
        track: cn('stroke-white/10', trackClass),
        value: 'text-xl sm:text-3xl font-semibold ',
        base: 'self-center',
      }}
      {...props}
      value={value}
      strokeWidth={4}
      showValueLabel={true}
    />
  )
}
