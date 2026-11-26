export type ProjectStatus = "in-progress" | "completed" | "visualization";

export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  label: string;
}

export interface Project {
  slug: string;
  name: string;
  location: string;
  type: string;
  status: ProjectStatus;
  statusLabel: string;
  summary: string;
  projectValue: string;
  images: ProjectImage[];
}

export const projects: Project[] = [
  {
    slug: "grand-villa-retreat",
    name: "Grand Villa Retreat",
    location: "Uzii",
    type: "Mini estate · design-build",
    status: "in-progress",
    statusLabel: "In progress",
    summary: "Approx. ₦1B estate value",
    projectValue: "Approx. ₦1B estate value",
    images: [
      {
        src: "/images/grand-villa-retreat.jpg",
        alt: "Architectural visualization of Grand Villa Retreat's neoclassical main residence at dusk",
        width: 615,
        height: 461,
        label: "Design visualization",
      },
      {
        src: "/images/grand-villa-construction.jpg",
        alt: "Grand Villa Retreat under construction",
        width: 614,
        height: 309,
        label: "Under construction",
      },
    ],
  },
  {
    slug: "crestwood",
    name: "Crestwood",
    location: "Asaba",
    type: "4-bedroom duplex · design-build",
    status: "completed",
    statusLabel: "Completed 2023",
    summary: "Construction value approx. ₦40M",
    projectValue: "Approx. ₦40M",
    images: [
      {
        src: "/images/crestwood-design.jpg",
        alt: "Crestwood 4-bedroom duplex design render",
        width: 540,
        height: 450,
        label: "Design visualization",
      },
      {
        src: "/images/crestwood-built.jpg",
        alt: "Crestwood 4-bedroom duplex as built",
        width: 620,
        height: 465,
        label: "As built",
      },
    ],
  },
  {
    slug: "magnolia-manor",
    name: "Magnolia Manor",
    location: "Nanka",
    type: "7-bedroom duplex with penthouse",
    status: "completed",
    statusLabel: "Completed 2023",
    summary: "Construction value approx. ₦100M",
    projectValue: "Approx. ₦100M",
    images: [
      {
        src: "/images/magnolia-manor-design.jpg",
        alt: "Magnolia Manor 7-bedroom duplex design render",
        width: 540,
        height: 415,
        label: "Design visualization",
      },
      {
        src: "/images/magnolia-manor-built.jpg",
        alt: "Magnolia Manor 7-bedroom duplex as built",
        width: 648,
        height: 486,
        label: "As built",
      },
    ],
  },
  {
    slug: "vista-apartments",
    name: "Vista Apartments",
    location: "Centenary City, Enugu",
    type: "Climate-responsive apartments",
    status: "completed",
    statusLabel: "Completed 2024",
    summary: "Construction value approx. ₦200M",
    projectValue: "Approx. ₦200M",
    images: [
      {
        src: "/images/vista-apartments.jpg",
        alt: "Architectural visualization of Vista Apartments in Centenary City, Enugu",
        width: 900,
        height: 507,
        label: "Design visualization",
      },
      {
        src: "/images/vista-apartments-pool.jpg",
        alt: "Architectural visualization of the Vista Apartments pool deck",
        width: 900,
        height: 507,
        label: "Pool deck visualization",
      },
    ],
  },
  {
    slug: "elaris-grove",
    name: "Elaris Grove",
    location: "Anambra",
    type: "5-bedroom duplex · design-build",
    status: "visualization",
    statusLabel: "Design visualization",
    summary: "Approx. ₦80M construction value",
    projectValue: "Approx. ₦80M",
    images: [
      {
        src: "/images/elaris-grove-render.jpg",
        alt: "Elaris Grove 5-bedroom duplex design render",
        width: 648,
        height: 432,
        label: "Design visualization",
      },
    ],
  },
  {
    slug: "verdencia-court",
    name: "Verdencia Court",
    location: "Mgbagbu-Owa, Enugu State",
    type: "6-bedroom luxurious duplex",
    status: "in-progress",
    statusLabel: "Under construction",
    summary: "6-bedroom luxurious duplex",
    projectValue: "Not published",
    images: [
      {
        src: "/images/verdencia-court-design.jpg",
        alt: "Verdencia Court 6-bedroom luxurious duplex design visualization",
        width: 1080,
        height: 830,
        label: "Design visualization",
      },
      {
        src: "/images/verdencia-court-construction.jpg",
        alt: "Verdencia Court 6-bedroom luxurious duplex under construction",
        width: 1080,
        height: 607,
        label: "Construction progress photo",
      },
    ],
  },
];

projects.sort((a, b) => {
  if (a.slug === "magnolia-manor") return -1;
  if (b.slug === "magnolia-manor") return 1;
  return 0;
});

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
