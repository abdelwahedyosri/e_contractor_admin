export interface Review {
    _id?: string;
    name: string;
    content: string;
    email: string;
    score: number;
    max_rating: number;
    createdAt?: Date;
    updatedAt?: Date;
  }