import Member from "../../../../../src/modules/member/core/model/Member";
import MemberInfo from "../../../../../src/modules/member/core/objects/MemberInfo";
import { AllowedMemberRoles } from "../../../../../src/modules/member/core/types/AllowedMemberRoles";
import { AllowedMemberStatus } from "../../../../../src/modules/member/core/types/AllowedMemberStatus";
import ConflictDuplicateResource from "../../../../../src/modules/shared/core/errors/ConflictDuplicatedResource";
import LimitExceeded from "../../../../../src/modules/shared/core/errors/LimitExceeded";
import ResourceNotFound from "../../../../../src/modules/shared/core/errors/ResourceNotFound";
import Attachment from "../../../../../src/modules/shared/core/objects/Attachment";
import IntNumber from "../../../../../src/modules/shared/core/objects/IntNumber";
import Text from "../../../../../src/modules/shared/core/objects/Text";
import Url from "../../../../../src/modules/shared/core/objects/URL";
import { AllowedAttachents } from "../../../../../src/modules/shared/core/types/AllowedAttachment.types";
import MemberMustBeActive from "../../../../../src/modules/task/core/error/MemberMustBeActive";
import TaskRules from "../../../../../src/modules/task/core/constants/TaskRules";
import MemberCollection from "../../../../../src/modules/task/core/objects/MemberCollection";

const createAttachment = (id: number): Attachment =>
  new Attachment(
    new Url(`https://example.com/member-${id}.png`),
    AllowedAttachents.image,
    new Text(`member-${id}`),
    new IntNumber(10),
  );

const createMemberInfo = (id: number): MemberInfo => new MemberInfo(`user-${id}`, createAttachment(id));

const createMember = (id: number, status: AllowedMemberStatus = AllowedMemberStatus.active): Member =>
  Member.fromPrimitives({
    id: `member-${id}`,
    idProject: "project-1",
    status,
    role: AllowedMemberRoles.contributor,
    memberInfo: createMemberInfo(id),
  });

describe("MemberCollection Value Object", () => {
  it("should add a member and return a new collection", () => {
    const collection = new MemberCollection();
    const member = createMember(1);

    const updated = collection.addItem(member);

    expect(collection.size()).toBe(0);
    expect(updated.size()).toBe(1);
    expect(updated.find(member)).toBe(true);
  });

  it("should throw if members limit is exceeded", () => {
    const members = Array.from({ length: TaskRules.maxMembers() }, (_, i) => createMember(i + 1));
    const collection = new MemberCollection(members);

    expect(() => collection.addItem(createMember(999))).toThrow(LimitExceeded);
  });

  it("should throw if member is blocked", () => {
    const collection = new MemberCollection();
    const blocked = createMember(1, AllowedMemberStatus.blocked);

    expect(() => collection.addItem(blocked)).toThrow(MemberMustBeActive);
  });

  it("should throw if member already exists", () => {
    const member = createMember(1);
    const collection = new MemberCollection([member]);

    expect(() => collection.addItem(member)).toThrow(ConflictDuplicateResource);
  });

  it("should delete an existing member", () => {
    const member = createMember(1);
    const collection = new MemberCollection([member]);

    const updated = collection.deleteItem(member);

    expect(updated.size()).toBe(0);
    expect(updated.find(member)).toBe(false);
  });

  it("should throw when deleting a missing member", () => {
    const collection = new MemberCollection();

    expect(() => collection.deleteItem(createMember(1))).toThrow(ResourceNotFound);
  });

  it("should return a copy in primitiveCollection", () => {
    const member = createMember(1);
    const collection = new MemberCollection([member]);

    const primitive = collection.primitiveCollection();
    primitive.push(createMember(2));

    expect(collection.size()).toBe(1);
  });
});
