import Image from "next/image";

const partnerLogos = [
  {
    name: "HEC Paris",
    src: "/assets/logos/hec-paris.png",
    width: 240,
    height: 120,
  },
  {
    name: "AgroParisTech",
    src: "/assets/logos/agroparistech.png",
    width: 240,
    height: 120,
  },
  {
    name: "INSA Lyon",
    src: "/assets/logos/insa-lyon.png",
    width: 240,
    height: 120,
  },
  {
    name: "ISAE-SUPAERO",
    src: "/assets/logos/isae-supaero.png",
    width: 220,
    height: 120,
  },
  {
    name: "École Polytechnique",
    src: "/assets/logos/polytechnique.png",
    width: 220,
    height: 120,
  },
  {
    name: "Climate House",
    src: "/assets/logos/climate-house.png",
    width: 552,
    height: 452,
  },
  {
    name: "EFCI",
    src: "/assets/logos/efci.png",
    width: 240,
    height: 120,
  },
  {
    name: "UniLaSalle Beauvais",
    src: "/assets/logos/beauvais.png",
    width: 240,
    height: 120,
  },
];

export function LogoCarousel() {
  const logos = [...partnerLogos, ...partnerLogos];

  return (
    <section className="relative w-full overflow-hidden bg-transparent py-8 sm:py-10">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background via-background/0 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background via-background/0 to-transparent" />

      <div className="flex w-max animate-scroll items-center gap-16 px-12 md:px-20">
        {logos.map((logo, index) => (
          <div key={`${logo.name}-${index}`} className="relative h-16 w-auto shrink-0">
            <Image
              src={logo.src}
              alt={`Logo ${logo.name}`}
              width={logo.width}
              height={logo.height}
              className="h-full w-auto object-contain"
              priority={index < partnerLogos.length}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
