import {
  Table,
  Column,
  Model,
  PrimaryKey,
  Default,
  AllowNull,
  ForeignKey,
  Unique, // Import Unique for unique constraints
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  BelongsTo
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { CreationOptional } from 'sequelize';

// Import your shared types
import { KycBusinessAttribute } from '@shared/types/KycBusiness';

// Import related models for ForeignKey decorators (adjust paths as needed)
import { User } from './User'; // Assuming your User model is in './User.ts'

@Table({
  tableName: 'kyc_business',
  modelName: 'kyc_business',
  timestamps: true, // Let Sequelize manage createdAt and updatedAt automatically
  paranoid: true, // Set to true if you want Sequelize to manage deletedAt for soft deletes
})
export class KycBusiness extends Model<KycBusinessAttribute> implements KycBusinessAttribute {
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
  declare business_name: string;

  @AllowNull(false)
  @Column(DataTypes.STRING)
  declare business_phone_number: string;

  @Unique // Marks this column as unique
  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
    validate: {
      isEmail: true, // Email format validation
    },
  })
  declare business_email: string;

  @AllowNull(true) // This column is allowNull: true
  @Column(DataTypes.STRING)
  declare cac_number: string; // Type can be string or null

  @AllowNull(true) // This column is allowNull: true
  @Column(DataTypes.STRING)
  declare tax_id: string; // Type can be string or null

  @AllowNull(true) // This column is allowNull: true
  @Column(DataTypes.STRING)
  declare business_address: string; // Type can be string or null

  // Sequelize-typescript manages these automatically when `timestamps: true` and `paranoid: true`
  // You can declare them explicitly with their decorators for better type clarity
  @CreatedAt
  declare createdAt: CreationOptional<Date>; // Use CreationOptional for auto-managed dates

  @UpdatedAt
  declare updatedAt: CreationOptional<Date>; // Use CreationOptional for auto-managed dates

  @DeletedAt
  declare deletedAt?: Date;

  @BelongsTo(() => User, { foreignKey: 'user_id', as: 'user' })
  declare user?: User;
}