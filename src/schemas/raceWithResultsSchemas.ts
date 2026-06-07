import {z} from 'zod'

export const raceWithResultsSchema = z.object({
  id: z.uuid(),

  name: z
    .string()
    .min(3, {error: 'Race name must be at least 3 characters long.'})
    .max(255, {error: 'Race name cannot be longer than 255 characters.'}),

  date: z.preprocess(
    arg => (typeof arg === 'string' ? new Date(arg) : arg),
    z.date({error: 'Invalid date. Use format YYYY-MM-DD'}),
  ),

  laps: z.preprocess(
    arg => (arg === '' ? undefined : Number(arg)),
    z.int({error: 'Laps must be a number.'}).positive({error: 'Laps must be positive.'}),
  ),

  completed: z.preprocess(
    arg => {
      if (typeof arg === 'string') {
        if (arg === 'true') return true
        if (arg === 'false') return false
      }
      return arg
    },
    z.boolean({error: 'Completed must be a boolean.'}),
  ),

  circuitId: z.uuid({error: 'A race must have a circuit.'}),
  seasonId: z.uuid({error: 'A race must belong to a season.'}),

  // Hier komen de resultaten direct in hetzelfde schema
  results: z.array(
    z.object({
      id: z.uuid().optional(),

      position: z.preprocess(
        arg => (arg === '' ? undefined : Number(arg)),
        z.int({error: 'Position must be a number.'}).positive({error: 'Position must be positive.'}),
      ),

      points: z.preprocess(
        arg => (arg === '' ? undefined : Number(arg)),
        z.int({error: 'Points must be a number.'}).nonnegative({error: 'Points cannot be negative.'}),
      ),

      time: z.preprocess(
        arg => (arg === '' ? undefined : arg),
        z.union([
          z
            .string()
            .min(3, {error: 'Time must be at least 3 characters long.'})
            .max(255, {error: 'Time cannot be longer than 255 characters.'})
            .optional(),
          z.literal(null),
        ]),
      ),

      fastestLap: z.preprocess(
        arg => (arg === '' ? undefined : arg),
        z.union([
          z
            .string()
            .min(3, {error: 'Fastest lap must be at least 3 characters long.'})
            .max(255, {error: 'Fastest lap cannot be longer than 255 characters.'})
            .optional(),
          z.literal(null),
        ]),
      ),

      driverId: z.uuid({error: 'Result must have a driver.'}),
    }),
  ),
})

export const createRaceWithResultsSchema = raceWithResultsSchema.omit({id: true})
export const updateRaceWithResultsSchema = raceWithResultsSchema
export const deleteRaceWithResultsSchema = raceWithResultsSchema.pick({id: true})