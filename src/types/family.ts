export interface Family {
  id: string;
  name: string;
  description?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  members: FamilyMember[];
}

export interface FamilyMember {
  userId: string;
  familyId: string;
  role: 'admin' | 'member';
  joinedAt: string;
  status: 'active' | 'invited' | 'inactive';
}