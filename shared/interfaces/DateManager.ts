export default interface DateManager{
    generate():string;
    validate(str:string):boolean;
};