import React, { useState } from 'react';
import { racers } from '../../../data/racers';
import { Racer } from '../../../types/racer_type';
import { Teamsheet } from '../../../types/teamsheet_type';
import { useTeamsheets } from '../../../hooks/useTeamsheet';
import { AddTeamsheetProps } from '../../../types/teamsheet_prop';

export function AddTeamsheet({createTeamsheet, warning}: AddTeamsheetProps) {
    const [teamName, setTeamName] = useState("");
    const [selectedRacers, setSelectedRacers] = useState<Racer[]>([]);
    const [bettingTotal, setBettingTotal] = useState(0);

    const toggleRacer = (racer: Racer) => {
        setSelectedRacers(prev => {
            const alreadySelected = prev.some(
                selected => selected.name === racer.name
            );

            if (alreadySelected) {
                return prev.filter(
                    selected => selected.name !== racer.name
                );
            }

            return [...prev, racer];
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const success = createTeamsheet(
            teamName,
            selectedRacers,
            bettingTotal
        );

        if (!success) {
            return;
        }

        setTeamName("");
        setSelectedRacers([]);
        setBettingTotal(0);

    };

    return (
        <form
            onSubmit={handleSubmit}
            className="add-teamsheet"
        >
            <h2>Add Teamsheet</h2>

            <input
                name="teamName"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Team Name"
            />

            <h3>Select Racers</h3>

            <div className="racer_selection">
                {racers.map((racer) => {
                    const selected = selectedRacers.some(
                        selectedRacer =>
                            selectedRacer.name === racer.name
                    );

                    return (
                        <button
                            type="button"
                            key={racer.name}
                            className={selected ? "selected" : ""}
                            onClick={() => toggleRacer(racer)}
                        >
                            {racer.name}
                        </button>
                    );
                })}
            </div>

            <label>
                Betting Total
                <input
                    type="number"
                    min="0"
                    value={bettingTotal === 0 ? "": bettingTotal}
                    onChange={(e) =>
                        setBettingTotal(Number(e.target.value))
                    }
                />
            </label>

            {warning && (
                <p className="warning">
                    {warning}
                </p>
            )}

            <button type="submit">
                Create Teamsheet
            </button>
        </form>
    );
}

export function TeamsheetList({teamsheets, deleteTeamsheet}: {
    teamsheets: Teamsheet[];
    deleteTeamsheet: (id: string) => void;
}) {
    return (
        <section className='teamsheet_list'>
            <h2>My Teamsheets</h2>

            {teamsheets.map((teamsheet) => (
                <div key={teamsheet.id} className='teamsheet_card'>
                    <h3>{teamsheet.teamName}</h3>
                    <div>
                        Racers: {teamsheet.racers.length}
                    </div>
                    <div>
                        Betting Total: ${teamsheet.bettingTotal}
                    </div>
                    <button
                        type="button"
                        onClick={() => deleteTeamsheet(teamsheet.id)}
                    >
                        Delete Teamsheet
                    </button>
                </div>
            ))}
        </section>
    )
}

export function Racers({
    teamsheets,
    addTeamsheet,
    deleteTeamsheet
}: {
    teamsheets: Teamsheet[];
    addTeamsheet: (teamsheet: Teamsheet) => void;
    deleteTeamsheet: (id: string) => void; 
}) {
    const {
        warning,
        createTeamsheet,
        removeTeamsheet
    } = useTeamsheets(addTeamsheet, deleteTeamsheet);

    return (
        <main>
            <AddTeamsheet
                createTeamsheet={createTeamsheet}
                warning={warning}
            />

            <TeamsheetList
                teamsheets={teamsheets}
                deleteTeamsheet={removeTeamsheet}
            />

            <RacerList racers={racers} />
        </main>
    );
}

export function RacerList({ racers }: { racers: Racer[] }) {
    return (
        <section className="statistics_list">
            <h2>Racer Statistics</h2>
            <div className="racer_list">
                {racers.map((racer) => (
                    <div key={racer.name} className="racer_card">
                        <img src={racer.image} alt={racer.name} className="racer_image"/>
                        <strong>{racer.name}</strong>
                        <div className="team">{racer.team}</div>
                        <div><span className="label">Country:</span> {racer.country}</div>
                        <div><span className="label">Season Position:</span> {racer.season_position}</div>
                        <div><span className="label">Season Points:</span> {racer.season_points}</div>
                        <div><span className="label">Grand Prix Races:</span> {racer.grand_prix_races}</div>
                        <div><span className="label">Grand Prix Wins:</span> {racer.grand_prix_wins}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Racers;