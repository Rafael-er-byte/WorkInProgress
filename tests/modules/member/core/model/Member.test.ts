import Member from "../../../../../src/modules/member/core/model/Member";
import MemberInfo from "../../../../../src/modules/member/core/objects/MemberInfo";
import MemberRole from "../../../../../src/modules/member/core/objects/MemberRole";
import { AllowedMemberRoles } from "../../../../../src/modules/member/core/types/AllowedMemberRoles";
import { AllowedMemberStatus } from "../../../../../src/modules/member/core/types/AllowedMemberStatus";
import Attachment from "../../../../../src/modules/shared/core/objects/Attachment";
import IntNumber from "../../../../../src/modules/shared/core/objects/IntNumber";
import Text from "../../../../../src/modules/shared/core/objects/Text";
import Url from "../../../../../src/modules/shared/core/objects/URL";
import { AllowedAttachents } from "../../../../../src/modules/shared/core/types/AllowedAttachment.types";

const validUrl = new Url('http://localhost.com');
const validAttachment = new Attachment(validUrl, AllowedAttachents.image, new Text('myImage'), new IntNumber(220));

const createMemberInfo = () => 
    new MemberInfo(
    "John Doe",
    validAttachment
  );

const createParams = (overrides?: Partial<{
  id: string;
  idProject: string;
  status: AllowedMemberStatus;
  role: AllowedMemberRoles;
  memberInfo: MemberInfo;
}>) => ({
  id: "member-1",
  idProject: "project-1",
  status: AllowedMemberStatus.active,
  role: AllowedMemberRoles.owner,
  memberInfo: createMemberInfo(),
  ...overrides
});

describe("Member Entity", () => {

  const createModifier = () =>
    Member.fromPrimitives(createParams());

  describe("Creation", () => {

    it("should create a valid member", () => {
      const modifier = createModifier();

      const member = Member.create(createParams(), modifier);

      expect(member.getId()).toBe("member-1");
      expect(member.exists()).toBe(true);
      expect(member.isBlocked()).toBe(false);
    });

  });

  describe("Blocking / Unblocking", () => {

    it("should block a member", () => {
      const modifier = createModifier();
      const member = Member.create(createParams(), modifier);

      member.block(modifier);

      expect(member.isBlocked()).toBe(true);
    });

    it("should unblock a member", () => {
      const modifier = createModifier();
      const member = Member.create(createParams(), modifier);

      member.block(modifier);
      member.unBlock(modifier);

      expect(member.isBlocked()).toBe(false);
    });

  });

  describe("Role changes", () => {

    it("should change role", () => {
      const modifier = createModifier();
      const member = Member.create(createParams(), modifier);

      const newRole = new MemberRole(AllowedMemberRoles.manager);

      member.changeRole(newRole, modifier);

      expect(member.canManageMembers()).toBe(true);
      expect(member.canManageProject()).toBe(false);
    });

  });

  describe("Delete", () => {

    it("should delete member", () => {
      const modifier = createModifier();
      const member = Member.create(createParams(), modifier);

      member.delete(modifier);

      expect(member.exists()).toBe(false);
    });

  });

  describe("Permissions delegation", () => {

    it("should delegate permissions to role", () => {
      const member = Member.fromPrimitives(
        createParams({ role: AllowedMemberRoles.manager })
      );

      expect(member.canManageMembers()).toBe(true);
      expect(member.canManageTasks()).toBe(true);
      expect(member.canManageProject()).toBe(false);
    });

  });

  describe("Serialization", () => {

    it("should return correct primitives", () => {
      const modifier = createModifier();
      const member = Member.create(createParams(), modifier);

      const primitives = member.toPrimitives();

      expect(primitives).toEqual(createParams());
    });

  });

});
