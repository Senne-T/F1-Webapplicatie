import type {Prisma} from '@/generated/prisma/client'
import {driverWithTeamAndResultsInclude} from '@/models/drivers'

export const teamWithDriversAndResultsInclude = {
  drivers: {
    include: driverWithTeamAndResultsInclude,
  },
} satisfies Prisma.TeamInclude

export type TeamWithDriversAndResults = Prisma.TeamGetPayload<{
  include: typeof teamWithDriversAndResultsInclude
}>
