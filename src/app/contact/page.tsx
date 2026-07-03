import { Suspense } from "react";
import { buildPageMetadata } from "@/lib/metadata";
import { PageIntro } from "@/components/ui/PageIntro";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { Faq } from "@/components/sections/Faq";
import { company } from "@/config/company";

export const metadata = buildPageMetadata({
  title: "Start a project",
  description:
    "Request a software build, an AI system, a white-label licence or a spatial design engagement with Stack & Frame.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageIntro
        title="Tell us what to"
        accent="build."
        lede="Software, systems, or the space around them. A few honest details here beat a long call later."
      />
      <Container>
        <div className="grid gap-14 pb-24 lg:grid-cols-[2fr_1fr]">
          <Suspense fallback={null}>
            <ContactForm />
          </Suspense>
          <aside className="text-[15px] leading-relaxed text-fg-muted">
            <h2 className="font-display text-[17px] font-bold text-fg">
              Prefer email?
            </h2>
            {company.email ? (
              <p className="mt-3">
                Write to{" "}
                <a
                  href={`mailto:${company.email}`}
                  className="border-b border-accent pb-0.5 text-fg transition-colors duration-150 hover:text-accent"
                >
                  {company.email}
                </a>{" "}
                and include roughly the same details as the form.
              </p>
            ) : (
              <p className="mt-3">
                Our direct address is being set up. The form is the fastest way
                to reach us right now.
              </p>
            )}
            <p className="mt-6">
              We reply within two working days, in plain language, with an
              honest read on scope and cost.
            </p>
          </aside>
        </div>
      </Container>
      <Faq />
    </>
  );
}
