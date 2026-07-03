import type { Metadata } from "next";
import { site } from "@/config/site";
import { company } from "@/config/company";

export function buildPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: site.name,
      type: "website",
      images: ["/og.png"],
    },
  };
}

/** Organization JSON-LD; optional registry fields are only emitted when present. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.legalName,
    alternateName: company.displayName,
    url: site.url,
    description: site.description,
    ...(company.email ? { email: company.email } : {}),
    ...(company.nzbn ? { identifier: company.nzbn } : {}),
    ...(company.address
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: company.address.lines.join(", "),
            addressLocality: company.address.city,
            ...(company.address.postcode
              ? { postalCode: company.address.postcode }
              : {}),
            addressCountry: "NZ",
          },
        }
      : { address: { "@type": "PostalAddress", addressCountry: "NZ" } }),
  };
}
