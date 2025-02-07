// Library Import
import React from 'react'
import { getServerAuthSession } from "~/server/auth";
import Link from 'next/link';
import { api } from "~/trpc/server";
// Components Import
import {EventHeader} from "~/app/_components/placeholder/event-header";
import {PenyelenggaraCard} from "~/app/_components/placeholder/penyelenggara-card";
import ProfileKegiatanComp from "~/app/profil-kegiatan/[profileKegiatanId]/profileKegiatanComp";
import MahasiswaSidebar from "~/app/_components/MahasiswaSidebar";

const ProfileKegiatan = async (
    {
        params
    }: {
        params: Promise<{ profileKegiatanId: string }>
    }
) => {
    const session = await getServerAuthSession();
    const query = (await params).profileKegiatanId
    const {kegiatan, lembaga, participant, error} = await api.profil.getKegiatan({kegiatanId: query})


    if (error) {
        return (
            <>
                <div className="mb-4">
                    <h1 className="text-2xl font-semibold text-slate-600">Kegiatan</h1>
                </div>

                        <div className="flex w-full flex-col gap-4 p-6">
                            <h1 className="text-2xl font-semibold text-neutral-1000">{error}</h1>
                </div>
            </>
        )
    }

    return (
        <div>
            <div className='w-full flex justify-between fixed z-20'>
                <MahasiswaSidebar session={session?.user.id ?? ""}/>
            </div>
            <div className='w-full flex min-h-screen flex-col items-center pt-14'>
                <div className="w-full max-w-7xl bg-slate-50 py-6">
                    <div className="mb-4">
                        <h1 className="text-2xl font-semibold text-slate-600">Kegiatan</h1>
                    </div>
                    <EventHeader
                        title={kegiatan?.name ?? 'null'}
                        organizer={lembaga?.name ?? 'null'}
                        backgroundImage={kegiatan?.background_image ?? "/profile-kegiatan-placeholder/kegiatan-header-background.png"}
                        logoImage={kegiatan?.image ?? "/profile-kegiatan-placeholder/oskm-header.png"}
                    />
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-2xl font-semibold text-slate-600">
                            Penyelenggara
                        </h2>
                    </div>
                    <Link href={`/profil-lembaga/${lembaga?.id}`}>
                        <PenyelenggaraCard
                            title={lembaga?.name ?? 'null'}
                            category={lembaga?.type ?? 'null'}
                            logo={lembaga?.image ??"/profile-kegiatan-placeholder/oskm-organizer.png"}
                        />
                    </Link>
                    <ProfileKegiatanComp anggota={participant ?? []}/>
                </div>
            </div>
        </div>
  )
}

export default ProfileKegiatan