import TableRow from './TableRow'
import { IDetailsTable } from './types'

const DetailsTable = ({
  content,
  editMode,
  sizes,
  updateTable,
}: IDetailsTable) => {
  const handleChange = (updatedInfo: any, index: number, id: number) => {
    let newTable = [...content]
    newTable = newTable.map((item) => {
      if (item.id === id) {
        let content = [...item.content]
        content[index] = updatedInfo
        return { id: item.id, content: [...content] }
      }
      return item
    })
    updateTable && updateTable(newTable)
  }

  return (
    <>
      {content.map((item: any, index: number) => (
        <TableRow
          id={item.id}
          editMode={editMode}
          onChange={(updatedInfo, index, id) =>
            handleChange(updatedInfo, index, id)
          }
          data={item}
          sizes={sizes}
          key={`table-row-${index}`}
        />
      ))}
    </>
  )
}
export default DetailsTable