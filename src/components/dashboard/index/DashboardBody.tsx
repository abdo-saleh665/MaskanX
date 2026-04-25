"use client"
import Image, { StaticImageData } from "next/image"
import NiceSelect from "@/ui/NiceSelect"
import RecentMessage from "./RecentMessage"
import DashboardHeaderTwo from "@/layouts/headers/dashboard/DashboardHeaderTwo"
import AuthGuard from "../AuthGuard"
import api from "@/services/api"

import icon_1 from "@/assets/images/dashboard/icon/icon_12.svg"
import icon_2 from "@/assets/images/dashboard/icon/icon_13.svg"
import icon_3 from "@/assets/images/dashboard/icon/icon_14.svg"
import icon_4 from "@/assets/images/dashboard/icon/icon_15.svg"
import DashboardChart from "./DashboardChart"
import { useEffect, useState } from "react"

interface DataType {
   id: number;
   icon: StaticImageData;
   title: string;
   value: string;
   class_name?: string;
}

const dashboard_card_data: DataType[] = []

const DashboardBody = () => {
   const [stats, setStats] = useState<any>(null)
   const [loading, setLoading] = useState(true)

   const selectHandler = (e: any) => { };

   useEffect(() => {
      const fetchStats = async () => {
         try {
            const response = await api.get("/stats")
            setStats(response.data)
         } catch (error) {
            console.error("Failed to fetch stats:", error)
         } finally {
            setLoading(false)
         }
      }
      fetchStats()
   }, [])

   const getValue = (key: string) => {
      if (!stats) return "..."
      const val = stats[key]
      if (typeof val === 'number') return val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val.toString()
      return val?.toString() || "0"
   }

   const cardData = [
      { id: 1, icon: icon_1, title: "All Properties", value: getValue("totalProperties"), class_name: "skew-none" },
      { id: 2, icon: icon_2, title: "Total Pending", value: getValue("totalPending") },
      { id: 3, icon: icon_3, title: "Total Views", value: getValue("totalViews") },
      { id: 4, icon: icon_4, title: "Total Favourites", value: getValue("totalFavourites") },
   ]

return (
      <AuthGuard>
        <div className="dashboard-body">
          <div className="position-relative">
            <DashboardHeaderTwo title="Dashboard" />

            <h2 className="main-title d-block d-lg-none">Dashboard</h2>
            <div className="bg-white border-20">
               <div className="row">
                  {cardData.map((item) => (
                     <div key={item.id} className="col-lg-3 col-6">
                        <div className={`dash-card-one bg-white border-30 position-relative mb-15 ${item.class_name}`}>
                           <div className="d-sm-flex align-items-center justify-content-between">
                              <div className="icon rounded-circle d-flex align-items-center justify-content-center order-sm-1"><Image src={item.icon} alt="" className="lazy-img" /></div>
                              <div className="order-sm-0">
                                 <span>{item.title}</span>
                                 <div className="value fw-500">{item.value}</div>
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            <div className="row gx-xxl-5 d-flex pt-15 lg-pt-10">
               <div className="col-xl-7 col-lg-6 d-flex flex-column">
                  <div className="user-activity-chart bg-white border-20 mt-30 h-100">
                     <div className="d-flex align-items-center justify-content-between plr">
                        <h5 className="dash-title-two">Property View</h5>
                        <div className="short-filter d-flex align-items-center">
                           <div className="fs-16 me-2">Short by:</div>
                           <NiceSelect className="nice-select fw-normal"
                              options={[
                                 { value: "1", text: "Weekly" },
                                 { value: "2", text: "Daily" },
                                 { value: "3", text: "Monthly" },
                              ]}
                              defaultCurrent={0}
                              onChange={selectHandler}
                              name=""
                              placeholder="" />
                        </div>
                     </div>
                     <div className="plr mt-50">
                        <div className="chart-wrapper">
                           <DashboardChart />
                        </div>
                     </div>
                  </div>
               </div>

               <div className="col-xl-5 col-lg-6 d-flex">
                  <div className="recent-job-tab bg-white border-20 mt-30 plr w-100">
                     <h5 className="dash-title-two">Recent Message</h5>
                     <RecentMessage/>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </AuthGuard>
   )
}

export default DashboardBody
