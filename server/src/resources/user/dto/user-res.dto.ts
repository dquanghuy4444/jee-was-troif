import { Role } from "constant";
import { User } from "../entities/user.entity";

export class UserResponse {
    id: string;
    name: string;
    phoneNumber: string;
    email: string;
    updatedAt: Date;
    createdAt: Date;
    role: Role;

    constructor(user: User) {
        this.id = user.id as string;
        this.name = user.name;
        this.phoneNumber = user.phoneNumber;
        this.email = user.email;
        this.role = user.role;
        this.updatedAt = user.updatedAt;
        this.createdAt = user.createdAt;
    }
}
