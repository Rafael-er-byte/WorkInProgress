export default class UserDto{
    email!: [string, boolean][];
    mainEmail!: string;
    havePassword!:boolean;
    password?:string;
    userName?:string;
    urlProfile?:string;
};
