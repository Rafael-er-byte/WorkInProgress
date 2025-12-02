import type iEmail from "./iEmail.mail";

export default interface iMessenger{
    send(message:iEmail): Promise<boolean>;
};
