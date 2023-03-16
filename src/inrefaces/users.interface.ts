export interface IUser {
    login: string;
    isAdmin: boolean;
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    token: string;
}