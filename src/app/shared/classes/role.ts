
export interface Role {
  roleId?: number;
  role: string;
  permissionIds: number[];
  createdBy?: string;
}