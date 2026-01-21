import type { Languages } from "../../../../../shared/config/constants/AllowedLanguages";
import { MessageTypes } from "../../../../../shared/config/constants/MessageTypes";
import AppError from "../../../../../shared/core/errors/AppError";
import type iMessageFactory from "../../interfaces/types/iMessageFactory";
import type Msg from "../../interfaces/types/Msg";
import VerifyEmailFactory from "../verifyEmail/factory/verifyEmailFactory";

export default class MessageFactory implements iMessageFactory{
    select(language: Languages, type: MessageTypes): Msg{
        let emailFactory: iMessageFactory;
        let message: Msg;

        switch(type){
            case MessageTypes.VERIFY:
                emailFactory = new VerifyEmailFactory();
                message = emailFactory.select(language);
            break;

            default: 
                throw new AppError('Unsupported type', 500, type);
        }

        return message;
    }
};
