import { Injectable } from '@nestjs/common';
import { KycBusiness } from 'src/database/models/KycBusiness';
import { KycBusinessDocs } from 'src/database/models/KycBusinessDocs';
import { KycIdVerification } from 'src/database/models/KycIdVerification';
import { KycPersonal } from 'src/database/models/KycPersonal';
import { User } from 'src/database/models/User';

@Injectable()
export class UserService {

    async getUser(user_id:string) {

        const user = await User.findOne({ where: { id: user_id }, include: [KycPersonal, KycIdVerification, KycBusiness, KycBusinessDocs] });
        return {
            success: true,
            message: 'user found',
            data: user
        }
    }
        
}
