import { useState } from "react"
import { Upload, FileText, Building, User, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import Logo from "../../components/shared/Logo"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import useCompleteKyc from "@/hooks/form-hooks/use-complete-kyc-hook"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"
import { KycReadOnlyView } from "@/components/kyc-view-mode"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { useFetchUser, useUserState } from "@/zustand/hooks/user/user.hook"

interface KYCFormData {
  // Personal Information
  firstName: string
  lastName: string
  dateOfBirth: string
  phoneNumber: string
  email: string
  address: string
  town: string
  city: string
  state: string
  bvn: string
  
  // Business Information
  businessName: string
  businessAddress: string
  businessPhone: string
  businessEmail: string
  cacNumber: string
  taxId: string
  
  // Identity Documents
  idType: string
  idNumber: string
  idFront: File | null
  idBack: File | null
  passportPhoto: File | null
  
  // Business Documents
  cacCertificate: File | null
  taxCertificate: File | null
  utilityBill: File | null
}

const nigerianStates = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", 
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT", "Gombe", "Imo", 
  "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", 
  "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", 
  "Yobe", "Zamfara"
]

const cities = [
  "Ibadan",
  "Lagos", 
  "Akure"
]



const idTypes = [
  "National ID Card (NIMC)",
  "International Passport",
  "Driver's License",
  "Voter's Card",
  "Permanent Voter's Card (PVC)"
]

function KycStatusDisplayMessage() {
  const { data: { user } } = useUserState()
  return (
    <CardHeader className="p-0">
              <CardDescription>
                {user?.kyc_status === 'rejected' 
                  ? "Your previous submission was rejected. Please review and correct your information."
                  : "Please provide the following information."
                }
              </CardDescription>
            </CardHeader>
  )
}

