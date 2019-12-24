export class User {
    public id: number;
    public firstname: string;
    public lastname: string;
    public email: string;
    public userRole: UserRole;
    public avatarUrl: string;
}

export enum UserRole {
    admin = 'ADMIN',
    user = 'USER'
}