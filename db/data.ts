type Priority = {
  name: 'Alta' | 'Média' | 'Baixa'
  value: 'Alta' | 'Média' | 'Baixa'
}

export const priority: Priority[] = [
  {
    name: 'Baixa',
    value: 'Baixa',
  },

  {
    name: 'Média',
    value: 'Média',
  },
  {
    name: 'Alta',
    value: 'Alta',
  },
]

export const data = [
  {
    id: 'schedule-0',
    title: 'Manutenção 0',
    scheduledDate: '2024-04-03T23:24:13.233440',
    description: 'Descrição da manutenção 0',
    status: 'Completed',
    startDate: '2024-04-06T23:24:13.233460',
    endDate: '2024-04-10T23:24:13.233473',
    cost: 427,
    vehicle_id: 'vehicle-0',
  },
  {
    id: 'schedule-1',
    title: 'Manutenção 1',
    scheduledDate: '2024-04-03T23:24:13.233480',
    description: 'Descrição da manutenção 1',
    status: 'InProgress',
    startDate: '2024-04-07T23:24:13.233483',
    endDate: '2024-04-09T23:24:13.233487',
    cost: 697,
    vehicle_id: 'vehicle-1',
  },
  {
    id: 'schedule-2',
    title: 'Manutenção 2',
    scheduledDate: '2024-04-03T23:24:13.233493',
    description: 'Descrição da manutenção 2',
    status: 'InProgress',
    startDate: '2024-04-04T23:24:13.233496',
    endDate: '2024-04-13T23:24:13.233499',
    cost: 971,
    vehicle_id: 'vehicle-2',
  },
  {
    id: 'schedule-3',
    title: 'Manutenção 3',
    scheduledDate: '2024-04-03T23:24:13.233493',
    description: 'Descrição da manutenção 2',
    status: 'Scheduled',
    startDate: '2024-04-04T23:24:13.233496',
    endDate: '2024-04-13T23:24:13.233499',
    cost: 971,
    vehicle_id: 'vehicle-3',
  },
  {
    id: 'schedule-4',
    title: 'Manutenção 4',
    scheduledDate: '2024-04-03T23:24:13.233493',
    description: 'Descrição da manutenção 2',
    status: 'Scheduled',
    startDate: '2024-04-04T23:24:13.233496',
    endDate: '2024-04-13T23:24:13.233499',
    cost: 971,
    vehicle_id: 'vehicle-4',
  },
  // ...continua para os demais itens...
]