export default function KYCPage() {
  const [formData, setFormData] = useState<KYCFormData>({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phoneNumber: "",
    email: "",
    address: "",
    town: "",
    city: "",
    state: "",
    bvn: "",
    businessName: "",
    businessAddress: "",
    businessPhone: "",
    businessEmail: "",
    cacNumber: "",
    taxId: "",
    idType: "",
    idNumber: "",
    idFront: null,
    idBack: null,
    passportPhoto: null,
    cacCertificate: null,
    taxCertificate: null,
    utilityBill: null
  })

  const [currentStep, setCurrentStep] = useState(1)

  const handleInputChange = (field: keyof KYCFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const { data: { user } } = useUserState()
  useFetchUser();
  

  const RenderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <User className="w-5 h-5 mr-2 text-green-600" />
          Personal Information
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          <KycStatusDisplayMessage />
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <FormField
            control={form.control}
            name="firstname"
            render={({field}) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input className="Capitalize" defaultValue={user?.firstname} placeholder="Enter your first name" {...field} />
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
            name="lastname"
            render={({field}) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input className="capitalize" defaultValue={user?.lastname} placeholder="Enter your last name" {...field} />
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
            name="date_of_birth"
            render={({field}) => (
              <FormItem>
                <FormLabel>Date of Birth *</FormLabel>
                <FormControl>
                  <Input type="date" placeholder="Enter your first name" {...field} />
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
            name="phone_number"
            render={({field}) => (
              <FormItem>
                <FormLabel>Phone Number *</FormLabel>
                <FormControl>
                  <Input placeholder="08123456789" {...field} />
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
            name="email"
            render={({field}) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input defaultValue={user?.email} placeholder="johndoe@mail.com" {...field} />
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
            name="bvn"
            render={({field}) => (
              <FormItem>
                <FormLabel>BVN (Bank Verification Number) *</FormLabel>
                <FormControl>
                  <Input placeholder="12345678901" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
            />

        </div>
        <div className="md:col-span-2">
          <FormField
            control={form.control}
            name="address"
            render={({field}) => (
              <FormItem>
                <FormLabel>Residential Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full address" {...field} />
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
            name="town"
            render={({field}) => (
              <FormItem>
                <FormLabel>Town *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your town" {...field} />
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
            name="city"
            render={({field}) => (
              <FormItem>
                <FormLabel>City *</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select City" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
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
        <div>
          <FormField
            control={form.control}
            name="state"
            render={({field}) => (
              <FormItem>
                <FormLabel>State *</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select State" />
                    </SelectTrigger>
                    <SelectContent >
                      {nigerianStates.map((state) => (
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
      </div>
    </div>
  )

  const RenderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Building className="w-5 h-5 mr-2 text-green-600" />
          Business Information
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          <KycStatusDisplayMessage />
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <FormField
            control={form.control}
            name="business_name"
            render={({field}) => (
              <FormItem>
                <FormLabel>Business Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your business name" {...field} />
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
            name="business_phone_number"
            render={({field}) => (
              <FormItem>
                <FormLabel>Business Phone *</FormLabel>
                <FormControl>
                  <Input placeholder="081234568901" {...field} />
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
            name="business_email"
            render={({field}) => (
              <FormItem>
                <FormLabel>Business Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your business@mail.com" {...field} />
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
            name="cac_number"
            render={({field}) => (
              <FormItem>
                <FormLabel>CAC Number (if applicable)</FormLabel>
                <FormControl>
                  <Input placeholder="RC12345" {...field} />
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
            name="tax_id"
            render={({field}) => (
              <FormItem>
                <FormLabel>Tax ID (if applicable)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter tax ID" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
            />
          
        </div>
        <div className="md:col-span-2">
          <FormField
            control={form.control}
            name="business_address"
            render={({field}) => (
              <FormItem>
                <FormLabel>Business Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your business address" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
            />
        </div>
      </div>
    </div>
  )

  const RenderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-green-600" />
          Identity Verification
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          <KycStatusDisplayMessage />
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <FormField
            control={form.control}
            name="id_type"
            render={({field}) => (
              <FormItem>
                <FormLabel>ID Type *</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="">
                      <SelectValue placeholder="Select ID type" />
                    </SelectTrigger>
                    <SelectContent className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                      {idTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
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
        <div>
          <FormField
            control={form.control}
            name="id_number"
            render={({field}) => (
              <FormItem>
                <FormLabel>ID Number *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your ID Number" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
            />
          <Label htmlFor="idNumber">ID Number *</Label>
          <Input
            id="idNumber"
            value={formData.idNumber}
            onChange={(e) => handleInputChange('idNumber', e.target.value)}
            placeholder="Enter your ID number"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="id_front"
            render={({field}) => (
              <FormItem>
                <FormLabel htmlFor="id_front">
                  {/* <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" /> */}
                    ID Front
                </FormLabel>
                <FormControl>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-green-500 transition-colors">
                  <Input 
                    id="id_front"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const selectedFile = e.target.files?.[0]
                      if (!selectedFile) {
                        toast.error("Cancelled select file!")
                        return
                      }

                      // Pass the File to React Hook Form
                      field.onChange(selectedFile)

                      // Generate preview
                      const reader = new FileReader()
                      reader.onloadend = () => {
                        toast.success("📂 Image loaded")
                        // setAvatarPreview(String(reader.result))
                      }
                      reader.readAsDataURL(selectedFile)
                    }}

                    placeholder="Enter your first name" />

                <FormLabel htmlFor="id_front">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    Upload ID Front
                </FormLabel>
                    </div>
                    
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
            />
          
          {true && (
            <div className="flex items-center text-sm text-green-600">
              <CheckCircle className="w-4 h-4 mr-1" />
              File uploaded
            </div>
          )}
        </div>
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="id_back"
            render={({field}) => (
              <FormItem>
                <FormLabel htmlFor="id_back">
                  {/* <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" /> */}
                    ID Back
                </FormLabel>
                <FormControl>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-green-500 transition-colors">
                  <Input 
                    id="id_back"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const selectedFile = e.target.files?.[0]
                      if (!selectedFile) {
                        toast.error("Cancelled select file!")
                        return
                      }

                      // Pass the File to React Hook Form
                      field.onChange(selectedFile)

                      // Generate preview
                      const reader = new FileReader()
                      reader.onloadend = () => {
                        toast.success("📂 Image loaded")
                        // setAvatarPreview(String(reader.result))
                      }
                      reader.readAsDataURL(selectedFile)
                    }}

                    placeholder="Enter your first name" />

                <FormLabel htmlFor="id_back">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    Upload ID Front
                </FormLabel>
                    </div>
                    
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
            />
          
          {true && (
            <div className="flex items-center text-sm text-green-600">
              <CheckCircle className="w-4 h-4 mr-1" />
              File uploaded
            </div>
          )}
        </div>
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="passport"
            render={({field}) => (
              <FormItem>
                <FormLabel htmlFor="passport">
                  {/* <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" /> */}
                    Passport
                </FormLabel>
                <FormControl>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-green-500 transition-colors">
                  <Input 
                    id="passport"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const selectedFile = e.target.files?.[0]
                      if (!selectedFile) {
                        toast.error("Cancelled select file!")
                        return
                      }

                      // Pass the File to React Hook Form
                      field.onChange(selectedFile)

                      // Generate preview
                      const reader = new FileReader()
                      reader.onloadend = () => {
                        toast.success("📂 Image loaded")
                        // setAvatarPreview(String(reader.result))
                      }
                      reader.readAsDataURL(selectedFile)
                    }}

                    placeholder="Enter your first name" />

                <FormLabel htmlFor="passport">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    Upload Passport
                </FormLabel>
                    </div>
                    
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
            />
          
          {true && (
            <div className="flex items-center text-sm text-green-600">
              <CheckCircle className="w-4 h-4 mr-1" />
              File uploaded
            </div>
          )}
        </div>

        {/* <div className="space-y-2">
          <Label>ID Back *</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-green-500 transition-colors">
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => e.target.files?.[0] && handleFileUpload('idBack', e.target.files[0])}
              className="hidden"
              id="idBack"
            />
            <label htmlFor="idBack" className="cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Upload ID Back</p>
            </label>
          </div>
          {formData.idBack && (
            <div className="flex items-center text-sm text-green-600">
              <CheckCircle className="w-4 h-4 mr-1" />
              File uploaded
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label>Passport Photo *</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-green-500 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && handleFileUpload('passportPhoto', e.target.files[0])}
              className="hidden"
              id="passportPhoto"
            />
            <label htmlFor="passportPhoto" className="cursor-pointer">
              <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Upload Photo</p>
            </label>
          </div>
          {formData.passportPhoto && (
            <div className="flex items-center text-sm text-green-600">
              <CheckCircle className="w-4 h-4 mr-1" />
              File uploaded
            </div>
          )}
        </div> */}
      </div>
    </div>
  )

  const RenderStep4 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Building className="w-5 h-5 mr-2 text-green-600" />
          Business Documents
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          <KycStatusDisplayMessage />
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Utility Bill (Proof of Address) *</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-green-500 transition-colors">
            
            <FormField
            control={form.control}
            name="utility_bill"
            render={({field}) => (
              <FormItem>
                <FormLabel htmlFor="utility_bill">
                  {/* <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" /> */}
                    Utility Bill
                </FormLabel>
                <FormControl>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-green-500 transition-colors">
                  <Input 
                    id="utility_bill"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const selectedFile = e.target.files?.[0]
                      if (!selectedFile) {
                        toast.error("Cancelled select file!")
                        return
                      }

                      // Pass the File to React Hook Form
                      field.onChange(selectedFile)

                      // Generate preview
                      const reader = new FileReader()
                      reader.onloadend = () => {
                        toast.success("📂 Image loaded")
                        // setAvatarPreview(String(reader.result))
                      }
                      reader.readAsDataURL(selectedFile)
                    }}

                    placeholder="Enter your first name" />

                <FormLabel htmlFor="utility_bill">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    Upload Utility Bill
                </FormLabel>
                    </div>
                    
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
            />
            {/* <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => e.target.files?.[0] && handleFileUpload('utilityBill', e.target.files[0])}
              className="hidden"
              id="utilityBill"
            />
            <label htmlFor="utilityBill" className="cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Upload Utility Bill</p>
            </label> */}
          </div>
          {formData.utilityBill && (
            <div className="flex items-center text-sm text-green-600">
              <CheckCircle className="w-4 h-4 mr-1" />
              File uploaded
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label>CAC Certificate (if applicable)</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-green-500 transition-colors">
            <FormField
            control={form.control}
            name="cac_certificate"
            render={({field}) => (
              <FormItem>
                <FormLabel htmlFor="cac_certificate">
                  {/* <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" /> */}
                    CAC Certificate
                </FormLabel>
                <FormControl>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-green-500 transition-colors">
                  <Input 
                    id="cac_certificate"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const selectedFile = e.target.files?.[0]
                      if (!selectedFile) {
                        toast.error("Cancelled select file!")
                        return
                      }

                      // Pass the File to React Hook Form
                      field.onChange(selectedFile)

                      // Generate preview
                      const reader = new FileReader()
                      reader.onloadend = () => {
                        toast.success("📂 Image loaded")
                        // setAvatarPreview(String(reader.result))
                      }
                      reader.readAsDataURL(selectedFile)
                    }}

                    placeholder="Enter your first name" />

                <FormLabel htmlFor="cac_certificate">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    Upload CAC Certificate
                </FormLabel>
                    </div>
                    
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
            />
            
          </div>
          {formData.cacCertificate && (
            <div className="flex items-center text-sm text-green-600">
              <CheckCircle className="w-4 h-4 mr-1" />
              File uploaded
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label>Tax Certificate (if applicable)</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-green-500 transition-colors">
            <FormField
            control={form.control}
            name="tax_certificate"
            render={({field}) => (
              <FormItem>
                <FormLabel htmlFor="tax_certificate">
                  {/* <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" /> */}
                    Tax Certificate
                </FormLabel>
                <FormControl>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-green-500 transition-colors">
                  <Input 
                    id="tax_certificate"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const selectedFile = e.target.files?.[0]
                      if (!selectedFile) {
                        toast.error("Cancelled select file!")
                        return
                      }

                      // Pass the File to React Hook Form
                      field.onChange(selectedFile)

                      // Generate preview
                      const reader = new FileReader()
                      reader.onloadend = () => {
                        toast.success("📂 Image loaded")
                        // setAvatarPreview(String(reader.result))
                      }
                      reader.readAsDataURL(selectedFile)
                    }}

                     />

                <FormLabel htmlFor="tax_certificate">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    Upload Tax Certificate
                </FormLabel>
                    </div>
                    
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
            />
          </div>
          {formData.taxCertificate && (
            <div className="flex items-center text-sm text-green-600">
              <CheckCircle className="w-4 h-4 mr-1" />
              File uploaded
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const RenderStep5 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Review Your Information</h3>
        <p className="text-sm text-gray-600 mb-6">
          Please review all the information you've provided before submitting.
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Personal Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div><span className="text-gray-600">Name:</span> {form.getValues("firstname")} {form.getValues("lastname")}</div>
            <div><span className="text-gray-600">Phone:</span> {form.getValues("phone_number")}</div>
            <div><span className="text-gray-600">Email:</span> {form.getValues("email")}</div>
            <div><span className="text-gray-600">BVN:</span> {form.getValues("bvn")}</div>
            <div><span className="text-gray-600">Address:</span> {form.getValues("address")}</div>
            <div><span className="text-gray-600">Town:</span> {form.getValues("town")}</div>
            <div><span className="text-gray-600">City:</span> {form.getValues("city")}</div>
            <div><span className="text-gray-600">State:</span> {form.getValues("state")}</div>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-2">Business Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div><span className="text-gray-600">Business Name:</span> {form.getValues("business_name")}</div>
            <div><span className="text-gray-600">Business Phone:</span> {form.getValues("business_phone_number")}</div>
            <div><span className="text-gray-600">CAC Number:</span> {form.getValues("cac_number") || 'Not provided'}</div>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-2">Documents Uploaded</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
              Utility Bill: {form.getValues('utility_bill') ? 'Uploaded' : 'Not uploaded'}
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
              ID Front: {form.getValues('id_front') ? 'Uploaded' : 'Not uploaded'}
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
              ID Back: {form.getValues('id_back') ? 'Uploaded' : 'Not uploaded'}
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
              Passport Photo: {form.getValues('passport') ? 'Uploaded' : 'Not uploaded'}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
          <div>
            <h4 className="font-medium text-yellow-800">Important Notice</h4>
            <p className="text-sm text-yellow-700 mt-1">
              Your KYC verification will be reviewed shortly. You'll receive an email notification once the verification is complete.
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderStep = () => {
    switch(currentStep) {
      case 1: return <RenderStep1 />;
      case 2: return <RenderStep2 />;
      case 3: return <RenderStep3 />;
      case 4: return <RenderStep4 />;
      case 5: return <RenderStep5 />;
      default: return <RenderStep1 />;
    }
  }


  const { form, isLoading, onSubmitKyc }  = useCompleteKyc()

  const validationStepFields = [
    ["firstname", "lastname", "date_of_birth", "email", "bvn", "address", "town", "city", "state" ], 
    ["business_name", "business_email", "cac_number", "tax_id", "business_address"],
    ["id_type", "id_number", "id_front", "id_back", "passport"],
    ["utility_bill", "cac_certificate", "tax_certificate"]
  ]

  const handleNextStep = async () => {
    // @ts-expect-error
  const isStepValid = await form.trigger(validationStepFields[currentStep-1])  // Fields in current step

  if (isStepValid) {
    setCurrentStep(currentStep + 1)
    // setCurrentStep((prev) => prev + 1)
  } else {
    console.log("Validation failed")
  }
}



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Logo />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">KYC Verification</h1>
                <p className="text-sm text-gray-600">Complete your business verification</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Step {currentStep} of 5</div>
              <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / 5) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <Card>
        {user?.kyc_status == "verified" || user?.kyc_status == "submitted" ? (

          <CardContent className='pt-6'>
              <KycReadOnlyView />
            </CardContent>

        ): (
          <>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitKyc)}>
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-8">

                  {renderStep()}

            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center p-8 border-t border-gray-200">
              {/* dont change to button */}
              { currentStep > 1 ? (
                <div>
                  
                  <div
                onClick={() => {
                  if(!(currentStep < 2)) {
                    setCurrentStep(Math.max(1, currentStep - 1))
                  }
                }}
                
                // disabled={currentStep === 1}
              >
                Previous
              </div>
                  </div>
              ): (
                <div>
                  {/* <Link
                    to="/vendor"
                    className="bg-green-500 hover:bg-green-600 rounded-sm text-white text-sm py-2 px-3"
                  >
                    Submit KYC
                  </Link> */}
                  <Link to='/dashboard'>
                    Skip
                  </Link>
                </div>
              )}

              <div className="flex space-x-3">
                {currentStep < 5 ? (
                  // dont change to button
                  <div
                    onClick={handleNextStep}
                    className="bg-green-500 hover:bg-green-600 py-1 px-3 text-white rounded-sm"
                  >
                    Next
                  </div>
                ) : (

                    <Button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600"
                  >
                    {isLoading ? "Submitting..." : "Submit KYC"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
                </form>
              </Form>
          </>
        )}
      </Card>
    </div>
  )
}

