import type User from "../../../core/model/User";

export default interface iUserRepository{
    save(user:User): Promise<boolean>;
    deleteById(id:string): Promise<boolean>;
    getById(id:string): Promise<User | undefined>;
    getByEmail(id:string): Promise<User | undefined>
    existsById(id:string): Promise<boolean>;
    existsByEmail(email:string): Promise<boolean>;
};
