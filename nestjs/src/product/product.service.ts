import { ConflictException, Injectable } from '@nestjs/common';
import { UserAttributes } from '@shared/types/user';
import { CreateProductDTO } from '@shared/validation/product-schema';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Product } from 'src/database/models/Product';
import fs  from 'fs'
import { Sequelize } from 'sequelize-typescript';
import { OrderRecord } from 'src/database/models/order-record';
import { Order } from 'src/database/models/Order';
import { User } from 'src/database/models/User';
import { AddressAndCartSchema } from '@shared/validation/check-out-schema';
import { Notification } from 'src/database/models/Notification';
import { KycBusiness } from 'src/database/models/KycBusiness';
import { KycBusinessDocs } from 'src/database/models/KycBusinessDocs';
import { KycIdVerification } from 'src/database/models/KycIdVerification';
import { KycPersonal } from 'src/database/models/KycPersonal';


@Injectable()
export class ProductService {

    
    constructor ( private readonly cloudinary: CloudinaryService, private readonly sequelize: Sequelize ) {}

    async getProducts( state: string, limit: number, page: number) {
        const whereClause: Partial<Product> = {};

        if (state) {
            whereClause.location = state.toString().toLocaleLowerCase();
        }

        const productCount = await Product.count({ paranoid: true });
        const start = (Number(page) - 1) * Number(limit);

        const product = await Product.findAll({
            where: whereClause,
            order: [["createdAt", "DESC"]],
            offset: Number(start),
            limit: Number(limit),
            include:[User]
        });

        const totalPages = Math.ceil(productCount / Number(limit));

        return {
            success: true,
            data: { totalPages, productCount, product },
            message: "Products found!"
        };
    }

    async getUserProducts ( user: UserAttributes, limit: number, page: number) {

        const productCount = await Product.count({
            where: {
                seller_id: user.id
            },
            paranoid: true,
         });
        const start = (Number(page) - 1) * Number(limit);

        const product = await Product.findAll({
            where: {
                seller_id: user.id
            },
            order: [["createdAt", "DESC"]],
            offset: Number(start), 
            limit: Number(limit)
        });

        const totalPages = Math.ceil(productCount / Number(limit)); 

        return {
            success: true,
            data: { totalPages, productCount, product },
            message: "User Products found!"
        };
    }
    
    async getProductById(id: string) {
        const product = await Product.findOne({
            where: { id },
            include: [
            {
                model: User,
                include: [
                { model: KycBusiness },
                { model: KycBusinessDocs },
                { model: KycIdVerification },
                { model: KycPersonal },
                ],
            },
            ],
        });

        return {
            success: true,
            data: product,
            message: product
            ? `Product id: ${product.id}`
            : `Product not found with id: ${id}`,
        };
        }

    
    async addNewProduct(user: UserAttributes, productDto: CreateProductDTO,  files: { image_url?: Express.Multer.File[], video_url?: Express.Multer.File[] }) {
        
        const { cloudinary, cloudinaryUploadFolder } = this.cloudinary.getCloudinary()

        const image_url_path = files.image_url ? files.image_url[0].path : null;

        const video_url_path = files.video_url ? files.video_url[0].path : null;

        if( !image_url_path || !video_url_path ) {
            throw new Error("Image and Video files are required");
        }
        

        let result = await cloudinary.uploader.upload(image_url_path, { folder: cloudinaryUploadFolder })
        const image_url = result.secure_url
        const video_result = await cloudinary.uploader.upload(video_url_path, { resource_type: "video", folder: cloudinaryUploadFolder })
        const video_url = video_result.secure_url



        const product = await Product.create( {
          seller_id: String(user.id),
          name: productDto.name,
          status: 'pending',
          number_per_portion: productDto.number_per_portion,
     
          description: productDto.description || '',
          image_url,
          video_url,
          category: productDto.category,
          total_quantity: Number(productDto.total_quantity),
          quantity_unit: productDto.quantity_unit,
          portion_size: Number(productDto.portion_size),
          price_per_portion: Number(productDto.price_per_portion),
          available_portions: Number(productDto.portion_size),
          location: productDto.location || ''
     })

     if (fs.existsSync(image_url_path)) {
          fs.unlinkSync(image_url_path);
     }
     if (fs.existsSync(video_url_path)) {
          fs.unlinkSync(video_url_path);
     }

     return {
        success: true,
        data: product,
        message: `Product id: ${product.id} created successfully!`
     }
        

    }

    async checkOut(user_id: string, checkoutDTO: AddressAndCartSchema) {

        const serviceCharge = 100;
        const deliveryFee = 1000
        const shippingCost = checkoutDTO.cartItems.reduce((sum, _) => sum + deliveryFee, 0) // Free shipping over #50

        const orders: Order[] = [];

        for (const item of checkoutDTO.cartItems ) {
            const product = await Product.findOne( {
                where: {
                        id: item.id
                }
            })

            if(Number(product?.available_portions) < item.quantity){
                throw new ConflictException(
                    {
                        success: false,
                        message: `Insufficient portions. Available portions for ${product?.name} is ${product?.available_portions}. Please reduce portion amount from cart.`,
                        data: null,
                    }
                )
            }
        }

        let orderRecord = {}

        await this.sequelize.transaction( async ( t) => {

            const { dataValues} = await OrderRecord.create( {
                status: "pending",
                reference: '',
                total_amount: Number(checkoutDTO.cartItems.reduce((total, item) => total + item.price * item.quantity, serviceCharge + shippingCost)) ,
                user_id,
            }, { transaction: t })

            for ( const item of checkoutDTO.cartItems ) {
                const order = await Order.create( {
                        amount: String(item.price),
                        portion: item.quantity,
                        order_record_id: String(dataValues.id), 
                        product_id: item.id,
                        status: 'pending',
                        user_id,
                }, { transaction: t })

                await Notification.create( {
                    user_id: item.vendor_id,
                    type: "order",
                    title: 'New Order',
                    message: `You have a new order for ${item.name}`,
                    role_target: 'vendor',
                })

                await Notification.create( {
                    user_id,
                    type: "order",
                    title: 'Order Created',
                    message: `You have a new order for ${item.name} has been created`,
                    role_target: 'user',
                })

                orders.push(order)
            }

            orderRecord = dataValues

        })

        const orderDetails = {...orderRecord, orders}

        return {
            success: true,
            data: orderDetails,
            message: "Order created successfully"
        }


    }
}
