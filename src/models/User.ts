import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity('users')
class User {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string

  @Column()
  name: string

  @Column()
  email: string

  constructor() {
    if(!this.id) {
      this.id = uuid()
    }
  }
}

export { User };
