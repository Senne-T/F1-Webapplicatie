import 'server-only'

import type {Circuit, Prisma} from '@/generated/prisma/client'
import {prismaClient} from '@/dal/prismaClient'

export type CreateCircuitParams = Prisma.CircuitUncheckedCreateInput

export async function createCircuit(circuitInput: CreateCircuitParams): Promise<Circuit> {
  return prismaClient.circuit.create({data: circuitInput})
}

export async function getCircuits(): Promise<Circuit[]> {
  return prismaClient.circuit.findMany()
}

export async function getCircuit(id: string): Promise<Circuit> {
  return prismaClient.circuit.findUniqueOrThrow({where: {id: id}})
}

export async function deleteCircuit(id: string): Promise<void> {
  await prismaClient.circuit.delete({where: {id: id}})
}

export type UpdateCircuitParams = Prisma.CircuitUncheckedUpdateInput & {id: string}

export async function updateCircuit({id, ...circuit}: UpdateCircuitParams): Promise<Circuit> {
  return prismaClient.circuit.update({where: {id}, data: circuit})
}