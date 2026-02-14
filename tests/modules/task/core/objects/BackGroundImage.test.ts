import InvalidParameters from "../../../../../src/modules/shared/core/errors/InvalidParameters";
import LimitExceeded from "../../../../../src/modules/shared/core/errors/LimitExceeded";
import Attachment from "../../../../../src/modules/shared/core/objects/Attachment";
import IntNumber from "../../../../../src/modules/shared/core/objects/IntNumber";
import Text from "../../../../../src/modules/shared/core/objects/Text";
import Url from "../../../../../src/modules/shared/core/objects/URL";
import { AllowedAttachents } from "../../../../../src/modules/shared/core/types/AllowedAttachment.types";
import TaskRules from "../../../../../src/modules/task/core/constants/TaskRules";
import BackGroundImage from "../../../../../src/modules/task/core/objects/BackGroundImage";

const createAttachment = (type: AllowedAttachents = AllowedAttachents.image, size = 10): Attachment =>
  new Attachment(
    new Url("https://example.com/background.png"),
    type,
    new Text("background"),
    new IntNumber(size),
  );

describe("BackGroundImage Value Object", () => {
  it("should create a valid BackGroundImage with an image attachment", () => {
    const image = createAttachment();
    const backgroundImage = new BackGroundImage(image);

    expect(backgroundImage).toBeInstanceOf(BackGroundImage);
    expect(backgroundImage.getImage()).toBe(image);
  });

  it("should throw if attachment is not an image", () => {
    const pdf = createAttachment(AllowedAttachents.pdf);

    expect(() => new BackGroundImage(pdf)).toThrow(InvalidParameters);
  });

  it("should throw if image exceeds max size limit", () => {
    const tooLargeImage = createAttachment(
      AllowedAttachents.image,
      TaskRules.getMaxMBLimitAttachmentSize() + 1,
    );

    expect(() => new BackGroundImage(tooLargeImage)).toThrow(LimitExceeded);
  });
});
