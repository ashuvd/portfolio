import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'skills'
})
export default class Skill extends Model<Skill> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true
  })
  id: number

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  title: string

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  percents: number

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  category: string
}
