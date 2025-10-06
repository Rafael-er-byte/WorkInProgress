import type User from "../../../core/model/User";

export default interface iUserRepository{
    save(user:User): Promise<boolean>;
    update(user:User): Promise<boolean>;
    deleteById(id:User['id']): Promise<boolean>;
    getById(id:User['id']): Promise<User | undefined>;
    getByEmail(email:User['email']): Promise<User | undefined>
    existsById(id:User['id']): Promise<boolean>;
    existsByEmail(email:User['email']): Promise<boolean>;
};
