import {getServerAuthSession} from "~/server/auth";
import AnggotaComp from "~/app/lembaga/anggota-kegiatan/_components/anggotaComp";
import {api} from "~/trpc/server";

export default async function Home() {
  const session = await getServerAuthSession();
  const {anggota, error} = await api.lembaga.getAllAnggota({lembagaId: session?.user.id ?? ""});
  const addAnggotaProps = await api.users.tambahAnggotaLembagaData({lembagaId: session?.user.id ?? ""});
  return (
      <main>
          <AnggotaComp session={session} data={anggota ?? []} dataAddAnggota={addAnggotaProps}/>
      </main>
  );
}
