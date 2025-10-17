import type EmailDto from "../../dtos/in/EmailDto";

export default interface iEmailSender{
    sendEmail(mail:EmailDto):Promise<boolean>;
}
