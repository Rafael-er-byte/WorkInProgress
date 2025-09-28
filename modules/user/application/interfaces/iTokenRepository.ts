export default interface iTokenRepository{
    set(key:string, value:string, TTL:number): Promise<void>;
    delete(key:string):Promise<boolean>;
    get(key:string): Promise<string | null>
    getTTL(key:string): Promise<number>
    deleteByPattern(pattern:string): Promise<number>
}