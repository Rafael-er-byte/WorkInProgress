export default function validateNumber(number: string): boolean{
    if(!Number.isNaN(Number(number)))return true;
    return false;
}
