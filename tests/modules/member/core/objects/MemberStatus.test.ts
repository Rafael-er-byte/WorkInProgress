import MemberStatusNotSupported from "../../../../../src/modules/member/core/error/MemberStatusNotSupported";
import MemberStatus from "../../../../../src/modules/member/core/objects/MemberStatus";
import { AllowedMemberStatus } from "../../../../../src/modules/member/core/types/AllowedMemberStatus";

describe("MemberStatus Value Object", () => {

  it("should create an active status correctly", () => {
    const status = MemberStatus.active();

    expect(status.getStatus()).toBe(AllowedMemberStatus.active);
    expect(status.isBlocked()).toBe(false);
    expect(status.isDeleted()).toBe(false);
  });

  it("should create a blocked status correctly", () => {
    const status = MemberStatus.blocked();

    expect(status.getStatus()).toBe(AllowedMemberStatus.blocked);
    expect(status.isBlocked()).toBe(true);
    expect(status.isDeleted()).toBe(false);
  });

  it("should create a deleted status correctly", () => {
    const status = MemberStatus.deleted();

    expect(status.getStatus()).toBe(AllowedMemberStatus.deleted);
    expect(status.isBlocked()).toBe(false);
    expect(status.isDeleted()).toBe(true);
  });

  it("should create status using factory method", () => {
    const status = MemberStatus.create(AllowedMemberStatus.active);

    expect(status.getStatus()).toBe(AllowedMemberStatus.active);
  });

  it("should throw error for unsupported status", () => {
    expect(() => {
      MemberStatus.create("INVALID" as AllowedMemberStatus);
    }).toThrow(MemberStatusNotSupported);
  });

});
