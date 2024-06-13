import { Image } from './image';
import { Categorie } from './categorie';
import { Tag } from './tag';
import { Review } from './review';

export interface Event {
    id?: string;
    title: string;
    slug:string;
    full_description: string;
    short_description: string;
    ticket_price: number;
    stock:number;
    start_date: Date;
    end_date: Date;
    location?: string;
    video?: string;
    images?: Image[];
    categories?: String;
    tags?: string;
    reviews?: String;
    pageViews?: number;
    createdAt?: Date;
    updatedAt?: Date;
    quantity?:number;
    team1_name:string;
    team2_name:string;
  }