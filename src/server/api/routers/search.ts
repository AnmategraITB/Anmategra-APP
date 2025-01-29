import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const searchRouter = createTRPCRouter({
  getResults: publicProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ input }) => {
      const { query } = input;
      const limit = 50;

      const mahasiswaQuery = isNaN(parseInt(query)) ? [] : await db.query.mahasiswa.findMany({
        where: (mahasiswa, { eq }) => eq(mahasiswa.nim, parseInt(query)), // Use equality check directly
        limit,
        with: {
          users: true, // Ensure this join is valid
        },
      });

      const lembaga = await db.query.lembaga.findMany({
        where: (lembaga, { ilike }) => ilike(lembaga.name, `%${query}%`),
        limit,
      });

      const events = await db.query.events.findMany({
        where: (event, { ilike }) => ilike(event.name, `%${query}%`),
        limit,
      });

      return {
        mahasiswa: mahasiswaQuery.map(m => ({
          id: m.userId,
          nama: m.users?.name || "Unknown", // Safely access name
          jurusan: m.jurusan,
          angkatan: m.angkatan,
        })),
        lembaga: lembaga.map(l => ({
          id: l.id,
          nama: l.name,
          deskripsi: l.description,
        })),
        events: events.map(e => ({
          id: e.id,
          nama: e.name,
          deskripsi: e.description,
          start_date: e.start_date,
        })),
      };
    }),
});
