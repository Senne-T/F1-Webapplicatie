import {getRacesWithDriversAndResults} from '@/dal/races'
import ResultsList from '@/app/(authenticated)/results/resultsList'


export default async function ResultsPage() {
  const races = await getRacesWithDriversAndResults()

  return <ResultsList races={races} />
}
