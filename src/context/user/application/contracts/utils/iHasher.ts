export default interface iHasher{
    hash(password:string): string;
    compare(unhashedPwd:string, hashedPwd:string): boolean;
};
