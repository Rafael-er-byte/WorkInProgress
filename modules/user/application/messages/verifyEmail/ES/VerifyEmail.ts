import type Msg from "../../../interfaces/types/message/Msg";

export default class VerifyEmailMsgES implements Msg{
    subject = 'Verify email';
    html = '<h3>Usa este codigo para verificar tu email</h3>';
    code!: string;
};