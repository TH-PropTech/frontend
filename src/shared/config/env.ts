import { z } from 'zod'

const booleanStringSchema = z
  .enum(['true', 'false'])
  .default('false')
  .transform(value => value === 'true')

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url().default('http://localhost:3001/api/v1'),
  NEXT_PUBLIC_APP_ENV: z
    .enum(['local', 'development', 'staging', 'production', 'test'])
    .default('local'),
  NEXT_PUBLIC_ENABLE_MOCKS: booleanStringSchema,
})

const parsedEnv = envSchema.parse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
  NEXT_PUBLIC_ENABLE_MOCKS: process.env.NEXT_PUBLIC_ENABLE_MOCKS,
})

export const env = {
  apiUrl: parsedEnv.NEXT_PUBLIC_API_URL,
  appEnv: parsedEnv.NEXT_PUBLIC_APP_ENV,
  enableMocks: parsedEnv.NEXT_PUBLIC_ENABLE_MOCKS,
} as const
