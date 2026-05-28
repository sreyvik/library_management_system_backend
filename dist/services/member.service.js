"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMember = exports.updateMember = exports.createMember = exports.getMemberById = exports.getMembers = void 0;
const member_model_1 = require("../models/member.model");
const validateMember = (member = {}) => {
    if (!member.fullName || member.fullName.trim() === "") {
        throw new Error("fullName is required");
    }
    if (!member.gender || member.gender.trim() === "") {
        throw new Error("gender is required");
    }
    if (!member.phone || member.phone.trim() === "") {
        throw new Error("phone is required");
    }
    if (!member.email || member.email.trim() === "") {
        throw new Error("email is required");
    }
    if (!member.address || member.address.trim() === "") {
        throw new Error("address is required");
    }
};
const getMembers = async () => {
    return (0, member_model_1.findAllMembers)();
};
exports.getMembers = getMembers;
const getMemberById = async (id) => {
    return (0, member_model_1.findMemberById)(id);
};
exports.getMemberById = getMemberById;
const createMember = async (member) => {
    validateMember(member);
    const newId = await (0, member_model_1.createMemberRecord)(member);
    const createdMember = await (0, member_model_1.findMemberById)(newId);
    if (!createdMember) {
        throw new Error("member was created but could not be retrieved");
    }
    return createdMember;
};
exports.createMember = createMember;
const updateMember = async (id, member) => {
    const incomingMember = member ?? {};
    const exists = await (0, member_model_1.findMemberById)(id);
    if (!exists) {
        return null;
    }
    if (incomingMember.fullName !== undefined ||
        incomingMember.gender !== undefined ||
        incomingMember.phone !== undefined ||
        incomingMember.email !== undefined ||
        incomingMember.address !== undefined) {
        validateMember({
            fullName: incomingMember.fullName ?? exists.fullName,
            gender: incomingMember.gender ?? exists.gender,
            phone: incomingMember.phone ?? exists.phone,
            email: incomingMember.email ?? exists.email,
            address: incomingMember.address ?? exists.address
        });
    }
    const updated = await (0, member_model_1.updateMemberRecord)(id, incomingMember);
    if (!updated) {
        return exists;
    }
    return (0, member_model_1.findMemberById)(id);
};
exports.updateMember = updateMember;
const deleteMember = async (id) => {
    return (0, member_model_1.deleteMemberRecord)(id);
};
exports.deleteMember = deleteMember;
