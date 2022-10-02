import { Roles } from "../utils/Roles";

export interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roles: Roles[];
}