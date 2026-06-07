import type {Prisma} from '@/generated/prisma/client'

export const driverWithTeamAndResultsInclude = {
  team: {
    select: {
      name: true,
    },
  },
  results: {
    select: {
      points: true,
      position: true,
    },
  },
} satisfies Prisma.DriverInclude

export type DriverWithTeamAndResults = Prisma.DriverGetPayload<{
  include: typeof driverWithTeamAndResultsInclude
}>
