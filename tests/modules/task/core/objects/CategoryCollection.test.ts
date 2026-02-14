import Category from "../../../../../src/modules/category/core/model/Category";
import { AllowedCategoryStatus } from "../../../../../src/modules/category/core/types/AllowedCategoryStatus";
import { AllowedColors } from "../../../../../src/modules/category/core/types/AllowedColors";
import ConflictDuplicateResource from "../../../../../src/modules/shared/core/errors/ConflictDuplicatedResource";
import LimitExceeded from "../../../../../src/modules/shared/core/errors/LimitExceeded";
import ResourceNotFound from "../../../../../src/modules/shared/core/errors/ResourceNotFound";
import TaskRules from "../../../../../src/modules/task/core/constants/TaskRules";
import CategoryCollection from "../../../../../src/modules/task/core/objects/CategoryCollection";

const createCategory = (id: number): Category =>
  Category.fromPrimitives({
    id: `category-${id}`,
    idProject: "project-1",
    name: `Category ${id}`,
    color: AllowedColors.BLUE,
    isActive: AllowedCategoryStatus.active,
  });

describe("CategoryCollection Value Object", () => {
  it("should add a category and return a new collection", () => {
    const collection = new CategoryCollection();
    const category = createCategory(1);

    const updated = collection.addItem(category);

    expect(collection.size()).toBe(0);
    expect(updated.size()).toBe(1);
    expect(updated.find(category)).toBe(true);
  });

  it("should throw if category limit is exceeded", () => {
    const categories = Array.from({ length: TaskRules.maxCategories() }, (_, i) =>
      createCategory(i + 1),
    );
    const collection = new CategoryCollection(categories);

    expect(() => collection.addItem(createCategory(999))).toThrow(LimitExceeded);
  });

  it("should throw if category already exists", () => {
    const category = createCategory(1);
    const collection = new CategoryCollection([category]);

    expect(() => collection.addItem(category)).toThrow(ConflictDuplicateResource);
  });

  it("should delete an existing category", () => {
    const category = createCategory(1);
    const collection = new CategoryCollection([category]);

    const updated = collection.deleteItem(category);

    expect(updated.size()).toBe(0);
    expect(updated.find(category)).toBe(false);
  });

  it("should throw when deleting a missing category", () => {
    const collection = new CategoryCollection();

    expect(() => collection.deleteItem(createCategory(1))).toThrow(ResourceNotFound);
  });

  it("should return a copy in primitiveCollection", () => {
    const category = createCategory(1);
    const collection = new CategoryCollection([category]);

    const primitive = collection.primitiveCollection();
    primitive.push(createCategory(2));

    expect(collection.size()).toBe(1);
  });
});
