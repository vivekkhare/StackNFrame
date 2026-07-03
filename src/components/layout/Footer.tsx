import { site } from "@/config/site";
import { company } from "@/config/company";
import { Logo } from "@/components/ui/Logo";
import { NavLink } from "./NavLink";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-10 border-t border-hairline">
      <div className="mx-auto flex w-full max-w-[1240px] flex-wrap items-center justify-between gap-x-8 gap-y-4 px-6 py-9 md:px-10">
        <Logo />
        <nav aria-label="Footer" className="flex items-center gap-6">
          {site.nav.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="text-[13px] text-fg-muted">
          <p>
            A precision-engineering brand / (c) {year} {company.legalName},
            Aotearoa New Zealand
          </p>
          {(company.nzbn || company.companyNumber) && (
            <p className="mt-1 font-mono text-[11px]">
              {company.nzbn && <>NZBN {company.nzbn}</>}
              {company.nzbn && company.companyNumber && <> · </>}
              {company.companyNumber && <>Company no. {company.companyNumber}</>}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
