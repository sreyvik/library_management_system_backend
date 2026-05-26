"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMemberRecord = exports.updateMemberRecord = exports.createMemberRecord = exports.findMemberById = exports.findAllMembers = void 0;
const db_1 = __importDefault(require("../configs/db"));
const BASE_SELECT = `
    SELECT
        id,
        full_name AS fullName,
        gender,
        phone,
        email,
        address,
        created_at AS createdAt
    FROM members
`;
const mapCreatePayload = (member) => ({
    full_name: member.fullName,
    gender: member.gender,
    phone: member.phone,
    email: member.email,
    address: member.address
});
const mapUpdatePayload = (member) => {
    const payload = {};
    if (member.fullName !== undefined)
        payload.full_name = member.fullName;
    if (member.gender !== undefined)
        payload.gender = member.gender;
    if (member.phone !== undefined)
        payload.phone = member.phone;
    if (member.email !== undefined)
        payload.email = member.email;
    if (member.address !== undefined)
        payload.address = member.address;
    return payload;
};
const findAllMembers = () => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield db_1.default.query(`${BASE_SELECT} ORDER BY id DESC`);
    return rows;
});
exports.findAllMembers = findAllMembers;
const findMemberById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield db_1.default.query(`${BASE_SELECT} WHERE id = ? LIMIT 1`, [id]);
    const members = rows;
    return members.length > 0 ? members[0] : null;
});
exports.findMemberById = findMemberById;
const createMemberRecord = (member) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield db_1.default.query("INSERT INTO members SET ?", [mapCreatePayload(member)]);
    return result.insertId;
});
exports.createMemberRecord = createMemberRecord;
const updateMemberRecord = (id, member) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = mapUpdatePayload(member);
    if (Object.keys(payload).length === 0) {
        return false;
    }
    const [result] = yield db_1.default.query("UPDATE members SET ? WHERE id = ?", [payload, id]);
    return result.affectedRows > 0;
});
exports.updateMemberRecord = updateMemberRecord;
const deleteMemberRecord = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield db_1.default.query("DELETE FROM members WHERE id = ?", [id]);
    return result.affectedRows > 0;
});
exports.deleteMemberRecord = deleteMemberRecord;
