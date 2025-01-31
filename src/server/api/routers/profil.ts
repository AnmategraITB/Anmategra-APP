import {z} from "zod";
import {createTRPCRouter, publicProcedure,} from "~/server/api/trpc";
import {db} from "~/server/db";
import {eventOrganograms, events, mahasiswa, users} from "~/server/db/schema";
import {desc, eq} from "drizzle-orm";
import {Kepanitiaan} from "~/types/kepanitiaan";

export const profileRouter = createTRPCRouter({

    getMahasiswa: publicProcedure
        .input(z.object({mahasiswaId: z.string()}))
        .query(async ({ctx, input}) => {
            const mahasiswaResult = await db
                .select()
                .from(mahasiswa)
                .innerJoin(users, eq(mahasiswa.userId, users.id))
                .where(eq(users.id, input.mahasiswaId))
                .limit(1)

            const newestEvent = await db
                .select()
                .from(events)
                .innerJoin(eventOrganograms, eq(events.id, eventOrganograms.event_id))
                .where(eq(eventOrganograms.value, input.mahasiswaId))
                .orderBy(desc(events.start_date))

            const formattedKepanitiaan: Kepanitiaan[] = newestEvent.map((item) => ({
                lembaga: {
                    id: item.event.id,
                    name: item.event.name,
                    profilePicture: item.event.image,
                },
                name: item.event.name,
                description: item.event.description,
                quota: item.event.participant_count ?? 0,
                startDate: new Date(item.event.start_date),
                endDate: item.event.end_date ? new Date(item.event.end_date) : null,
            }));

            if (mahasiswaResult.length === 0) {
                return {
                    error: "Mahasiswa not found",
                }
            }

            return {
                mahasiswaData: mahasiswaResult[0],
                newestEvent: formattedKepanitiaan,
            }
        }),

    getLembaga: publicProcedure
        .input(z.object({lembagaId: z.string()}))
        .query(async ({ctx, input}) => {
            const lembaga = await ctx.db.query.lembaga.findFirst({
                where: (lembaga, {eq}) => eq(lembaga.id, input.lembagaId),
                columns: {
                    id: true,
                    name: true,
                    description: true,
                    image: true,
                    memberCount: true,
                    foundingDate: true,
                    endingDate: true,
                    type: true,
                },
            });

            if (!lembaga) {
                return {
                    error: "Lembaga not found",
                }
            }

            const newestEvent = await ctx.db.query.events.findMany({
                where: (events, {eq}) => eq(events.org_id, input.lembagaId) && eq(events.is_highlighted, false),
                orderBy: desc(events.start_date),
            });

            const formattedEvents: Kepanitiaan[] = newestEvent.map((item) => ({
                lembaga: {
                    id: item.id,
                    name: item.name,
                    profilePicture: item.image,
                },
                name: item.name,
                description: item.description,
                quota: item.participant_count ?? 0,
                startDate: new Date(item.start_date),
                endDate: item.end_date ? new Date(item.end_date) : null,
            }));

            const highlightedEvent = await ctx.db.query.events.findMany({
                where: (events, {eq}) => eq(events.org_id, input.lembagaId) && eq(events.is_highlighted, true),
                orderBy: desc(events.start_date),
            });

            return {
                lembagaData: lembaga,
                newestEvent: formattedEvents,
                highlightedEvent: highlightedEvent[0],
            }

        }),

    getKegiatan: publicProcedure
        .input(z.object({kegiatanId: z.string()}))
        .query(async ({ctx, input}) => {
            const kegiatan = await ctx.db.query.events.findFirst({
                where: (events, {eq}) => eq(events.id, input.kegiatanId),
                with: {
                    lembaga: {
                        columns: {
                            id: true,
                            name: true,
                            description: true,
                            image: true,
                        },
                    },
                    eventOrganograms: {
                        columns: {
                            eventOrganogram_id: true,
                            type: true,
                            value: true,
                        },
                    },
                },
                columns: {},
            });
            return kegiatan;
        }),
});