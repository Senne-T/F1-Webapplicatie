'use server'

import {protectedFormAction, protectedServerFunction} from '@/lib/serverFunctions'
import {
  createRaceWithResultsSchema,
  deleteRaceWithResultsSchema,
  updateRaceWithResultsSchema,
} from '@/schemas/raceWithResultsSchemas'
import {createRace, deleteRace, updateRace} from '@/dal/races'
import {createResult, deleteResultsByRaceId, updateResult} from '@/dal/results'
import {redirect} from 'next/navigation'
import {getLogger} from '@/lib/logger'
import {getSessionProfileFromCookie} from '@/lib/sessionUtils'

export const createRaceWithResultsAction = protectedFormAction({
  schema: createRaceWithResultsSchema,
  serverFn: async ({data}) => {
    const logger = await getLogger()
    logger.info('createRaceWithResultsAction called')

    const profile = await getSessionProfileFromCookie()
    if (!profile) {
      logger.warn(`Unauthenticated user tried calling createRaceWithResultsAction`)
      return
    }

    const race = await createRace({
      name: data.name,
      circuitId: data.circuitId,
      date: data.date,
      laps: data.laps,
      completed: data.completed,
      seasonId: data.seasonId,
    })

    for (const result of data.results) {
      await createResult({
        ...result,
        raceId: race.id,
      })
    }

    logger.info('createRaceWithResultsAction completed successfully')
    redirect('/results')
  },
  functionName: 'Create race with results',
})

export const deleteRaceWithResultsServerFunction = protectedServerFunction({
  schema: deleteRaceWithResultsSchema,
  serverFn: async ({data}) => {
    const logger = await getLogger()
    logger.info('deleteRaceWithResultsServerFunction called')

    const profile = await getSessionProfileFromCookie()
    if (!profile) {
      logger.warn(`Unauthenticated user tried calling deleteRaceWithResultsServerFunction`)
      return
    }

    await deleteResultsByRaceId(data.id)
    await deleteRace(data.id)

    logger.info('deleteRaceWithResultsServerFunction completed successfully')
    redirect('/results')
  },
  functionName: 'Delete race with results',
})

export const updateRaceWithResultsAction = protectedFormAction({
  schema: updateRaceWithResultsSchema,
  serverFn: async ({data}) => {
    const logger = await getLogger()
    logger.info('updateRaceWithResultsAction called')

    const profile = await getSessionProfileFromCookie()
    if (!profile) {
      logger.warn(`Unauthenticated user tried calling updateRaceWithResultsAction`)
      return
    }

    const {results, ...raceData} = data
    await updateRace(raceData)

    for (const result of results) {
      if (result.id && result.id !== '') {
        await updateResult({
          id: result.id,
          raceId: data.id,
          position: result.position,
          points: result.points,
          driverId: result.driverId,
          time: result.time,
          fastestLap: result.fastestLap,
        })
      } else {
        await createResult({
          raceId: data.id,
          position: result.position,
          points: result.points,
          driverId: result.driverId,
          time: result.time,
          fastestLap: result.fastestLap,
        })
      }
    }

    logger.info('updateRaceWithResultsAction completed successfully')
    redirect(`/results`)
  },
  functionName: 'Update race with results',
})
