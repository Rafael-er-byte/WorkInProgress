type TypeSorting = 'a-z' | 'z-a' | 'recent';

export default class CategoryFilterDto{
    idCreator!:string;
    limit!:number;
    page!:number;
    titleLike?:string;
    private sortingBy?:TypeSorting;

    setSortingType(sort:string){
        const allowed:TypeSorting[] = ['a-z', 'z-a', 'recent'];

        if(!sort)sort = 'recent';
        else if(!allowed.includes(sort as TypeSorting))throw new Error("Invalid sorting type");
        this.sortingBy = sort as TypeSorting;
    }

    getSortingType():string{
        return this.sortingBy as string;
    }
};
