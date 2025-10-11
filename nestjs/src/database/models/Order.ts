import { Table, Column, Model, PrimaryKey, Default, AllowNull, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { CreationOptional } from 'sequelize';

// Import your shared types and enums
import { Status } from "../../../../shared/enums"; // Assuming Status is an enum like 'pending', 'delivered', 'cancelled'
import { OrderAttribute } from "../../../../shared/types/order";

// Import related models for ForeignKey decorators (adjust paths as needed)
import { User } from './User'; // Assuming your User model is in './User.ts'
import { Product } from './Product'; // Assuming your Product model is in './Product.ts'
import { OrderRecord } from './order-record'; // Assuming your OrderRecord model is in './OrderRecord.ts'

@Table({
  tableName: 'order',
  modelName: 'order',
  timestamps: true, // Assuming you want createdAt and updatedAt
  paranoid: false, // Assuming you don't need soft deletes for orders. Set to true if you do.
})
export class Order extends Model<OrderAttribute> implements OrderAttribute {
  @PrimaryKey
  @Default(DataTypes.UUIDV4)
  @Column(DataTypes.UUID)
  declare id: CreationOptional<string>;

  @ForeignKey(() => User) // References the User model
  @AllowNull(false)
  @Column(DataTypes.UUID)
  declare user_id: string;

  @ForeignKey(() => Product) // References the Product model
  @AllowNull(false)
  @Column(DataTypes.UUID)
  declare product_id: string;

  @ForeignKey(() => OrderRecord) // References the OrderRecord model
  @AllowNull(true) // order_record_id is allowNull: true
  @Column(DataTypes.UUID)
  declare order_record_id: string; // Type can be string or null

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
    validate: {
      isIn: [Object.values(Status)], // Using Object.values(Status) to get array of enum values
    },
  })
  declare status: Status; // Use the Status enum type directly

  @AllowNull(false)
  @Column(DataTypes.DECIMAL(10, 2)) // Use DECIMAL for monetary values to avoid floating point issues
  // Or DataTypes.FLOAT if you are certain about precision and don't need fixed-point math
  declare amount: string; // Changed from string to number based on common practice for amount fields

  @AllowNull(false)
  @Column(DataTypes.INTEGER) // Use DataTypes.INTEGER for whole numbers like 'portion'
  declare portion: number;

  @BelongsTo(() => User, { foreignKey: 'user_id', as: 'user' })
  declare user?: User;

  @BelongsTo(() => Product, { foreignKey: 'product_id', as: 'product' })
  declare product?: Product;

  @BelongsTo(() => OrderRecord, { foreignKey: 'order_record_id', as: 'order_record' })
  declare order_record?: OrderRecord;

}