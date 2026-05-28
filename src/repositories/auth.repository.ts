import db from "../configs/db";
import { IUser } from "../interface/user.interface";
import { BaseRepository } from "./base.repository";

export class AuthRepository extends BaseRepository<IUser> {

  async create(user: IUser): Promise<number> {
    const roleName = user.role ?? "Librarian";

    const [roleRows]: any = await db.execute(
      "SELECT id FROM roles WHERE name=? LIMIT 1",
      [roleName]
    );

    const roleId = roleRows?.[0]?.id;
    if (!roleId) {
      throw new Error(`Role '${roleName}' not found`);
    }

    const query = `
      INSERT INTO users(role_id,name,email,password)
      VALUES(?,?,?,?)
    `;

    const [result]: any = await db.execute(query, [
      roleId,
      user.name,
      user.email,
      user.password,
    ]);

    const insertId = result?.insertId;
    if (!insertId) {
      throw new Error("Failed to create user");
    }

    return insertId;
  }

  async findById(id: number): Promise<any> {
    const [rows] = await db.execute(
      `
        SELECT
          u.id,
          u.name,
          u.email,
          u.password,
          r.name AS role
        FROM users u
        JOIN roles r ON u.role_id = r.id
        WHERE u.id=?
        LIMIT 1
      `,
      [id]
    );

    return (rows as any)?.[0];
  }

  async findByEmail(email: string): Promise<any> {
    const [rows]: any = await db.execute(
      `
        SELECT
          u.id,
          u.name,
          u.email,
          u.password,
          r.name AS role
        FROM users u
        JOIN roles r ON u.role_id = r.id
        WHERE u.email=?
        LIMIT 1
      `,
      [email]
    );

    return rows[0];
  }
}
