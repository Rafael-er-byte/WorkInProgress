import type Msg from "../../../../auth/application/interfaces/types/message/Msg";

export default class EmailDto{
    to!: string;
    message!:Msg;
}