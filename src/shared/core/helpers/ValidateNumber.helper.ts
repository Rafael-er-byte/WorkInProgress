export default function isStringANumber(number: string): boolean{
    if(!Number.isNaN(Number(number)))return true;
    return false;
}
