'use server'

import {protectedFormAction, protectedServerFunction} from '@/lib/serverFunctions'
import {createCircuitSchema, deleteCircuitSchema, updateCircuitSchema} from '@/schemas/circuitSchemas'
import {createCircuit, deleteCircuit, updateCircuit} from '@/dal/circuits'
import {redirect} from 'next/navigation'
import {getLogger} from '@/lib/logger'
import {getSessionProfileFromCookie} from '@/lib/sessionUtils'

export const createCircuitAction = protectedFormAction({
  schema: createCircuitSchema,
  serverFn: async ({data}) => {
    const logger = await getLogger()
    logger.info('createCircuitAction called')

    const profile = await getSessionProfileFromCookie()
    if (!profile) {
      logger.warn(`Unauthenticated user tried calling createCircuitAction`)
      return
    }

    await createCircuit({...data})

    logger.info('createCircuitAction completed successfully')
    redirect('/circuits/manage')
  },
  functionName: 'Create circuit action',
})

export const deleteCircuitServerAction = protectedServerFunction({
  schema: deleteCircuitSchema,
  serverFn: async ({data}) => {
    const logger = await getLogger()
    logger.info('deleteCircuitServerAction called')

    const profile = await getSessionProfileFromCookie()
    if (!profile) {
      logger.warn(`Unauthenticated user tried calling deleteCircuitServerAction`)
      return
    }

    await deleteCircuit(data.id)

    logger.info('deleteCircuitServerAction completed successfully')
    redirect('/circuits/manage')
  },
  functionName: 'Delete circuit action',
})

export const updateCircuitAction = protectedFormAction({
  schema: updateCircuitSchema,
  serverFn: async ({data}) => {
    const logger = await getLogger()
    logger.info('updateCircuitAction called')

    const profile = await getSessionProfileFromCookie()
    if (!profile) {
      logger.warn(`Unauthenticated user tried calling updateCircuitAction`)
      return
    }

    await updateCircuit({...data})

    logger.info('updateCircuitAction completed successfully')
    redirect(`/circuits/manage`)
  },
  functionName: 'Update circuit action',
})
