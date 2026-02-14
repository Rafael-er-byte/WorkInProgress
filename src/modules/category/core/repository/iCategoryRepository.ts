import type IdProject from '../../../project/core/objects/IdProject';
import type None from '../../../shared/core/objects/None';
import type CategoryCriteria from '../interfaces/CategoryCriteria';
import type Category from '../model/Category';
import type IdCategory from '../objects/IdCategory';

export default interface iCategoryRepository {
  create(category: Category): Promise<None>;
  update(category: Category): Promise<None>;
  getById(from: IdProject, categoryId: IdCategory): Promise<Category | None>;
  getMany(from: IdProject, criteria: CategoryCriteria): Promise<Category[]>;
}
