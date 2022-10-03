import { Roles } from "../utils/Roles";

export interface User {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}