import {
  Table,
  Column,
  Model,
  PrimaryKey,
  Default,
  AllowNull,
  ForeignKey,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { CreationOptional } from 'sequelize';

// Import your shared types and enums
import { OrderRecordAttribute } from '../../../../shared/types/order-record';
import { Status } from "../../../../shared/enums"; // Assuming Status is an enum

// Import related models for ForeignKey decorators (adjust paths as needed)
import { User } from './User'; // Assuming your User model is in './User.ts'

@Table({
  tableName: 'order_record',
  modelName: 'order_record',
  timestamps: true, // Assuming you want createdAt and updatedAt
  paranoid: false, // Assuming you don't need soft deletes. Set to true if you do.
})
export class OrderRecord extends Model<OrderRecordAttribute> implements OrderRecordAttribute {
  @PrimaryKey
  @Default(DataTypes.UUIDV4)
  @Column(DataTypes.UUID)
  declare id: CreationOptional<string>;

  @ForeignKey(() => User) // References the User model
  @AllowNull(false)
  @Column(DataTypes.UUID)
  declare user_id: string;

  @AllowNull(false)
  @Column(DataTypes.JSON) 
  declare reference: string; 

  @AllowNull(false)
  @Column(DataTypes.JSON) 
  declare total_amount: number;

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
    validate: {
      isIn: [Object.values(Status)], // Using Object.values(Status) for enum validation
    },
  })
  declare status: Status; // Use the Status enum type directly

}