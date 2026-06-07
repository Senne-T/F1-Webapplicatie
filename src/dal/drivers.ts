import 'server-only'

import type {Prisma, Driver} from '@/generated/prisma/client'
import {prismaClient} from '@/dal/prismaClient'
import {type DriverWithTeamAndResults, driverWithTeamAndResultsInclude} from '@/models/drivers'

export type CreateDriverParams = Prisma.DriverUncheckedCreateInput

export async function createDriver(driverInput: CreateDriverParams): Promise<Driver> {
  return prismaClient.driver.create({data: driverInput})
}

export async function getDrivers(): Promise<Driver[]> {
  return prismaClient.driver.findMany()
}

export async function getDriversWithTeamAndPoints(): Promise<
  (DriverWithTeamAndResults & {totalPoints: number; wins: number})[]
> {
  const drivers = await prismaClient.driver.findMany({
    include: driverWithTeamAndResultsInclude,
  })

  return drivers
    .map(driver => ({
      ...driver,
      totalPoints: driver.results.reduce((sum, r) => sum + r.points, 0),
      wins: driver.results.filter(r => r.position === 1).length,
    }))
    .sort((a, b) => b.totalPoints - a.totalPoints)
}

export async function getDriver(id: string): Promise<Driver> {
  return prismaClient.driver.findUniqueOrThrow({where: {id: id}})
}

export async function getDriverWithTeamAndPoints(id: string,): Promise<(DriverWithTeamAndResults & {totalPoints: number; wins: number; podiums: number})>{
  const driver = await prismaClient.driver.findUniqueOrThrow({
    include: driverWithTeamAndResultsInclude,
    where: {id: id}
    })

  return {
    ...driver,
    totalPoints: driver.results.reduce((sum, r) => sum + r.points, 0),
    wins: driver.results.filter(r => r.position === 1).length,
    podiums: driver.results.filter(r => r.position <= 3).length,
  }
}

export async function deleteDriver(id: string): Promise<void> {
  await prismaClient.driver.delete({where: {id: id}})
}

export type UpdateDriverParams = Prisma.DriverUncheckedUpdateInput & {id: string}

export async function updateDriver({id, ...driver}: UpdateDriverParams): Promise<Driver> {
  return prismaClient.driver.update({where: {id}, data: driver})
}
