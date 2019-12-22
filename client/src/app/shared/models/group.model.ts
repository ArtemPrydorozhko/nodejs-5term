export class Group {
    public id: number;
    public name: string;
    public users: Array<
        {
            id: number,
            firstname: string,
            lastname: string,
            email: string,
            lastSeen: string,
            userRole: string,
            avatarUrl: string,
            'groupuser.id': number,
            'groupuser.admin': number,
            'groupuser.userId': number,
            'groupuser.groupId': number
        }>;
}