import Link from "next/link"
import Image from "next/image";
import DeleteModal from "@/modals/DeleteModal";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import profileIcon_1 from "@/assets/images/dashboard/icon/icon_23.svg";
import profileIcon_2 from "@/assets/images/dashboard/icon/icon_24.svg";
import profileIcon_3 from "@/assets/images/dashboard/icon/icon_25.svg";
import profileIcon_4 from "@/assets/images/dashboard/icon/icon_26.svg";

const Profile = () => {
   const router = useRouter();
   const [user, setUser] = useState<any>(null);

   useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
         setUser(JSON.parse(storedUser));
      }
   }, []);

   const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/");
   };

   return (
      <>
         <div className="user-name-data">
            <ul className="dropdown-menu" aria-labelledby="profile-dropdown">
               {user && (
                  <li className="px-3 py-2 border-bottom mb-2">
                     <span className="d-block text-truncate fw-bold">{user.name || user.email}</span>
                     <small className="text-muted">{user.role}</small>
                  </li>
               )}
               <li>
                  <Link className="dropdown-item d-flex align-items-center" href="/profile"><Image src={profileIcon_1} alt="" className="lazy-img" /><span className="ms-2 ps-1">Profile</span></Link>
               </li>
               <li>
                  <Link className="dropdown-item d-flex align-items-center" href="/account-settings"><Image src={profileIcon_2} alt="" className="lazy-img" /><span className="ms-2 ps-1">Account Settings</span></Link>
               </li>
               <li>
                  <button onClick={handleLogout} className="dropdown-item d-flex align-items-center w-100 text-start bg-transparent border-0"><Image src={profileIcon_4} alt="" className="lazy-img" /><span className="ms-2 ps-1">Logout</span></button>
               </li>
               <li>
                  <Link className="dropdown-item d-flex align-items-center" href="#" data-bs-toggle="modal" data-bs-target="#deleteModal"><Image src={profileIcon_3} alt="" className="lazy-img"/><span className="ms-2 ps-1">Delete Account</span></Link>
               </li>
            </ul>
         </div>
         <DeleteModal />
      </>
   )
}

export default Profile
