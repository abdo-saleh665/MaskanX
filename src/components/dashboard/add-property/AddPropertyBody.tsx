"use client"
import DashboardHeaderTwo from "@/layouts/headers/dashboard/DashboardHeaderTwo"
import Overview from "./Overview"
import ListingDetails from "./ListingDetails"
import Link from "next/link"
import SelectAmenities from "./SelectAmenities"
import AddressAndLocation from "../profile/AddressAndLocation"
import api from "@/services/api"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import AuthGuard from "../AuthGuard"

const AddPropertyBody = () => {
   const router = useRouter();

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      
      const payload = {
         title: formData.get("title") || "Untitled Property",
         description: formData.get("description") || "No description provided",
         price: Number(formData.get("price")) || 0,
         location: formData.get("location") || "Unknown Location",
         bedrooms: Number(formData.get("bedrooms")) || 1, // Fallback if NiceSelect doesn't use name correctly
         bathrooms: Number(formData.get("bathrooms")) || 1,
         area: Number(formData.get("area")) || 0,
         status: "available"
      };

      try {
         const { data } = await api.post("/properties", payload);
         if (data.success) {
            toast.success("Property added successfully!");
            router.push("/properties"); // Redirect to my properties
         }
      } catch (error: any) {
         toast.error(error.response?.data?.message || "Failed to add property");
      }
   };

return (
      <AuthGuard>
         <div className="dashboard-body">
            <form className="position-relative" onSubmit={handleSubmit}>
               <DashboardHeaderTwo title="Add New Property" />
               <h2 className="main-title d-block d-lg-none">Add New Property</h2>
               <Overview />
               <ListingDetails />

               <div className="bg-white card-box border-20 mt-40">
                  <h4 className="dash-title-three">Photo & Video Attachment</h4>
                  <div className="dash-input-wrapper mb-20">
                     <label htmlFor="">File Attachment*</label>

                     <div className="attached-file d-flex align-items-center justify-content-between mb-15">
                        <span>PorpertyImage_01.jpg</span>
                        <Link href="#" className="remove-btn"><i className="bi bi-x"></i></Link>
                     </div>
                     <div className="attached-file d-flex align-items-center justify-content-between mb-15">
                        <span>PorpertyImage_02.jpg</span>
                        <Link href="#" className="remove-btn"><i className="bi bi-x"></i></Link>
                     </div>
                  </div>
                  <div className="dash-btn-one d-inline-block position-relative me-3">
                     <i className="bi bi-plus"></i>
                     Upload File
                     <input type="file" id="uploadCV" name="uploadCV" placeholder="" />
                  </div>
                  <small>Upload file .jpg, .png, .mp4</small>
               </div>
               <SelectAmenities />
               <AddressAndLocation />

               <div className="button-group d-inline-flex align-items-center mt-30">
                  <button type="submit" className="dash-btn-two tran3s me-3">Submit Property</button>
                  <Link href="/properties" className="dash-cancel-btn tran3s">Cancel</Link>
               </div>
            </form>
         </div>
      </AuthGuard>
   )
}

export default AddPropertyBody
