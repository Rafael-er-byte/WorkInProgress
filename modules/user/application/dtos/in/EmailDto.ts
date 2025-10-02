import type Msg from "../../interfaces/types/message/Msg";

export default class EmailDto{
    to!: string;
    message!:Msg;
}