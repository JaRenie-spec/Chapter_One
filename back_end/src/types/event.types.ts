import { z } from 'zod';
import { RequestHandler } from 'express';
import { validateBody } from '../middlewares/validateBody';

export const eventSchema = z.object({
  title: z
    .string()
    .min(1, 'Le titre est requis'),
  description: z
    .string()
    .min(1, 'La description est requise'),
  dateEvent: z
    .string()
    .refine((s) => !isNaN(Date.parse(s)), { message: 'Date invalide (ISO attendu)' }),
});

export type EventInput = z.infer<typeof eventSchema>;
export const validateEvent: RequestHandler = validateBody(eventSchema);

/**
 * Représentation d'un Event tel qu'enregistré en base
 */
export interface Event {
  id: string;
  title: string;
  description: string;
  dateEvent: Date;
  authorId: string;
  createdByAdminId?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}
