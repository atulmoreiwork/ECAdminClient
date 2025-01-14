
export interface IUsers {
    adminUserId: number;
    loginName: string;
    password: string;
    firstName: string;
    lastName: string;
    collegeId: string;
    userType: string;
    roleId: string;
    departmentName: string;
    deptSectionName: string;
    roleName: string;
    groupId: string;
    row: string;
    totalRowCount: string;
    flag: number;
}
export interface IOrganizations 
{
    groupId: number;
    groupName: string;
    collegeId: number;
    showNewUserTab: string;
    showAssessmentsTab: string;
    masterCourseId: number;
    assessmentTabName: string;
    organizationType: string;
    organizationId: number;
}

export interface IFacilities
{
  collegeId: number;
  collegeName: string;  
}

export interface IRoleMaster {
    roleId: number;
    roleName: string;
    userCount: number;
}

export interface IUserRoles
{
    groupId: number;
    collegeId:number;
    roleId: number;
    roleName: string;
    userCount: number;
    permissions: IPermissions[];
}

export interface IPermissions
{
    adminDashBoardId: number;
    name: string;
    alias: string;
    isSelected: boolean;
}

export interface  permission {
    adminDashBoardId: number;
    name: string;  
    alias: string; 
    isSelected: boolean
}