"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeMember = exports.putMember = exports.editMember = exports.addMember = exports.getMember = exports.listMembers = void 0;
const member_service_1 = require("../services/member.service");
const validation_1 = require("../utils/validation");
const response_1 = require("../utils/response");
const listMembers = async (req, res) => {
    try {
        const members = await (0, member_service_1.getMembers)();
        return (0, response_1.sendSuccess)(res, members, "Members fetched successfully");
    }
    catch (error) {
        return (0, response_1.sendError)(res, error.message);
    }
};
exports.listMembers = listMembers;
const getMember = async (req, res) => {
    try {
        const id = (0, validation_1.parseId)(req.params.id);
        if (id === null) {
            return (0, response_1.sendError)(res, "invalid member id", 400);
        }
        const member = await (0, member_service_1.getMemberById)(id);
        if (!member) {
            return (0, response_1.sendError)(res, "member not found", 404);
        }
        return (0, response_1.sendSuccess)(res, member, "Member fetched successfully");
    }
    catch (error) {
        return (0, response_1.sendError)(res, error.message);
    }
};
exports.getMember = getMember;
const addMember = async (req, res) => {
    try {
        const member = await (0, member_service_1.createMember)(req.body ?? {});
        return (0, response_1.sendSuccess)(res, member, "member created successfully", 201);
    }
    catch (error) {
        return (0, response_1.sendError)(res, error.message, 400);
    }
};
exports.addMember = addMember;
const editMember = async (req, res) => {
    try {
        const id = (0, validation_1.parseId)(req.params.id);
        if (id === null) {
            return (0, response_1.sendError)(res, "invalid member id", 400);
        }
        const member = await (0, member_service_1.updateMember)(id, req.body ?? {});
        if (!member) {
            return (0, response_1.sendError)(res, "member not found", 404);
        }
        return (0, response_1.sendSuccess)(res, member, "member updated successfully");
    }
    catch (error) {
        return (0, response_1.sendError)(res, error.message, 400);
    }
};
exports.editMember = editMember;
exports.putMember = exports.editMember;
const removeMember = async (req, res) => {
    try {
        const id = (0, validation_1.parseId)(req.params.id);
        if (id === null) {
            return (0, response_1.sendError)(res, "invalid member id", 400);
        }
        const deleted = await (0, member_service_1.deleteMember)(id);
        if (!deleted) {
            return (0, response_1.sendError)(res, "member not found", 404);
        }
        return (0, response_1.sendSuccess)(res, undefined, "member deleted successfully");
    }
    catch (error) {
        return (0, response_1.sendError)(res, error.message);
    }
};
exports.removeMember = removeMember;
