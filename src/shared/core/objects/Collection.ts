import ValueObject from "./ValueObject";

export default interface Collection{
    addItem(object:ValueObject): Collection;
    deleteItem(object:ValueObject): Collection;
};
