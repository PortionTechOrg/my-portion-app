import { Injectable } from '@nestjs/common';
import { AddBankSchema, addBankSchema } from '@shared/validation/add-bank-schema';
import { Bank } from 'src/database/models/Bank';

@Injectable()
export class BankService {

    async addNewBank( user_id:string, { bank_account_name, bank_account_number, bank_name  }: AddBankSchema){

        const bank = await Bank.create( {
            account_name: bank_account_name,
            account_number: bank_account_number,
            bank_name,
            user_id,
        })

        return {
            success: true,
            data: bank,
            message: "Bank details added successfully"
        }

    }

    async getBanks( user_id: string ){
        const banks = await Bank.findAll({
            where: {
                user_id
            }
        });

        return {
            success: true,
            data: banks,
            message: "Bank details found"
        }
    }
}
