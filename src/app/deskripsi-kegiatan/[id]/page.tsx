"use client";

import React from 'react'
import Image from 'next/image'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { useRouter } from 'next/navigation';

const dummyData = [
{
  id: 1,
  namaLembaga: "Lembaga ABC",
  deskripsiLembaga: "Lembaga ABC adalah organisasi yang bergerak di bidang pendidikan.",
  deskripsiKegiatan: "Kegiatan ini bertujuan untuk meningkatkan keterampilan siswa.",
  detailKegiatan: "Detail kegiatan meliputi pelatihan, workshop, dan seminar."
},
{
  id: 2,
  namaLembaga: "Lembaga BLUBUK",
  deskripsiLembaga: "Lembaga BLUBUK adalah organisasi yang bergerak di bidang pendidikan.",
  deskripsiKegiatan: "Kegiatan ini bertujuan untuk meningkatkan keterampilan siswa.",
  detailKegiatan: "Detail kegiatan meliputi pelatihan, workshop, dan seminar."
},
];

const DeskripsiKegiatan = ({ params }: { params: { id: string } }) => {

  const { id } = params;

  // Find the kegiatan based on the ID
  const kegiatan = dummyData.find((dummy) => dummy.id === parseInt(id, 10));

  // Handle case where kegiatan is not found
  if (!kegiatan) {
    return (
      <main>
        <h1>Article not found</h1>
      </main>
    );
  }

  return (
    <main className='flex flex-col gap-10 w-[1066px] h-[786px] mx-auto m-10'>
      <section className='flex flex-row gap-10 items-center justify-center'>
        <div>
          <Image src="/images/logo blubuk.png" alt="logo" width={161} height={160}  className='rounded-full aspect-square object-cover'/>
        </div>
        <div className='w-[413px]'>
          <h1 className='text-[32px] font-semibold'>{kegiatan.namaLembaga}</h1>
          <p className='text-[24px] font-semibold text-[#8196A3]'>{kegiatan.deskripsiLembaga}</p>
        </div>
      </section>
      
      <section>
        <h2 className='text-[32px] font-semibold my-5'>Deskripsi Kegiatan</h2>
        <ScrollArea className="h-[200px] w-full rounded-xl bg-[#EFF3F5] border p-4 overflow-auto border-1 border-[#00000033] text-[#626262] text-[20px] font-normal">
          {kegiatan.deskripsiKegiatan}
        </ScrollArea>
      </section>

      <section>
        <h2 className='text-[32px] font-semibold my-5'>Detail Kegiatan</h2>
        <ScrollArea className="h-[200px] w-full rounded-xl bg-[#EFF3F5] border p-4 overflow-auto border-1 border-[#00000033] text-[#626262] text-[20px] font-normal">
          {kegiatan.detailKegiatan}
        </ScrollArea>
      </section>
      
    </main>
  )
}

export default DeskripsiKegiatan;