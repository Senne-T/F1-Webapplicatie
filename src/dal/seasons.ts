import 'server-only'

import type {Prisma, Season} from '@/generated/prisma/client'
import {prismaClient} from '@/dal/prismaClient'

export type CreateSeasonParams = Prisma.SeasonUncheckedCreateInput

export async function createSeason(seasonInput: CreateSeasonParams): Promise<Season> {
  return prismaClient.season.create({data: seasonInput})
}

export async function getSeasons(): Promise<Season[]> {
  return prismaClient.season.findMany()
}

export async function getSeason(id: string): Promise<Season> {
  return prismaClient.season.findUniqueOrThrow({where: {id: id}})
}

export async function deleteSeason(id: string): Promise<void> {
  await prismaClient.season.delete({where: {id: id}})
}

export type UpdateSeasonParams = Prisma.SeasonUncheckedUpdateInput & {id: string}

export async function updateSeason({id, ...season}: UpdateSeasonParams): Promise<Season> {
  return prismaClient.season.update({where: {id}, data: season})
}
