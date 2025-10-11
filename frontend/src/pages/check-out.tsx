import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Navbar } from "../components/home/navbar"
import { SlideMenu } from "../components/home/slide-menu"


import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Truck, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CartSlide } from "../components/home/cart-slide"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import useCheckOut from '@/hooks/form-hooks/use-check-out-hook';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCartState } from '@/zustand/hooks/cart/cart.hook';
import CheckoutPaymentModal from '@/components/modal/checkout-payment-modal';
import { useModalStore } from '@/zustand/store';


const Checkout: React.FC = () => {
  const { data: { cartItems, cartCount }} = useCartState()
  const navigate = useNavigate();
  

  // Calculate charges
// @ts-expect-error
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const serviceCharge = 100;
  const deliveryFee = 1000
  const shippingCost = cartItems.reduce((sum, _) => sum + deliveryFee, 0) // Free shipping over #50
  const total = subtotal + serviceCharge + shippingCost;



  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  

  const [searchQuery, setSearchQuery] = useState("")

  const { form, onCheckOut } = useCheckOut()

  const { isPaymentModalOpen} = useModalStore()
  
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Cart is Empty</h2>
            <p className="text-muted-foreground mb-6">
              Add some fresh produce to your cart before checkout.
            </p>
            <Button onClick={() => navigate('/')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  
  


  return (
        <div className="min-h-screen bg-gray-50">

          <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartItems={cartCount}
        onMenuClick={() => setIsMenuOpen(true)}
        onCartClick={() => setIsCartOpen(true)}
      />

      <SlideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <CartSlide isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
          <div className="min-h-screen bg-background py-8">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="flex items-center mb-8">
                <Button variant="ghost" onClick={() => navigate('/')} className="mr-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Shop
                </Button>
                <h1 className="text-lg font-bold text-primary">Checkout</h1>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Column - Forms */}
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onCheckOut)}>
                    <div className="space-y-6">
                      {/* Shipping Information */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Truck className="mr-2 h-5 w-5 text-primary" />
                            Delivery details
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <FormField
                                control={form.control}
                                name="street_address"
                                render={({field}) => (
                                  <FormItem>
                                    <FormLabel >Street Address</FormLabel>
                                    <FormControl>
                                      <Input 
                                        placeholder="123 Main Street" {...field} />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                  </FormItem>
                                )}
                                />
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <FormField
                                control={form.control}
                                name="city"
                                render={({field}) => (
                                  <FormItem>
                                    <FormLabel >City</FormLabel>
                                    <FormControl>
                                      <Input 
                                        placeholder="city" {...field} />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                  </FormItem>
                                )}
                                />
                            </div>
                            <div>
                              <FormField
                                control={form.control}
                                name="state"
                                render={({field}) => (
                                  <FormItem>
                                    <FormLabel>State</FormLabel>
                                    <FormControl>
                                      <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="w-full">
                                          <SelectValue placeholder="Select State" />
                                        </SelectTrigger>
                                        <SelectContent >
                                          {["Oyo"].map((state) => (
                                              <SelectItem key={state} value={state}>{state}</SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                  </FormItem>
                                )}
                                />
                            </div>

                            { }
                          </div>
                          {/* <div>
                            <Label htmlFor="notes">Delivery Notes (Optional)</Label>
                            <Textarea
                              id="notes"
                              name="notes"
                              value={shippingInfo.notes}
                              onChange={handleInputChange}
                              placeholder="Special delivery instructions..."
                              rows={3}
                            />
                          </div> */}

                          <Button
                            className="w-full"
                            size="lg"
                          >
                            <CheckCircle className="mr-2 h-5 w-5" />
                            Continue to Payment
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </form>
                </Form>

                {/* Right Column - Order Summary */}
                <div>
                  <Card className="sticky top-8">
                    <CardHeader>
                      <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Order Items */}
                      <div className="space-y-3">
                        {cartItems.map(item => (
                          <div key={item.id} className="flex items-center space-x-3">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded-md"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm truncate">{item.name}</h4>
                              <p className="text-xs text-muted-foreground">
                                {item.quantity} × ₦{item.price} per {item.unit}
                              </p>
                            </div>
                            <div className="text-right">
                              {/* @ts-expect-error */}
                              <p className="font-medium">₦{(item?.price * item?.quantity).toFixed(2)}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <Separator />

                      {/* Price Breakdown */}
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Subtotal:</span>
                          <span>₦{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Service Charge:</span>
                          <span>₦{serviceCharge.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Delivery Fee:</span>
                          <span>
                            {shippingCost === 0 ? (
                              <Badge variant="secondary" className="text-xs">FREE</Badge>
                            ) : (
                              `₦${shippingCost.toFixed(2)}`
                            )}
                          </span>
                        </div>
                        <Separator />
                        <div className="flex justify-between text-lg font-semibold">
                          <span>Total:</span>
                          <span className="text-primary">₦{total.toFixed(2)}</span>
                        </div>
                      </div>

                      {subtotal > 50 && (
                        <div className="p-3 bg-success/10 border border-success rounded-lg text-center">
{/*                           <p className="text-success text-sm font-medium">
                            🎉 You qualify for free shipping!
                          </p> */
                          }
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>

          <CheckoutPaymentModal key={String(isPaymentModalOpen)} />
        </div>
  );
};

export default Checkout;
