import { Router } from "express";
import { Property } from "../models/Property";
import { Inquiry } from "../models/Inquiry";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();

router.get("/stats", authenticate, async (req, res) => {
  try {
    const totalProperties = await Property.count();
    const totalPending = await Property.count({ where: { status: "available" } });
    
    const totalInquiries = await Inquiry.count();
    
    res.json({
      totalProperties,
      totalPending,
      totalViews: 0,
      totalFavourites: totalInquiries,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

export default router;