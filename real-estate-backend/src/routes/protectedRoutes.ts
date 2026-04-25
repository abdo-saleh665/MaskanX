import { Router, Request, Response } from "express";
import { User } from "../models/User"; 
import { authenticate, AuthenticatedRequest } from "../middlewares/authMiddleware"; 

const router = Router();

/**
 * @swagger
 * /api/profile:
 *   get:
 *     summary: Get authenticated user profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "John Doe"
 *                 email:
 *                   type: string
 *                   example: "johndoe@example.com"
 *       401:
 *         description: Unauthorized, token missing or invalid
 */
router.get("/profile", authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as AuthenticatedRequest).user;
    if (!user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const dbUser = await User.findByPk(user.id, {
      attributes: ["name", "email", "firstName", "lastName", "phoneNumber", "about"]
    });

    if (!dbUser) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json(dbUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});


router.put("/profile", authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as AuthenticatedRequest).user;
    if (!user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const { firstName, lastName, phoneNumber, about } = req.body;

    if (!firstName || !lastName || !phoneNumber || !about) {
      res.status(400).json({ error: "All fields are required" }); 
      return;
    }

    await User.update(
      { firstName, lastName, phoneNumber, about },
      { where: { id: user.id } }
    );

    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
