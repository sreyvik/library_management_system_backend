"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const db_1 = __importDefault(require("../configs/db"));
const base_repository_1 = require("./base.repository");
class AuthRepository extends base_repository_1.BaseRepository {
    async create(user) {
        const roleName = user.role ?? "Librarian";
        const [roleRows] = await db_1.default.execute("SELECT id FROM roles WHERE name=? LIMIT 1", [roleName]);
        const roleId = roleRows?.[0]?.id;
        if (!roleId) {
            throw new Error(`Role '${roleName}' not found`);
        }
        const query = `
      INSERT INTO users(role_id,name,email,password)
      VALUES(?,?,?,?)
    `;
        const [result] = await db_1.default.execute(query, [
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
    async findById(id) {
        const [rows] = await db_1.default.execute(`
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
      `, [id]);
        return rows?.[0];
    }
    async findByEmail(email) {
        const [rows] = await db_1.default.execute(`
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
      `, [email]);
        return rows[0];
    }
}
exports.AuthRepository = AuthRepository;
