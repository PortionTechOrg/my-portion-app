import {
  Table,
  Column,
  Model,
  PrimaryKey,
  Default,
  AllowNull,
  ForeignKey,
  Unique, // Import Unique for unique constraints
  BelongsTo,
  HasOne
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { CreationOptional } from 'sequelize';

import { KycPersonalAttribute } from '@shared/types/KycPersonal';

import { User } from './User'; // Assuming your User model is in './User.ts'

@Table({
  tableName: 'kyc_personal',
  modelName: 'kyc_personal',
  timestamps: true, // Assuming you want createdAt and updatedAt
  paranoid: false, // Assuming you don't need soft deletes. Set to true if you do.
})
export class KycPersonal extends Model<KycPersonalAttribute> implements KycPersonalAttribute {
  @PrimaryKey
  @Default(DataTypes.UUIDV4)
  @Column(DataTypes.UUID)
  declare id: CreationOptional<string>;

  @ForeignKey(() => User) // References the User model
  @AllowNull(false)
  @Column(DataTypes.UUID)
  declare user_id: string;

  @AllowNull(false)
  @Column(DataTypes.STRING)
  declare firstname: string;

  @AllowNull(false)
  @Column(DataTypes.STRING)
  declare lastname: string;

  @AllowNull(false)
  @Column(DataTypes.DATE)
  declare date_of_birth: Date;

  @AllowNull(false)
  @Column(DataTypes.STRING)
  declare phone_number: string;

  @Unique // Marks this column as unique
  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
    validate: {
      isEmail: true, // Email format validation
    },
  })
  declare email: string;

  @AllowNull(false)
  @Column(DataTypes.STRING)
  declare bvn: string;

  @AllowNull(false)
  @Column(DataTypes.STRING)
  declare address: string;

  @AllowNull(false)
  @Column(DataTypes.STRING)
  declare town: string;

  @AllowNull(false)
  @Column(DataTypes.STRING)
  declare city: string;

  @AllowNull(false)
  @Column(DataTypes.STRING)
  declare state: string;

  @BelongsTo(() => User, { foreignKey: 'user_id', as: 'user' })
    declare user?: User;

  
}