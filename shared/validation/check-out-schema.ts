import { z } from "zod";

export const checkOutSchema = z.object({
  street_address: z.string(),
  city: z.string(),
  state: z.string(),
  delivery_note: z.string().optional(),
  
})

export type CheckOutSchema = z.infer<typeof checkOutSchema>;

const cartItemSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  image: z.string(),
  price: z.number(),
  unit: z.string(),
  vendor_id: z.string(),
  quantity: z.number(),
});


export const addressAndCartSchema = z.object({
  street_address: z.string(),
  city: z.string(),
  state: z.string(),
  delivery_note: z.string().optional(),
  cartItems: z.array(cartItemSchema),
});

export type AddressAndCartSchema = z.infer<typeof addressAndCartSchema>
export type CartItemSchema = z.infer<typeof cartItemSchema>