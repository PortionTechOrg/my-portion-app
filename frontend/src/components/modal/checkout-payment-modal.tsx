import { motion, AnimatePresence } from "framer-motion"
import { Banknote, CheckCircle, Copy } from "lucide-react"
import { Button } from "../ui/button"
import toast from "react-hot-toast"
import { useState } from "react"
import CheckOutApi from "@/api/checkout/check-out-api"
import { useCartState } from "@/zustand/hooks/cart/cart.hook"
import { Link } from "react-router-dom"
import { useModalStore } from "@/zustand/store"
import { Label } from "../ui/label"
import { formatCurrency } from "@/lib/utils"
import { Card, CardContent, CardDescription,  CardTitle } from "../ui/card"



export default function CheckoutPaymentModal() {

    const { isPaymentModalOpen, togglePaymentModal} = useModalStore()
    const [paymentConfirmed, setPaymentConfirmed] = useState(false);
    const { data: { cartItems, clearCart, checkoutItem } } = useCartState()
    
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Bank details copied to clipboard.");
    };

    // @ts-expect-error
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shippingCost = cartItems.reduce((sum, _) => sum + 1000, 0)
    const serviceCharge = 100;
    const total = subtotal + serviceCharge + shippingCost;


    const bankDetails = {
        accountName: "ISRAEL OLORUNTOBA AKANDE",
        accountNumber: "8100510972",
        bankName: "Moniepoint MFB"
    };

    const { completeCheckOut } = CheckOutApi();

    
    
  return (
    <AnimatePresence>
      {isPaymentModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-green-500/20 z-50 flex items-center justify-center p-4"
          onClick={togglePaymentModal}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <Card>
              <CardContent>
                <>
                    <CardTitle className="font-headline flex items-center gap-2">
                        <Banknote className="h-6 w-6 text-primary"/>
                        Manual Bank Transfer
                    </CardTitle>
                    <CardDescription>
                        Please transfer the total amount to the account below. Your order will be processed once payment is confirmed.
                    </CardDescription>
                </>
                    <div className="py-4 space-y-4">
                        <div className="p-4 rounded-md bg-muted/50 border">
                            <p className="text-sm text-muted-foreground">Total Amount</p>
                            <p className="text-2xl font-bold font-headline">{formatCurrency(total)}</p>
                        </div>
                        <div className="space-y-1">
                            <Label>Bank Name</Label>
                            <p className="font-semibold">{bankDetails.bankName}</p>
                        </div>
                         <div className="space-y-1">
                            <Label>Account Name</Label>
                            <p className="font-semibold">{bankDetails.accountName}</p>
                        </div>
                        <div className="space-y-1">
                            <Label>Account Number</Label>
                            <div className="flex items-center gap-2">
                                <p className="font-semibold text-lg font-mono">{bankDetails.accountNumber}</p>
                                <Button variant="ghost" size="icon" onClick={() => {copyToClipboard(bankDetails.accountNumber)}}>
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                     {!paymentConfirmed ? (
                        <Button

                        onClick={async()=>{
                        const response = await completeCheckOut(String(checkoutItem?.id))

                        if(response.success){

                            setPaymentConfirmed(true);
                            clearCart()
                            
                        }else{
                            
                        }
                        }
                    }
                        className="w-full"
                        size="lg"
                        >
                        <CheckCircle className="mr-2 h-5 w-5" />
                        I Have Made the Payment
                        </Button>
                    ) : (
                        <div className="text-center p-4 bg-success/10 border border-success rounded-lg">
                        <CheckCircle className="h-8 w-8 text-success mx-auto mb-2" />
                        <p className="text-success font-semibold">Payment Confirmed!</p>
                        <p className="text-sm text-muted-foreground">
                            Your order will be processed within 24 hours.
                        </p>
                        <Link to='/'>
                            <Button> Go to Market</Button>
                        </Link>
                        </div>
                    )}
                    </CardContent>
                    </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 