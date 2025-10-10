import { UserAttributes } from '@shared/types/user';
import { Column, Model, Table, AllowNull, PrimaryKey, Default, DataType, BeforeCreate, HasMany, HasOne } from 'sequelize-typescript';
import { Order } from './Order';
import { KycPersonal } from './KycPersonal';
import { KycIdVerification } from './KycIdVerification';
import { KycBusinessDocs } from './KycBusinessDocs';
import { KycBusiness } from './KycBusiness';
import { Kyc_Status, Roles } from '@shared/enums';

@Table( {
  tableName: 'user',
  timestamps: true,
  modelName: 'user',
  paranoid: true,
   

})
export class User extends Model<UserAttributes> implements UserAttributes {

  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;
  
  @AllowNull(true)
  @Column(DataType.STRING)
  username!: string;
  @BeforeCreate({ name: 'username' })
  static async generateUsername(user: User) {

    const baseUsername = user.dataValues.firstname.toLowerCase().replace(/\s+/g, '');
    const randomSuffix = Math.floor(Math.random() * 10000);
    user.dataValues.username = `${baseUsername}-${randomSuffix}`;
  }

  @Column( {
    allowNull: false,
  })
  firstname!: string;
  @Column( {
    allowNull: false,
  })
  lastname!: string;

  @Column( {
    allowNull: true,
  })
  phone_number!: string;

  @Column( {
    allowNull: true,
  })
  date_of_birth!: string;
  
  // Assuming 'email' is a string type for an email address, not a boolean
  @Column({ 
    unique: true, 
    allowNull: false,
    validate: {
      isEmail: true, // Validates that the value is a valid email format
    }
   }) 
  email!: string;
  
  @Column({ 
    allowNull: false
  })
  password!: string;

  @Column({ 
    allowNull: false,
    validate: {
      isIn: [['user', 'vendor', 'admin', 'subadmin']], 
    }
  })
  role!: Roles;

  @Column({ 
    allowNull: false,
    validate: {

      isIn: [Object.values(Kyc_Status)], 
    }
  })
  kyc_status!: Kyc_Status;

  @Column({ 
    allowNull: false,
    defaultValue: false
  })
  email_verified!: boolean;

  @Column({ 
    allowNull: false,
    defaultValue: false
  })
  kyc_verified!: boolean;

  @HasMany(() => Order, { foreignKey: 'user_id', as: 'orders' })
  declare orders?: Order[]; 

  @HasOne(() => KycPersonal, { foreignKey: 'user_id', as: 'kyc_personal' })
  declare kyc_personal?: KycPersonal;

  @HasOne(() => KycIdVerification, { foreignKey: 'user_id', as: 'kyc_id_verification' })
  declare kyc_id_verification?: KycIdVerification;

  @HasOne(() => KycBusinessDocs, { foreignKey: 'user_id', as: 'kyc_business_docs' })
  declare kyc_business_docs?: KycBusinessDocs;

  @HasOne(() => KycBusiness, { foreignKey: 'user_id', as: 'kyc_business' })
  declare kyc_business?: KycBusiness;

}
