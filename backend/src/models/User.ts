import { BeforeCreate, BeforeUpdate, Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import * as bcrypt from 'bcryptjs';
import Session from "./Session";

@Table({
  tableName: 'users'
})
export default class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true
  })
  id: number

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  login: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  password: string

  @HasMany(() => Session)
  sessions: Session[];

  @BeforeUpdate
  @BeforeCreate
  static generateHash(instance: User): Promise<void> {
    return bcrypt.hash(instance.password, 10).then(function(password) {
      instance.password = password;
    });
  }

  comparePasswords(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  };
}
