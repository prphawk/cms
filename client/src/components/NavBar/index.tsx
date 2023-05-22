import Icon from '../Icon'
import { INavBar, TabType } from './types'
import { ContainerS, LabelS, LinkContainerS, LinkS } from './styles'
import { useState, useEffect, useContext } from 'react'
import { EntityContext } from '../../context/CommitteeContext'
import { getEmptyEntity } from '../../utils/EmptyEntity'

const NavBar = ({ data }: INavBar) => {
  const [tabSelected, setTabSelected] = useState<TabType>('committee')
  const { setAction, setCurrentEntity } = useContext(EntityContext)

  const handleClick = () => {
    setAction(null)
    setCurrentEntity(getEmptyEntity())
    
  }

  useEffect(() => {
    let path = window.location.pathname
    const currentTab = path === '/' ? 'committee' : path.slice(1)
    setTabSelected(currentTab as TabType)
  }, [tabSelected])

  return (
    <ContainerS>
      <LinkContainerS>
        {data.map((page) => (
            <LinkS
              to={page.href}
              selected={tabSelected === page.id}
              key={`${page.icon}-link`}
              onClick={() => {handleClick(); console.log(tabSelected, page.id)}}
            >
              <Icon type={page.icon} />
              <LabelS>{page.label}</LabelS>
            </LinkS>
        ))}
      </LinkContainerS>
    </ContainerS>
  )
}
export default NavBar
