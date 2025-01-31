// Library Impoty
import Image from "next/image";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
// Component Import
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { KegiatanContainer } from "./_components/kegiatanContainer";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import TambahKegiatanForm from "~/app/_components/kegiatan/TambahKegiatanForm";
// Icons Import
import Plus from "~/../public/icons/plus.svg";
import Filter from "~/../public/icons/filter.svg";
import SearchIcon from "~/../public/icons/search.svg";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export default async function Home() {

  // Get activities from API
  const activitites = await api.kegiatan.getAllByLembaga(); // Belum ada Auth
  const formattedActivities = activitites.map((activity) => ({
    id: activity.id,
    name: activity.name,
    description: activity.description,
    start_date: activity.start_date.toLocaleDateString(),
    participant_count: activity.participant_count,
    status: activity.status,
    thumbnail: activity.image,
  }));

  return (
    <main className="flex flex-row bg-[#FAFAFA] w-full p-6">
      {/* Content */}
      <div className="flex-1 space-y-8">
        {/* Search Bar */}
        <div className="w-full">
          <p className="text-2xl mb-4 font-semibold">Kegiatan</p>
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative w-full">
              <Image
                src={SearchIcon}
                alt="Search"
                width={20}
                height={20}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <Input
                placeholder="Cari nama anggota"
                className="rounded-2xl bg-white placeholder:text-neutral-700 focus-visible:ring-transparent"
                startAdornment={
                  <MagnifyingGlassIcon className="size-4 text-gray-500" />
                }
              />
            </div>
          </div>
        </div>

        {/* List Kegiatan */}
        <div>
          {/* Button Section */}
          <div className="flex justify-between">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-[#00B7B7] text-white rounded-[16px] px-4 shadow-none flex items-center gap-2">
                  <Image src={Plus} alt="plus" width={16} height={16} />
                  Tambah Kegiatan Baru
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Tambah Kegiatan</DialogTitle>
                </DialogHeader>
                <TambahKegiatanForm />
              </DialogContent>
            </Dialog>

            {/* Filter Button */}
            <Button className="bg-white text-black rounded-[24px] px-4 shadow-none border border-neutral-400 flex items-center gap-2">
              <Image src={Filter} alt="filter" width={16} height={16} />
              Filter
            </Button>
          </div>

          {/* List Kegiatan Section */}
          <div>
            {/* Integrate KegiatanContainer here */}
            <KegiatanContainer />
          </div>
        </div>
      </div>
    </main>
  );
}
