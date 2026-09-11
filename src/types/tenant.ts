export type PlatformTenantListItem = {
  id: string;
  name: string;
  slug: string;
  status: string;
  planName: string;
  subscriptionStatus: string | null;
  websiteEnabled: boolean;
  createdAt: string;
};

export type PlatformTenantDetail = PlatformTenantListItem & {
  phone: string | null;
  address: string | null;
  email: string | null;
  vehicleCount: number;
  reservationCount: number;
};
