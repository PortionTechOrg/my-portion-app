import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { getSequelizeConfig } from './database/setup';
import { LoggerService } from './logger/logger.service';
import { ProductModule } from './product/product.module';
import { LoggerMiddleware } from '../middleware';
import { ProductController } from './product/product.controller';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { OrderController } from './order/order.controller';
import { OrderModule } from './order/order.module';
import { VendorModule } from './vendor/vendor.module';
import { VendorController } from './vendor/vendor.controller';
import { MailerModule } from './mailer/mailer.module';
import { WalletModule } from './wallet/wallet.module';
import { AdminDashboardService } from './admin-dashboard/admin-dashboard.service';
import { AdminDashboardController } from './admin-dashboard/admin-dashboard.controller';
import { AdminDashboardModule } from './admin-dashboard/admin-dashboard.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { TransactionModule } from './transaction/transaction.module';

// import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './database/models/User';
import { Product } from 'src/database/models/Product';
import { Order } from 'src/database/models/Order';
import { Wallet } from 'src/database/models/Wallet';
import { Bank } from 'src/database/models/Bank';
import { KycBusiness } from 'src/database/models/KycBusiness';
import { KycBusinessDocs } from 'src/database/models/KycBusinessDocs';
import { KycIdVerification } from 'src/database/models/KycIdVerification';
import { KycPersonal } from 'src/database/models/KycPersonal';
import { OrderRecord } from 'src/database/models/order-record';
import { Rating } from 'src/database/models/Rating';
import { SellerKyc } from 'src/database/models/SellerKYC';
import { Transaction } from './database/models/Transaction';
import { Notification } from './database/models/Notification';
import { NotificationModule } from './notification/notification.module';
import { GlobalModule } from './global/global.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Bank, KycBusiness, KycBusinessDocs, Transaction, Notification, KycIdVerification, KycPersonal, OrderRecord, Order, Product, Rating, SellerKyc, User, Wallet,  ]),
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync( 
      { useFactory: getSequelizeConfig, inject: [ConfigService] }
    ),
    ProductModule,
    CloudinaryModule,
    UserModule,
    OrderModule,
    VendorModule,
    MailerModule,
    WalletModule,
    AdminDashboardModule,
    TransactionModule,
    NotificationModule,
    GlobalModule
  ],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    LoggerService, AdminDashboardService],
  controllers: [AdminDashboardController]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(LoggerMiddleware)
    .forRoutes(UserController, VendorController, OrderController, ProductController);

  }
}
