import { z } from 'zod'

import { createEnv } from '@t3-oss/env-nextjs'

export const env = createEnv({
  server: {},

  client: {
    NEXT_PUBLIC_API_BASE_URL: z.string().url(),
  },
  shared: {},
  runtimeEnv: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
})
