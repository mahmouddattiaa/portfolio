export type Enquiry = {
  name: string;
  email: string;
  company: string;
  country: string;
  problem: string;
  outcome: string;
  offer: string;
  timing: string;
  budget: string;
  link: string;
  consent: boolean;
};

/** Provider integration is intentionally held behind this boundary. */
export async function submitEnquiry(_enquiry: Enquiry): Promise<void> {
  void _enquiry;
  throw new Error("Project enquiry delivery is not configured yet.");
}
