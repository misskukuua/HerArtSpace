import { createFileRoute } from '@tanstack/react-router'
import { z } from "zod";

import LoginPage from '@/pages/LoginPage'

export const Route = createFileRoute('/login')({
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
}).update({
  component: LoginPage,
})
