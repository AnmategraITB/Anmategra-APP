import Link from "next/link";
import Image from "next/image";

import { LatestPost } from "~/app/_components/post";
import { getServerAuthSession } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import DeskripsiKegiatan from "./deskripsi-kegiatan/[id]/page";

const dummyData = {
  namaLembaga: "Lembaga ABC",
  deskripsiLembaga: "Lembaga ABC adalah organisasi yang bergerak di bidang pendidikan.",
  deskripsiKegiatan: "Kegiatan ini bertujuan untuk meningkatkan keterampilan siswa.",
  detailKegiatan: "Detail kegiatan meliputi pelatihan, workshop, dan seminar."
};


export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  void api.post.getLatest.prefetch();

  return (
    <div>

    </div>
  );
}