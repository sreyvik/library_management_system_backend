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
const getMembers = () => __awaiter(void 0, void 0, void 0, function* () {
    return (0, member_model_1.findAllMembers)();
});
exports.getMembers = getMembers;
const getMemberById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, member_model_1.findMemberById)(id);
});
exports.getMemberById = getMemberById;
const createMember = (member) => __awaiter(void 0, void 0, void 0, function* () {
    validateMember(member);
    const newId = yield (0, member_model_1.createMemberRecord)(member);
    const createdMember = yield (0, member_model_1.findMemberById)(newId);
    if (!createdMember) {
        throw new Error("member was created but could not be retrieved");
    }
    return createdMember;
});
exports.createMember = createMember;
const updateMember = (id, member) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const incomingMember = member !== null && member !== void 0 ? member : {};
    const exists = yield (0, member_model_1.findMemberById)(id);
    if (!exists) {
        return null;
    }
    if (incomingMember.fullName !== undefined ||
        incomingMember.gender !== undefined ||
        incomingMember.phone !== undefined ||
        incomingMember.email !== undefined ||
        incomingMember.address !== undefined) {
        validateMember({
            fullName: (_a = incomingMember.fullName) !== null && _a !== void 0 ? _a : exists.fullName,
            gender: (_b = incomingMember.gender) !== null && _b !== void 0 ? _b : exists.gender,
            phone: (_c = incomingMember.phone) !== null && _c !== void 0 ? _c : exists.phone,
            email: (_d = incomingMember.email) !== null && _d !== void 0 ? _d : exists.email,
            address: (_e = incomingMember.address) !== null && _e !== void 0 ? _e : exists.address
        });
    }
    const updated = yield (0, member_model_1.updateMemberRecord)(id, incomingMember);
    if (!updated) {
        return exists;
    }
    return (0, member_model_1.findMemberById)(id);
});
exports.updateMember = updateMember;
const deleteMember = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, member_model_1.deleteMemberRecord)(id);
});
exports.deleteMember = deleteMember;
