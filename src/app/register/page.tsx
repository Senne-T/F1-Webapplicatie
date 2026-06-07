'use client'

import Link from 'next/link'
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Flag} from 'lucide-react'
import {useZodValidatedForm} from '@/lib/useZodValidatedForm'
import {registerSchema} from '@/schemas/userSchemas'
import {registerAction} from '@/serverFunctions/users'
import Form from '@/components/custom/form'

export default function RegisterPage() {
  const [form, signUp] = useZodValidatedForm(registerSchema, registerAction)
  const {register} = form

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-primary">
            <Flag className="h-10 w-10 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">F1 TRACKER</CardTitle>
          <CardDescription>Create an account to start tracking F1</CardDescription>
        </CardHeader>
        <Form hookForm={form} action={signUp}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" type="text" placeholder="Lewis Hamilton" {...register('username')} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register('email')} placeholder="driver@f1.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...register('password')} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" type="password" {...register('passwordConfirmation')} required />
            </div>
              <Button className="w-full" size="lg" type="submit">
                Create Account
              </Button>
          </CardContent>
        </Form>
        <CardFooter className="flex flex-col gap-2">
          <div className="text-sm text-muted-foreground text-center">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
