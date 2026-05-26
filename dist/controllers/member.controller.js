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
exports.removeMember = exports.putMember = exports.editMember = exports.addMember = exports.getMember = exports.listMembers = void 0;
const member_service_1 = require("../services/member.service");
const parseId = (value) => {
    const parsed = Number.parseInt(value, 10);
    return Number.isNaN(parsed) ? null : parsed;
};
const listMembers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const members = yield (0, member_service_1.getMembers)();
        return res.status(200).json({ success: true, data: members });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});
exports.listMembers = listMembers;
const getMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseId(req.params.id);
        if (id === null) {
            return res.status(400).json({ success: false, message: "invalid member id" });
        }
        const member = yield (0, member_service_1.getMemberById)(id);
        if (!member) {
            return res.status(404).json({ success: false, message: "member not found" });
        }
        return res.status(200).json({ success: true, data: member });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});
exports.getMember = getMember;
const addMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const member = yield (0, member_service_1.createMember)((_a = req.body) !== null && _a !== void 0 ? _a : {});
        return res.status(201).json({
            success: true,
            message: "member created successfully",
            data: member
        });
    }
    catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
});
exports.addMember = addMember;
const editMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = parseId(req.params.id);
        if (id === null) {
            return res.status(400).json({ success: false, message: "invalid member id" });
        }
        const member = yield (0, member_service_1.updateMember)(id, (_a = req.body) !== null && _a !== void 0 ? _a : {});
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
});
exports.editMember = editMember;
exports.putMember = exports.editMember;
const removeMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseId(req.params.id);
        if (id === null) {
            return res.status(400).json({ success: false, message: "invalid member id" });
        }
        const deleted = yield (0, member_service_1.deleteMember)(id);
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
});
exports.removeMember = removeMember;
