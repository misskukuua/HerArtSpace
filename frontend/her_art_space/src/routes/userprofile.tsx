import { createFileRoute } from '@tanstack/react-router'
import { z } from "zod";

import UserProfilePage from '@/pages/UserProfilePage'

export const Route = createFileRoute('/userprofile')({
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
}).update({
  component: UserProfilePage,
})
