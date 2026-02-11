import InvalidParameters from "../../../../../src/modules/shared/core/errors/InvalidParameters";
import Attachment from "../../../../../src/modules/shared/core/objects/Attachment";
import IntNumber from "../../../../../src/modules/shared/core/objects/IntNumber";
import Text from "../../../../../src/modules/shared/core/objects/Text";
import Url from "../../../../../src/modules/shared/core/objects/URL";
import { AllowedAttachents } from "../../../../../src/modules/shared/core/types/AllowedAttachment.types";
import IdMember from "../../../../../src/modules/member/core/objects/IdMember";
import MemberInfo from "../../../../../src/modules/member/core/objects/MemberInfo";
import MemberNoteInfo from "../../../../../src/modules/task/core/objects/MemberNoteInfo";
import Note from "../../../../../src/modules/task/core/objects/Note";

const createMemberNoteInfo = (): MemberNoteInfo => {
  const id = new IdMember('member-1');
  const url = new Url('https://example.com/profile.png');
  const attachment = new Attachment(url, AllowedAttachents.image, new Text('profile'), new IntNumber(10));
  const info = new MemberInfo('john_doe', attachment);

  return new MemberNoteInfo(id, info);
};

describe('Note Value Object', () => {
  it('should create a valid Note instance', () => {
    const note = new Note('This is a note', createMemberNoteInfo(), new Date());

    expect(note).toBeInstanceOf(Note);
  });

  it('should return content, creator and createdAt', () => {
    const content = 'This is a note';
    const creator = createMemberNoteInfo();
    const createdAt = new Date();

    const note = new Note(content, creator, createdAt);

    expect(note.getContent()).toBe(content);
    expect(note.getCreator()).toBe(creator);
    expect(note.getCreatedAt()).toBeInstanceOf(Date);
  });

  it('should throw if content is invalid', () => {
    expect(() => new Note('', createMemberNoteInfo(), new Date())).toThrow(InvalidParameters);
  });

  it('should throw if creator is invalid', () => {
    const invalidCreator = {} as MemberNoteInfo;

    expect(() => new Note('This is a note', invalidCreator, new Date())).toThrow(InvalidParameters);
  });
});
