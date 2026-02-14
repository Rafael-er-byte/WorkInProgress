import MemberRoleNotValid from "../../../../../src/modules/member/core/error/MemberRoleNotValid";
import MemberRole from "../../../../../src/modules/member/core/objects/MemberRole";
import { AllowedMemberRoles } from "../../../../../src/modules/member/core/types/AllowedMemberRoles";

describe("MemberRole Value Object", () => {

  describe("Creation & validation", () => {
    it("should create a valid role", () => {
      const role = new MemberRole(AllowedMemberRoles.owner);
      expect(role.getRole()).toBe(AllowedMemberRoles.owner);
    });

    it("should throw error for invalid role", () => {
      expect(() => {
        new MemberRole("INVALID" as AllowedMemberRoles);
      }).toThrow(MemberRoleNotValid);
    });
  });

  describe("Permission checks", () => {

    it("owner should manage everything", () => {
      const role = new MemberRole(AllowedMemberRoles.owner);

      expect(role.canManageProject()).toBe(true);
      expect(role.canManageMembers()).toBe(true);
      expect(role.canManageCategories()).toBe(true);
      expect(role.canManageLists()).toBe(true);
      expect(role.canManageTasks()).toBe(true);
      expect(role.canUpdateTasks()).toBe(true);
    });

    it("manager should manage most resources but not the project", () => {
      const role = new MemberRole(AllowedMemberRoles.manager);

      expect(role.canManageProject()).toBe(false);
      expect(role.canManageMembers()).toBe(true);
      expect(role.canManageCategories()).toBe(true);
      expect(role.canManageLists()).toBe(true);
      expect(role.canManageTasks()).toBe(true);
      expect(role.canUpdateTasks()).toBe(true);
    });

    it("contributor should manage tasks but not project structure", () => {
      const role = new MemberRole(AllowedMemberRoles.contributor);

      expect(role.canManageProject()).toBe(false);
      expect(role.canManageMembers()).toBe(false);
      expect(role.canManageCategories()).toBe(false);
      expect(role.canManageLists()).toBe(false);
      expect(role.canManageTasks()).toBe(true);
      expect(role.canUpdateTasks()).toBe(true);
    });

    it("colaborator should only update tasks", () => {
      const role = new MemberRole(AllowedMemberRoles.colaborator);

      expect(role.canManageProject()).toBe(false);
      expect(role.canManageMembers()).toBe(false);
      expect(role.canManageCategories()).toBe(false);
      expect(role.canManageLists()).toBe(false);
      expect(role.canManageTasks()).toBe(false);
      expect(role.canUpdateTasks()).toBe(true);
    });

    it("viewer should not manage anything", () => {
      const role = new MemberRole(AllowedMemberRoles.auditor);

      expect(role.canManageProject()).toBe(false);
      expect(role.canManageMembers()).toBe(false);
      expect(role.canManageCategories()).toBe(false);
      expect(role.canManageLists()).toBe(false);
      expect(role.canManageTasks()).toBe(false);
      expect(role.canUpdateTasks()).toBe(false);
    });

  });

});
