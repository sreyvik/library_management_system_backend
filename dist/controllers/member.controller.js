"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeMember = exports.putMember = exports.editMember = exports.addMember = exports.getMember = exports.listMembers = void 0;
const member_service_1 = require("../services/member.service");
const parseId = (value) => {
    const parsed = Number.parseInt(value, 10);
    return Number.isNaN(parsed) ? null : parsed;
};
const listMembers = async (req, res) => {
    try {
        const members = await (0, member_service_1.getMembers)();
        return res.status(200).json({ success: true, data: members });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.listMembers = listMembers;
const getMember = async (req, res) => {
    try {
        const id = parseId(req.params.id);
        if (id === null) {
            return res.status(400).json({ success: false, message: "invalid member id" });
        }
        const member = await (0, member_service_1.getMemberById)(id);
        if (!member) {
            return res.status(404).json({ success: false, message: "member not found" });
        }
        return res.status(200).json({ success: true, data: member });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.getMember = getMember;
const addMember = async (req, res) => {
    try {
        const member = await (0, member_service_1.createMember)(req.body ?? {});
        return res.status(201).json({
            success: true,
            message: "member created successfully",
            data: member
        });
    }
    catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};
exports.addMember = addMember;
const editMember = async (req, res) => {
    try {
        const id = parseId(req.params.id);
        if (id === null) {
            return res.status(400).json({ success: false, message: "invalid member id" });
        }
        const member = await (0, member_service_1.updateMember)(id, req.body ?? {});
        if (!member) {
            return res.status(404).json({ success: false, message: "member not found" });
        }
        return res.status(200).json({
            success: true,
            message: "member updated successfully",
            data: member
        });
    }
    catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};
exports.editMember = editMember;
exports.putMember = exports.editMember;
const removeMember = async (req, res) => {
    try {
        const id = parseId(req.params.id);
        if (id === null) {
            return res.status(400).json({ success: false, message: "invalid member id" });
        }
        const deleted = await (0, member_service_1.deleteMember)(id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: "member not found" });
        }
        return res.status(200).json({
            success: true,
            message: "member deleted successfully"
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.removeMember = removeMember;
