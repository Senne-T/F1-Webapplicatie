import {type PrismaClient, Role} from '@/generated/prisma/client'
import {hashPassword} from '@/lib/passwordUtils'

export const seedDev = async (prisma: PrismaClient) => {
  console.log('Gebruiker(s) aanmaken...')
  await prisma.user.createMany({
    data: [
      {
        email: 'admin@f1.com',
        username: 'admin',
        password: hashPassword('Test123#'),
        role: Role.User,
      },
    ],
  })
  console.log('Gebruiker(s) aangemaakt!')

  console.log('\nSeizoenen aanmaken...')
  for (let year = 2016; year <= 2025; year++) {
    await prisma.season.create({
      data: {
        year: year,
      },
    })
  }
  console.log('Seizoenen aangemaakt!')

  const season2025 = await prisma.season.findUnique({
    where: {year: 2025},
  })

  console.log('\nCircuits aanmaken...')
  await prisma.circuit.createMany({
    data: [
      {name: 'Bahrain International Circuit', country: 'Bahrain', city: 'Sakhir', lengthKm: 5.41},
      {name: 'Jeddah Corniche Circuit', country: 'Saudi Arabia', city: 'Jeddah', lengthKm: 6.17},
      {name: 'Albert Park Circuit', country: 'Australia', city: 'Melbourne', lengthKm: 5.28},
      {name: 'Suzuka Circuit', country: 'Japan', city: 'Suzuka', lengthKm: 5.81},
      {name: 'Shanghai International Circuit', country: 'China', city: 'Shanghai', lengthKm: 5.45},
      {name: 'Circuit de Monaco', country: 'Monaco', city: 'Monte Carlo', lengthKm: 3.34},
      {name: 'Circuit de Spa-Francorchamps', country: 'Belgium', city: 'Stavelot', lengthKm: 7.0},
      {name: 'Silverstone Circuit', country: 'United Kingdom', city: 'Silverstone', lengthKm: 5.89},
      {name: 'Circuit of the Americas', country: 'USA', city: 'Austin', lengthKm: 5.51},
      {name: 'Autodromo Nazionale Monza', country: 'Italy', city: 'Monza', lengthKm: 5.79},
    ],
  })
  console.log('Circuits aangemaakt!')

  const allCircuits = await prisma.circuit.findMany()

  console.log('\nTeams aanmaken...')
  await prisma.team.createMany({
    data: [
      {
        name: 'Red Bull Racing',
        location: 'Milton Keynes, UK',
        principal: 'Christian Horner',
        engine: 'Red Bull Powertrains',
        chassis: 'RB21',
        firstEntry: 2005,
        championships: 6,
        color: '#1E41FF',
        imageUrl: '/teams/red-bull.jpg',
      },
      {
        name: 'Mercedes',
        location: 'Brackley, UK',
        principal: 'Toto Wolff',
        engine: 'Mercedes',
        chassis: 'W16',
        firstEntry: 1970,
        championships: 8,
        color: '#00D2BE',
        imageUrl: '/teams/mercedes.jpg',
      },
      {
        name: 'Ferrari',
        location: 'Maranello, Italy',
        principal: 'Frédéric Vasseur',
        engine: 'Ferrari',
        chassis: 'SF-25',
        firstEntry: 1950,
        championships: 16,
        color: '#DC0000',
        imageUrl: '/teams/ferrari.jpg',
      },
      {
        name: 'McLaren',
        location: 'Woking, UK',
        principal: 'Andrea Stella',
        engine: 'Mercedes',
        chassis: 'MCL39',
        firstEntry: 1966,
        championships: 8,
        color: '#FF8700',
        imageUrl: '/teams/mclaren.jpg',
      },
      {
        name: 'Aston Martin',
        location: 'Silverstone, UK',
        principal: 'Mike Krack',
        engine: 'Mercedes',
        chassis: 'AMR25',
        firstEntry: 2021,
        championships: 0,
        color: '#006F62',
        imageUrl: '/teams/aston-martin.jpg',
      },
      {
        name: 'Alfa Romeo',
        location: 'Hinwil, Switzerland',
        principal: 'Frédéric Vasseur',
        engine: 'Ferrari',
        chassis: 'C45',
        firstEntry: 1950,
        championships: 0,
        color: '#00FF87',
        imageUrl: '/teams/sauber.jpg',
      },
      {
        name: 'AlphaTauri',
        location: 'Faenza, Italy',
        principal: 'Franz Tost',
        engine: 'Red Bull Powertrains',
        chassis: 'VCARB 02',
        firstEntry: 1985,
        championships: 0,
        color: '#1434CB',
        imageUrl: '/teams/racing-bulls.jpg',
      },
      {
        name: 'Haas F1 Team',
        location: 'Kannapolis, USA',
        principal: 'Guenther Steiner',
        engine: 'Ferrari',
        chassis: 'VF-25',
        firstEntry: 2016,
        championships: 0,
        color: '#E10600',
        imageUrl: '/teams/haas.jpg',
      },
      {
        name: 'Williams',
        location: 'Grove, UK',
        principal: 'Jost Capito',
        engine: 'Mercedes',
        chassis: 'FW47',
        firstEntry: 1977,
        championships: 9,
        color: '#005AFF',
        imageUrl: '/teams/williams.jpg',
      },
      {
        name: 'Alpine',
        location: 'Enstone, UK',
        principal: 'Laurent Rossi',
        engine: 'Renault',
        chassis: 'A525',
        firstEntry: 2021,
        championships: 0,
        color: '#0090FF',
        imageUrl: '/teams/alpine.jpg',
      },
    ],
  })
  console.log('Teams aangemaakt!')

  const allTeams = await prisma.team.findMany()

  console.log('\nCoureurs aanmaken...')
  await prisma.driver.createMany({
    data: [
      {
        firstName: 'Max',
        lastName: 'Verstappen',
        nationality: 'Dutch',
        number: 1,
        birthDate: new Date('1997-09-30'),
        imageUrl: '/drivers/max-verstappen.jpg',
        teamId: allTeams[0].id,
      },
      {
        firstName: 'Sergio',
        lastName: 'Perez',
        nationality: 'Mexican',
        number: 11,
        birthDate: new Date('1990-01-26'),
        imageUrl: '/drivers/sergio-perez.jpg',
        teamId: allTeams[0].id,
      },
      {
        firstName: 'Lewis',
        lastName: 'Hamilton',
        nationality: 'British',
        number: 44,
        birthDate: new Date('1985-01-07'),
        imageUrl: '/drivers/lewis-hamilton.jpg',
        teamId: allTeams[1].id,
      },
      {
        firstName: 'George',
        lastName: 'Russell',
        nationality: 'British',
        number: 63,
        birthDate: new Date('1998-02-15'),
        imageUrl: '/drivers/george-russel.jpg',
        teamId: allTeams[1].id,
      },
      {
        firstName: 'Charles',
        lastName: 'Leclerc',
        nationality: 'Monégasque',
        number: 16,
        birthDate: new Date('1997-10-16'),
        imageUrl: '/drivers/charles-leclerc.jpg',
        teamId: allTeams[2].id,
      },
      {
        firstName: 'Carlos',
        lastName: 'Sainz',
        nationality: 'Spanish',
        number: 55,
        birthDate: new Date('1994-09-01'),
        imageUrl: '/drivers/carlos-sainz.jpg',
        teamId: allTeams[2].id,
      },
      {
        firstName: 'Lando',
        lastName: 'Norris',
        nationality: 'British',
        number: 4,
        birthDate: new Date('1999-11-13'),
        imageUrl: '/drivers/lando-norris.jpg',
        teamId: allTeams[3].id,
      },
      {
        firstName: 'Oscar',
        lastName: 'Piastri',
        nationality: 'Australian',
        number: 81,
        birthDate: new Date('2001-04-06'),
        imageUrl: '/drivers/oscar-piastri.jpg',
        teamId: allTeams[3].id,
      },
      {
        firstName: 'Fernando',
        lastName: 'Alonso',
        nationality: 'Spanish',
        number: 14,
        birthDate: new Date('1981-07-29'),
        imageUrl: '/drivers/fernando-alonso.jpg',
        teamId: allTeams[4].id,
      },
      {
        firstName: 'Lance',
        lastName: 'Stroll',
        nationality: 'Canadian',
        number: 18,
        birthDate: new Date('1998-10-29'),
        imageUrl: '/drivers/lance-stroll.jpg',
        teamId: allTeams[4].id,
      },
    ],
  })
  console.log('Coureurs aangemaakt!')

  const allDrivers = await prisma.driver.findMany()

  console.log('\nGrand Prix met results aanmaken...')
  for (let i = 0; i < 10; i++) {
    const race = await prisma.race.create({
      data: {
        name: `Grand Prix ${i + 1}`,
        date: new Date(2024, i, 10),
        laps: 57,
        completed: true,
        circuitId: allCircuits[i].id,
        seasonId: season2025!.id,
      },
    })

    for (let pos = 0; pos < 10; pos++) {
      const totalSeconds = 5400 + pos * 5
      const hours = Math.floor(totalSeconds / 3600)
      const minutes = Math.floor((totalSeconds % 3600) / 60)
      const seconds = totalSeconds % 60

      const baseLapMs = 83523
      const lapTimeMs = baseLapMs + pos * 200
      const lapMinutes = Math.floor(lapTimeMs / 60000)
      const lapSeconds = Math.floor((lapTimeMs % 60000) / 1000)
      const lapMs = lapTimeMs % 1000

      await prisma.result.create({
        data: {
          raceId: race.id,
          driverId: allDrivers[pos].id,
          position: pos + 1,
          points: 25 - pos * 2,
          time: `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`,
          fastestLap: `${lapMinutes}:${String(lapSeconds).padStart(2, '0')}.${String(lapMs).padStart(3, '0')}`,
        },
      })
    }
  }
  console.log('Grand Prix aangemaakt!')
}
