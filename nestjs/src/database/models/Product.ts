import {
  Table,
  Column,
  Model,
  PrimaryKey,
  Default,
  AllowNull,
  ForeignKey,
  HasMany, // Import HasMany for defining one-to-many relationships
  BelongsTo
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { CreationOptional } from 'sequelize';

import { ProductAttribute } from '../../../../shared/types/product';
import { Status } from "../../../../shared/enums"; // Adjust path as necessary, from your provided snippet it's "../../../shared/enums"


import { User } from './User'; // Assuming your User model is in './User.ts'
import { Order } from './Order'; // Assuming your Order model is in './Order.ts'



@Table({
  tableName: 'product',
  modelName: 'product',
  timestamps: true, // Assuming you want createdAt and updatedAt
  paranoid: false, // Assuming you don't need soft deletes for products. Set to true if you do.
})
export class Product extends Model<ProductAttribute> implements ProductAttribute {
  @PrimaryKey
  @Default(DataTypes.UUIDV4)
  @Column(DataTypes.UUID)
  declare id: CreationOptional<string>;

  @ForeignKey(() => User) // References the User model
  @AllowNull(false)
  @Column(DataTypes.UUID)
  declare seller_id: string;

  @AllowNull(false)
  @Column(DataTypes.STRING)
  declare name: string;

  @AllowNull(true)
  @Column(DataTypes.STRING)
  declare description: string; // Can be null

  @AllowNull(true)
  @Column(DataTypes.STRING)
  declare category: string; // Can be null

  @AllowNull(false)
  @Column(DataTypes.STRING)
  declare image_url: string;

  @AllowNull(false)
  @Column(DataTypes.STRING)
  declare video_url: string;

  @AllowNull(false)
  @Column(DataTypes.INTEGER) // Assuming total_quantity is an integer
  declare total_quantity: number;

  @AllowNull(false)
  @Column(DataTypes.INTEGER) // Assuming number_per_portion is an integer
  declare number_per_portion: number;

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
    validate: {
      isIn: [['Kg', 'Pack', 'Bunch', 'Tubers', 'Pieces', 'Bag', 'Bucket', 'Congo']],
    },
  })
  declare quantity_unit: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
    validate: {
      isIn: [Object.values(Status)], // Using Object.values(Status) for enum validation
    },
  })
  declare status: Status; // Use the Status enum type directly

  @AllowNull(false)
  @Column(DataTypes.INTEGER) // Assuming portion_size is an integer
  declare portion_size: number;

  @AllowNull(false)
  @Column(DataTypes.DECIMAL(10, 2)) // Use DECIMAL for prices
  declare price_per_portion: number;

  @AllowNull(false)
  @Column(DataTypes.INTEGER) // Assuming available_portions is an integer
  declare available_portions: number;

  @AllowNull(false)
  @Column(DataTypes.STRING)
  declare location: string;

  @BelongsTo(() => User, { foreignKey: 'seller_id', as: 'user' })
  declare user?: User;


  @HasMany(() => Order, { foreignKey: 'product_id', as: 'orders' })
  declare orders?: Order[]; // The 'as' option defines the alias for the associated models
}

