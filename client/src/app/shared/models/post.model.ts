export class Post {
    public id: number;
    public userId: number;
    public text: string;
    public mediaUrl: string;
    public likes: number;
    public dislikes: number;
    public userLike:  Like;
    public userLikeId:  number;
    public comments: Comment[];
}

export class Comment {
    public id: number;
    public text: string;
    public userId: number;
    public firstname: string; 
    public lastname: string; 
}

export enum Like {
    like = 'like',
    dislike = 'dislike'
}