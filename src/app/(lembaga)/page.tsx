'use client'
// Library Import
import { useState } from "react";
import Link from "next/link";
// Components Import
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { KepanitiaanCard } from "../_components/beranda/KepanitiaanCard";
import LembagaCard from "../_components/beranda/LembagaCard";
// Icons Import
import { ChevronRightIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
// Constants Import
import { KEPANITIAAN_DATA, SearchResultKegiatan, SearchResultLembaga, SearchResultMahasiswa } from "~/lib/constants";
import MahasiswaCard from "../_components/beranda/MahasiswaCard";
// Asset Import
import dummyProfile from "public/placeholder/profilepic.png"
import dummyLembaga from "public/logo-hmif.png"

export default function Home() {
  const [isSearchBegin, setIsSearchBegin] = useState(false)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setIsSearchBegin(value.trim() !== "");
  };

  return (
    <div className="flex w-full flex-col gap-4 p-6">
      {/* Title and Search */}
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold text-neutral-1000">Beranda</h1>
        <Input
          placeholder="Cari lembaga, kegiatan, atau mahasiswa"
          className="rounded-2xl bg-white focus-visible:ring-transparent placeholder:text-neutral-700"
          startAdornment={
            <MagnifyingGlassIcon className="size-4 text-gray-500" />
          }
          onChange={handleSearchChange}
        />
      </div>

      {/* List of Kepanitiaan */}
      {!isSearchBegin && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold">Kepanitiaan Terbaru</h2>
            <Button variant="ghost" className="flex items-center gap-2">
              Lihat Semua
              <ChevronRightIcon />
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {KEPANITIAAN_DATA.map((kepanitiaan) => (
              <Link href={`/profile-kegiatan/${kepanitiaan.name}`}>
                <KepanitiaanCard kepanitiaan={kepanitiaan} key={kepanitiaan.name} />
              </Link>
            ))}
          </div>
        </div>
        )
      }

      {/* Search Result */}
      {isSearchBegin && (
        <div className="space-y-4">
          <div className="space-y-2">
            <h5 className="text-xl text-neutral-1000 font-semibold">Mahasiswa</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SearchResultMahasiswa.map((item) => (
                <Link href={`/mahasiswa/${item.name}`}>
                  <MahasiswaCard 
                    key={item.id}
                    nama={item.name}
                    NIM={item.NIM}
                    jurusan={item.Jurusan}
                    profilePicture={dummyProfile}
                  />
                </Link>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <h5 className="text-xl text-neutral-1000 font-semibold">Lembaga</h5>
            <div className="flex flex-col w-full gap-y-4">
              {SearchResultLembaga.map((item) => (
                <Link key={item.id} href={`/lembaga/${item.id}`}>
                  <LembagaCard 
                    nama={item.nama}
                    kategori={item.kategori}
                    deskripsi={item.deskripsi}
                    lembagaPicture={dummyLembaga}
                  />
                </Link>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <h5 className="text-xl text-neutral-1000 font-semibold">Kegiatan</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {SearchResultKegiatan.map((item) => (
                <Link href={`/profile-kegiatan/${item.name}`}>
                  <KepanitiaanCard kepanitiaan={item} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}