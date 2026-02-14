import Text from './Text';
import ValueObject from './ValueObject';
import { v4 as uuidv4 } from 'uuid';

export default class ID extends ValueObject {
  private id!: Text;

  constructor(id: string) {
    super();
    this.id = new Text(id);
  }

  static generateId(): ID {
    const uuid = uuidv4();
    return new ID(uuid);
  }

  public getId(): string {
    return this.id.getText();
  }
}
