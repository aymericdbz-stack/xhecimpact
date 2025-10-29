import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const categories = [
  { label: "tech", description: "low-carbon tools and data" , icon: "💡"},
  { label: "arts & culture", description: "creative voices for impact", icon: "🎨" },
  { label: "well-being", description: "care for people & planet", icon: "🌱" },
  { label: "social innovation", description: "new models for change", icon: "🛠️" },
  { label: "impact investing", description: "finance that serves purpose", icon: "💶" },
  { label: "climate", description: "resilience for a warming world", icon: "🌍" },
  { label: "education", description: "learning that empowers", icon: "📚" },
  { label: "community", description: "local action, global ties", icon: "🤝" },
];

export default function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-4 py-16 sm:px-6 lg:py-20">
      <section className="grid items-center gap-12 rounded-3xl border border-border/80 bg-card/70 p-8 shadow-sm backdrop-blur-sm md:p-12 lg:grid-cols-[1.4fr_minmax(0,1fr)]">
        <div className="space-y-6">
          <Badge variant="secondary" className="rounded-full px-4 py-1 text-xs uppercase tracking-wide">
            high-impact student projects
          </Badge>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              discover events
            </h1>
            <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
              we curate gatherings and experiments sparked by the Master X-HEC Entrepreneurs community to move the social and environmental needle.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-full px-6">
              <Link href="/hackathon/impact">view the hackathon</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-6">
              <Link href="#about">about us</Link>
            </Button>
          </div>
        </div>
        <Card className="border-none bg-background/70 shadow-inner">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              next highlight
            </CardTitle>
            <CardDescription className="text-xs uppercase tracking-[0.2em] text-muted-foreground/80">
              saturday 13 december
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">impact hackathon at HEC</p>
              <p className="text-sm text-muted-foreground">
                co-design solutions for campus-wide sustainability challenges with mentors from the X-HEC impact ecosystem.
              </p>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-muted/70 px-4 py-3 text-sm text-muted-foreground">
              <span>14:00 - 18:00 · Jouy-en-Josas</span>
              <Button asChild size="sm" className="rounded-full">
                <Link href="/hackathon/impact">join us</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-6" aria-labelledby="categories-heading">
        <div className="flex items-end justify-between gap-4">
          <div className="space-y-2">
            <h2 id="categories-heading" className="text-2xl font-semibold tracking-tight">explore by theme</h2>
            <p className="text-sm text-muted-foreground">
              browse the experiences we run across the academic year.
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Card
              key={category.label}
              className="group h-full rounded-3xl border-border/60 bg-background/80 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <CardContent className="flex h-full flex-col justify-between gap-6">
                <div className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-2xl">
                    {category.icon}
                  </span>
                  <p className="text-lg font-medium lowercase">{category.label}</p>
                </div>
                <p className="text-sm text-muted-foreground">{category.description}</p>
                {category.label === "tech" ? (
                  <Button asChild variant="link" className="justify-start px-0 text-sm text-primary">
                    <Link href="/hackathon/impact">view hackathon details</Link>
                  </Button>
                ) : (
                  <span className="text-sm text-muted-foreground/70">more soon</span>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="about" className="grid gap-8 rounded-3xl border border-border/70 bg-background/70 p-8 shadow-sm md:grid-cols-2 md:p-12">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">about x-hec impact</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            we are students driven by the conviction that entrepreneurship can deliver meaningful solutions for society. through hackathons, labs, and storytelling events we connect talent from École Polytechnique and HEC Paris with impact-driven partners.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="rounded-2xl border-border/60 bg-muted/60 p-4 text-sm text-muted-foreground">
            <p className="text-3xl font-semibold text-foreground">120+</p>
            <p>participants engaged since 2022</p>
          </Card>
          <Card className="rounded-2xl border-border/60 bg-muted/60 p-4 text-sm text-muted-foreground">
            <p className="text-3xl font-semibold text-foreground">15</p>
            <p>student-led experiments piloted</p>
          </Card>
        </div>
      </section>
    </div>
  );
}
