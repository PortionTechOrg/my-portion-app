import { Body, Controller, Get, Post } from '@nestjs/common';
import { AddBankSchema, addBankSchema } from '@shared/validation/add-bank-schema';
import { ZodValidationPipe } from 'pipes/zod-validation-pipe';
import { BankService } from './bank.service';
import { ParsedToken } from 'decorators';
import { User } from 'src/database/models/User';

@Controller('v1/bank')
export class BankController {

    constructor(private readonly bankService: BankService) {}

    @Post()
    addNewBank(
        @ParsedToken() user: User,
        @Body( new ZodValidationPipe(addBankSchema)) addBankDTO: AddBankSchema ) {

        return this.bankService.addNewBank(user.id, addBankDTO)

    }

    @Get()
    getBanks(
        @ParsedToken() user: User
    ){
        return this.bankService.getBanks(user.id)
    }
}
