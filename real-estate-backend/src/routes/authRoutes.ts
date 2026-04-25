import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { validateRequest } from "../middlewares/validateRequest";
import { authValidation } from "../validations/authValidation";
import { authLimiter } from "../middlewares/rateLimiter";

const router = Router();

// Apply strict rate limiting to auth routes
router.use(authLimiter);

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - termsAccepted
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 example: "StrongPass1!"
 *               termsAccepted:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "User registered successfully!"
 *       400:
 *         description: Validation error or Email already exists
 */
router.post("/signup", validateRequest(authValidation.register), AuthController.signup);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authenticate user & get JWT token
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 example: "StrongPass1!"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpX..."
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", validateRequest(authValidation.login), AuthController.login);

export default router;
