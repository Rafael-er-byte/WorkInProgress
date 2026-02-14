import MemberRules from "../../../../../src/modules/member/core/constants/MemberRules";
import MemberProfileImageIsTooLarge from "../../../../../src/modules/member/core/error/MemberProfileImageIsNotAValidImage";
import MemberUserNameIsTooLarge from "../../../../../src/modules/member/core/error/MemberUserNameIsTooLarge";
import MemberInfo from "../../../../../src/modules/member/core/objects/MemberInfo";
import InvalidParameters from "../../../../../src/modules/shared/core/errors/InvalidParameters";
import Attachment from "../../../../../src/modules/shared/core/objects/Attachment";
import IntNumber from "../../../../../src/modules/shared/core/objects/IntNumber";
import Text from "../../../../../src/modules/shared/core/objects/Text";
import Url from "../../../../../src/modules/shared/core/objects/URL";
import { AllowedAttachents } from "../../../../../src/modules/shared/core/types/AllowedAttachment.types";

describe('Member info tests', () => {
    const validUrl = new Url('http://localhost.com');
    const validAttachment = new Attachment(validUrl, AllowedAttachents.image, new Text('myImage'), new IntNumber(220));
    const invalidSizeAttachment = new Attachment(validUrl, AllowedAttachents.image, new Text('myImage'), new IntNumber(MemberRules.maxAttachmentMbSize() + 1));
    const invalidTypeAttachment = new Attachment(validUrl, AllowedAttachents.video, new Text('myImage'), new IntNumber(220));

    it('Should create a valid instance of MemberInfo', () => {
        const memberInfo = new MemberInfo('userExample', validAttachment);

        expect(memberInfo).toBeInstanceOf(MemberInfo);
    });

    it('Should get the correct setted values', () => {
        const memberInfo = new MemberInfo('userExample', validAttachment);

        expect(memberInfo.getUserName()).toStrictEqual('userExample');
        expect(memberInfo.getUrlProfileImage()).toStrictEqual(validAttachment);
    });

    it('Should throw if the attachment is not valid', () => {
        expect(() => new MemberInfo('', validAttachment)).toThrow(InvalidParameters);
        expect(() => new MemberInfo('userExample', '')).toThrow(TypeError);
        expect(() => new MemberInfo('userExample', invalidSizeAttachment)).toThrow(MemberProfileImageIsTooLarge);
        expect(() => new MemberInfo('userExample', invalidTypeAttachment)).toThrow(InvalidParameters);
    });

    it('Should throw if the username is too large', () => {
        expect(() => new MemberInfo('a'.repeat(MemberRules.maxNameSize() + 1), validAttachment)).toThrow(MemberUserNameIsTooLarge);
    });
});
