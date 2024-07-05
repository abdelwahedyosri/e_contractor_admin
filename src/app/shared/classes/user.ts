import { Role } from "./role";
import { UserImage } from "./userImage";

export interface User {
    userId?: number;
    role: Role;
    firstName: string;
    lastName: string;
    birthDate?: string; 
    phoneNumber?: string; 
    email: string;
    username: string;
    password: string;
    isActive?: boolean;
    creationDate?: string;
    createdBy?: string;
    isDeleted?: boolean;
    userImages?: UserImage[];
    twoWayVerificationEnabled?: boolean;
    location : string;
    gender : string;
    dob : string;
    lastLogin?: string;
    avatar?: string;
    
  }
  