'use strict';

import { Kyc_Status } from "../../../../shared/enums";
import { DataTypes, QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface) {

    await queryInterface.sequelize.transaction( async (t) => {
        await queryInterface.addColumn(
        'user',
        'kyc_status', 
        {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "not_submitted",
          validate: {
            isIn: [Object.values(Kyc_Status)]
          }
        }, { transaction: t });

        await queryInterface.addColumn(
        'user',
        'phone_number', 
        {
          type: DataTypes.STRING,
          allowNull: true,
        }, { transaction: t });

        await queryInterface.addColumn(
        'user',
        'date_of_birth', 
        {
          type: DataTypes.STRING,
          allowNull: true,
        }, { transaction: t });
    })
  },

  async down (queryInterface: QueryInterface ) {

    await queryInterface.sequelize.transaction( async (t)=> {

        await queryInterface.removeColumn(
        'user',
        'kyc_status', 
        { transaction: t });

        await queryInterface.removeColumn(
        'user',
        'phone_number', 
        { transaction: t });

        await queryInterface.removeColumn(
        'user',
        'date_of_birth', 
        { transaction: t });
    })
  }
};
