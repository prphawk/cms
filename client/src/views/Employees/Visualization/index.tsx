import { useContext, useEffect, useRef, useState } from 'react'
import ExportableTable from '../../../components/ExportableTable'
import HeaderPrimary from '../../../components/Header/HeaderPrimary'
import Popup from '../../../components/Popup'
import Table from '../../../components/Table'
import Title from '../../../components/Title'
import { EntityContext } from '../../../context/CommitteeContext'
import { FontBold, MainContainer, NoContentMessage } from '../../../styles/commonStyles'
import { createPDF } from '../../../utils/CreatePDF'
import { getEmptyEntity } from '../../../utils/EmptyEntity'
import RequestManager from '../../../utils/RequestManager'
import { formatMember } from '../../../utils/FormatUtils'
import { memberType } from '../../../types/contentTypes'
import { employeeGetAllAnswerEntry } from '../../../types/requestAnswerTypes'
import { MemberTableHeader } from '../../../data/employeesHeader'
import { delay } from '../../../utils/TimeUtils'

const Visualization = () => {
  const [displayPopup, setDisplayPopup] = useState(false)
  const [searchtext, setSearchText] = useState('')
  const [memberContent, setMemberContent] = useState<memberType[]>([])
  const [displayedContent, setDisplayedContent] = useState<memberType[]>([])

  const [exportPDF, setExportPDF] = useState(false)
  const table = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (exportPDF) {
      try {
        createPDF(table, 'members_on_committees')
      } catch (e) {
        console.log(e)
      } finally {
        setExportPDF(false)
      }
    }
  }, [exportPDF])

  const {
    action,
    setAction,
    currentEntity: currentMember,
    setCurrentEntity: setCurrentMember,
  } = useContext(EntityContext)

  const closePopUp = () => {
    setDisplayPopup(false)
    setAction(null)
    setCurrentMember({ ...getEmptyEntity(), content: undefined })
  }

  const handleDeactivateMember = () => {
    RequestManager.deactivateMember(currentMember)
    closePopUp()

    let deactivated_member_index = memberContent.findIndex((obj:any ) => {
      return obj.id === currentMember.id
    })

    memberContent.splice(deactivated_member_index, 1)

    setMemberContent(memberContent)
    setDisplayedContent(memberContent)
  }

  useEffect(() => {
    if (action === 'deactivate') {
      setDisplayPopup(true)
    }
  }, [action])

  useEffect(() => {
    const request_answer = async () => {
      await delay(150)
      let member_content_raw: employeeGetAllAnswerEntry[] =
        await RequestManager.getAllMembers()
      let member_content: memberType[] = []

      if (member_content_raw) {
        member_content = formatMember(member_content_raw)
      }

      setMemberContent(member_content)
      setDisplayedContent(member_content)
    }
    request_answer()

    if (action === 'search') {
      setSearchText(currentMember.name)
    }

    console.log("request")
  }, [])

  useEffect(() => {
    if (searchtext.length > 0) {
      let searchTextLowerCase = searchtext.toLowerCase()
      let newMembers = [...memberContent]
      newMembers = newMembers.filter((item) => {
        let hasContentRelated = false
        let memberNameLowerCase = item.content[0].toLowerCase()
        if (memberNameLowerCase.includes(searchTextLowerCase)) {
          return true
        }

        item.committees.active_participations.forEach((participation) => {
          participation.content.forEach((value) => {
            console.log(`checando: ${value}`)
            let itemLowerCase = value.toLowerCase()
            if (itemLowerCase.includes(searchTextLowerCase)) {
              hasContentRelated = true
            }
          })
        })

        item.committees.history.forEach((participation) => {
          participation.content.forEach((value) => {
            let itemLowerCase = value.toLowerCase()
            if (itemLowerCase.includes(searchTextLowerCase)) {
              hasContentRelated = true
            }
          })
        })
        return hasContentRelated
      })
      setDisplayedContent(newMembers)
    } else {
      setDisplayedContent(memberContent)
    }
  }, [searchtext, memberContent])

  return (
    <>
      {exportPDF ? (
        <div ref={table}>
          <Title type="secondary">Servidores</Title>
          <ExportableTable type={'members'} content={displayedContent} />
        </div>
      ) : (
        <>
          {displayPopup && (
            <Popup
              title={'Desativar Servidor'}
              action={'Desativar Servidor'}
              actionType={'important'}
              handleActionClick={handleDeactivateMember}
              handleCancelClick={closePopUp}
            >
              Você tem certeza que deseja desativar{' '}
              <FontBold>{currentMember.name}</FontBold>? Essa ação não pode ser
              revertida
            </Popup>
          )}
          <MainContainer displayingPopup={displayPopup}>
            <HeaderPrimary
              headerTitle="Servidores"
              searchPlaceholder="Pesquise pelo nome do servidor..."
              searchText={searchtext}
              setSearchText={(input) => setSearchText(input)}
              handleExport={(type) => {
                type && setExportPDF(true)
              }}
            />
            {displayedContent.length > 0 ? (
              <Table
                tableInfo={MemberTableHeader}
                type={'members'}
                content={displayedContent}
              />
            ) : (
              <NoContentMessage>
                Não há membros ativos no momento
              </NoContentMessage>
            )}
          </MainContainer>
        </>
      )}
    </>
  )
}
export default Visualization
