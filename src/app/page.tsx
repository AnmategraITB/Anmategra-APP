// Component Import
import HeroSection from "./_components/landing/hero";
import {KegiatanSection} from "./_components/landing/KegiatanSection";
import {KepanitiaanSection} from "./_components/landing/KepanitiaanSection";
import MahasiswaSidebar from "./_components/MahasiswaSidebar";
// TRPC Import
import {api} from "~/trpc/server";
// Auth Import
import {getServerAuthSession} from "~/server/auth";

const LandingPage = async () => {
    const kegiatanTerbesar = await api.landing.getTopEvents();
    const kegiatanTerbaru = await api.landing.getRecentEvents();
    const session = await getServerAuthSession();

    return (
        <main className="flex flex-col overflow-hidden pb-16 sm:space-y-4 md:space-y-8">
            <div className="mb-12 fixed w-full shadow-sm z-20">
                <MahasiswaSidebar session={session}/>
            </div>
            <HeroSection/>
            <div className="space-y-16">
                <KegiatanSection data={kegiatanTerbaru}/>
                <KepanitiaanSection data={kegiatanTerbesar}/>
            </div>
        </main>
    );
};

export default LandingPage;