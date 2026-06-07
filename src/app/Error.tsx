'use client'
import {type FunctionComponent} from 'react'
import {Card, CardContent} from '@/components/ui/card'
import {AlertCircle} from 'lucide-react'
import {Button} from '@/components/ui/button'
import Link from 'next/link'
import {useCookie} from '@/lib/useCookie'

const Error: FunctionComponent = () => {
  const requestId = useCookie('requestId')

  return (
    <div className="min-h-screen w-full flex items-center justify-center ">
      <Card className="max-w-2xl w-full shadow-lg ring-1 ring-slate-200">
        <CardContent className="p-8 flex flex-col md:flex-row items-center gap-6">
          {/* Text */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 text-red-600">
              <AlertCircle className="h-6 w-6" />
              <h2 className="text-2xl font-semibold text-slate-900">Something went wrong</h2>
            </div>

            <p className="mt-3 text-sm text-slate-600">We couldn't process your request, try refreshing the page.</p>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:gap-3 justify-center md:justify-start">
              <Link href="/login">
                <Button>Take me home</Button>
              </Link>

              <Link className="mt-3 sm:mt-0 text-sm text-slate-500 hover:underline" href="#">
                Refresh page
              </Link>
            </div>

            <p className="mt-4 text-xs text-slate-400">If the problem persists, contact support or try again later.</p>
            <p className="text-xs text-slate-400">Request ID: {requestId}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Error