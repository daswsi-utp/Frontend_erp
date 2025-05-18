import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui//form"
import { Input } from '@/components/ui//input'
import { Link } from "react-router-dom"
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const formSchema = z.object({
  email: z.string().email({ message: 'ingres un Correo válido' }),
  password: z.string().min(6, { message: 'Contraseña debe tener al menos 6 caracteres.' }),
})

export function FormLogin({ credentials, setCredentials, loginUser }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: credentials.email,
      password: credentials.password,
    },
  })

  const onSubmit = async (data) => {
    setCredentials(data)
    await loginUser(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} method='POST'>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl"></CardTitle>
            <CardDescription>
              Ingresa con tus credenciales
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Usuario</FormLabel>
                    <FormControl>
                      <Input placeholder="user@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <div className="flex items-center justify-between">
                      <FormLabel>Contraseña</FormLabel>
                      {/* <Link
                        to="/forgot-password"
                        className="text-sm font-medium text-muted-foreground hover:opacity-75"
                      >
                        Olvido su contraseña?
                      </Link> */}
                    </div>

                    <FormControl>
                      <Input id="password" type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit">Ingresar</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
