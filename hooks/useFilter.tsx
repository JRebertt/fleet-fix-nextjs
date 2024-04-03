'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import fetchMaintenanceSchedule from '@/services/maintenance-schedule/fetch-maintenance-schedule'

// Tipagem para os filtros
type FilterState = {
  searchText: string
  statusAgendado: boolean
  statusEmProgresso: boolean
  statusConcluido: boolean
}

type MaintenanceStatus =
  | 'Scheduled'
  | 'InProgress'
  | 'Completed'
  | 'OnHold'
  | 'Canceled'
  | 'Failed'

// Tipagem para os dados de agendamento de manutenção
type MaintenanceSchedule = {
  id: string
  title: string
  scheduledDate: Date
  description: string | null
  status: MaintenanceStatus
  startDate: Date | null
  endDate: Date | null
  cost: number | null
  vehicle_id: string
}

// Props do provider
type FiltersProviderProps = {
  children: React.ReactNode
}

// Estado inicial dos filtros
const initialFilters: FilterState = {
  searchText: '',
  statusAgendado: false,
  statusEmProgresso: false,
  statusConcluido: false,
}

// Criando o contexto com o estado inicial e uma função para atualizar os filtros
const FiltersContext = createContext<{
  filters: FilterState
  setFilters: (filters: FilterState) => void
  schedules: MaintenanceSchedule[]
  // eslint-disable-next-line @typescript-eslint/no-empty-function
}>({ filters: initialFilters, setFilters: () => {}, schedules: [] })

export const FiltersProvider: React.FC<FiltersProviderProps> = ({
  children,
}) => {
  const [filters, setFilters] = useState<FilterState>(initialFilters)
  const [schedules, setSchedules] = useState<MaintenanceSchedule[]>([])

  // Função para buscar dados filtrados
  // Função para buscar dados filtrados
  const fetchFilteredData = async () => {
    const allSchedules = await fetchMaintenanceSchedule()
    // Aplica os filtros aqui
    const filteredSchedules = allSchedules.filter((schedule) => {
      // Filtragem por status
      const filterByStatus =
        (filters.statusAgendado && schedule.status === 'Scheduled') ||
        (filters.statusEmProgresso && schedule.status === 'InProgress') ||
        (filters.statusConcluido && schedule.status === 'Completed') ||
        (!filters.statusAgendado &&
          !filters.statusEmProgresso &&
          !filters.statusConcluido) // Se nenhum status estiver selecionado, não filtrar por status

      // Filtragem por texto de busca
      const filterByText =
        filters.searchText === '' ||
        schedule.title.toLowerCase().includes(filters.searchText.toLowerCase())

      return filterByStatus && filterByText
    })

    setSchedules(filteredSchedules)
  }

  useEffect(() => {
    fetchFilteredData() // Chama a função de fetch quando o componente monta ou quando os filtros são atualizados
  }, [filters]) // Dependências do efeito: re-executa o fetch quando os filtros mudam

  const value = { filters, setFilters, schedules }

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  )
}

// Hook personalizado para usar o contexto de filtros
export const useFilters = () => {
  const context = useContext(FiltersContext)

  if (context === undefined) {
    throw new Error('useFilters must be used within a FiltersProvider')
  }

  return context
}
