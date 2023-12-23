export default async function getVehicles() {
  const vehicles = [
    {
      id: '27845f55-43a2-40ea-8640-3a22e5b946cb',
      model: 'Caminhão',
      licensePlate: '565-ABC',
      chassisNumber: 'CH-2491',
      year: 2005,
      photos: [
        'http://example.com/photo2.jpg',
        'http://example.com/photo1.jpg',
      ],
      purchaseDate: new Date(2020, 5, 7),
      licensingDate: new Date(2021, 10, 3),
      crlvPdf: 'http://example.com/crlv.pdf',
      driver: 'DR-9580',
      vehicleStatus: 'Revisado',
      oilChangeDate: new Date(2010, 11, 30),
      oilChangeMileage: 11327,
      currentMileage: 41683,
    },
    {
      id: '62372a48-5a07-4589-a86e-d52496b80a52',
      model: 'Carro',
      licensePlate: '921-ABC',
      chassisNumber: 'CH-7283',
      year: 2006,
      photos: [
        'http://example.com/photo2.jpg',
        'http://example.com/photo1.jpg',
      ],
      purchaseDate: new Date(2007, 12, 8),
      licensingDate: new Date(2023, 10, 28),
      crlvPdf: 'http://example.com/crlv.pdf',
      driver: 'DR-8778',
      vehicleStatus: 'Em Viagem',
      oilChangeDate: new Date(2011, 5, 29),
      oilChangeMileage: 10215,
      currentMileage: 99967,
    },
    {
      id: '39b524e0-12af-4a73-a262-8a6ee37d184a',
      model: 'Moto',
      licensePlate: '331-ABC',
      chassisNumber: 'CH-9053',
      year: 2013,
      photos: [
        'http://example.com/photo2.jpg',
        'http://example.com/photo1.jpg',
      ],
      purchaseDate: new Date(2017, 10, 16),
      licensingDate: new Date(2000, 6, 1),
      crlvPdf: 'http://example.com/crlv.pdf',
      driver: 'DR-2885',
      vehicleStatus: 'Em Viagem',
      oilChangeDate: new Date(2018, 3, 29),
      oilChangeMileage: 10193,
      currentMileage: 91195,
    },
    {
      id: '27845f55-43a2-40ea-8640-3a22e5b946cb',
      model: 'Caminhão',
      licensePlate: '565-ABC',
      chassisNumber: 'CH-2491',
      year: 2005,
      photos: [
        'http://example.com/photo2.jpg',
        'http://example.com/photo1.jpg',
      ],
      purchaseDate: new Date(2020, 5, 7),
      licensingDate: new Date(2021, 10, 3),
      crlvPdf: 'http://example.com/crlv.pdf',
      driver: 'DR-9580',
      vehicleStatus: 'Revisado',
      oilChangeDate: new Date(2010, 11, 30),
      oilChangeMileage: 11327,
      currentMileage: 41683,
    },
    {
      id: '62372a48-5a07-4589-a86e-d52496b80a52',
      model: 'Carro',
      licensePlate: '921-ABC',
      chassisNumber: 'CH-7283',
      year: 2006,
      photos: [
        'http://example.com/photo2.jpg',
        'http://example.com/photo1.jpg',
      ],
      purchaseDate: new Date(2007, 12, 8),
      licensingDate: new Date(2023, 10, 28),
      crlvPdf: 'http://example.com/crlv.pdf',
      driver: 'DR-8778',
      vehicleStatus: 'Em Viagem',
      oilChangeDate: new Date(2011, 5, 29),
      oilChangeMileage: 10215,
      currentMileage: 99967,
    },
    {
      id: '39b524e0-12af-4a73-a262-8a6ee37d184a',
      model: 'Moto',
      licensePlate: '331-ABC',
      chassisNumber: 'CH-9053',
      year: 2013,
      photos: [
        'http://example.com/photo2.jpg',
        'http://example.com/photo1.jpg',
      ],
      purchaseDate: new Date(2017, 10, 16),
      licensingDate: new Date(2000, 6, 1),
      crlvPdf: 'http://example.com/crlv.pdf',
      driver: 'DR-2885',
      vehicleStatus: 'Em Viagem',
      oilChangeDate: new Date(2018, 3, 29),
      oilChangeMileage: 10193,
      currentMileage: 91195,
    },
    {
      id: '27845f55-43a2-40ea-8640-3a22e5b946cb',
      model: 'Caminhão',
      licensePlate: '565-ABC',
      chassisNumber: 'CH-2491',
      year: 2005,
      photos: [
        'http://example.com/photo2.jpg',
        'http://example.com/photo1.jpg',
      ],
      purchaseDate: new Date(2020, 5, 7),
      licensingDate: new Date(2021, 10, 3),
      crlvPdf: 'http://example.com/crlv.pdf',
      driver: 'DR-9580',
      vehicleStatus: 'Revisado',
      oilChangeDate: new Date(2010, 11, 30),
      oilChangeMileage: 11327,
      currentMileage: 41683,
    },
    {
      id: '62372a48-5a07-4589-a86e-d52496b80a52',
      model: 'Carro',
      licensePlate: '921-ABC',
      chassisNumber: 'CH-7283',
      year: 2006,
      photos: [
        'http://example.com/photo2.jpg',
        'http://example.com/photo1.jpg',
      ],
      purchaseDate: new Date(2007, 12, 8),
      licensingDate: new Date(2023, 10, 28),
      crlvPdf: 'http://example.com/crlv.pdf',
      driver: 'DR-8778',
      vehicleStatus: 'Em Viagem',
      oilChangeDate: new Date(2011, 5, 29),
      oilChangeMileage: 10215,
      currentMileage: 99967,
    },
    {
      id: '39b524e0-12af-4a73-a262-8a6ee37d184a',
      model: 'Moto',
      licensePlate: '331-ABC',
      chassisNumber: 'CH-9053',
      year: 2013,
      photos: [
        'http://example.com/photo2.jpg',
        'http://example.com/photo1.jpg',
      ],
      purchaseDate: new Date(2017, 10, 16),
      licensingDate: new Date(2000, 6, 1),
      crlvPdf: 'http://example.com/crlv.pdf',
      driver: 'DR-2885',
      vehicleStatus: 'Em Viagem',
      oilChangeDate: new Date(2018, 3, 29),
      oilChangeMileage: 10193,
      currentMileage: 91195,
    },
    {
      id: '27845f55-43a2-40ea-8640-3a22e5b946cb',
      model: 'Caminhão',
      licensePlate: '565-ABC',
      chassisNumber: 'CH-2491',
      year: 2005,
      photos: [
        'http://example.com/photo2.jpg',
        'http://example.com/photo1.jpg',
      ],
      purchaseDate: new Date(2020, 5, 7),
      licensingDate: new Date(2021, 10, 3),
      crlvPdf: 'http://example.com/crlv.pdf',
      driver: 'DR-9580',
      vehicleStatus: 'Revisado',
      oilChangeDate: new Date(2010, 11, 30),
      oilChangeMileage: 11327,
      currentMileage: 41683,
    },
    {
      id: '62372a48-5a07-4589-a86e-d52496b80a52',
      model: 'Carro',
      licensePlate: '921-ABC',
      chassisNumber: 'CH-7283',
      year: 2006,
      photos: [
        'http://example.com/photo2.jpg',
        'http://example.com/photo1.jpg',
      ],
      purchaseDate: new Date(2007, 12, 8),
      licensingDate: new Date(2023, 10, 28),
      crlvPdf: 'http://example.com/crlv.pdf',
      driver: 'DR-8778',
      vehicleStatus: 'Em Viagem',
      oilChangeDate: new Date(2011, 5, 29),
      oilChangeMileage: 10215,
      currentMileage: 99967,
    },
    {
      id: '39b524e0-12af-4a73-a262-8a6ee37d184a',
      model: 'Moto',
      licensePlate: '331-ABC',
      chassisNumber: 'CH-9053',
      year: 2013,
      photos: [
        'http://example.com/photo2.jpg',
        'http://example.com/photo1.jpg',
      ],
      purchaseDate: new Date(2017, 10, 16),
      licensingDate: new Date(2000, 6, 1),
      crlvPdf: 'http://example.com/crlv.pdf',
      driver: 'DR-2885',
      vehicleStatus: 'Em Viagem',
      oilChangeDate: new Date(2018, 3, 29),
      oilChangeMileage: 10193,
      currentMileage: 91195,
    },
    {
      id: '27845f55-43a2-40ea-8640-3a22e5b946cb',
      model: 'Caminhão',
      licensePlate: '565-ABC',
      chassisNumber: 'CH-2491',
      year: 2005,
      photos: [
        'http://example.com/photo2.jpg',
        'http://example.com/photo1.jpg',
      ],
      purchaseDate: new Date(2020, 5, 7),
      licensingDate: new Date(2021, 10, 3),
      crlvPdf: 'http://example.com/crlv.pdf',
      driver: 'DR-9580',
      vehicleStatus: 'Revisado',
      oilChangeDate: new Date(2010, 11, 30),
      oilChangeMileage: 11327,
      currentMileage: 41683,
    },
    {
      id: '62372a48-5a07-4589-a86e-d52496b80a52',
      model: 'Carro',
      licensePlate: '921-ABC',
      chassisNumber: 'CH-7283',
      year: 2006,
      photos: [
        'http://example.com/photo2.jpg',
        'http://example.com/photo1.jpg',
      ],
      purchaseDate: new Date(2007, 12, 8),
      licensingDate: new Date(2023, 10, 28),
      crlvPdf: 'http://example.com/crlv.pdf',
      driver: 'DR-8778',
      vehicleStatus: 'Em Viagem',
      oilChangeDate: new Date(2011, 5, 29),
      oilChangeMileage: 10215,
      currentMileage: 99967,
    },
    {
      id: '39b524e0-12af-4a73-a262-8a6ee37d184a',
      model: 'Moto',
      licensePlate: '331-ABC',
      chassisNumber: 'CH-9053',
      year: 2013,
      photos: [
        'http://example.com/photo2.jpg',
        'http://example.com/photo1.jpg',
      ],
      purchaseDate: new Date(2017, 10, 16),
      licensingDate: new Date(2000, 6, 1),
      crlvPdf: 'http://example.com/crlv.pdf',
      driver: 'DR-2885',
      vehicleStatus: 'Em Viagem',
      oilChangeDate: new Date(2018, 3, 29),
      oilChangeMileage: 10193,
      currentMileage: 91195,
    },
    {
      id: '27845f55-43a2-40ea-8640-3a22e5b946cb',
      model: 'Caminhão',
      licensePlate: '565-ABC',
      chassisNumber: 'CH-2491',
      year: 2005,
      photos: [
        'http://example.com/photo2.jpg',
        'http://example.com/photo1.jpg',
      ],
      purchaseDate: new Date(2020, 5, 7),
      licensingDate: new Date(2021, 10, 3),
      crlvPdf: 'http://example.com/crlv.pdf',
      driver: 'DR-9580',
      vehicleStatus: 'Revisado',
      oilChangeDate: new Date(2010, 11, 30),
      oilChangeMileage: 11327,
      currentMileage: 41683,
    },
    {
      id: '62372a48-5a07-4589-a86e-d52496b80a52',
      model: 'Carro',
      licensePlate: '921-ABC',
      chassisNumber: 'CH-7283',
      year: 2006,
      photos: [
        'http://example.com/photo2.jpg',
        'http://example.com/photo1.jpg',
      ],
      purchaseDate: new Date(2007, 12, 8),
      licensingDate: new Date(2023, 10, 28),
      crlvPdf: 'http://example.com/crlv.pdf',
      driver: 'DR-8778',
      vehicleStatus: 'Em Viagem',
      oilChangeDate: new Date(2011, 5, 29),
      oilChangeMileage: 10215,
      currentMileage: 99967,
    },
    {
      id: '39b524e0-12af-4a73-a262-8a6ee37d184a',
      model: 'Moto',
      licensePlate: '331-ABC',
      chassisNumber: 'CH-9053',
      year: 2013,
      photos: [
        'http://example.com/photo2.jpg',
        'http://example.com/photo1.jpg',
      ],
      purchaseDate: new Date(2017, 10, 16),
      licensingDate: new Date(2000, 6, 1),
      crlvPdf: 'http://example.com/crlv.pdf',
      driver: 'DR-2885',
      vehicleStatus: 'Em Viagem',
      oilChangeDate: new Date(2018, 3, 29),
      oilChangeMileage: 10193,
      currentMileage: 91195,
    },
    {
      id: '27845f55-43a2-40ea-8640-3a22e5b946cb',
      model: 'Caminhão',
      licensePlate: '565-ABC',
      chassisNumber: 'CH-2491',
      year: 2005,
      photos: [
        'http://example.com/photo2.jpg',
        'http://example.com/photo1.jpg',
      ],
      purchaseDate: new Date(2020, 5, 7),
      licensingDate: new Date(2021, 10, 3),
      crlvPdf: 'http://example.com/crlv.pdf',
      driver: 'DR-9580',
      vehicleStatus: 'Revisado',
      oilChangeDate: new Date(2010, 11, 30),
      oilChangeMileage: 11327,
      currentMileage: 41683,
    },
    {
      id: '62372a48-5a07-4589-a86e-d52496b80a52',
      model: 'Carro',
      licensePlate: '921-ABC',
      chassisNumber: 'CH-7283',
      year: 2006,
      photos: [
        'http://example.com/photo2.jpg',
        'http://example.com/photo1.jpg',
      ],
      purchaseDate: new Date(2007, 12, 8),
      licensingDate: new Date(2023, 10, 28),
      crlvPdf: 'http://example.com/crlv.pdf',
      driver: 'DR-8778',
      vehicleStatus: 'Em Viagem',
      oilChangeDate: new Date(2011, 5, 29),
      oilChangeMileage: 10215,
      currentMileage: 99967,
    },
    {
      id: '39b524e0-12af-4a73-a262-8a6ee37d184a',
      model: 'Moto',
      licensePlate: '331-ABC',
      chassisNumber: 'CH-9053',
      year: 2013,
      photos: [
        'http://example.com/photo2.jpg',
        'http://example.com/photo1.jpg',
      ],
      purchaseDate: new Date(2017, 10, 16),
      licensingDate: new Date(2000, 6, 1),
      crlvPdf: 'http://example.com/crlv.pdf',
      driver: 'DR-2885',
      vehicleStatus: 'Em Viagem',
      oilChangeDate: new Date(2018, 3, 29),
      oilChangeMileage: 10193,
      currentMileage: 91195,
    },
    {
      id: '27845f55-43a2-40ea-8640-3a22e5b946cb',
      model: 'Caminhão',
      licensePlate: '565-ABC',
      chassisNumber: 'CH-2491',
      year: 2005,
      photos: [
        'http://example.com/photo2.jpg',
        'http://example.com/photo1.jpg',
      ],
      purchaseDate: new Date(2020, 5, 7),
      licensingDate: new Date(2021, 10, 3),
      crlvPdf: 'http://example.com/crlv.pdf',
      driver: 'DR-9580',
      vehicleStatus: 'Revisado',
      oilChangeDate: new Date(2010, 11, 30),
      oilChangeMileage: 11327,
      currentMileage: 41683,
    },
    {
      id: '62372a48-5a07-4589-a86e-d52496b80a52',
      model: 'Carro',
      licensePlate: '921-ABC',
      chassisNumber: 'CH-7283',
      year: 2006,
      photos: [
        'http://example.com/photo2.jpg',
        'http://example.com/photo1.jpg',
      ],
      purchaseDate: new Date(2007, 12, 8),
      licensingDate: new Date(2023, 10, 28),
      crlvPdf: 'http://example.com/crlv.pdf',
      driver: 'DR-8778',
      vehicleStatus: 'Em Viagem',
      oilChangeDate: new Date(2011, 5, 29),
      oilChangeMileage: 10215,
      currentMileage: 99967,
    },
    {
      id: '39b524e0-12af-4a73-a262-8a6ee37d184a',
      model: 'Moto',
      licensePlate: '331-ABC',
      chassisNumber: 'CH-9053',
      year: 2013,
      photos: [
        'http://example.com/photo2.jpg',
        'http://example.com/photo1.jpg',
      ],
      purchaseDate: new Date(2017, 10, 16),
      licensingDate: new Date(2000, 6, 1),
      crlvPdf: 'http://example.com/crlv.pdf',
      driver: 'DR-2885',
      vehicleStatus: 'Em Viagem',
      oilChangeDate: new Date(2018, 3, 29),
      oilChangeMileage: 10193,
      currentMileage: 91195,
    },
    {
      id: '27845f55-43a2-40ea-8640-3a22e5b946cb',
      model: 'Caminhão',
      licensePlate: '565-ABC',
      chassisNumber: 'CH-2491',
      year: 2005,
      photos: [
        'http://example.com/photo2.jpg',
        'http://example.com/photo1.jpg',
      ],
      purchaseDate: new Date(2020, 5, 7),
      licensingDate: new Date(2021, 10, 3),
      crlvPdf: 'http://example.com/crlv.pdf',
      driver: 'DR-9580',
      vehicleStatus: 'Revisado',
      oilChangeDate: new Date(2010, 11, 30),
      oilChangeMileage: 11327,
      currentMileage: 41683,
    },
    {
      id: '62372a48-5a07-4589-a86e-d52496b80a52',
      model: 'Carro',
      licensePlate: '921-ABC',
      chassisNumber: 'CH-7283',
      year: 2006,
      photos: [
        'http://example.com/photo2.jpg',
        'http://example.com/photo1.jpg',
      ],
      purchaseDate: new Date(2007, 12, 8),
      licensingDate: new Date(2023, 10, 28),
      crlvPdf: 'http://example.com/crlv.pdf',
      driver: 'DR-8778',
      vehicleStatus: 'Em Viagem',
      oilChangeDate: new Date(2011, 5, 29),
      oilChangeMileage: 10215,
      currentMileage: 99967,
    },
    {
      id: '39b524e0-12af-4a73-a262-8a6ee37d184a',
      model: 'Moto',
      licensePlate: '331-ABC',
      chassisNumber: 'CH-9053',
      year: 2013,
      photos: [
        'http://example.com/photo2.jpg',
        'http://example.com/photo1.jpg',
      ],
      purchaseDate: new Date(2017, 10, 16),
      licensingDate: new Date(2000, 6, 1),
      crlvPdf: 'http://example.com/crlv.pdf',
      driver: 'DR-2885',
      vehicleStatus: 'Em Viagem',
      oilChangeDate: new Date(2018, 3, 29),
      oilChangeMileage: 10193,
      currentMileage: 91195,
    },
    {
      id: 'd6947643-0ff5-4c16-b359-633b88d13459',
      model: 'Ônibus',
      licensePlate: '214-ABC',
      chassisNumber: 'CH-7746',
      year: 2012,
      photos: [
        'http://example.com/photo1.jpg',
        'http://example.com/photo2.jpg',
      ],
      purchaseDate: new Date(2004, 4, 25),
      licensingDate: new Date(2021, 11, 26),
      crlvPdf: 'http://example.com/crlv.pdf',
      driver: 'DR-4015',
      vehicleStatus: 'Revisado',
      oilChangeDate: new Date(2008, 6, 30),
      oilChangeMileage: 5396,
      currentMileage: 50089,
    },
    {
      id: 'aecd43b5-1cc0-497b-9a5a-1c32a050e432',
      model: 'Van',
      licensePlate: '896-ABC',
      chassisNumber: 'CH-9501',
      year: 2013,
      photos: [
        'http://example.com/photo1.jpg',
        'http://example.com/photo2.jpg',
      ],
      purchaseDate: new Date(2012, 12, 12),
      licensingDate: new Date(2000, 3, 26),
      crlvPdf: 'http://example.com/crlv.pdf',
      driver: 'DR-5388',
      vehicleStatus: 'Em Manutenção',
      oilChangeDate: new Date(2007, 3, 30),
      oilChangeMileage: 7630,
      currentMileage: 35613,
    },
    {
      id: '51809c4e-3ff6-45f8-b923-7fd03ffef57f',
      model: 'Van',
      licensePlate: '660-ABC',
      chassisNumber: 'CH-5180',
      year: 2008,
      photos: [
        'http://example.com/photo1.jpg',
        'http://example.com/photo2.jpg',
      ],
      purchaseDate: new Date(2016, 2, 5),
      licensingDate: new Date(2016, 9, 26),
      crlvPdf: 'http://example.com/crlv.pdf',
      driver: 'DR-2377',
      vehicleStatus: 'Em Manutenção',
      oilChangeDate: new Date(2021, 11, 22),
      oilChangeMileage: 14129,
      currentMileage: 28866,
    },
    {
      id: 'ee5e2cb5-9880-43ed-b8f3-c93092c9b2c5',
      model: 'Van',
      licensePlate: '781-ABC',
      chassisNumber: 'CH-6943',
      year: 2022,
      photos: [
        'http://example.com/photo1.jpg',
        'http://example.com/photo2.jpg',
      ],
      purchaseDate: new Date(2004, 12, 14),
      licensingDate: new Date(2009, 11, 30),
      crlvPdf: 'http://example.com/crlv.pdf',
      driver: 'DR-8004',
      vehicleStatus: 'Revisado',
      oilChangeDate: new Date(2020, 6, 14),
      oilChangeMileage: 15700,
      currentMileage: 33818,
    },
    {
      id: '42863d74-1b0a-4434-b9e1-2b43c3836cef',
      model: 'Ônibus',
      licensePlate: '961-ABC',
      chassisNumber: 'CH-3962',
      year: 2000,
      photos: [
        'http://example.com/photo1.jpg',
        'http://example.com/photo2.jpg',
      ],
      purchaseDate: new Date(2018, 2, 22),
      licensingDate: new Date(2005, 6, 13),
      crlvPdf: 'http://example.com/crlv.pdf',
      driver: 'DR-1535',
      vehicleStatus: 'Em Manutenção',
      oilChangeDate: new Date(2017, 12, 24),
      oilChangeMileage: 17505,
      currentMileage: 75656,
    },
    {
      id: '893d5643-0407-487b-8e31-b5392cde76eb',
      model: 'Carro',
      licensePlate: '625-ABC',
      chassisNumber: 'CH-9785',
      year: 2003,
      photos: [
        'http://example.com/photo2.jpg',
        'http://example.com/photo1.jpg',
      ],
      purchaseDate: new Date(2018, 8, 23),
      licensingDate: new Date(2006, 7, 17),
      crlvPdf: 'http://example.com/crlv.pdf',
      driver: 'DR-9479',
      vehicleStatus: 'Em Viagem',
      oilChangeDate: new Date(2020, 1, 11),
      oilChangeMileage: 13997,
      currentMileage: 64789,
    },
    {
      id: '1ee44e09-7600-4452-8d7d-97397e74c377',
      model: 'Caminhão',
      licensePlate: '850-ABC',
      chassisNumber: 'CH-5036',
      year: 2006,
      photos: [
        'http://example.com/photo1.jpg',
        'http://example.com/photo2.jpg',
      ],
      purchaseDate: new Date(2005, 6, 27),
      licensingDate: new Date(2003, 5, 22),
      crlvPdf: 'http://example.com/crlv.pdf',
      driver: 'DR-2107',
      vehicleStatus: 'Revisado',
      oilChangeDate: new Date(2019, 3, 14),
      oilChangeMileage: 16806,
      currentMileage: 66754,
    },
  ]

  return vehicles || []
}