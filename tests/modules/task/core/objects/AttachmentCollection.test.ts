import ConflictDuplicateResource from "../../../../../src/modules/shared/core/errors/ConflictDuplicatedResource";
import LimitExceeded from "../../../../../src/modules/shared/core/errors/LimitExceeded";
import ResourceNotFound from "../../../../../src/modules/shared/core/errors/ResourceNotFound";
import Attachment from "../../../../../src/modules/shared/core/objects/Attachment";
import IntNumber from "../../../../../src/modules/shared/core/objects/IntNumber";
import Text from "../../../../../src/modules/shared/core/objects/Text";
import Url from "../../../../../src/modules/shared/core/objects/URL";
import { AllowedAttachents } from "../../../../../src/modules/shared/core/types/AllowedAttachment.types";
import TaskRules from "../../../../../src/modules/task/core/constants/TaskRules";
import AttachmentCollection from "../../../../../src/modules/task/core/objects/AttachmentCollection";

const createAttachment = (id: number, size = 10): Attachment =>
  new Attachment(
    new Url(`https://example.com/file-${id}.png`),
    AllowedAttachents.image,
    new Text(`file-${id}`),
    new IntNumber(size),
  );

describe("AttachmentCollection Value Object", () => {
  it("should add an attachment and return a new collection", () => {
    const collection = new AttachmentCollection();
    const attachment = createAttachment(1);

    const updated = collection.addItem(attachment);

    expect(collection.size()).toBe(0);
    expect(updated.size()).toBe(1);
    expect(updated.find(attachment)).toBe(true);
  });

  it("should throw if attachment limit is exceeded", () => {
    const attachments = Array.from({ length: TaskRules.maxAttachments() }, (_, i) =>
      createAttachment(i + 1),
    );
    const collection = new AttachmentCollection(attachments);

    expect(() => collection.addItem(createAttachment(999))).toThrow(LimitExceeded);
  });

  it("should throw if attachment size exceeds max limit", () => {
    const collection = new AttachmentCollection();
    const tooLarge = createAttachment(1, TaskRules.getMaxMBLimitAttachmentSize() + 1);

    expect(() => collection.addItem(tooLarge)).toThrow(LimitExceeded);
  });

  it("should throw if attachment already exists", () => {
    const attachment = createAttachment(1);
    const collection = new AttachmentCollection([attachment]);

    expect(() => collection.addItem(attachment)).toThrow(ConflictDuplicateResource);
  });

  it("should delete an existing attachment", () => {
    const attachment = createAttachment(1);
    const collection = new AttachmentCollection([attachment]);

    const updated = collection.deleteItem(attachment);

    expect(updated.size()).toBe(0);
    expect(updated.find(attachment)).toBe(false);
  });

  it("should throw when deleting a missing attachment", () => {
    const collection = new AttachmentCollection();

    expect(() => collection.deleteItem(createAttachment(1))).toThrow(ResourceNotFound);
  });

  it("should return a copy in primitiveCollection", () => {
    const attachment = createAttachment(1);
    const collection = new AttachmentCollection([attachment]);

    const primitive = collection.primitiveCollection();
    primitive.push(createAttachment(2));

    expect(collection.size()).toBe(1);
  });
});
