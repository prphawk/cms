import { useContext } from 'react'
import { EntityContext } from '../../context/CommitteeContext'
import Edit from './Edit'
import Visualization from './Visualization'

const EmployeesView = () => {
  const { action } = useContext(EntityContext)

  return <>{action === 'edit' ? <Edit /> : <Visualization />}</>
}
export default EmployeesView
