export default interface LastId{
    increment(key:string):Promise<void>;
    getLast(key:string): Promise<string>;
}