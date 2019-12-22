export class Chat {
    public id: number;
    public user1Id: number;
    public user2Id: number;
    public firstname: string;
    public lastname: string;
}

export class Message {
    public id: number;
    public userId: number;
    public chatId: number;
    public text: string;
    public mediaUrl: string;
    public edited: boolean;
    public time: Date;
}