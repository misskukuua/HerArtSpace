import { createFileRoute } from '@tanstack/react-router'
import { z } from "zod";

import SignUpPage from '@/pages/SignUpPage'

export const Route = createFileRoute('/signup')({
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
}).update({
  component: SignUpPage,
})
