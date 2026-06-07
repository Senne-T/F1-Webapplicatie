import 'server-only'

import type {Prisma, Race} from '@/generated/prisma/client'
import {prismaClient} from '@/dal/prismaClient'
import type {RaceWithDriversAndResults} from '@/models/races'
import {raceWithDriversAndResultsInclude, type RaceWithWinner, raceWithWinnerInclude} from '@/models/races'

export type CreateRaceParams = Prisma.RaceUncheckedCreateInput

export async function createRace(raceInput: CreateRaceParams): Promise<Race> {
  return prismaClient.race.create({data: raceInput})
}

export async function getRaces(): Promise<Race[]> {
  return prismaClient.race.findMany()
}

export async function getCompletedRaces(): Promise<Race[]> {
  return prismaClient.race.findMany({
    where: {completed: true},
    }
  )
}

export async function getRecentRaces(limit = 3): Promise<RaceWithWinner[]> {
  return prismaClient.race.findMany({
    take: limit,
    orderBy: {date: 'desc'},
    include: raceWithWinnerInclude,
  })
}

export async function getRacesWithDriversAndResults(): Promise<RaceWithDriversAndResults[]> {
  return prismaClient.race.findMany({
    orderBy: {date: 'desc'},
    include: raceWithDriversAndResultsInclude,
  })
}

export async function getRace(id: string): Promise<Race> {
  return prismaClient.race.findUniqueOrThrow({where: {id: id}})
}

export async function getRaceWithDriversAndResults(id: string): Promise<RaceWithDriversAndResults> {
  return prismaClient.race.findUniqueOrThrow({
    where: {id: id},
    include: raceWithDriversAndResultsInclude,
  })
}

export async function deleteRace(id: string): Promise<void> {
  await prismaClient.race.delete({where: {id: id}})
}

export type UpdateRaceParams = Prisma.RaceUncheckedUpdateInput & {id: string}

export async function updateRace({id, ...race}: UpdateRaceParams): Promise<Race> {
  return prismaClient.race.update({where: {id}, data: race})
}
