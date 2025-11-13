import InvalidOperation from "../../../shared/errors/InvalidOperation";
import InvalidParameters from "../../../shared/errors/InvalidParameters";

export default class Url{
    private url!: string;
    private readonly urlRegex = /^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s?#]*)?(\?[^\s#]*)?(#[^\s]*)?$/;

    constructor(){}

    public setUrl(newUrl: string){
        if(!newUrl || !this.urlRegex.test(newUrl)) throw new InvalidParameters('url', newUrl);
        this.url = newUrl;
    }

    public getUrl(): string{
        if(!this.url || this.url.trim().length === 0) throw new InvalidOperation('url doesnt exists');
        return this.url;
    }
};
