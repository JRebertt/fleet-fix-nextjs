'use client'

import { motion } from 'framer-motion'
import ScheduleCard from './schedule-card'
import { Toaster } from 'sonner'
import { useFilters } from '@/hooks/useFilter'
import { GetMaintenanceSchedule } from '@/@types/maintenance-table'

export default function Home() {
  const { schedules: filtered } = useFilters()

  // Define as variantes para a animação dos itens da lista
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1, // Adiciona um pequeno atraso entre as animações dos itens
      },
    }),
  }

  return (
    <>
      <Toaster />
      <section className="grid sm:grid-cols-3 gap-6">
        {filtered.length !== 0 ? (
          filtered.map((data, i) => {
            return (
              <motion.div
                key={i}
                custom={i} // Passa o índice como propriedade customizada para a variante visible
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <ScheduleCard data={data as GetMaintenanceSchedule} />
              </motion.div>
            )
          })
        ) : (
          <p className="col-span-3 text-center">
            Nenhum Agendamento Encontrado
          </p>
        )}
      </section>
    </>
  )
}
