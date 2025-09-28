export default interface iCodeRepository{
    set(key:string, code:string, ttl: number): Promise<boolean>;
    get(key:string): Promise<string | null>;
}