import type IntNumber from "./IntNumber";

export default interface Collection{
    addItem(object:unknown): Collection;
    deleteItem(object:unknown): Collection;
    find(object:unknown): boolean;
    size():IntNumber;
    primitiveCollection(): unknown[];
};
