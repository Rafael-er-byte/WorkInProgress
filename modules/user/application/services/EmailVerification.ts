import AppError from "../../../../shared/errors/AppError";
import Unauthorized from "../../../../shared/errors/Unauthorized";
import type iEnviroment from "../../../interfaces/config/iEnviroment";
import type RefreshDto from "../dtos/in/RefreshDto";
import type TokenPayLoad from "../dtos/out/TokenPayLoad";
import type iCodeRepository from "../interfaces/cache/iCodeRepository";
import type iAppConfig from "../interfaces/contracts/AppConfig";
import type iEmailSender from "../interfaces/mail/iEmailSender";
import type iUserRepository from "../interfaces/repository/iUserRepository";
import type iCodeGenerator from "../interfaces/utils/iCodeGenerator";
import type iToken from "../interfaces/utils/iToken";
import type Msg from "../interfaces/types/message/Msg";
import EmailDto from "../dtos/in/EmailDto";
import type iMessageFactory from "../interfaces/types/iMessageFactory";
import { MessageTypes } from "../../../../config/constants/MessageTypes";

export default class EmailVerification{
    constructor(
        private codeGenerator: iCodeGenerator,
        private emailSender: iEmailSender,
        private codeRepo: iCodeRepository,
        private appConfig: iAppConfig,
        private tokenManager: iToken,
        private env: iEnviroment,
        private repo: iUserRepository,
        private messageFactory: iMessageFactory 
    ){}

    async execute(token: RefreshDto): Promise<void>{

        if(!await this.emailSender.healtCheck())throw new AppError('Email service unavailable', 503);

        const payload: TokenPayLoad = await this.tokenManager.decode(token.token);
        if(!payload) throw new Unauthorized('Invalid credentials');

        const [user, verificationCode, language, isValidToken] = await Promise.all([
            this.repo.getById(payload.id),
            this.codeGenerator.generate(),
            this.appConfig.getLanguageConfig(payload.id),
            this.tokenManager.validate(token.token, this.env.token.refresh)
        ]);
        
        if(!user || !isValidToken) throw new Unauthorized('Invalid credential');
        if(!verificationCode) throw new AppError('Failed to generate verification code');
        if(!language) throw new AppError('Failed to fetch language');

        let msg: Msg = this.messageFactory.select(language, MessageTypes.VERIFY);
        msg.code = verificationCode;

        const mail: EmailDto = new EmailDto();
        mail.message = msg;
        mail.to = user.getEmail();

        const [isSent, isSave] = await Promise.all([
            this.emailSender.sendEmail(mail),
            this.codeRepo.set(`verify:${user.getId()}:${verificationCode}`, verificationCode, this.env.verificationCode.ttl)
        ]);
    
        if(!isSent || !isSave)throw new AppError('Something went wrong');
    }
};
