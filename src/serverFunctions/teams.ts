'use server'

import {protectedFormAction, protectedServerFunction} from '@/lib/serverFunctions'
import {createTeamSchema, deleteTeamSchema, updateTeamSchema} from '@/schemas/teamSchemas'
import {createTeam, deleteTeam, updateTeam} from '@/dal/teams'
import {redirect} from 'next/navigation'
import {getLogger} from '@/lib/logger'
import {getSessionProfileFromCookie} from '@/lib/sessionUtils'

export const createTeamAction = protectedFormAction({
  schema: createTeamSchema,
  serverFn: async ({data}) => {
    const logger = await getLogger()
    logger.info('createTeamAction called')

    const profile = await getSessionProfileFromCookie()
    if (!profile) {
      logger.warn(`Unauthenticated user tried calling createTeamAction`)
      return
    }

    await createTeam({...data})

    logger.info('createTeamAction completed successfully')
    redirect('/teams')
  },
  functionName: 'Create team action'
})

export const deleteTeamServerFunction = protectedServerFunction({
  schema: deleteTeamSchema,
  serverFn: async ({data}) => {
    const logger = await getLogger()
    logger.info('deleteTeamServerFunction called')

    const profile = await getSessionProfileFromCookie()
    if (!profile) {
      logger.warn(`Unauthenticated user tried calling deleteTeamServerFunction`)
      return
    }

    await deleteTeam(data.id)

    logger.info('deleteTeamServerFunction completed successfully')
    redirect('/teams')
  },
  functionName: 'Delete team action'
})

export const updateTeamAction = protectedFormAction({
  schema: updateTeamSchema,
  serverFn: async ({data}) => {
    const logger = await getLogger()
    logger.info('updateTeamAction called')

    const profile = await getSessionProfileFromCookie()
    if (!profile) {
      logger.warn(`Unauthenticated user tried calling updateTeamAction`)
      return
    }

    await updateTeam({...data})

    logger.info('updateTeamAction completed successfully')
    redirect(`/teams/${data.id}`)
  },
  functionName: 'Update team action'
})