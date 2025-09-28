export default interface iEmailSender{
    sendEmail(email:string, message:string):Promise<boolean>;
}