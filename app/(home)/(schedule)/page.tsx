'use client'

import { AnimatePresence, motion } from 'framer-motion'
import ScheduleCard from './schedule-card'
import { Toaster } from 'sonner'
import { GetMaintenanceSchedule } from '@/@types/maintenance-table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Filters } from './filter'
import DashboardPage from '@/components/dash'
import { useQuery } from '@tanstack/react-query'
import getPaymentsMetricas from '@/services/metricas/get-payments-metricas'
import { Skeleton } from '@/components/ui/skeleton'
import fetchMaintenanceSchedule from '@/services/maintenance-schedule/fetch-maintenance-schedule'
import { useSearchParams } from 'next/navigation'
import fetchMaintenanceScheduleWithParams from '@/services/maintenance-schedule/fetch-maintenance-schedule-with-params'
import HomeLoading from './loading'

export default function Home() {
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
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }, // Define a animação de saída
  }

  const { data, isLoading } = useQuery({
    queryKey: ['payments'],
    queryFn: async () => await getPaymentsMetricas(),
  })
  const { data: totalMaintenance } = useQuery({
    queryKey: ['maintenance'],
    queryFn: async () => await fetchMaintenanceSchedule(),
  })

  const searchParams = useSearchParams()
  const title = searchParams.get('title')
  const status = searchParams.get('status')
  const vehicle = searchParams.get('vehicle')
  const from = searchParams.get('startDate')
  const to = searchParams.get('endDate')

  const { data: result, isLoading: isLoadingMaintenances } = useQuery({
    queryKey: ['maintenances-params', title, vehicle, status, from, to],
    queryFn: () =>
      fetchMaintenanceScheduleWithParams({
        title,
        vehicle: vehicle === 'all vehicles' ? null : vehicle,
        status: status === 'all' ? null : status,
        from,
        to,
      }),
  })

  return (
    <>
      <Toaster />
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList>
          <TabsTrigger value="dashboard">Dashborad</TabsTrigger>
          <TabsTrigger value="schedule">Agendamentos</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
          {isLoading ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 p-8">
              <Skeleton className="w-[310px] h-[110px]" />
              <Skeleton className="w-[310px] h-[110px]" />
              <Skeleton className="w-[310px] h-[110px]" />
            </div>
          ) : (
            <DashboardPage
              totalMaintenance={totalMaintenance?.maintenances.length ?? 0}
              totalCost={data?.totalCost}
              averageCost={data?.averageCost}
            />
          )}
        </TabsContent>
        <TabsContent value="schedule">
          <div className="space-y-4">
            <Filters />
            <section className="grid sm:grid-cols-3 gap-6">
              {!isLoadingMaintenances ? (
                <AnimatePresence>
                  {result?.maintenances.map((data, i) => (
                    <motion.div
                      key={i}
                      custom={i} // Passa o índice como propriedade customizada para a variante visible
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit" // Adiciona a propriedade exit para controlar a animação de saída
                    >
                      <ScheduleCard data={data as GetMaintenanceSchedule} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              ) : (
                <HomeLoading />
              )}
              {!isLoadingMaintenances && result?.maintenances.length === 0 && (
                <p className="col-span-3 text-center">
                  Nenhum Agendamento Encontrado
                </p>
              )}
            </section>
          </div>
        </TabsContent>
      </Tabs>
    </>
  )
}
