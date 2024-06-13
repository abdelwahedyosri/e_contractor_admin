export interface UserImage {
    userImageId: number;
    userId: number; // Assuming this will be a simple number; adjust if it's an object
    userImageName: string;
    userImageAlt?: string;
    isMain: boolean;
    creationDate: string;
    createdBy: string;
    isDeleted: boolean;
  }
  