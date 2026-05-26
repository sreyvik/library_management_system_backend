import {
    createMemberRecord,
    deleteMemberRecord,
    findAllMembers,
    findMemberById,
    updateMemberRecord
} from "../models/member.model";
import { MemberCreateInput, MemberRecord, MemberUpdateInput } from "../interface/member.interface";

const validateMember = (member: Partial<MemberCreateInput> = {}) => {
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

export const getMembers = async (): Promise<MemberRecord[]> => {
    return findAllMembers();
};

export const getMemberById = async (id: number): Promise<MemberRecord | null> => {
    return findMemberById(id);
};

export const createMember = async (member: MemberCreateInput): Promise<MemberRecord> => {
    validateMember(member);

    const newId = await createMemberRecord(member);
    const createdMember = await findMemberById(newId);

    if (!createdMember) {
        throw new Error("member was created but could not be retrieved");
    }

    return createdMember;
};

export const updateMember = async (id: number, member: MemberUpdateInput): Promise<MemberRecord | null> => {
    const incomingMember = member ?? {};
    const exists = await findMemberById(id);

    if (!exists) {
        return null;
    }

    if (
        incomingMember.fullName !== undefined ||
        incomingMember.gender !== undefined ||
        incomingMember.phone !== undefined ||
        incomingMember.email !== undefined ||
        incomingMember.address !== undefined
    ) {
        validateMember({
            fullName: incomingMember.fullName ?? exists.fullName,
            gender: incomingMember.gender ?? exists.gender,
            phone: incomingMember.phone ?? exists.phone,
            email: incomingMember.email ?? exists.email,
            address: incomingMember.address ?? exists.address
        });
    }

    const updated = await updateMemberRecord(id, incomingMember);

    if (!updated) {
        return exists;
    }

    return findMemberById(id);
};

export const deleteMember = async (id: number): Promise<boolean> => {
    return deleteMemberRecord(id);
};
