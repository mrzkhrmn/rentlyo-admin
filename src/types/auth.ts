export type PlatformUser = {
  id: string;
  email: string;
  fullName: string;
};

export type PlatformAuthResponse = {
  accessToken: string;
  expiresIn: number;
  user: PlatformUser;
};

export type AuthSession = {
  accessToken: string;
  expiresIn: number;
  user: PlatformUser;
};
