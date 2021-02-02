import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'works'
})
export default class Work extends Model<Work> {
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
    type: DataType.STRING,
    allowNull: false
  })
  description: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  image: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  link: string

  @Column({
    type: DataType.STRING
  })
  github_link: string
}
