import Button from '../Button'
import Icon from '../Icon'
import { Container } from './styles'
import { IOptionsBox } from './types'

const EditOptionsBox = ({
  type,
  handleEdit,
  handleDisable,
  handleSeeHistory,
}: IOptionsBox) => {
  const handleSeeHistoryFunction = () => {
    handleSeeHistory && handleSeeHistory()
  }

  return (
    <Container>
      {type === 'committee' && (
        <Button
          title="ver histórico de uma comissão"
          type="transparent"
          color="black"
          handleClick={handleSeeHistoryFunction}
        >
          <Icon type="history" /> Ver histórico
        </Button>
      )}
      <Button
        title={`editar um ${type === 'committee' ? 'órgão' : 'servidor'}`}
        type="transparent"
        color="black"
        handleClick={handleEdit}
      >
        <Icon type="edit" /> Editar {type === 'committee' ? 'Órgão' : 'Servidor'}
      </Button>
      <Button
        title={`desativar um ${type === 'committee' ? 'órgão' : 'servidor'}`}
        type="attention"
        noBorder
        handleClick={handleDisable}
      >
        <Icon type="disable" /> Desativar{' '}
        {type === 'committee' ? 'Órgão' : 'Servidor'}
      </Button>
    </Container>
  )
}
export default EditOptionsBox
