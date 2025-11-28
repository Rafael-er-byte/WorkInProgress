import type User from "../../../core/model/User";

export default interface iUserRepository{
    create(user:User): Promise<boolean>;
    update(user:User): Promise<boolean>;
    deleteById(id:User['id']): Promise<boolean>;
    getById(id:User['id']): Promise<User | undefined>;
    getByEmail(email:string): Promise<User | undefined>
    existsById(id:User['id']): Promise<boolean>;
    existsByEmail(email:string): Promise<boolean>;
};
