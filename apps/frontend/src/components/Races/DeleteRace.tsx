import { useState } from "react"
import { Race } from "../../types/races"
import { raceFormService } from "../../services/raceFormServices"

type deleteRaceProps = {
    raceId: string,
    updateRaces: React.Dispatch<React.SetStateAction<Race[]>>
}

/*
 * Calls raceFormService.deleteRace to check and delete a race through
 * racesRepo. Updates the displayed race list on success or shows an error.
 *
 * @param props.raceId The ID of the race to delete.
 * @param props.updateRaces Updates the page's race list after deletion.
 */
function DeleteRace({raceId, updateRaces}: deleteRaceProps){
    const [error, setError] = useState("")

    const handleDelete = async () => {
        setError("")

        try{
            await raceFormService.deleteRace(raceId)
            updateRaces(prev => prev.filter(r => r.id!== raceId))
        } catch (error) {
            if (error instanceof Error){
                setError(error.message)
            }
        }
    };

    return(
        <>
            <button
                type="button"
                className="delete-race-btn"
                onClick={handleDelete}
            >
                Delete
            </button>

            {error && <p role="alert"> {error} </p>}
        </>
    )
}

export default DeleteRace;