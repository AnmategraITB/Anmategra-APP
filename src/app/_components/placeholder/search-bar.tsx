<<<<<<< HEAD
import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder: string;
}

export function SearchBar({ placeholder }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#636A6D]" />
      <input
        className="hover:border-black-300 h-10 w-full rounded-2xl border border-[#C4CACE] bg-white pl-10 pr-4 text-sm focus:outline-none"
        placeholder={placeholder}
        type="search"
      />
    </div>
  );
}
=======
import { Search } from 'lucide-react'

export function SearchBar() {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
      <input
        className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 text-sm placeholder:text-slate-500"
        placeholder="Cari lembaga, kegiatan, atau mahasiswa"
        type="search"
      />
    </div>
  )
}

>>>>>>> d8483e6d0caf5beff5c8345d48b671cc5a80bd8d
