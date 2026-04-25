import { Router } from "express";
import { PropertyController } from "../controllers/PropertyController";
import { validateRequest } from "../middlewares/validateRequest";
import { propertyValidation } from "../validations/propertyValidation";

const router = Router();

/**
 * @swagger
 * /api/properties:
 *   get:
 *     summary: Get all properties (Paginated)
 *     tags: [Properties]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Items per page
 *         example: 10
 *     responses:
 *       200:
 *         description: List of properties retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalItems:
 *                       type: integer
 *                       example: 45
 *                     totalPages:
 *                       type: integer
 *                       example: 5
 *                     currentPage:
 *                       type: integer
 *                       example: 1
 *                     properties:
 *                       type: array
 *                       items:
 *                         type: object
 */
router.get("/", PropertyController.getProperties);

// Protected routes using authenticate
import { authenticate, authorizeRoles } from "../middlewares/authMiddleware";

router.get("/my-properties", authenticate, PropertyController.getMyProperties);

router.get("/:id", PropertyController.getProperty);

/**
 * @swagger
 * /api/properties:
 *   post:
 *     summary: Create a new property listing
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - price
 *               - location
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Luxury Villa in Dubai"
 *               description:
 *                 type: string
 *                 example: "A beautiful 5-bedroom villa with a private pool."
 *               price:
 *                 type: number
 *                 example: 850000
 *               location:
 *                 type: string
 *                 example: "Palm Jumeirah, Dubai"
 *     responses:
 *       201:
 *         description: Property created strictly
 *       403:
 *         description: Unauthorized
 */
router.post("/", authenticate, validateRequest(propertyValidation.create), PropertyController.createProperty);

router.put("/:id", authenticate, authorizeRoles("admin"), validateRequest(propertyValidation.update), PropertyController.updateProperty);
router.delete("/:id", authenticate, authorizeRoles("admin"), PropertyController.deleteProperty);

export default router;
