'use strict';

import { QueryInterface, DataTypes } from 'sequelize';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.sequelize.transaction( async(t) => {

      await queryInterface.createTable('order', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
  
        user_id: {
          type: Sequelize.UUID,
            allowNull: false,
            references: {
              model: 'user',
              key: 'id',
            },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },

        
        product_id: {
          type: Sequelize.UUID,
            allowNull: false,
            references: {
              model: 'product',
              key: 'id',
            },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },


        status: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isIn: [['pending', 'delivered', 'cancel']]
          }
        },
  
  
        portion: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        
        amount: {
          type: Sequelize.STRING,
          allowNull: false
        },
  
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
  
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }, { transaction: t });

    })
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.sequelize.transaction( async(t) => {
      await queryInterface.dropTable('order');
    })
  }
};