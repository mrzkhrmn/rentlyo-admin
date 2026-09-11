export type LeadStatus = "New" | "Contacted" | "Closed";

export type Lead = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string | null;
  message: string | null;
  wantsWebsite: boolean;
  status: string;
  createdAt: string;
  updatedAt: string | null;
};
