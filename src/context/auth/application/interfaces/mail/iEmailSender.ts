import type EmailDto from "../../../../user/application/dtos/in/EmailDto";

export default interface iEmailSender{
    sendEmail(mail:EmailDto):Promise<boolean>;
}
