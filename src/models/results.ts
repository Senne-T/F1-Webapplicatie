import type {Prisma} from '@/generated/prisma/client'

export const resultWithDriverAndRaceInclude = {
  driver: true,
  race: true,
} satisfies Prisma.ResultInclude

export type ResultWithDriverAndRace = Prisma.ResultGetPayload<{
  include: typeof resultWithDriverAndRaceInclude
}>