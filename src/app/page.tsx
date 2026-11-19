import Image from "next/image";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import styles from "./page.module.css";

const proofPoints = [
  {
    value: "14+ years",
    description: "Designing and building across Nigeria",
  },
  {
    value: "8 projects",
    description: "Delivered or in delivery as design-build",
  },
  {
    value: "₦40M–₦1B",
    description: "Construction value per project",
  },
  {
    value: "Abuja · Southeast",
    description: "Lafia, Enugu, Anambra, Imo, and Delta",
  },
];

const services = [
  {
    number: "01",
    title: "Design with cost clarity",
    description:
      "Architectural drawings, coordinated consultants, a bill of quantities, and a phased cost plan shaped around your brief.",
  },
  {
    number: "02",
    title: "Design-build",
    description:
      "One team carries the design intent through delivery, with project supervision and decisions grounded in what can be built.",
  },
  {
    number: "03",
    title: "Independent site monitoring",
    description:
      "Already have a contractor? Get measured progress, cost-to-complete insight, and advice before the next payment.",
  },
];

const designPackages = [
  {
    name: "Approval Set",
    description: "Coordinated drawings ready for planning approval.",
    price: "₦1.4M",
    range: "3–4 bedrooms · ₦1.8M for 5–7 bedrooms",
    features: [
      "Architectural working drawings",
      "Structural drawings",
      "Mechanical, electrical, and plumbing drawings",
      "3D massing views",
    ],
  },
  {
    name: "Build-Ready Pack",
    description: "Detailed design and cost information before construction.",
    price: "₦2.5M",
    range: "3–4 bedrooms · ₦3.2M for 5–7 bedrooms",
    features: [
      "Everything in the Approval Set",
      "Four exterior visualizations",
      "Bill of quantities and phased cost plan",
      "Construction schedule and specifications",
      "Contractor tender pack",
      "Pre-construction site meeting",
    ],
    featured: true,
  },
  {
    name: "Signature / Developer Pack",
    description: "A broader presentation package for premium homes and estates.",
    price: "₦4.0M",
    range: "3–4 bedrooms · ₦5.0M for 5–7 bedrooms",
    features: [
      "Everything in the Build-Ready Pack",
      "Interior design for four spaces",
      "30-second animation",
      "Marketing image set",
    ],
  },
];

const monitoringPackages = [
  {
    name: "Baseline Assessment",
    price: "₦200,000",
    detail: "One-off · travel at cost",
    description:
      "A first site inspection and review of your drawings, budget, and contract to establish what is built, spent, and remaining.",
  },
  {
    name: "Monthly Monitor",
    price: "₦250,000",
    detail: "Per month · one site inspection",
    description:
      "Measured progress, budget versus spend by work package, a cost-to-complete forecast, and payment-request advice.",
  },
  {
    name: "Milestone Monitor",
    price: "₦180,000",
    detail: "Per milestone",
    description:
      "A site inspection and signed report at foundation, DPC, lintel, roof, or finishes before the next payment.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "A 20-minute project call",
    description:
      "Share your location, plans, budget range, current stage, and timeline. We will help identify the next useful step.",
  },
  {
    number: "02",
    title: "Choose your scope",
    description:
      "Agree the right design, design-build, or monitoring service, then confirm the scope, fee, and engagement terms.",
  },
  {
    number: "03",
    title: "Design, cost, deliver",
    description:
      "Move from preliminary design to coordinated documents and, if you choose, supervised work on site.",
  },
];

const whatsappLink = "https://wa.me/2347052702835";
const netlifyHoneypotAttributes = { "netlify-honeypot": "bot-field" };

const featuredProject = projects[0];
const featuredImage = featuredProject.images[0];

