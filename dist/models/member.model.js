import db from "../configs/db.js";
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
export const findAllMembers = async () => {
    const [rows] = await db.query(`${BASE_SELECT} ORDER BY id DESC`);
    return rows;
};
export const findMemberById = async (id) => {
    const [rows] = await db.query(`${BASE_SELECT} WHERE id = ? LIMIT 1`, [id]);
    const members = rows;
    return members.length > 0 ? members[0] : null;
};
export const createMemberRecord = async (member) => {
    const [result] = await db.query("INSERT INTO members SET ?", [mapCreatePayload(member)]);
    return result.insertId;
};
export const updateMemberRecord = async (id, member) => {
    const payload = mapUpdatePayload(member);
    if (Object.keys(payload).length === 0) {
        return false;
    }
    const [result] = await db.query("UPDATE members SET ? WHERE id = ?", [payload, id]);
    return result.affectedRows > 0;
};
export const deleteMemberRecord = async (id) => {
    const [result] = await db.query("DELETE FROM members WHERE id = ?", [id]);
    return result.affectedRows > 0;
};
