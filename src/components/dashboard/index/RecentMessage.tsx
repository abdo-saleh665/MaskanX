import Image, { StaticImageData } from "next/image"
import { useEffect, useState } from "react"
import api from "@/services/api"

import icon_1 from "@/assets/images/dashboard/icon/icon_28.svg"

interface DataType {
   id: number;
   name: string;
   date: string;
   title: string;
   desc: string;
   icon?: StaticImageData;
   class_name?: string;
}

const message_data: DataType[] = []

const RecentMessage = () => {
   const [messages, setMessages] = useState<DataType[]>([])
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      const fetchMessages = async () => {
         try {
            const response = await api.get("/inquiries/my-inquiries")
            const data = response.data.map((item: any) => ({
               id: item.id,
               name: item.name || "Unknown",
               date: new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
               title: item.subject || "New Inquiry",
               desc: item.message,
               class_name: item.status === "read" ? "read border-0 pt-0" : ""
            }))
            setMessages(data)
         } catch (error) {
            console.error("Failed to fetch messages:", error)
         } finally {
            setLoading(false)
         }
      }
      fetchMessages()
   }, [])

const displayData = messages.length > 0 ? messages : message_data

   return (
      <div className="message-wrapper">
         <div className="message-sidebar border-0">
            <div className="email-read-panel">
               {displayData.map((item) => (
                  <div key={item.id} className={`email-list-item ${item.class_name}`}>
                     <div className="email-short-preview position-relative">
                        <div className="d-flex align-items-center justify-content-between">
                           <div className="sender-name">{item.name}</div>
                           <div className="date">{item.date}</div>
                        </div>
                        <div className="mail-sub">{item.title}</div>
                        <div className="mail-text">{item.desc}</div>
                        {item.icon &&
                           <div className="attached-file-preview d-flex align-items-center mt-15">
                              <div className="file d-flex align-items-center me-2">
                                 <Image src={item.icon} alt="" className="lazy-img me-2" />
                                 <span>details.pdf</span>
                              </div>
                           </div>
                        }
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}

export default RecentMessage
