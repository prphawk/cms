import { useContext } from 'react'
import { EntityContext } from '../../context/CommitteeContext'
import Edit from './Edit'
import Visualization from './Visualization'

export const EmployeesView = () => {
  const { action } = useContext(EntityContext)

  return <>{action === 'edit' ? <Edit /> : <Visualization />}</>
}