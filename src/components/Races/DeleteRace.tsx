import { Race } from "../../backend/types/races"

type deleteRaceProps = {
    name: string,
    updateRaces: React.Dispatch<React.SetStateAction<Race[]>>
}

function DeleteRace({name, updateRaces}: deleteRaceProps){

    const handleDelete = () => {
        updateRaces(prev => prev.filter(r => r.name!== name))
    }

    return(
        <button className="delete-race-btn"
        onClick={handleDelete}>
            Delete
        </button>
    )
}

export default DeleteRace;