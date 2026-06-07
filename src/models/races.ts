import type {Prisma} from '@/generated/prisma/client'

export const raceWithWinnerInclude = {
  circuit: {
    select: {name: true},
  },
  results: {
    select: {
      position: true,
      driver: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          team: {
            select: {name: true},
          },
        },
      },
    },
    where: {position: 1},
  },
} satisfies Prisma.RaceInclude

export type RaceWithWinner = Prisma.RaceGetPayload<{
  include: typeof raceWithWinnerInclude
}>

export const raceWithDriversAndResultsInclude = {
  circuit: {
    select: {name: true},
  },
  results: {
    select: {
      id: true,
      position: true,
      points: true,
      time: true,
      fastestLap: true,
      driver: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          team: {
            select: {name: true},
          },
        },
      },
    },
  },
} satisfies Prisma.RaceInclude

export type RaceWithDriversAndResults = Prisma.RaceGetPayload<{
  include: typeof raceWithDriversAndResultsInclude
}>