import type { Languages } from "../../../../../config/constants/AllowedLanguages";
import type { MessageTypes } from "../../../../../config/constants/MessageTypes";
import type Msg from "./message/Msg";

export default interface iMessageFactory{
    select(language: Languages, type?: MessageTypes): Msg    
};
