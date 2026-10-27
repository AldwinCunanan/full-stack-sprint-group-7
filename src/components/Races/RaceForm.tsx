import "./raceForm.css"
import { Race } from "../../types/races";
import { useFormInput } from "../../hooks/useFormInput";
import useFormSubmit from "../../hooks/useFormSubmission";
import { raceFormService } from "../../services/raceFormServices";

type raceFormProps = {
    updateRaces: React.Dispatch<React.SetStateAction<Race[]>>
}

const locations = [
    { name: "Montreal", image: "montreal.png" },
    { name: "Sepang", image: "sepang.png" },
    { name: "Singapore", image: "singapore.png" },
    { name: "Austin", image: "austin.png" },
    { name: "Mexico City", image: "mexico_city.png" },
    { name: "Sao Paulo", image: "sao_paulo.png" },
    { name: "Lusail", image: "lusail.png" },
    { name: "Abu Dhabi", image: "abu_dhabi.png" },
];

function RaceForm({updateRaces}: raceFormProps){
    const raceName = useFormInput();
    const locationName = useFormInput();
    const trackImg = useFormInput();
    const dateOfRace = useFormInput();
    const lengthOfTrack = useFormInput();

    const {handleSubmit, formMessages} = useFormSubmit(async () => {
        
        const race: Race = await raceFormService.addRace({
            name: raceName.value,
            location: locationName.value,
            trackImg: trackImg.value,
            date: new Date(dateOfRace.value),
            trackLength: lengthOfTrack.value,
            drivers: ["Max"],
        });

        updateRaces(prev => [...prev, race]);
    })

    return(
        <form 
            className="race-form" 
            onSubmit={async e => {
                e.preventDefault();
                await handleSubmit();
            }}
        >
            <div>
                {formMessages.map((message, index) => (
                    <p key={index} className="errors">
                        {message}
                    </p>
                ))}
            </div>

            <input 
                type="text"
                className="field-race-name"
                placeholder="Enter race name"
                value={raceName.value}
                onChange={e => {
                    raceName.setValue(e.target.value)
                }} 
            />

            <select 
                className="field-race-location"
                value={locationName.value}
                onChange={e => {
                    const selected = locations.find(
                        location => location.name === e.target.value
                    );

                    if (selected) {
                        locationName.setValue(selected.name);
                        trackImg.setValue(`/racesImages/tracks/${selected.image}`);
                    }
                }}
            >
                <option value="" disabled hidden>
                    Choose location
                </option>
                
                {locations.map(location => (
                    <option key={location.name} value={location.name}>
                        {location.name}
                    </option>
                ))}
            </select>

            <input 
                type="number"
                step="0.1"
                className="field-race-length"
                placeholder="Enter track length in kilometers"
                value={lengthOfTrack.value}
                onChange={e => {
                    lengthOfTrack.setValue(e.target.value)
                }} 
            />

            <input 
                type="date"
                className="field-race-date"
                min="2026-01-01"
                max="2028-12-30"
                value={dateOfRace.value}
                onChange={e => {
                    dateOfRace.setValue(e.target.value)
                }} 
            />

            <button className="race-submit-btn" type="submit">
                submit
            </button>

        </form>
    );
}

export default RaceForm;