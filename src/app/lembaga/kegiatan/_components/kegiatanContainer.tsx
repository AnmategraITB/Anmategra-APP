"use client"
// Library Import
import { useEffect, useState } from "react"
// Components Import
import {useDebounce} from "~/components/debounceHook";
import {Button} from "~/components/ui/button"
import {Input} from "~/components/ui/input"
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "~/components/ui/dialog";
import TambahKegiatanForm from "~/app/_components/kegiatan/TambahKegiatanForm";
// Icons Import
import {ChevronRight, Plus, Search} from "lucide-react"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
// Auth Import
import { Session } from "next-auth";

export interface Activity {
    id: string
    name: string
    description: string | null
    start_date: string
    participant_count: number | null;
    status: "Coming Soon" | "On going" | "Ended";
    thumbnail: string | null
}

export default function ActivityList(
    {
        propActivites,
        session
    }: {
        propActivites: Activity[],
        session: Session | null
    }
) {
    const [activities, setActivities] = useState<Activity[]>(propActivites)
    const [searchQuery, setSearchQuery] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const debouncedSearchQuery = useDebounce(searchQuery, 300);

    useEffect(() => {
        const getActivities = async () => {
            setIsLoading(true);
            const filteredActivities = propActivites.filter(activity =>
                activity.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
            );
            setActivities(filteredActivities);
            setIsLoading(false);
        };
        getActivities();
    }, [debouncedSearchQuery, propActivites]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            // Nampilin hasil pencarian client side fetching
        }
    };

    return (
        <div className="flex w-full flex-col gap-4 p-6">
            {/* Title and Search */}
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-semibold text-slate-600">Kegiatan</h1>
                <Input
                    placeholder="Cari kegiatan"
                    className="rounded-2xl bg-white placeholder:text-neutral-700 focus-visible:ring-transparent"
                    startAdornment={
                        <MagnifyingGlassIcon className="size-4 text-gray-500" />
                    }
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button
                            className="bg-[#00B7B7] text-white rounded-[16px] px-4 shadow-none flex items-center gap-2">
                            <Plus className="h-4 w-4"/>
                            Tambah Kegiatan Baru
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Tambah Kegiatan</DialogTitle>
                        </DialogHeader>
                        <TambahKegiatanForm session={session} setIsOpen={setIsOpen} />
                    </DialogContent>
                </Dialog>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="min-w-full">
                    <div
                        className="grid grid-cols-[80px_1fr_120px_100px_100px_50px] gap-4 p-4 bg-gray-50 text-sm font-medium text-gray-500">
                        <div>Thumbnail</div>
                        <div>Judul</div>
                        <div>Tanggal</div>
                        <div>Panitia</div>
                        <div>Status</div>
                        <div></div>
                    </div>

                    <div className="divide-y divide-gray-200">
                        {activities.map((activity, index) => (
                            <div
                                key={activity.id}
                                className="grid grid-cols-[80px_1fr_120px_100px_100px_50px] gap-4 p-4 items-center hover:bg-gray-50 transition-colors"
                            >
                                <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden">
                                    {activity.thumbnail && (
                                        <img src={activity.thumbnail || "/placeholder.svg"} alt=""
                                             className="w-full h-full object-cover"/>
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-medium">{activity.name}</h3>
                                    <p className="text-sm text-gray-500 truncate">{activity.description}</p>
                                </div>
                                <div className="text-sm text-gray-500">{activity.start_date}</div>
                                <div className="text-sm text-gray-500">{activity.participant_count}</div>
                                <div>
                  <span
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    {activity.status}
                  </span>
                                </div>
                                <Button variant="ghost" size="icon">
                                    <ChevronRight className="h-4 w-4"/>
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>

                {isLoading && <div className="p-4 text-center text-gray-500">Loading activities...</div>}

                {!isLoading && activities.length === 0 && (
                    <div className="p-8 text-center text-gray-500">No activities found</div>
                )}
            </div>
        </div>
    )
}