export default function Home() {
  return (
    <main id="main-content">
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroCopy} data-reveal>
          <p className={styles.eyebrow}>Architect-led design &amp; build · Nigeria</p>
          <h1 id="hero-title">Design a home you can actually afford to finish.</h1>
          <p className={styles.heroDescription}>
            Thoughtful residential architecture, realistic cost planning, and
            project oversight from first brief to work on site.
          </p>
          <div className={styles.heroActions}>
            <a className="button button-primary" href="#contact">
              Tell us what you want to build
            </a>
            <a className="button button-secondary" href="#projects">
              Explore selected projects
            </a>
          </div>
          <p className={styles.credentials}>
            ARCON-registered architect (F/4711) · IPMP-certified project manager
            · 14+ years in design-build practice
          </p>
        </div>

        <figure className={styles.heroFigure} data-reveal>
          <Image
            src={featuredImage.src}
            alt={featuredImage.alt}
            width={featuredImage.width}
            height={featuredImage.height}
            priority
            sizes="(min-width: 1000px) 50vw, 100vw"
          />
          <figcaption className={styles.heroCaption}>
            <span>Grand Villa Retreat, Uzii</span>
            <span>
              <span className={styles.captionStatus}>In progress</span>
              Design-build project
            </span>
          </figcaption>
        </figure>
      </section>

      <section className={styles.proofStrip} aria-label="Practice at a glance">
        {proofPoints.map((point, index) => (
          <div
            className={styles.proofPoint}
            data-reveal
            data-reveal-delay={index}
            key={point.value}
          >
            <p className={styles.proofValue}>{point.value}</p>
            <p className={styles.proofDescription}>{point.description}</p>
          </div>
        ))}
      </section>

      <section className={styles.challenge} aria-labelledby="challenge-title">
        <div className={styles.challengeIntro} data-reveal>
          <p className={styles.eyebrow}>A clearer way to build</p>
          <h2 id="challenge-title">
            A beautiful design is only the beginning.
          </h2>
          <p>
            A home also needs a cost plan grounded in local conditions, clear
            decisions, and someone checking what is happening on site.
          </p>
        </div>
        <div className={styles.challengeGrid}>
          <article className={styles.challengeCard} data-reveal data-reveal-delay="1">
            <span>01</span>
            <h3>Plan the cost before work starts</h3>
            <p>
              Coordinated drawings and a phased cost plan make the scope clearer
              before you commit to construction.
            </p>
          </article>
          <article className={styles.challengeCard} data-reveal data-reveal-delay="2">
            <span>02</span>
            <h3>Keep design and delivery connected</h3>
            <p>
              Architectural intent is easier to protect when design decisions
              are made with construction in mind.
            </p>
          </article>
          <article className={styles.challengeCard} data-reveal data-reveal-delay="3">
            <span>03</span>
            <h3>Stay informed from anywhere</h3>
            <p>
              Site monitoring helps clients at home or in the diaspora
              understand observed progress before making the next decision.
            </p>
          </article>
        </div>
      </section>

      <section
        className={styles.services}
        id="services"
        aria-labelledby="services-title"
      >
        <div className={styles.sectionHeading} data-reveal>
          <div>
            <p className={styles.eyebrow}>How we can help</p>
            <h2 id="services-title">The right support for your project.</h2>
          </div>
          <p>
            From an early design brief to an active building site, choose the
            level of support that fits where you are now.
          </p>
        </div>

        <ul className={styles.serviceList}>
          {services.map((service, index) => (
            <li
              className={styles.serviceCard}
              data-reveal
              data-reveal-delay={index % 4}
              key={service.number}
            >
              <span className={styles.serviceNumber}>{service.number}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <span className={styles.serviceRule} aria-hidden="true" />
            </li>
          ))}
        </ul>

        <div className={styles.packages} id="packages">
          <div className={styles.packagesHeading}>
            <div>
              <p className={styles.eyebrow}>Design packages</p>
              <h3>Know what is included before you begin.</h3>
            </div>
            <p>
              Fees shown are for a typical duplex. Larger or commercial
              projects are quoted after a project call.
            </p>
          </div>
          <div className={styles.packageGrid}>
            {designPackages.map((packageItem, index) => (
              <article
                className={`${styles.packageCard} ${
                  packageItem.featured ? styles.packageFeatured : ""
                }`}
                data-reveal
                data-reveal-delay={index}
                key={packageItem.name}
              >
                {packageItem.featured && (
                  <span className={styles.packageBadge}>Build-ready</span>
                )}
                <h4>{packageItem.name}</h4>
                <p className={styles.packageDescription}>
                  {packageItem.description}
                </p>
                <p className={styles.packagePrice}>{packageItem.price}</p>
                <p className={styles.packageRange}>{packageItem.range}</p>
                <ul>
                  {packageItem.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <a className="button button-secondary" href="#contact">
                  Ask about this package
                </a>
              </article>
            ))}
          </div>
          <p className={styles.paymentNote}>
            Typical payment stages: 40% to start, 40% on approval of the
            preliminary design, and 20% on final delivery. Scope and terms are
            confirmed in your engagement agreement.
          </p>
        </div>
      </section>

      <section className={styles.smartHomes} aria-labelledby="smart-title">
        <div className={styles.smartCopy} data-reveal>
          <p className={styles.eyebrow}>Climate-responsive design</p>
          <h2 id="smart-title">Comfort first. Technology planned in.</h2>
          <p>
            Orientation, shading, and ventilation help a home respond to its
            climate. Wiring routes, network points, and provisions for solar
            and smart systems can be considered early in the design.
          </p>
          <ul>
            <li>Plan for network, Wi-Fi, and future device locations</li>
            <li>Coordinate shading, ventilation, and cooling controls</li>
            <li>Make provision for solar and inverter systems</li>
          </ul>
          <a className={styles.textLink} href="#contact">
            Discuss your brief <span aria-hidden="true">↗</span>
          </a>
        </div>
        <figure className={styles.smartImage} data-reveal>
          <Image
            src="/images/vista-apartments.jpg"
            alt="Architectural visualization of Vista Apartments in Centenary City, Enugu"
            width={900}
            height={507}
            sizes="(min-width: 900px) 50vw, 100vw"
          />
          <figcaption>
            Vista Apartments, Enugu · design visualization
          </figcaption>
        </figure>
      </section>

      <section
        className={styles.monitoring}
        id="monitoring"
        aria-labelledby="monitoring-title"
      >
        <div className={styles.monitoringIntro} data-reveal>
          <p className={styles.eyebrow}>Building from abroad · Site monitoring</p>
          <h2 id="monitoring-title">
            Know what your money has built before you send more.
          </h2>
          <p>
            Reports separate money released, costs supported by records, work
            checked on site, and progress actually observed. Work is only
            described as verified when it has been inspected.
          </p>
        </div>

        <div className={styles.sampleReport} data-reveal>
          <div className={styles.reportHeading}>
            <div>
              <span className={styles.reportLabel}>
                Illustrative example · not live project data
              </span>
              <h3>Sample blockwork package</h3>
            </div>
            <span className={styles.reportStatus}>Example only</span>
          </div>
          <div className={styles.reportMetrics}>
            <div>
              <span>Budget</span>
              <strong>₦2.5M</strong>
            </div>
            <div>
              <span>Spent</span>
              <strong>₦2.1M</strong>
            </div>
            <div>
              <span>Work observed</span>
              <strong>70%</strong>
            </div>
          </div>
          <div className={styles.reportForecast}>
            <span>Illustrative forecast at current spend</span>
            <strong>₦3.0M</strong>
            <p>₦500k above the example budget if the current trend continues.</p>
          </div>
        </div>

        <div className={styles.monitoringPackages}>
          {monitoringPackages.map((packageItem, index) => (
            <article
              className={styles.monitoringCard}
              data-reveal
              data-reveal-delay={index}
              key={packageItem.name}
            >
              <p className={styles.monitoringPrice}>{packageItem.price}</p>
              <h3>{packageItem.name}</h3>
              <p className={styles.monitoringDetail}>{packageItem.detail}</p>
              <p>{packageItem.description}</p>
            </article>
          ))}
        </div>
        <p className={styles.monitoringNote}>
          Baseline assessment is required before ongoing monitoring. Travel
          outside the service area is charged at cost.
        </p>
      </section>

      <section
        className={styles.work}
        id="projects"
        aria-labelledby="projects-title"
      >
        <div className={styles.sectionHeading} data-reveal>
          <div>
            <p className={styles.eyebrow}>Selected projects</p>
            <h2 id="projects-title">
              Design visualizations, active sites, and completed homes.
            </h2>
          </div>
          <p>
            We label project status and image type so you can distinguish
            completed work from design imagery and sites in progress.
          </p>
        </div>

        <div className={styles.projectGrid}>
          {projects.map((project, index) => (
            <ProjectCard
              featured={index === 0}
              key={project.slug}
              project={project}
              revealDelay={index}
            />
          ))}
        </div>
      </section>

      <section
        className={styles.process}
        id="process"
        aria-labelledby="process-title"
      >
        <div className={styles.processIntro} data-reveal>
          <p className={styles.eyebrow}>A straightforward process</p>
          <h2 id="process-title">A clear next step at every stage.</h2>
        </div>
        <ol className={styles.processList}>
          {processSteps.map((step, index) => (
            <li data-reveal data-reveal-delay={index % 4} key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.profile} id="about" aria-labelledby="about-title">
        <figure className={styles.profileImage} data-reveal>
          <Image
            src="/images/arc-chidi-ndubisi.jpg"
            alt="Architect Chidi Ndubuisi"
            fill
            sizes="(min-width: 800px) 42vw, 100vw"
          />
        </figure>
        <div className={styles.profileCopy} data-reveal>
          <p className={styles.eyebrow}>Who leads your project</p>
          <h2 id="about-title">Arc. Chidi Ndubuisi</h2>
          <p className={styles.profileIntro}>
            Design decisions should make sense on the drawing board and on the
            building site. Chidi leads the practice with an architect&apos;s
            attention to detail and a project manager&apos;s focus on delivery.
          </p>
          <ul className={styles.credentialsList}>
            <li>ARCON-registered architect (F/4711)</li>
            <li>IPMP-certified project manager</li>
            <li>MSc, Passive Solar Design, University of Nigeria, Nsukka</li>
            <li>Lecturer in Architecture, Federal University Lafia</li>
            <li>14+ years in design-build practice</li>
          </ul>
          <p className={styles.profileQuote}>
            “Design for execution, not just approval.”
          </p>
        </div>
      </section>

      <section
        className={styles.enquiry}
        id="contact"
        aria-labelledby="contact-title"
      >
        <div className={styles.enquiryIntro} data-reveal>
          <p className={styles.eyebrow}>Start with a conversation</p>
          <h2 id="contact-title">Tell us a little about your project.</h2>
          <p>
            Share a few details and the practice will follow up to discuss the
            next step. If you prefer, message us directly on WhatsApp.
          </p>
          <a
            className="button button-secondary"
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Chat on WhatsApp <span aria-hidden="true">↗</span>
          </a>
          <p className={styles.responseNote}>
            Enquiries are sent to Buildscope International Limited via Netlify
            Forms. This is a public enquiry form, not a client account. Only
            four details are required to get started.
          </p>
        </div>

        <form
          {...netlifyHoneypotAttributes}
          action="/thank-you"
          className={styles.enquiryForm}
          data-reveal
          data-netlify="true"
          method="POST"
          name="project-enquiry"
        >
          <input
            type="hidden"
            name="form-name"
            value="project-enquiry"
          />
          <div className={styles.honeypot} aria-hidden="true">
            <label htmlFor="bot-field">
              Leave this field empty
              <input
                autoComplete="off"
                id="bot-field"
                name="bot-field"
                tabIndex={-1}
                type="text"
              />
            </label>
          </div>

          <div className={styles.formField}>
            <label htmlFor="full-name">Full name *</label>
            <input
              autoComplete="name"
              id="full-name"
              name="fullName"
              required
              type="text"
            />
          </div>
          <div className={styles.formField}>
            <label htmlFor="phone">Phone / WhatsApp *</label>
            <input
              autoComplete="tel"
              id="phone"
              name="phone"
              required
              type="tel"
            />
          </div>
          <div className={styles.formField}>
            <label htmlFor="email">Email address</label>
            <input
              autoComplete="email"
              id="email"
              name="email"
              type="email"
            />
          </div>
          <div className={styles.formField}>
            <label htmlFor="residence">Where do you live? (optional)</label>
            <select defaultValue="" id="residence" name="residence">
              <option value="">Choose if known</option>
              <option value="Nigeria">In Nigeria</option>
              <option value="Diaspora">In the diaspora</option>
            </select>
          </div>
          <div className={styles.formField}>
            <label htmlFor="site-location">Project location *</label>
            <input
              id="site-location"
              name="siteLocation"
              placeholder="City or state"
              required
              type="text"
            />
          </div>
          <div className={styles.formField}>
            <label htmlFor="building-type">Building type and size (optional)</label>
            <input
              id="building-type"
              name="buildingType"
              placeholder="For example, 4-bedroom duplex"
              type="text"
            />
          </div>
          <div className={styles.formField}>
            <label htmlFor="project-stage">Where are you in the process? (optional)</label>
            <select
              defaultValue=""
              id="project-stage"
              name="projectStage"
            >
              <option value="">Choose if known</option>
              <option value="Land secured">I have land</option>
              <option value="Need a design">I need a design</option>
              <option value="Planning approval">I am working on approval</option>
              <option value="Already building">I am already building</option>
              <option value="Not sure">I am not sure yet</option>
            </select>
          </div>
          <div className={styles.formField}>
            <label htmlFor="service-interest">What support do you need? (optional)</label>
            <select
              defaultValue=""
              id="service-interest"
              name="serviceInterest"
            >
              <option value="">Choose if known</option>
              <option value="Architectural design">Architectural design</option>
              <option value="Building design">Building design</option>
              <option value="Design-build">Design-build</option>
              <option value="Project supervision">Project supervision</option>
              <option value="Not sure">I am not sure yet</option>
            </select>
          </div>
          <div className={styles.formField}>
            <label htmlFor="budget">Budget range (optional)</label>
            <select defaultValue="" id="budget" name="budget">
              <option value="">Choose if known</option>
              <option value="Under ₦50M">Under ₦50M</option>
              <option value="₦50M–₦150M">₦50M–₦150M</option>
              <option value="₦150M–₦400M">₦150M–₦400M</option>
              <option value="Above ₦400M">Above ₦400M</option>
            </select>
          </div>
          <div className={styles.formField}>
            <label htmlFor="timeline">Expected timeline (optional)</label>
            <select defaultValue="" id="timeline" name="timeline">
              <option value="">Choose if known</option>
              <option value="As soon as possible">As soon as possible</option>
              <option value="Within 3 months">Within 3 months</option>
              <option value="3–6 months">3–6 months</option>
              <option value="6–12 months">6–12 months</option>
              <option value="More than 12 months">More than 12 months</option>
              <option value="Exploring">I am exploring options</option>
            </select>
          </div>
          <div className={`${styles.formField} ${styles.formFieldFull}`}>
            <label htmlFor="project-notes">Anything else we should know?</label>
            <textarea
              id="project-notes"
              name="projectNotes"
              rows={4}
            />
          </div>
          <div className={`${styles.formField} ${styles.formFieldFull}`}>
            <label className={styles.consentLabel} htmlFor="contact-consent">
              <input
                id="contact-consent"
                name="contactConsent"
                required
                type="checkbox"
                value="yes"
              />
              <span>
                I agree that Buildscope International Limited may use these
                details to respond to my project enquiry. *
              </span>
            </label>
          </div>
          <div className={`${styles.formField} ${styles.formFieldFull}`}>
            <button className="button button-primary" type="submit">
              Send project enquiry
            </button>
            <p className={styles.formPrivacy}>
              Please do not include sensitive financial or identity documents
              in this form.
            </p>
          </div>
        </form>
      </section>
    </main>
  );
}
