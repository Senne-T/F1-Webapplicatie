import 'server-only'

import type {Prisma, Result} from '@/generated/prisma/client'
import {prismaClient} from '@/dal/prismaClient'

export type CreateResultParams = Prisma.ResultUncheckedCreateInput

export async function createResult(resultInput: CreateResultParams): Promise<Result> {
  return prismaClient.result.create({data: resultInput})
}

export async function getResults(): Promise<Result[]> {
  return prismaClient.result.findMany()
}

export async function getResult(id: string): Promise<Result> {
  return prismaClient.result.findUniqueOrThrow({where: {id: id}})
}

export async function deleteResult(id: string): Promise<void> {
  await prismaClient.result.delete({where: {id: id}})
}

export async function deleteResultsByRaceId(raceId: string): Promise<void> {
  await prismaClient.result.deleteMany({
    where: {
      raceId,
    },
  })
}

export type UpdateResultParams = Prisma.ResultUncheckedUpdateInput & {id: string}

export async function updateResult({id, ...result}: UpdateResultParams): Promise<Result> {
  return prismaClient.result.update({where: {id}, data: result})
}
