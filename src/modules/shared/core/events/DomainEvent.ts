import type iActor from '../model/contracts/iActor';
import type DateTime from '../objects/DateTime';
import ID from '../objects/ID';
import type IdEntity from '../objects/IdEntity';
import type EventProjectInfo from './EventProjectInfo';

export default class DomainEvent {
  private actor!: iActor;
  private eventDate!: DateTime;
  private event!: string;
  private id!: ID;
  private idEntity!: IdEntity;
  private projectInfo!: EventProjectInfo;
  private info?: unknown;

  constructor(
    eventDate: DateTime,
    actor: iActor,
    projectInfo: EventProjectInfo,
    idEntity: IdEntity,
    event: string,
    info?: unknown,
  ) {
    this.actor = actor;
    this.event = event;
    this.eventDate = eventDate;
    if (info) this.info = info;
    this.id = ID.generateId();
    this.idEntity = idEntity;
    this.projectInfo = projectInfo;
  } 
 
 getActor(): iActor {
    return this.actor;
  }

  public getDate(): DateTime {
    return this.eventDate;
  }

  public getEvent(): string {
    return this.event;
  }

  public getInfo(): unknown {
    return this.info;
  }

  public getId(): ID {
    return this.id;
  }

  public getIdEntity(): IdEntity {
    return this.idEntity;
  }

  public getprojectInfo(): EventProjectInfo {
    return this.projectInfo;
  }
}  
