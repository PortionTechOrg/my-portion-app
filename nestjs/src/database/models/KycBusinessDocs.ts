import {
  Table,
  Column,
  Model,
  PrimaryKey,
  Default,
  AllowNull,
  ForeignKey,
  CreatedAt, // Import CreatedAt for explicit createdAt column
  UpdatedAt, // Import UpdatedAt for explicit updatedAt column
  DeletedAt, // Import DeletedAt for explicit deletedAt column (if using paranoid)
  BelongsTo
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { CreationOptional } from 'sequelize';

import { KycBusinessDocsAttribute } from '@shared/types/kyc-business-docs';

import { User } from './User'; // Assuming your User model is in './User.ts'

@Table({
  tableName: 'kyc_business_docs',
  modelName: 'kyc_business_docs',
  timestamps: true, // Let Sequelize manage createdAt and updatedAt automatically
  paranoid: true, // Set to true if you want Sequelize to manage deletedAt for soft deletes
})
export class KycBusinessDocs extends Model<KycBusinessDocsAttribute> implements KycBusinessDocsAttribute {
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
  declare utility_bill: string;

  @AllowNull(true) // This column is allowNull: true
  @Column(DataTypes.STRING)
  declare cac_certificate: string; // Type can be string or null

  @AllowNull(true) // This column is allowNull: true
  @Column(DataTypes.STRING)
  declare tax_certificate: string; // Type can be string or null

  @CreatedAt
  declare createdAt: CreationOptional<Date>; // Use CreationOptional for auto-managed dates

  @UpdatedAt
  declare updatedAt: CreationOptional<Date>; // Use CreationOptional for auto-managed dates

  @DeletedAt
  declare deletedAt?: Date;

  @BelongsTo(() => User, { foreignKey: 'user_id', as: 'user' })
  declare user?: User;
}