import { z } from 'zod'

export const merchOrderSchema = z.object({
  merchId: z.number().int(),
  quantity: z.number().int().min(1).max(10),
})

export type MerchOrderInput = z.infer<typeof merchOrderSchema>