import Icon from '../Icon'
import { INavBar } from './types'
import { ContainerS, LabelS, LinkContainerS, LinkS } from './styles'
import { useState, useEffect, useContext } from 'react'
import { EntityContext } from '../../context/CommitteeContext'
import { getEmptyEntity } from '../../utils/EmptyEntity'
import Paths from '../../routes/Paths'

const NavBar = ({ data }: INavBar) => {
  const [tabSelected, setTabSelected] = useState(Paths.COMMITTEES)
  const { setAction, setCurrentEntity } = useContext(EntityContext)

  const handleClick = (pageId: string) => {
    setAction(null)
    setCurrentEntity(getEmptyEntity())
    setTabSelected(pageId)
  }

  return (
    <ContainerS>
      <LinkContainerS>
        {data.map((page) => (
            <LinkS
              to={page.href}
              selected={tabSelected === page.id}
              key={`${page.icon}-link`}
              onClick={() => handleClick(page.id)}
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
