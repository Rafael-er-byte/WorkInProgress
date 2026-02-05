import InvalidParameters from "../../../../../src/context/shared/core/errors/InvalidParameters";
import Attachment from "../../../../../src/context/shared/core/objects/Attachment";
import IntNumber from "../../../../../src/context/shared/core/objects/IntNumber";
import Text from "../../../../../src/context/shared/core/objects/Text";
import Url from "../../../../../src/context/shared/core/objects/URL";
import { AllowedAttachents } from "../../../../../src/context/shared/core/types/AllowedAttachment.types";

describe('Attachment object tests', () => {
    const validUrl = new Url('http://localhost.com');

    it('Should create a valid instance of Attachment', () => {
        
        const attachment = new Attachment(validUrl, AllowedAttachents.image, new Text('myImage'), new IntNumber(2222));
        expect(attachment).toBeInstanceOf(Attachment);
    });

    it('Should throw if the attachment is not valid', () => {
        expect(() => new Attachment(validUrl, 'img', new Text('MyDoc'), new IntNumber(44444))).toThrow(InvalidParameters);
        expect(() => new Attachment(validUrl, 'img', new IntNumber(44444))).toThrow(InvalidParameters);
    });
});
