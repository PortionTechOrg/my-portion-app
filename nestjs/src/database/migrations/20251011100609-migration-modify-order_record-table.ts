'use strict';

import { Status } from "../../../../shared/enums";
import { DataTypes, QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface) {

    await queryInterface.sequelize.transaction( async (t) => {

      await queryInterface.addColumn( "order_record", "order_id", {
        type: DataTypes.UUID,
          allowNull: true,
          references: {
            model: 'order',
            key: 'id'
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE"
      }, { transaction: t });
      
    });
  },

  async down (queryInterface: QueryInterface ) {
    await queryInterface.sequelize.transaction( async (t)=> {

      await queryInterface.removeColumn("order_record", "order_id", { transaction: t })
    })
  }
};
