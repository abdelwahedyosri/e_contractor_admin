export interface SocialAccount {
    id: number;
    provider: string;
    providerUserId: string;
    userId: number; // Assuming this will be a simple number; adjust if it's an object
  }
  