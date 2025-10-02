import type Msg from "../../../interfaces/types/message/Msg";

export default class VerifyEmailMsgEN implements Msg{
    subject = 'Verify email';
    html = '<h3>Use this code to verify your email</h3>';
    code!: string;
};