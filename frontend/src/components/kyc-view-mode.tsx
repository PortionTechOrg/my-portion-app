import { Download, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useUserStore } from "@/zustand/store";

export function KycReadOnlyView() {
  const {user} = useUserStore()
  
  return (
    <div className="space-y-4 text-sm">
      <p className="md:text-center text-muted-foreground">Your information has been submitted for review. Here is the data we have on file.</p>
      
      <Card>
          <CardHeader><CardTitle className="text-base">Personal Information</CardTitle></CardHeader>
          <CardContent className="space-y-2">
              <div className="flex justify-between"><span>Full Name:</span> <span className="font-medium">{user?.firstname + ' ' + user?.lastname}</span></div>
              <div className="flex justify-between"><span>Date of Birth:</span> <span className="font-medium">{user?.date_of_birth}</span></div>
              <div className="flex justify-between"><span>Phone:</span> <span className="font-medium">{user?.kyc_personal?.phone_number}</span></div>
              <div className="flex justify-between"><span>Email:</span> <span className="font-medium">{user?.kyc_personal?.email}</span></div>
              <div className="flex justify-between"><span>BVN:</span> <span className="font-medium">{user?.kyc_personal?.bvn}</span></div>
              <div className="flex justify-between"><span>Location:</span> <span className="font-medium">{user?.kyc_personal?.address}</span></div>
          </CardContent>
      </Card>

      <Card>
          <CardHeader><CardTitle className="text-base">Business Information</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between"><span>Business Name:</span> <span className="font-medium">{user?.kyc_business?.business_name}</span></div>
            <div className="flex justify-between"><span>Business Phone Number:</span> <span className="font-medium">{user?.kyc_business?.business_phone_number}</span></div>
            <div className="flex justify-between"><span>Business Email:</span> <span className="font-medium">{user?.kyc_business?.business_phone_number}</span></div>
            <div className="flex justify-between"><span>CAC Number:</span> <span className="font-medium">{user?.kyc_business?.cac_number}</span></div>
            <div className="flex justify-between"><span>Tax ID:</span> <span className="font-medium">{user?.kyc_business?.tax_id}</span></div>
            <div className="flex justify-between"><span>Address:</span> <span className="font-medium">{user?.kyc_business?.business_address}</span></div>
          </CardContent>
      </Card>

      <Card>
          <CardHeader><CardTitle className="text-base">Uploaded Documents</CardTitle></CardHeader>
          <CardContent>
            {user?.kyc_business_docs?.cac_certificate && (
              <ul className="space-y-3">
                  <li
                    key={user?.kyc_business_docs?.cac_certificate}
                    className="flex items-center justify-between rounded-md border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">Cac Certificate</span>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href={user?.kyc_business_docs?.cac_certificate} target="_blank">
                        <Download className="mr-2 h-4 w-4" /> View Document
                      </a>
                    </Button>
                  </li>
              </ul>
            )}
            
            {user?.kyc_business_docs?.tax_certificate && (
              <ul className="space-y-3">
                  <li
                    key={user?.kyc_business_docs?.tax_certificate}
                    className="flex items-center justify-between rounded-md border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">Tax Certificate</span>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href={user?.kyc_business_docs?.tax_certificate} target="_blank">
                        <Download className="mr-2 h-4 w-4" /> View Document
                      </a>
                    </Button>
                  </li>
              </ul>
            )}
            
            {user?.kyc_business_docs?.utility_bill && (
              <ul className="space-y-3">
                  <li
                    key={user?.kyc_business_docs?.utility_bill}
                    className="flex items-center justify-between rounded-md border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">Utility Bill</span>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href={user?.kyc_business_docs?.utility_bill} target="_blank">
                        <Download className="mr-2 h-4 w-4" /> View Document
                      </a>
                    </Button>
                  </li>
              </ul>
            )}
            
            {user?.kyc_id_verification?.id_front && (
              <ul className="space-y-3">
                  <li
                    key={user?.kyc_id_verification?.id_front}
                    className="flex items-center justify-between rounded-md border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">ID Card (Front)</span>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href={user?.kyc_id_verification?.id_front} target="_blank">
                        <Download className="mr-2 h-4 w-4" /> View Document
                      </a>
                    </Button>
                  </li>
              </ul>
            )}
            
            {user?.kyc_id_verification?.id_back && (
              <ul className="space-y-3">
                  <li
                    key={user?.kyc_id_verification?.id_back}
                    className="flex items-center justify-between rounded-md border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">ID Card (Back)</span>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href={user?.kyc_id_verification?.id_back} target="_blank">
                        <Download className="mr-2 h-4 w-4" /> View Document
                      </a>
                    </Button>
                  </li>
              </ul>
            )}
            
            {user?.kyc_id_verification?.passport && (
              <ul className="space-y-3">
                  <li
                    key={user?.kyc_id_verification?.passport}
                    className="flex items-center justify-between rounded-md border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">Passport </span>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href={user?.kyc_id_verification?.passport} target="_blank">
                        <Download className="mr-2 h-4 w-4" /> View Document
                      </a>
                    </Button>
                  </li>
              </ul>
            )}
            
            {/* { (
              <div className="text-center text-muted-foreground py-6">
                <p>No KYC documents submitted.</p>
              </div>
            )} */}
          </CardContent>
      </Card>
      <div className="text-center mt-6">
        <Button asChild>
          <Link to="/dashboard">Back to Dashboard</Link>
        </Button>
      </div>
    </div>
  )
}