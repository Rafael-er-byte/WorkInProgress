import IdMember from "../../../../../src/modules/member/core/objects/IdMember";
import MemberInfo from "../../../../../src/modules/member/core/objects/MemberInfo";
import ConflictDuplicateResource from "../../../../../src/modules/shared/core/errors/ConflictDuplicatedResource";
import LimitExceeded from "../../../../../src/modules/shared/core/errors/LimitExceeded";
import ResourceNotFound from "../../../../../src/modules/shared/core/errors/ResourceNotFound";
import Attachment from "../../../../../src/modules/shared/core/objects/Attachment";
import IntNumber from "../../../../../src/modules/shared/core/objects/IntNumber";
import Text from "../../../../../src/modules/shared/core/objects/Text";
import Url from "../../../../../src/modules/shared/core/objects/URL";
import { AllowedAttachents } from "../../../../../src/modules/shared/core/types/AllowedAttachment.types";
import TaskRules from "../../../../../src/modules/task/core/constants/TaskRules";
import MemberNoteInfo from "../../../../../src/modules/task/core/objects/MemberNoteInfo";
import Note from "../../../../../src/modules/task/core/objects/Note";
import NoteCollection from "../../../../../src/modules/task/core/objects/NoteCollection";

const createMemberNoteInfo = (id: number): MemberNoteInfo => {
  const attachment = new Attachment(
    new Url(`https://example.com/profile-${id}.png`),
    AllowedAttachents.image,
    new Text(`profile-${id}`),
    new IntNumber(10),
  );
  const info = new MemberInfo(`member-${id}`, attachment);

  return new MemberNoteInfo(new IdMember(`member-${id}`), info);
};

const createNote = (id: number): Note =>
  new Note(`note content ${id}`, createMemberNoteInfo(id), new Date());

describe("NoteCollection Value Object", () => {
  it("should add a note and return a new collection", () => {
    const collection = new NoteCollection();
    const note = createNote(1);

    const updated = collection.addItem(note);

    expect(collection.size()).toBe(0);
    expect(updated.size()).toBe(1);
    expect(updated.find(note)).toBe(true);
  });

  it("should throw if notes limit is exceeded", () => {
    const notes = Array.from({ length: TaskRules.maxNotes() }, (_, i) => createNote(i + 1));
    const collection = new NoteCollection(notes);

    expect(() => collection.addItem(createNote(999))).toThrow(LimitExceeded);
  });

  it("should throw if note already exists for creator", () => {
    const note = createNote(1);
    const collection = new NoteCollection([note]);

    expect(() => collection.addItem(note)).toThrow(ConflictDuplicateResource);
  });

  it("should delete an existing note", () => {
    const note = createNote(1);
    const collection = new NoteCollection([note]);

    const updated = collection.deleteItem(note);

    expect(updated.size()).toBe(0);
    expect(updated.find(note)).toBe(false);
  });

  it("should throw when deleting a missing note", () => {
    const collection = new NoteCollection();

    expect(() => collection.deleteItem(createNote(1))).toThrow(ResourceNotFound);
  });

  it("should return a copy in primitiveCollection", () => {
    const note = createNote(1);
    const collection = new NoteCollection([note]);

    const primitive = collection.primitiveCollection();
    primitive.push(createNote(2));

    expect(collection.size()).toBe(1);
  });
});
