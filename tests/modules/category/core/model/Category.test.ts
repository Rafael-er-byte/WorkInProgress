import Category from "../../../../../src/modules/category/core/model/Category";
import CategoryColor from "../../../../../src/modules/category/core/objects/CategoryColor";
import CategoryName from "../../../../../src/modules/category/core/objects/CategoryName";
import { AllowedCategoryStatus } from "../../../../../src/modules/category/core/types/AllowedCategoryStatus";
import { AllowedColors } from "../../../../../src/modules/category/core/types/AllowedColors";
import Member from "../../../../../src/modules/member/core/model/Member";
import MemberInfo from "../../../../../src/modules/member/core/objects/MemberInfo";
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

const createMemberParams = (overrides?: Partial<{
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

const createModifier = () =>
  Member.fromPrimitives(createMemberParams());

const createCategoryParams = (overrides?: Partial<{
  id: string;
  idProject: string;
  name: string;
  color: AllowedColors;
  isActive: AllowedCategoryStatus;
}>) => ({
  id: "category-1",
  idProject: "project-1",
  name: "Backlog",
  color: AllowedColors.BLACK,
  isActive: AllowedCategoryStatus.active,
  ...overrides
});

describe("Category Entity", () => {

  describe("Creation", () => {

    it("should create a valid category", () => {
      const modifier = createModifier();
      const params = createCategoryParams();

      const category = Category.create(
        params.id,
        params.name,
        params.color,
        params.idProject,
        params.isActive,
        modifier
      );

      expect(category.getId()).toBe("category-1");
      expect(category.exists()).toBe(true);
    });

  });

  describe("Updates", () => {

    it("should update name", () => {
      const modifier = createModifier();
      const params = createCategoryParams();
      const category = Category.create(
        params.id,
        params.name,
        params.color,
        params.idProject,
        params.isActive,
        modifier
      );

      category.updateName(new CategoryName("In Progress"), modifier);

      expect(category.toPrimitives().name).toBe("In Progress");
    });

    it("should update color", () => {
      const modifier = createModifier();
      const params = createCategoryParams();
      const category = Category.create(
        params.id,
        params.name,
        params.color,
        params.idProject,
        params.isActive,
        modifier
      );

      category.updateColor(new CategoryColor(AllowedColors.BLUE), modifier);

      expect(category.toPrimitives().color).toBe(AllowedColors.BLUE);
    });

  });

  describe("Existence", () => {

    it("should return false when status is deleted", () => {
      const category = Category.fromPrimitives(
        createCategoryParams({ isActive: AllowedCategoryStatus.deleted })
      );

      expect(category.exists()).toBe(false);
    });

  });

  describe("Serialization", () => {

    it("should return correct primitives", () => {
      const modifier = createModifier();
      const params = createCategoryParams();
      const category = Category.create(
        params.id,
        params.name,
        params.color,
        params.idProject,
        params.isActive,
        modifier
      );

      const primitives = category.toPrimitives();

      expect(primitives).toEqual(createCategoryParams());
    });

  });

});
