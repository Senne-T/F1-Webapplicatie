import {z} from 'zod'

export const circuitSchema = z.object({
  id: z.uuid(),

  name: z
    .string()
    .min(3, {error: 'Circuit name must be at least 3 characters long.'})
    .max(255, {error: 'Circuit name cannot be longer than 255 characters.'}),

  country: z
    .string()
    .min(3, {error: 'Country must be at least 3 characters.'})
    .max(255, {error: 'Country cannot be longer than 255 characters.'}),

  city: z
    .string()
    .min(3, {error: 'City must be at least 3 characters.'})
    .max(255, {error: 'City cannot be longer than 255 characters.'}),

  lengthKm: z.float64({error: 'Length must be a float.'}).positive({error: 'Length must be positive.'}),
})

export const createCircuitSchema = circuitSchema.omit({id: true})
export const updateCircuitSchema = circuitSchema
export const deleteCircuitSchema = circuitSchema.pick({id: true})
