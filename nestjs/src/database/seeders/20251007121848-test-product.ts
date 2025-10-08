import { v4 as uuidv4 } from 'uuid';
import { mockVendorKycBusiness, mockVendorKycBusinessDocs, mockVendorKycIdVerification, mockVendorKycPersonal, mockVendorSeed } from "../mock-vendor";
import { mockUserSeed } from "../mock-user";
import { mockProductSeed } from "../mock-product";


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {

    
    await queryInterface.sequelize.transaction( async (t) => {
      
      const vendors = await mockVendorSeed()
      const users = await mockUserSeed()

      const kyc_personal = await mockVendorKycPersonal()
      const kyc_business = await mockVendorKycBusiness()
      const kyc_business_doc = await mockVendorKycBusinessDocs()
      const kyc_id_verification = await mockVendorKycIdVerification()

      
      
      
      const response = await queryInterface.bulkInsert('user', vendors, { returning: true, transaction: t });
      const responseUser = await queryInterface.bulkInsert('user', users, { returning: true, transaction: t });
      
      
      await queryInterface.bulkInsert('kyc_personal', kyc_personal, { returning: true, transaction: t });
      await queryInterface.bulkInsert('kyc_business', kyc_business, { returning: true, transaction: t });
      await queryInterface.bulkInsert('kyc_business_docs', kyc_business_doc, { returning: true, transaction: t });
      await queryInterface.bulkInsert('kyc_id_verification', kyc_id_verification, { returning: true, transaction: t });

      const userWallets = responseUser.map((u) => ({
        id: uuidv4(), 
        user_id: u.id,
        main_balance: 0,
        sub_balance: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }));

      const vendorWallets = response.map((u) => ({
        id: uuidv4(), 
        user_id: u.id,
        main_balance: 0,
        sub_balance: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }));

      await queryInterface.bulkInsert('wallet', userWallets, { transaction: t });
      await queryInterface.bulkInsert('wallet', vendorWallets, { transaction: t });

      const product = await mockProductSeed(response)

      await queryInterface.bulkInsert('product', product, { transaction: t });

    })
  },

  async down (queryInterface) {
    
     await queryInterface.bulkDelete('product', null, {});
     await queryInterface.bulkDelete('user', null, {});
     await queryInterface.bulkDelete('order', null, {});
     await queryInterface.bulkDelete('order_record', null, {});
     await queryInterface.bulkDelete('notification', null, {});
     await queryInterface.bulkDelete('bank', null, {});
     await queryInterface.bulkDelete('wallet', null, {});
     await queryInterface.bulkDelete('transaction', null, {});
     await queryInterface.bulkDelete('seller_kyc', null, {});
  }
};
