import {
    createMember,
    deleteMember,
    getMemberById,
    getMembers,
    updateMember
} from "../services/member.service";

const parseId = (value: string): number | null => {
    const parsed = Number.parseInt(value, 10);
    return Number.isNaN(parsed) ? null : parsed;
};

export const listMembers = async (req: any, res: any) => {
    try {
        const members = await getMembers();
        return res.status(200).json({ success: true, data: members });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const getMember = async (req: any, res: any) => {
    try {
        const id = parseId(req.params.id);

        if (id === null) {
            return res.status(400).json({ success: false, message: "invalid member id" });
        }

        const member = await getMemberById(id);

        if (!member) {
            return res.status(404).json({ success: false, message: "member not found" });
        }

        return res.status(200).json({ success: true, data: member });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const addMember = async (req: any, res: any) => {
    try {
        const member = await createMember(req.body ?? {});
        return res.status(201).json({
            success: true,
            message: "member created successfully",
            data: member
        });
    } catch (error: any) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

export const editMember = async (req: any, res: any) => {
    try {
        const id = parseId(req.params.id);

        if (id === null) {
            return res.status(400).json({ success: false, message: "invalid member id" });
        }

        const member = await updateMember(id, req.body ?? {});

        if (!member) {
            return res.status(404).json({ success: false, message: "member not found" });
        }

        return res.status(200).json({
            success: true,
            message: "member updated successfully",
            data: member
        });
    } catch (error: any) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

export const putMember = editMember;

export const removeMember = async (req: any, res: any) => {
    try {
        const id = parseId(req.params.id);

        if (id === null) {
            return res.status(400).json({ success: false, message: "invalid member id" });
        }

        const deleted = await deleteMember(id);

        if (!deleted) {
            return res.status(404).json({ success: false, message: "member not found" });
        }

        return res.status(200).json({
            success: true,
            message: "member deleted successfully"
        });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
