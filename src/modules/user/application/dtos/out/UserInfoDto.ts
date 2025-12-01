export default class UserInfo{
    id!:string;
    username?:string;
    urlImage?:string;
    mainEmail!: string;
    emails!: [string, boolean][];
};
