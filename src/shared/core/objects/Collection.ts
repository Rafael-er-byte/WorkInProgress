import type IntNumber from "./IntNumber";
import ValueObject from "./ValueObject";

export default interface Collection extends ValueObject{
    collection:ValueObject[];
    readonly limitSize:IntNumber;

    addItem(object:ValueObject): Collection;
    deleteItem(object:ValueObject): Collection;
};
