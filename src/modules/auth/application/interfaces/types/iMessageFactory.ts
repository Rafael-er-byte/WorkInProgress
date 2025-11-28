import type { Languages } from "../../../../../shared/config/constants/AllowedLanguages";
import type { MessageTypes } from "../../../../../shared/config/constants/MessageTypes";
import type Msg from "./message/Msg";

export default interface iMessageFactory{
    select(language: Languages, type?: MessageTypes): Msg    
};
