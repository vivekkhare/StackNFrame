import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";

/*
 * Draft answers written as sensible defaults for a young studio;
 * the user should review these before launch since they read as commitments.
 */
const FAQS: { q: string; a: string }[] = [
  {
    q: "What does a build cost?",
    a: "It depends on scope, so we will say so plainly: small tools and integrations sit at the lower end, full products cost more. Give us your budget range in the form and we will tell you honestly what it buys.",
  },
  {
    q: "Who owns the code?",
    a: "Custom builds: you do, in full, on final payment. White-label licences work differently: we keep the codebase, you own your brand, your data and your customers.",
  },
  {
    q: "What does white-label include?",
    a: "A production-ready product deployed under your domain and branding, with hosting, updates and support staying on our side. You set the pricing and sell it as yours.",
  },
  {
    q: "What happens after I submit the form?",
    a: "A person reads it, not a pipeline. You get a reply within two working days with follow-up questions or a first read on scope, timeline and cost.",
  },
];

export function Faq() {
  return (
    <Container>
      <div className="max-w-2xl border-t border-hairline pb-24 pt-14">
        <Reveal index={0}>
          <h2 className="font-display text-[22px] font-bold tracking-[-0.01em]">
            Common questions
          </h2>
        </Reveal>
        <div className="mt-6 grid gap-2">
          {FAQS.map((item, i) => (
            <Reveal key={item.q} index={1 + i}>
              <details className="group rounded-tile border border-hairline bg-panel px-6 py-1 open:pb-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-display text-[15.5px] font-medium text-fg transition-colors duration-150 hover:text-accent focus-visible:outline-2 focus-visible:outline-accent [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <CaretDown
                    size={16}
                    className="shrink-0 text-fg-muted transition-transform duration-200 ease-out group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <p className="max-w-[58ch] text-[15px] leading-relaxed text-fg-muted">
                  {item.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </Container>
  );
}
