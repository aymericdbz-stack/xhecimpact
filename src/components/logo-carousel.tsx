import Image from "next/image";

const partnerLogos = [
  {
    name: "UniLaSalle",
    src: "/assets/partners/unilasalle.svg",
    width: 240,
    height: 120,
  },
  {
    name: "Climate House",
    src: "/assets/partners/climate-house.svg",
    width: 240,
    height: 120,
  },
  {
    name: "École Polytechnique",
    src: "/assets/partners/ecole-polytechnique.svg",
    width: 160,
    height: 120,
  },
  {
    name: "HEC Paris",
    src: "/assets/partners/hec-paris.svg",
    width: 200,
    height: 120,
  },
  {
    name: "AgroParisTech",
    src: "/assets/partners/agroparistech.svg",
    width: 240,
    height: 120,
  },
  {
    name: "INSA Lyon",
    src: "/assets/partners/insa-lyon.svg",
    width: 240,
    height: 120,
  },
  {
    name: "ISAE-SUPAERO",
    src: "/assets/partners/isae-supaero.svg",
    width: 220,
    height: 120,
  },
];

export function LogoCarousel() {
  const logos = [...partnerLogos, ...partnerLogos];

  return (
    <section className="relative overflow-hidden rounded-[2.5rem] border border-slate-200/70 bg-white/80 py-8 shadow-sm">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white/80 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white/80 to-transparent" />

      <div className="flex w-max animate-scroll gap-12 px-8">
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
