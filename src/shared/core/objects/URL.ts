import InvalidParameters from "../errors/InvalidParameters";

export default class Url{
    private url!: string;
    private readonly hostnameRegex = /^[a-zA-Z0-9-.]+$/;
    private readonly tldRegex = /^[a-zA-Z]{2,}$/

    constructor(newUrl:string){
        let tmpUrl: URL;
        try {
            tmpUrl = new URL(newUrl);
            if(tmpUrl.protocol !== "http:" && tmpUrl.protocol !== "https:") throw new InvalidParameters('url', newUrl);

            if(!this.hostnameRegex.test(tmpUrl.hostname))throw new InvalidParameters('url', newUrl);

            const hostParts = tmpUrl.hostname.split('.');
            if(hostParts.length < 2)throw new InvalidParameters('url', newUrl);

            const tld = hostParts[hostParts.length-1] as string;
            if(!this.tldRegex.test(tld))throw new InvalidParameters('url', newUrl);

        } catch (error) {
            throw new InvalidParameters('url', newUrl);
        }

        this.url = newUrl;
    }

    public getUrl(): string | undefined{
        if(!this.url || this.url.trim().length === 0) return undefined;
        return this.url;
    }
};
