import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <article
      className={`${styles.card} ${featured ? styles.featured : ""}`}
      data-project-status={project.status}
    >
      <Link
        className={styles.cardLink}
        href={`/projects/${project.slug}`}
        aria-label={`View ${project.name} case study`}
      >
        <div
          className={`${styles.mediaGrid} ${
            project.images.length === 1 ? styles.singleImage : ""
          }`}
        >
          {project.images.map((image) => (
            <figure className={styles.figure} key={image.src}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={
                  featured
                    ? "(min-width: 1000px) 50vw, 100vw"
                    : "(min-width: 1000px) 32vw, (min-width: 650px) 50vw, 100vw"
                }
              />
              <figcaption>{image.label}</figcaption>
            </figure>
          ))}
        </div>

        <div className={styles.cardDetails}>
          <div className={styles.cardTopline}>
            <p className={styles.location}>{project.location}</p>
            <span className={styles.status}>{project.statusLabel}</span>
          </div>
          <h3>{project.name}</h3>
          <p className={styles.projectType}>{project.type}</p>
          <p className={styles.summary}>{project.summary}</p>
          <span className={styles.cardLinkText}>
            View case study <span aria-hidden="true">↗</span>
          </span>
        </div>
      </Link>
    </article>
  );
}
