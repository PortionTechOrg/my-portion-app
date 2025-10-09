import { z } from "zod"
import { Status } from "../enums"

export const productSchema = z.object( {
    seller_id: z.string().optional(),
    name: z.string(),
    category: z.string(),
    status: z.enum([Status.Pending, Status.Delivered, Status.Cancelled]).optional(),
    description: z.string().optional(),
    image_url: z.file('Select Image file'),
    video_url: z.file('Select Video file'),
    total_quantity: z.string(),
    number_per_portion: z.string(),
    quantity_unit: z.string().optional(),
    portion_size: z.string().min(1, 'Must be atleast 1'),
    price_per_portion: z.string(),
    available_portions: z.string().optional(),
    location: z.string().optional()
})

export const createProductSchema = z.object( {
    seller_id: z.string().optional(),
    name: z.string(),
    category: z.string(),
    status: z.enum([Status.Pending, Status.Delivered, Status.Cancelled]).optional(),
    description: z.string().optional(),
    image_url: z.file('Select Image file').optional(),
    video_url: z.file('Select Video file').optional(),
    total_quantity: z.string(),
    quantity_unit: z.string(),
    number_per_portion: z.string(),
    portion_size: z.string().min(1, 'Must be atleast 1').optional(),
    price_per_portion: z.string().optional(),
    available_portions: z.string().optional(),
    location: z.string().optional()
})

export type ProductSchema = z.infer<typeof productSchema>
export type ProductDTO = z.infer<typeof productSchema>
export type CreateProductDTO = z.infer<typeof createProductSchema>