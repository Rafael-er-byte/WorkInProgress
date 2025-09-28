export default interface iCodeGenerator{
    generate(): Promise<string>;
}