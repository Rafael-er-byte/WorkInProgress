export default interface iHasher{
    validate(password: string): boolean;
    hash(password:string) : string;
    compare(unHashed:string, hashed:string): boolean;
}