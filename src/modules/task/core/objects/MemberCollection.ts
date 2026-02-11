import TaskRules from '../constants/TaskRules';
import ConflictDuplicateResource from '../../../shared/core/errors/ConflictDuplicatedResource';
import ResourceNotFound from '../../../shared/core/errors/ResourceNotFound';
import type Collection from '../../../shared/core/objects/Collection';
import LimitExceeded from '../../../shared/core/errors/LimitExceeded';
import MemberMustBeActive from '../error/MemberMustBeActive';
import type Member from '../../../member/core/model/Member';

export default class MemberCollection implements Collection {
  private readonly limitOfmembers = TaskRules.maxMembers();
  private readonly members: Member[] = [];

  constructor(members: Member[] = []) {
    this.members = members;
  }

  public addItem(member: Member): MemberCollection {
    if (this.members.length + 1 > this.limitOfmembers)
      throw new LimitExceeded('members limit exceeded');
    if (member.isBlocked()) throw new MemberMustBeActive(member);
    const exists = this.members.find((c) => c.getId() === member.getId());
    if (exists)
      throw new ConflictDuplicateResource('This member already exists in this task', member);
    return new MemberCollection([...this.members, member]);
  }

  public deleteItem(member: Member): MemberCollection {
    const deletemember = this.members.find((c) => c.getId() === member.getId());
    if (!deletemember) throw new ResourceNotFound('This member doesnt exist in this task');
    return new MemberCollection(this.members.filter((c) => c.getId() !== member.getId()));
  }

  public find(member: Member): boolean {
    const exists = this.members.find((obj) => obj.getId() === member.getId());
    if (exists) return true;
    return false;
  }

  public size(): number {
    return this.members.length;
  }

  public primitiveCollection(): Member[] {
    return [...this.members];
  }
}
