export class Post {
    public id: number;
    public userId: number;
    public text: string;
    public mediaUrl: string;
    public likes: number;
    public dislikes: number;
    public userLike:  Like;
    public userLikeId:  number;
}

export enum Like {
    like = 'like',
    dislike = 'dislike'
}