import {
  committeeContentType,
  committeeParticipation,
  committeeType,
  memberContentType,
  memberParticipation,
  memberType,
} from '../types/contentTypes'
import {
  employeeGetOneMemberDetailsType_committeeDetails,
  committeeGetAllAnswerEntry,
  employeeGetOneMemberDetailsType,
  employeeGetAllAnswerEntry_memberDetails,
  employeeGetAllAnswerEntry,
  membership_PatchDTO,
} from '../types/requestAnswerTypes'

function formatDate(date: string) {
  let formated_date: string = ''

  formated_date =
    date.substring(8, 10) +
    '/' +
    date.substring(5, 7) +
    '/' +
    date.substring(0, 4)

  return formated_date
}

export function formatMember(member_list: employeeGetAllAnswerEntry[]) {
  let formated_member_info: memberType[] = []

  member_list.forEach((member: employeeGetAllAnswerEntry) => {
    let number_of_comissions = member.committees.active.length
    formated_member_info.push({
      id: member.id,
      content: [member.name, number_of_comissions],
      committees: formatMemberCommitteeDetails(
        member.committees.active,
        member.committees.inactive
      ),
    })
  })

  return formated_member_info
}

function formatMemberCommitteeDetails(
  active: employeeGetAllAnswerEntry_memberDetails[],
  history: employeeGetAllAnswerEntry_memberDetails[]
) {
  let active_participations: memberParticipation[] = []
  let inactive_participations: memberParticipation[] = []

  active.forEach((detail: employeeGetAllAnswerEntry_memberDetails) => {
    active_participations.push({
      id: detail.committee.id,
      content: [
        detail.committee.name,
        detail.role,
        detail.begin_date ? formatDate(detail.begin_date) : '-',
        detail.observations ? detail.observations : '-',
      ],
    })
  })

  history.forEach((detail: employeeGetAllAnswerEntry_memberDetails) => {
    inactive_participations.push({
      id: detail.committee.id,
      content: [
        detail.committee.name,
        detail.role,
        detail.begin_date ? formatDate(detail.begin_date) : '-',
        detail.observations ? detail.observations : '-',
      ],
    })
  })
  return {
    active_participations: active_participations,
    history: inactive_participations,
  }
}

export function formatMemberOnCommitteeDetails(
  member_details: employeeGetOneMemberDetailsType,
  memberOnCommittee_details:
    | employeeGetOneMemberDetailsType_committeeDetails
    | undefined
) {
  if (memberOnCommittee_details === undefined) {
    return undefined
  }
  let memberOnCommittee_details_c = memberOnCommittee_details as employeeGetOneMemberDetailsType_committeeDetails
  return {
    id: member_details.id,
    content: [
      memberOnCommittee_details.role,
      member_details.name,
      memberOnCommittee_details.begin_date ? formatDate(memberOnCommittee_details.begin_date) : '-',
      memberOnCommittee_details.term + 'º',
      memberOnCommittee_details.observations ? memberOnCommittee_details.observations : '-',
    ],
  } as committeeParticipation
}

export function formatCommittee(
  committee_list: committeeGetAllAnswerEntry[],
  committee_details_list: committeeParticipation[][]
) {
  let formated_committee_info: committeeType[] = []
  let i = 0

  committee_list.forEach((committee: committeeGetAllAnswerEntry) => {
    let formated_date_duration: string = '-'
    let committee_details: committeeParticipation[] = []

    if (committee.begin_date && committee.end_date) {
      formated_date_duration =
        formatDate(committee.begin_date) +
        ' a ' +
        formatDate(committee.end_date)
    }
    else if (committee.begin_date) {
      formated_date_duration = 
        formatDate(committee.begin_date) +
        ` a ` +
        `-`
    }
    else if (committee.end_date) {
      formated_date_duration = `- a ${formatDate(committee.end_date)}`
    }

    formated_committee_info.push({
      id: committee.id,
      content: [
        committee.name,
        committee.bond,
        committee.ordinance,
        formated_date_duration,
        committee.term !== null ? committee.term + '°' : "",
      ],
      participation_details: committee_details_list[i],
    })

    i = i + 1
  })

  return formated_committee_info
}

export function formatDate_memberOnCommittee_PatchDTO (
  unformated_date: string
) {

  if(unformated_date.length !== 10) {
    return null
  }

  const formated_date_string = 
    unformated_date.substring(6, 10) +
    '-' +
    unformated_date.substring(3, 5) +
    '-' +
    unformated_date.substring(0, 2);
  const formated_date = new Date(formated_date_string);
  return formated_date
}

export function formatMemberOnCommittee_PatchDTO(
  memberOnCommitteeContent: committeeContentType | memberParticipation,
  opType: "committee_edit" | "member_edit"
) {
  let formated_info = [] as any;
  
  if(opType === "committee_edit") {
    memberOnCommitteeContent = memberOnCommitteeContent as committeeContentType
    formated_info = {
      role: memberOnCommitteeContent[0],
      begin_date: formatDate_memberOnCommittee_PatchDTO(memberOnCommitteeContent[2]),
      term: parseInt(memberOnCommitteeContent[3][0]),
      observations: (memberOnCommitteeContent[4] !== "")? memberOnCommitteeContent[4] : null,
      is_active: true
    } as membership_PatchDTO
  }
  else {
    memberOnCommitteeContent = memberOnCommitteeContent as memberParticipation
    formated_info = {
      role: memberOnCommitteeContent.content[1],
      observations: (memberOnCommitteeContent.content[3] !== "")? memberOnCommitteeContent.content[3] : null,
      is_active: true
    } as membership_PatchDTO
  }

  return formated_info
}
