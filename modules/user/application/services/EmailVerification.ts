import type iEnviroment from "../../../interfaces/config/iEnviroment";
import type iCodeRepository from "../interfaces/cache/iCodeRepository";
import type iAppConfig from "../interfaces/contracts/AppConfig";
import type iEmailSender from "../interfaces/mail/iEmailSender";
import type iUserRepository from "../interfaces/repository/iUserRepository";
import type iCodeGenerator from "../interfaces/utils/iCodeGenerator";
import type iToken from "../interfaces/utils/iToken";
import EmailDto from "../dtos/in/EmailDto";
import type iMessageFactory from "../interfaces/types/iMessageFactory";
import { MessageTypes } from "../../../../config/constants/MessageTypes";
import AppError from "../../../../shared/errors/api/AppError";
import Unauthorized from "../../../../shared/errors/api/Unauthorized";
import type Msg from "../interfaces/types/Msg";
import type UserIdDto from "../dtos/in/UserIdDtos";

export default class EmailVerification{
    constructor(
        private codeGenerator: iCodeGenerator,
        private emailSender: iEmailSender,
        private codeRepo: iCodeRepository,
        private appConfig: iAppConfig,
        private env: iEnviroment,
        private repo: iUserRepository,
        private messageFactory: iMessageFactory 
    ){}

    async execute(userId: UserIdDto): Promise<void>{

        if(!await this.emailSender.healtCheck())throw new AppError('Email service unavailable', 503);

        const [user, verificationCode, language] = await Promise.all([
            this.repo.getById(userId.id),
            this.codeGenerator.generate(),
            this.appConfig.getLanguageConfig(userId.id)
        ]);
        
        if(!user) throw new Unauthorized('Invalid credential');
        if(!verificationCode) throw new AppError('Failed to generate verification code');
        if(!language) throw new AppError('Failed to fetch language');

        let msg: Msg = this.messageFactory.select(language, MessageTypes.VERIFY);
        msg.code = verificationCode;

        const mail: EmailDto = new EmailDto();
        mail.message = msg;
        mail.to = user.getEmail();

        const [isSent, isSave] = await Promise.all([
            this.emailSender.sendEmail(mail),
            this.codeRepo.set(`verify:${verificationCode}`, user.getId(), this.env.verificationCode.ttl)
        ]);
    
        if(!isSent || !isSave)throw new AppError('Something went wrong');
    }
};
