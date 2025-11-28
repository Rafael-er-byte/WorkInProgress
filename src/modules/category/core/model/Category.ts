import MissingRequiredParameters from "../../../../shared/core/errors/MissingRequiredParameters";
import Url from "../objects/URL";

export default class Category {
    private name!: string;
    private icon: Url = new Url();
    private readonly idCategory!: string;
    private readonly idCreator!: string;
    private readonly createdAt?: string | undefined;

    constructor(name: string, idCreator: string, idCategory: string, createdAt: string, icon: string) {
        if (!idCategory || idCategory?.trim().length === 0) throw new MissingRequiredParameters("id");
        if (!name || name?.trim().length === 0) throw new MissingRequiredParameters("category_name");
        if (!idCreator || idCreator?.trim().length === 0) throw new MissingRequiredParameters("id_creator");

        this.setName(name);
        this.idCategory = idCategory;
        this.idCreator = idCreator;
        this.createdAt = createdAt;
        this.icon.setUrl(icon);
    }

    public getIdCategory(): string {
        return this.idCategory;
    }

    public getName(): string {
        return this.name;
    }

    public getIdCreator(): string {
        return this.idCreator;
    }

    public getCreatedAt(): string | undefined {
        return this.createdAt;
    }

    public getIcon(): string{
        return this.icon.getUrl();
    }

    public setIcon(newIcon:string): void{
        this.icon.setUrl(newIcon);
    }
    
    public setName(name: string): void {
        if (!name || name.trim().length === 0) {
            throw new MissingRequiredParameters('category_name');
        }
        this.name = name;
    }
};
