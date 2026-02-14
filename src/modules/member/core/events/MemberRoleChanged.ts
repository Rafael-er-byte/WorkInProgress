import DomainEvent from '../../../shared/core/events/DomainEvent';
import type DateTime from '../../../shared/core/objects/DateTime';
import type IdEntity from '../../../shared/core/objects/IdEntity';
import type Member from '../model/Member';
import type IdMember from '../objects/IdMember';
import type MemberRole from '../objects/MemberRole';

export default class MemberChangedRole extends DomainEvent {
  constructor(
    date: DateTime,
    modifier: Member,
    idProject: IdEntity,
    idEntity: IdMember,
    newRole: MemberRole,
  ) {
    super(date, modifier, idProject, idEntity, 'MEMBER_CHANGED_ROLE', newRole);
  }
}
