import type { TypeSorting } from "../../types/Typesorting.type";

export default interface CategoryFilterDto{
    idCreator:string;
    limit:number;
    page:number;
    titleLike?:string;
    orderBy?:TypeSorting;
};
