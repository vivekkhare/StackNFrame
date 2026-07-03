/**
 * Single source of truth for company registry and contact details.
 * Optional fields render nothing until filled in — the site degrades gracefully.
 */
export interface CompanyInfo {
  legalName: string;
  displayName: string;
  /** New Zealand Business Number, e.g. "9429048xxxxxx" */
  nzbn?: string;
  /** Companies Office company number */
  companyNumber?: string;
  /** Drives every mailto link and the form fallback */
  email?: string;
  phone?: string;
  address?: {
    lines: string[];
    city: string;
    postcode?: string;
    country: string;
  };
  classification: string;
  jurisdiction: string;
}

export const company: CompanyInfo = {
  legalName: "STACK & FRAME LIMITED",
  displayName: "Stack & Frame",
  classification: "J542010 Software Publishing",
  jurisdiction: "New Zealand",
  // nzbn: "",
  // companyNumber: "",
  // email: "hello@stacknframe.com",
};
