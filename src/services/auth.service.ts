import bcrypt from "bcryptjs";

import { AuthRepository } from "../repositories/auth.repository";
import { IUser } from "../interface/user.interface";
import { generateToken } from "../configs/jwt";
import { HttpError } from "../errors/http.error";

export class AuthService {
  private authRepository: AuthRepository;

  constructor() {
    this.authRepository = new AuthRepository();
  }

  async register(userData: IUser) {

    const existingUser =
      await this.authRepository.findByEmail(userData.email);

    if (existingUser) {
      throw new HttpError("Email already exists", 409);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
      userData.password,
      10
    );

    userData.password = hashedPassword;

    const insertId = await this.authRepository.create(userData);

    const user = {
      id: insertId,
      name: userData.name,
      email: userData.email,
      role: userData.role || "Librarian",
    };

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      message: "User registered successfully",
      data: {
        token,
        user,
      },
    };
  }

  async login(email: string, password: string) {

    const user = await this.authRepository.findByEmail(email);

    if (!user) {
      throw new HttpError("Invalid credentials", 401);
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      throw new HttpError("Invalid credentials", 401);
    }

    // Generate JWT
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}
