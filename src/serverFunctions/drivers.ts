'use server'

import {protectedFormAction, protectedServerFunction} from '@/lib/serverFunctions'
import {createDriverSchema, deleteDriverSchema, updateDriverSchema} from '@/schemas/driverSchemas'
import {createDriver, deleteDriver, updateDriver} from '@/dal/drivers'
import {redirect} from 'next/navigation'
import {getLogger} from '@/lib/logger'
import {getSessionProfileFromCookie} from '@/lib/sessionUtils'

export const createDriverAction = protectedFormAction({
  schema: createDriverSchema,
  serverFn: async ({data}) => {
    const logger = await getLogger()
    logger.info('createDriverAction called')

    const profile = await getSessionProfileFromCookie()
    if (!profile) {
      logger.warn(`Unauthenticated user tried calling createDriverAction`)
      return
    }

    await createDriver({...data})

    logger.info('createDriverAction completed successfully')
    redirect('/drivers')
  },
  functionName: 'Create driver action'
})

export const deleteDriverServerAction = protectedServerFunction({
  schema: deleteDriverSchema,
  serverFn: async ({data}) => {
    const logger = await getLogger()
    logger.info('deleteDriverServerAction called')

    const profile = await getSessionProfileFromCookie()
    if (!profile) {
      logger.warn(`Unauthenticated user tried calling deleteDriverServerAction`)
      return
    }

    await deleteDriver(data.id)

    logger.info('deleteDriverServerAction completed successfully')
    redirect('/drivers')
  },
  functionName: 'Delete driver action'
})

export const updateDriverAction = protectedFormAction({
  schema: updateDriverSchema,
  serverFn: async ({data}) => {
    const logger = await getLogger()
    logger.info('updateDriverAction called')

    const profile = await getSessionProfileFromCookie()
    if (!profile) {
      logger.warn(`Unauthenticated user tried calling updateDriverAction`)
      return
    }

    await updateDriver({...data})

    logger.info('updateDriverAction completed successfully')
    redirect(`/drivers/${data.id}`)
  },
  functionName: 'Update driver action'
})