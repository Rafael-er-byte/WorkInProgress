export default interface IDManager{
    generateId():string
    validateId(id:string | undefined):boolean
}
