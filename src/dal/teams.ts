import 'server-only'

import type {Prisma, Team} from '@/generated/prisma/client'
import {prismaClient} from '@/dal/prismaClient'
import {type TeamWithDriversAndResults, teamWithDriversAndResultsInclude} from '@/models/teams'

export type CreateTeamParams = Prisma.TeamUncheckedCreateInput

export async function createTeam(teamInput: CreateTeamParams): Promise<Team> {
  return prismaClient.team.create({data: teamInput})
}

export async function getTeams(): Promise<Team[]> {
  return prismaClient.team.findMany()
}

export async function getTeamsWithPoints(): Promise<(TeamWithDriversAndResults & {totalPoints: number})[]> {
  const teams = await prismaClient.team.findMany({
    include: teamWithDriversAndResultsInclude,
  })

  return teams
    .map(team => ({
      ...team,
      totalPoints: team.drivers.reduce(
        (teamSum, driver) => teamSum + driver.results.reduce((sum, r) => sum + r.points, 0),
        0,
      ),
    }))
    .sort((a, b) => b.totalPoints - a.totalPoints)
}

export async function getTeam(id: string): Promise<Team> {
  return prismaClient.team.findUniqueOrThrow({where: {id: id}})
}

export async function getTeamWithDriversAndPoints(id: string): Promise<(TeamWithDriversAndResults & {totalPoints: number})> {
  const team = await prismaClient.team.findUniqueOrThrow({
    include: teamWithDriversAndResultsInclude,
    where: {id: id}
  })

  return {
    ...team,
    totalPoints: team.drivers.reduce(
      (teamSum, driver) => teamSum + driver.results.reduce((sum, r) => sum + r.points, 0),
      0,
    ),
  }
}

export async function deleteTeam(id: string): Promise<void> {
  await prismaClient.team.delete({where: {id: id}})
}

export type UpdateTeamParams = Prisma.TeamUncheckedUpdateInput & {id: string}

export async function updateTeam({id, ...team}: UpdateTeamParams): Promise<Team> {
  return prismaClient.team.update({where: {id}, data: team})
}
