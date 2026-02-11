import type IdList from '../../../shared/core/objects/IdList';
import type IntNumber from '../../../shared/core/objects/IntNumber';
import Text from '../../../shared/core/objects/Text';
import ValueObject from '../../../shared/core/objects/ValueObject';

export default class TaskPosition extends ValueObject {
  private listId!: IdList;
  private name!: Text;
  private positionInList!: IntNumber;

  constructor(listId: IdList, name: Text, position: IntNumber) {
    super();
    this.listId = listId;
    this.name = name;
    this.positionInList = position;
  }

  public getlistIdList(): IdList {
    return this.listId;
  }

  public getListName(): Text {
    return this.name;
  }

  public getPosition(): IntNumber {
    return this.positionInList;
  }
}
