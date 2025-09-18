export default interface iTokenRepository{
    set(key:string, value:string, TTL:number): Promise<void>;
    delete(key:string):Promise<void>;
    get(key:string): Promise<string | undefined>
}