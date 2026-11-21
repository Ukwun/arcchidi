import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/data/projects";
import styles from "./page.module.css";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project not found | Arc. Chidi Ndubuisi",
    };
  }

  return {
    title: `${project.name} | Arc. Chidi Ndubuisi`,
    description: `${project.type} in ${project.location}. ${project.statusLabel}. ${project.summary}.`,
    ...(process.env.URL || process.env.NEXT_PUBLIC_SITE_URL
      ? { alternates: { canonical: `/projects/${project.slug}` } }
      : {}),
    openGraph: {
      title: `${project.name} | Arc. Chidi Ndubuisi`,
      description: `${project.type} in ${project.location}. ${project.statusLabel}.`,
      ...(project.images[0] && (process.env.URL || process.env.NEXT_PUBLIC_SITE_URL)
        ? {
            images: [
              {
                url: project.images[0].src,
                alt: project.images[0].alt,
              },
            ],
          }
        : {}),
    },
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  return (
    <Suspense
      fallback={
        <main className={styles.main} aria-busy="true">
          <p>Loading project case study…</p>
        </main>
      }
    >
      <ProjectPageContent params={params} />
    </Suspense>
  );
}

async function ProjectPageContent({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const heroImage = project.images[0];
  return (
    <main className={styles.main}>
      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/#projects">Projects</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{project.name}</span>
      </nav>

      <section className={styles.projectHero} aria-labelledby="project-title">
        <div className={styles.projectIntro} data-reveal>
          <p className={styles.eyebrow}>
            {project.location} · {project.type}
          </p>
          <p
            className={styles.status}
            data-project-status={project.status}
          >
            {project.statusLabel}
          </p>
          <h1 id="project-title">{project.name}</h1>
          <p className={styles.projectSummary}>{project.summary}</p>
        </div>

        {heroImage && (
          <figure className={styles.heroFigure} data-reveal>
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              width={heroImage.width}
              height={heroImage.height}
              priority
              sizes="100vw"
            />
            <figcaption>{heroImage.label}</figcaption>
          </figure>
        )}
      </section>

      <section
        className={styles.projectFacts}
        aria-label={`${project.name} project details`}
      >
        <div>
          <span>Location</span>
          <p>{project.location}</p>
        </div>
        <div>
          <span>Project type</span>
          <p>{project.type}</p>
        </div>
        <div>
          <span>Status</span>
          <p>{project.statusLabel}</p>
        </div>
        <div>
          <span>Project value</span>
          <p>{project.projectValue}</p>
        </div>
      </section>

      <section className={styles.gallery} aria-labelledby="gallery-title">
        <div className={styles.galleryHeading} data-reveal>
          <p className={styles.eyebrow}>Project imagery</p>
          <h2 id="gallery-title">Design intent and project status.</h2>
        </div>
        <div className={styles.galleryGrid}>
          {project.images.map((image) => (
            <figure className={styles.galleryItem} data-reveal key={image.src}>
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(min-width: 900px) 50vw, 100vw"
              />
              <figcaption>{image.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className={styles.projectCta} aria-labelledby="project-cta-title">
        <div data-reveal>
          <p className={styles.eyebrow}>Planning a residential project?</p>
          <h2 id="project-cta-title">
            Let&apos;s talk about what you want to build.
          </h2>
        </div>
        <Link className="button button-primary" href="/#contact">
          Tell us about your project
        </Link>
      </section>
    </main>
  );
}
