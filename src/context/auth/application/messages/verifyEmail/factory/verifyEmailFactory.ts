import { Languages } from "../../../../../shared/config/constants/AllowedLanguages";
import AppError from "../../../../../shared/core/errors/AppError";
import type iMessageFactory from "../../../interfaces/types/iMessageFactory";
import type Msg from "../../../interfaces/types/Msg";
import VerifyEmailMsgEN from "../EN/VerifyEmail";
import VerifyEmailMsgES from "../ES/VerifyEmail";

export default class VerifyEmailFactory implements iMessageFactory{
    select(language: Languages): Msg {
        switch(language){
            case Languages.EN:
                return new VerifyEmailMsgEN();    
            break;

            case Languages.ES:
                return new VerifyEmailMsgES();
            break;

            default:
                throw new AppError('Unsuported language', 500, language);    
            break;
        }
    }
};
