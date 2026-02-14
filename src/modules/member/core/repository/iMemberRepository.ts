import type IdProject from '../../../project/core/objects/IdProject';
import type None from '../../../shared/core/objects/None';
import type MemberCriteria from '../interfaces/MemberCriteria';
import type Member from '../model/Member';
import type IdMember from '../objects/IdMember';

export default interface iMemberRepository {
  create(member: Member): Promise<None>;
  update(member: Member): Promise<None>;
  getById(from: IdProject, memberId: IdMember): Promise<Member | None>;
  getByCriteria(from: IdProject, criteria: MemberCriteria): Promise<Member[]>;
}
