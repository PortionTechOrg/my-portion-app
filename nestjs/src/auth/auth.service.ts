import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../database/models/User';
import * as bcrypt from 'bcryptjs';
import { JwtPayload, verify, sign, } from 'jsonwebtoken';

import { loginUserDto } from '@shared/validation/loginUserDTO';
import { createUserDto } from '../../../shared/validation/createUserDTO';
import { loginResponse, registerResponse } from '../../../shared/types';
import { refreshTokenResponse } from '../../../shared/types/services';
import { MailerService } from 'src/mailer/mailer.service';
import { ConfigService } from '@nestjs/config';
import { Wallet } from 'src/database/models/Wallet';
import { KycPersonal } from 'src/database/models/KycPersonal';
import { KycIdVerification } from 'src/database/models/KycIdVerification';
import { KycBusiness } from 'src/database/models/KycBusiness';
import { KycBusinessDocs } from 'src/database/models/KycBusinessDocs';


@Injectable()
export class AuthService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService
  ) {}

  
  async register(createUserDto: createUserDto): Promise<registerResponse> {
    
    const passwordHash = await bcrypt.hash(createUserDto.password, 10);
    const user = await User.create({ 
      firstname: createUserDto.firstname, 
      lastname: createUserDto.lastname,
      // phone_number: null, 
      email: createUserDto.email,
      kyc_status: "not_submitted",
      password: passwordHash,
      role: createUserDto.role,
      email_verified: false,
      kyc_verified: false,
    });

    const wallet = await Wallet.create({ user_id: user.id, id: user.id, main_balance: 0, sub_balance: 0 });

    this.mailerService.loginMail( user, {
      ip: '127.0.0.1',
      useragent: { os: 'Windowns', browser: 'Unknown', version: 'Unknown', platform: 'Unknown' } 
    });
    
    return {
      success: true,
      data: user,
      message: 'User registered',
    };
  }


  

  async login(loginDto: loginUserDto): Promise<loginResponse> {

    const jwtSecret = this.configService.get('ACCESSTOKENSECRET');
    const jwtSecretRefresh = this.configService.get('REFRESHTOKENSECRET');

    const user = await User.findOne({ where: { email: loginDto.email }, include: [KycPersonal, KycIdVerification, KycBusiness, KycBusinessDocs] });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const valid = await bcrypt.compare(loginDto.password, user.dataValues.password);
    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    this.mailerService.loginMail( user, {
      ip: '127.0.0.1',
      useragent: { os: 'Windowns', browser: 'Unknown', version: 'Unknown', platform: 'Unknown' } 
    });
    const token = sign(user.toJSON(), jwtSecret, { expiresIn: '1h' });
    const refreshToken = sign(user.toJSON(), jwtSecretRefresh, { expiresIn: '1d' });
    console.log(user)
    return { success: true, data: { token, refreshToken, user }, message: "Login Successful" };
  }

  async refreshToken(token: string): Promise<refreshTokenResponse> {
    const jwtSecret = this.configService.get('ACCESSTOKENSECRET');
    const jwtSecretRefresh = this.configService.get('REFRESHTOKENSECRET');
    
    if (!token) {
      throw new UnauthorizedException('Refresh token is required');
    }

    try { 

      const decoded = verify(token, jwtSecretRefresh) as JwtPayload;
      delete decoded?.iat; 
      delete decoded?.exp;
      const newToken = sign(decoded, jwtSecret, { expiresIn: '1h' });
      const newRefreshToken = sign(decoded, jwtSecretRefresh, { expiresIn: '1d' });
      return { success: true, data: { token: newToken, refreshToken: newRefreshToken }, message: 'Tokens refreshed successfully'  };
    } catch (error:any) {
      throw new UnauthorizedException({
        message: error.message || 'Invalid refresh token',
        reason: 'TOKEN_EXPIRED',
      });
    }
  }
}
