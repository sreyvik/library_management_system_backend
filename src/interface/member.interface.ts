export interface Member {
    id?: number;
    fullName: string;
    gender: string;
    phone: string;
    email: string;
    address: string;
}

export type MemberCreateInput = Omit<Member, "id">;
export type MemberUpdateInput = Partial<MemberCreateInput>;

export interface MemberRecord {
    id: number;
    fullName: string;
    gender: string;
    phone: string;
    email: string;
    address: string;
    createdAt: string;
}
