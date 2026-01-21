import type iEmail from "./iEmail.mail";

export default interface iEmailSender{
    send(message:iEmail): Promise<boolean>;
};
