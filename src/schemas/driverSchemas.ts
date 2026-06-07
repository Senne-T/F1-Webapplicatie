import {z} from 'zod'

export const driverSchema = z.object({
  id: z.uuid(),

  firstName: z
    .string()
    .min(3, {error: 'Fist name must be at least 3 characters long.'})
    .max(255, {error: 'First name cannot be longer than 255 characters.'}),

  lastName: z
    .string()
    .min(3, {error: 'Last name must be at least 3 characters long.'})
    .max(255, {error: 'Last name cannot be longer than 255 characters.'}),

  nationality: z
    .string()
    .min(3, {error: 'Nationality must be at least 3 characters.'})
    .max(255, {error: 'Nationality cannot be longer than 255 characters.'}),

  number: z.preprocess(
    arg => (arg === '' ? undefined : Number(arg)),
    z.int({error: 'Number must be a number.'}).positive({error: 'Number must be positive.'}),
  ),

  birthDate: z.preprocess(
    arg => (typeof arg === 'string' ? new Date(arg) : arg),

    z
      .date({error: 'Invalid date. Use formate YYYY-MM-DD'})
  ),

  imageUrl: z.string({error: 'An image URL must be selected'}),

  teamId: z.uuid({error: 'A driver must have a team.'}),
})

export const createDriverSchema = driverSchema.omit({id: true})
export const updateDriverSchema = driverSchema
export const deleteDriverSchema = driverSchema.pick({id: true})
