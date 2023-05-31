export interface employeeGetOneMemberDetailsType {
    id: number,
    name: string,
    is_active: boolean,
    committees: employeeGetOneMemberDetailsType_committeeDetails[]
}

export type employeeGetOneMemberDetailsType_committeeDetails = {
    employee_id: number,
    committee_id: number,
    role: string,
    begin_date?: string,
    term: number,
    observations?: string,
    is_active: boolean
}

export interface committeeGetAllAnswerEntry_member {
    member:{
        id: number,
        name: string,
        is_active: boolean
    } 
}

export interface employeePostDTO {
    data: {
        name: string;
        is_active: boolean;
    }
}

export interface employeeGetOptionsEntry {
    id: number,
    name: string
}

export interface committeeGetAllAnswerEntry {
    id: number,
    bond: string,
    name: string, 
    begin_date?: string,
    end_date?: string,
    term: number,
    ordinance: string,
    observations?: string,
    members: committeeGetAllAnswerEntry_member[]
}

export interface committeeGetOneAnswer {
    id: number
    bond: string
    name: string
    begin_date?: Date
    end_date?: Date 
    term?: number 
    ordinance?: string 
    observations?: string
    is_active: boolean
}

export type employeeGetAllAnswerEntry_memberDetails = {
    role: string,
    begin_date?: string,
    observations?: string,
    committee: {
        id: number,
        name: string
    }
}

export interface employeeGetAllAnswerEntry {
    id: number,
    name: string,
    committees: {
        active: employeeGetAllAnswerEntry_memberDetails[],
        inactive: employeeGetAllAnswerEntry_memberDetails[]
    }
}

export interface membership_PatchDTO{
    role: string;
    begin_date?: Date;
    term: number;
    observations?: string;
    is_active: boolean;
}

export interface committeePostDTO{
    bond: string,
    name: string,
    is_active?: boolean,
    begin_date?: Date,
    end_date?: Date,
    term?: number,          // TODO: Limit possible term values right in the interface
    ordinance?: string,
    observations?: string;
}

export interface committeePatchDTO extends committeePostDTO{}