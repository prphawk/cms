import { useContext, useState } from "react"
import Button from "../../../components/Button"
import Dropdown from "../../../components/Input/Dropdown"
import TextInput from "../../../components/Input/TextInput"
import Popup from "../../../components/Popup"
import Title from "../../../components/Title"
import { EntityContext } from "../../../context/CommitteeContext"
import { MainContainer } from "../../../styles/commonStyles"
import { getEmptyEntity } from "../../../utils/EmptyEntity"
import RequestManager from "../../../utils/RequestManager"
import { employee_list_mock } from "../../../_mock/memberList"
import { ButtonContainer } from "./styles"
import { memberGetOptionsEntry } from "../../../types/requestAnswerTypes"

const OptionsMenu = () => {
	const { setAction } = useContext(EntityContext)
	const [displayPopup, setDisplayPopup] = useState<"add" | "deactivate" | null>(null)
	const [activeMemberSelected, setActiveMemberSelected] = useState(getEmptyEntity() as memberGetOptionsEntry)
	const [memberName, setMemberName] = useState("")
	const [optionsList, setOptionsList] = useState([] as memberGetOptionsEntry[])

	const update_options = async () => {
		let options_answer = await RequestManager.getMemberList()
		if (JSON.stringify(options_answer) !== JSON.stringify(optionsList)) {
			setOptionsList(options_answer)
		}
	}

	const handleAddMember = () => {
		RequestManager.createMember(memberName)
		setDisplayPopup(null)
	}

	const handleDeactivateMember = () => {
		RequestManager.deactivateMember(activeMemberSelected)
		setDisplayPopup(null)
		update_options()

	}

	return (
		<>
			{displayPopup === "add" ? (
				<Popup
					title={"Adicionar Funcionário"}
					action={"Adicionar Funcionário"}
					actionType={"save"}
					handleActionClick={handleAddMember}
					handleCancelClick={() => setDisplayPopup(null)}
				>
					<TextInput
						label="Nome"
						required
						value={memberName}
						handleChange={(member) => setMemberName(member)}
						size="lg"
					/>
				</Popup>
			) : (
				displayPopup === "deactivate" && (
					<Popup
						title={"Desativar Funcionário"}
						action={"Desativar Funcionário"}
						actionType={"save"}
						handleActionClick={handleDeactivateMember}
						handleCancelClick={() => setDisplayPopup(null)}
					>
						<Dropdown
							placeholder={"Selecione um funcionário"}
							options={optionsList}
							optionSelected={activeMemberSelected}
							setOptionSelected={setActiveMemberSelected}
						/>
					</Popup>
				)
			)}
			<MainContainer displayingPopup={!!displayPopup}>
				<Title type="primary">Configurações de Entidades</Title>
				<ButtonContainer>
					<Button
						title="adicionar comitê a partir de template"
						handleClick={() => setAction("add-from-template")}
						fontSize="large"
					>
						Adicionar comitê a partir de órgão existente
					</Button>
					<Button title="Adicionar novo comitê" handleClick={() => setAction("add-custom")} fontSize="large">
						Adicionar novo comitê
					</Button>
					<Button
						title="adicionar novo funcionário"
						handleClick={() => setDisplayPopup("add")}
						fontSize="large"
					>
						Adicionar funcionário
					</Button>
					<Button
						title="desativar funcionário"
						handleClick={() => setDisplayPopup("deactivate")}
						fontSize="large"
					>
						Desativar funcionário
					</Button>
				</ButtonContainer>
			</MainContainer>
		</>
	)
}
export default OptionsMenu
