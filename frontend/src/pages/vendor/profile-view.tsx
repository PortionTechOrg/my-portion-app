import { useState } from "react"
import { 
  VendorHeader, 
  AddProductModal
} from "../../components/vendor"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Banknote, Building, ShieldAlert, User } from "lucide-react";
import type { Kyc_Status } from "@shared/enums";
import { Kyc_Status as KYC_STATUS } from "@shared/enums";
import { Link } from "react-router-dom";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import toast from "react-hot-toast";
import { useUserState } from "@/zustand/hooks/user/user.hook";
import { Button } from "@/components/ui/button";


function InfoField({ label, value }: { label: string, value: string | undefined }) {
    return (
        <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="font-medium">{value || 'N/A'}</p>
        </div>
    )
}

type BankDetails = {
    bankName: string;
    accountNumber: string;
    accountName: string;
}

export default function DashboardProfilePage() {

  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false)

  const handleSaveDraft = (productData: any) => {
    console.log('Save draft:', productData)
  }

  const [isBankDialogOpen, setIsBankDialogOpen] = useState(false);

  const { data: { user } } = useUserState()

  const [bankDetails, setBankDetails] = useState<BankDetails | null>(null);


  const handleBankDetailsSave = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const newDetails: BankDetails = {
          bankName: formData.get('bankName') as string,
          accountNumber: formData.get('accountNumber') as string,
          accountName: formData.get('accountName') as string,
      };
      setBankDetails(newDetails);
      setIsBankDialogOpen(false);
      toast.success("Bank details saved successfully!");
  }

  const kycStatusConfig: Record<Kyc_Status, { text: string; color: string }> = {
      verified: { text: "Your account is verified.", color: "text-green-600" },
      submitted: { text: "Your KYC information is under review.", color: "text-yellow-600" },
      not_submitted: { text: "You have not submitted your KYC information.", color: "text-red-600" },
      rejected: { text: "Your KYC information was rejected. Please resubmit.", color: "text-red-600" },
  };
  const isValidKycStatus = (s: any): s is Kyc_Status => Object.values(KYC_STATUS).includes(s);
      
  const kycInfo = isValidKycStatus(user?.kyc_status) ? kycStatusConfig[user.kyc_status] : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-4 sm:py-8">
        <VendorHeader />'
        <div className="mb-8">
        <h1 className="font-headline text-4xl font-bold">My Profile</h1>
        <p className="text-muted-foreground">Manage your store and personal information.</p>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="bank">Bank Details</TabsTrigger>
        </TabsList>
        <TabsContent value="personal" className="mt-6">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2 space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5" />
                            Personal Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <InfoField label="Full Name" value={(user?.firstname + ' ' + user?.lastname) || "Not Set"} />
                            {/* <InfoField label="Date of Birth" value={user?.date_of_birth} /> */}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <InfoField label="Email" value={user?.email || "Not Set"} />
                            <InfoField label="Phone Number" value={user?.kyc_personal?.phone_number || "Not Set"} />
                      </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <InfoField label="BVN" value={user?.kyc_personal?.bvn || "Not Set"} />
                      </div>
                      <div>
                            <InfoField label="Address" value={user?.kyc_personal?.address || "Not Set"} />
                      </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Building className="h-5 w-5" />
                            Business Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <InfoField label="Business Name" value={user?.kyc_business?.business_name || "Not Set"} />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <InfoField label="Business Email" value={user?.kyc_business?.business_email || "Not Set"} />
                            <InfoField label="Business Phone" value={user?.kyc_business?.business_phone_number || "Not Set"} />
                      </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <InfoField label="CAC Number" value={user?.kyc_business?.cac_number || "Not Set"} />
                            <InfoField label="Tax ID" value={user?.kyc_business?.tax_id || "Not Set"} />
                      </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline">Request to Edit Info</Button>
                    </CardFooter>
                </Card>
            </div>

            <div className="md:col-span-1 space-y-8">
                <Card className="bg-muted/30">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ShieldAlert className="h-6 w-6 text-primary" />
                            KYC Status
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {kycInfo ? (
                            <p className={`font-medium ${kycInfo.color}`}>{kycInfo.text}</p>
                        ) : (
                            <p>Loading KYC status...</p>
                        )}
                    </CardContent>
                    <CardFooter>
                        <Button asChild className="w-full">
                            <Link to="/dashboard/kyc">
                              {user?.kyc_status === 'not_submitted' ? 'Start KYC Verification' : 'View or Update KYC'}
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="security" className="mt-6">
             <Card>
                <CardHeader>
                    <CardTitle>Security</CardTitle>
                    <CardDescription>Change your account password.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                        <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button>Update Password</Button>
                </CardFooter>
            </Card>
        </TabsContent>
        <TabsContent value="bank" className="mt-6">
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Banknote className="h-5 w-5" />
                        Bank Account Details
                    </CardTitle>
                    <CardDescription>This is the account where your payouts will be sent.</CardDescription>
                </CardHeader>
                <CardContent>
                    {bankDetails ? (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <InfoField label="Bank Name" value={bankDetails.bankName} />
                                <InfoField label="Account Number" value={bankDetails.accountNumber} />
                            </div>
                            <InfoField label="Account Name" value={bankDetails.accountName} />
                        </div>
                    ) : (
                        <div className="text-center py-8 text-muted-foreground">
                            <p>No bank details have been added yet.</p>
                        </div>
                    )}
                </CardContent>
                 <CardFooter>
                    <Dialog open={isBankDialogOpen} onOpenChange={setIsBankDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline">
                                {user ? 'Update Bank Details' : 'Add Bank Details'}
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                             <DialogHeader>
                                <DialogTitle>{user ? 'Update' : 'Add'} Bank Details</DialogTitle>
                                <DialogDescription>
                                    Enter your bank account information for payouts.
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleBankDetailsSave}>
                                <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="bankName">Bank Name</Label>
                                        <Input id="bankName" name="bankName" defaultValue={bankDetails?.bankName} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="accountNumber">Account Number</Label>
                                        <Input id="accountNumber" name="accountNumber" defaultValue={bankDetails?.accountNumber} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="accountName">Account Name</Label>
                                        <Input id="accountName" name="accountName" defaultValue={bankDetails?.accountName} />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit">Save Changes</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </CardFooter>
            </Card>
        </TabsContent>
      </Tabs>
      </main>

      <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
        onSaveDraft={handleSaveDraft}
      />
    </div>
  )
}