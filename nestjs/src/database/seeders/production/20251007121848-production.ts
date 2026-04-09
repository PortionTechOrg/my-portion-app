import { v4 as uuidv4 } from 'uuid';
import { adminSeed } from "../../admin";


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {

    
    await queryInterface.sequelize.transaction( async (t) => {
      
      const admin = await adminSeed()

      const responseAdmin = await queryInterface.bulkInsert('user', admin, { returning: true, transaction: t });
      
      const adminWallets = responseAdmin.map((u) => ({
        id: uuidv4(), 
        user_id: u.id,
        main_balance: 0,
        sub_balance: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }));


      await queryInterface.bulkInsert('wallet', adminWallets, { transaction: t });

    })
  },

  async down (queryInterface) {
    
     await queryInterface.bulkDelete('user', null, {});
     await queryInterface.bulkDelete('wallet', null, {});
  }
};
