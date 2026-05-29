import { Request, Response } from "express";
import {
    createMember,
    deleteMember,
    getMemberById,
    getMembers,
    updateMember
} from "../services/member.service";
import { parseId } from "../utils/validation";
import { sendSuccess, sendError } from "../utils/response";

export const listMembers = async (req: Request, res: Response): Promise<Response> => {
    try {
        const members = await getMembers();
        return sendSuccess(res, members, "Members fetched successfully");
    } catch (error: any) {
        return sendError(res, error.message);
    }
};

export const getMember = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseId(req.params.id);

        if (id === null) {
            return sendError(res, "invalid member id", 400);
        }

        const member = await getMemberById(id);

        if (!member) {
            return sendError(res, "member not found", 404);
        }

        return sendSuccess(res, member, "Member fetched successfully");
    } catch (error: any) {
        return sendError(res, error.message);
    }
};

export const addMember = async (req: Request, res: Response): Promise<Response> => {
    try {
        const member = await createMember(req.body ?? {});
        return sendSuccess(res, member, "member created successfully", 201);
    } catch (error: any) {
        return sendError(res, error.message, 400);
    }
};

export const editMember = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseId(req.params.id);

        if (id === null) {
            return sendError(res, "invalid member id", 400);
        }

        const member = await updateMember(id, req.body ?? {});

        if (!member) {
            return sendError(res, "member not found", 404);
        }

        return sendSuccess(res, member, "member updated successfully");
    } catch (error: any) {
        return sendError(res, error.message, 400);
    }
};

export const putMember = editMember;

export const removeMember = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseId(req.params.id);

        if (id === null) {
            return sendError(res, "invalid member id", 400);
        }

        const deleted = await deleteMember(id);

        if (!deleted) {
            return sendError(res, "member not found", 404);
        }

        return sendSuccess(res, undefined, "member deleted successfully");
    } catch (error: any) {
        return sendError(res, error.message);
    }
};
