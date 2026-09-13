import { z } from 'zod';

export const applicationSchema = z.object({
  eventId: z.number().int(),
  motivation: z.string().min(20, 'Tell us a bit more (20+ characters)'),
  availability: z.string().min(1, 'Required'),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;