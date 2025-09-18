import type iHasher from "../interfaces/iHasher";
import User from "./User";

export default class UserBuilder{
    userName!:string;
    email!:string;
    password!:string;
    urlProfile?:string;
    createdAt!:string;
    isVerified:boolean = false;
    id!: string;

    constructor(public hasher:iHasher, id:string){
        if(!hasher || !id)throw new Error('Missing required parameters');
        this.id = id;
    }

    setUserName(userName: string): this{
        if(!userName)throw new Error('Missing required parameters');
        this.userName = userName;
        return this;
    }

    setEmail(email:string): this{
        if(!email)throw new Error('Invalid email');
        this.email = email;
        return this;
    }

    setPassword(password:string): this{
        if(!this.hasher.validate(password))throw new Error('Invalid password');
        this.password = password;
        return this;
    }

    setUrlProfile(url:string | undefined): this{
        if(!url)return this;
        this.urlProfile = url;
        return this;
    }

    setCreatedAt(date:string): this{
        if(!date)throw new Error('Invalid date');
        this.createdAt = date;
        return this;
    }

    setIsVerified(isVerified:boolean): this{
        if(isVerified)this.isVerified = isVerified;
        return this;
    }

    build(): User{
        const user: User = new User(this);
        return user;
    }
};