export default class UpdateUserDto{
    id!:string;
    username?:string;
    urlProfile?:string;
    setMainEmail:boolean = false;
    email?:string;
};
