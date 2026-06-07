import {z} from 'zod'

export const teamSchema = z.object({
  id: z.uuid(),

  name: z
    .string()
    .min(3, {error: 'Team name must be at least 3 characters long.'})
    .max(255, {error: 'Team name cannot be longer than 255 characters.'}),

  location: z
    .string()
    .min(3, {error: 'Location must be at least 3 characters long.'})
    .max(255, {error: 'Location cannot be longer than 255 characters.'}),

  principal: z
    .string()
    .min(3, {error: 'Principal must be at least 3 characters long.'})
    .max(255, {error: 'Principal cannot be longer than 255 characters.'}),

  engine: z
    .string()
    .min(3, {error: 'Engine must be at least 3 characters long.'})
    .max(255, {error: 'Engine cannot be longer than 255 characters.'}),

  chassis: z
    .string()
    .min(3, {error: 'Chassis must be at least 3 characters long.'})
    .max(255, {error: 'Chassis cannot be longer than 255 characters.'}),

  firstEntry: z.preprocess(
    arg => (arg === '' ? undefined : Number(arg)),
    z.int({error: 'First entry must be a number.'}).positive({error: 'Number must be positive.'}),
  ),

  championships: z.preprocess(
    arg => (arg === '' ? undefined : Number(arg)),
    z.int({error: 'Championships must be a number.'}).positive({error: 'Championships must be positive.'}),
  ),

  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, {message: 'Color must be a valid hex code, e.g. #DC0000'}),

  imageUrl: z.string({error: 'An image URL must be selected'}),
})

export const createTeamSchema = teamSchema.omit({id: true})
export const updateTeamSchema = teamSchema
export const deleteTeamSchema = teamSchema.pick({id: true})
