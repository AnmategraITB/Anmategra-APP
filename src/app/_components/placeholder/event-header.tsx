import Image from "next/image";
import { Button } from "~/components/ui/button";

interface EventHeaderProps {
  title: string;
  organizer: string;
  backgroundImage: string;
  logoImage: string;
}

export function EventHeader({
  title,
  organizer,
  backgroundImage,
  logoImage,
}: EventHeaderProps) {
  return (
    <div className="mb-8 overflow-hidden rounded-[36px]">
      <div className="relative h-[350px]">
        <div className="absolute inset-0">
          <Image
            src={backgroundImage}
            alt={title}
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%)",
          }}
        />
        <div className="absolute bottom-0 left-0 flex w-full items-end justify-between px-10 pb-10">
          <div className="flex gap-6">
            <div className="relative h-32 w-32 overflow-hidden rounded-full border-[1px]">
              <Image
                src={logoImage}
                alt="Event logo"
                fill
                className="object-cover object-center"
              />
            </div>

            <div className="flex flex-col">
              <h1 className="text-[28px] font-bold text-white">{title}</h1>
              <p className="text-xl font-light text-white">{organizer}</p>
              <div className="flex flex-1 flex-col justify-end">
                <Button className="rounded-xl bg-[#00B7B7] text-white hover:bg-[#82CBDE] active:bg-[#D9F4F4]">
                  Daftar menjadi Panitia
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
