import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { ApiError } from "../utils/ApiError";

const SECRET_KEY = process.env.JWT_SECRET || "secret_key";
const SALT_ROUNDS = 10;

export class AuthService {
  /**
   * Registers a new user. Throws an error if user already exists.
   */
  static async registerUser(userData: any) {
    const { name, email, password, termsAccepted, firstName, lastName, phoneNumber, role } = userData;

    // Check if user exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new ApiError(400, "User with this email already exists");
    }

    // Hash password securely
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create user object
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      termsAccepted,
      firstName,
      lastName,
      phoneNumber,
      role: role || "user"
    });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    };
  }

  /**
   * Authenticates a user and returns a signed JWT.
   */
  static async loginUser(credentials: any) {
    const { email, password } = credentials;

    // Fetch user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }

    // Verify password match
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid email or password");
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    };
  }
}
