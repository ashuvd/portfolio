import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import User from './User';

@Table({
  tableName: 'sessions'
})
export default class Session extends Model<Session> {
  // @Column({
  //   type: DataType.INTEGER,
  //   primaryKey: true,
  // })
  // user_id: number

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  refresh_token: string

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  public user_id: number;

  @BelongsTo(() => User, {
    constraints: false,
  })
  public user: User;
}
