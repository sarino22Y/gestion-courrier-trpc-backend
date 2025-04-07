import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { ajouterCourrier, listerCourriers, listerUtilisateurs } from '../services/courrierService';

const t = initTRPC.create();

export const courrierRouter = t.router({
  ajouterCourrier: t.procedure
    .input(
      z.object({
        expediteurId: z.string().min(1),
        destinataireId: z.string().min(1),
        dateEnvoi: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        statut: z.enum(['ENVOYE', 'RECU', 'EN_ATTENTE']),
        description: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return await ajouterCourrier(input);
    }),

  listerCourriers: t.procedure.query(async () => {
    return await listerCourriers();
  }),

  listerUtilisateurs: t.procedure.query(async () => {
    return await listerUtilisateurs();
  }),
});

export type CourrierRouter = typeof courrierRouter;