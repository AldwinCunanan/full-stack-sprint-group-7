
import React, { useEffect, useState } from 'react';
import type { Racer } from "../../../../../../shared/types/racer_type";
import type { Teamsheet } from "../../../../../../shared/types/teamsheet_type";
import { racerService } from "../../../services/racerService";

export function AddTeamsheet({
    racers,
    createTeamsheet,
    warning
}: {
    racers: Racer[];
    createTeamsheet: (
        teamName: string,
        selectedRacers: Racer[],
        bettingTotal: number
    ) => Promise<boolean>;
    warning: string;
}) {
    const [teamName, setTeamName] = useState("");
    const [selectedRacers, setSelectedRacers] = useState<Racer[]>([]);
    const [bettingTotal, setBettingTotal] = useState(0);

    const toggleRacer = (racer: Racer) => {
        setSelectedRacers(prev => {
            const alreadySelected = prev.some(
                selected => selected.id === racer.id
            );

            if (alreadySelected) {
                return prev.filter(
                    selected => selected.id !== racer.id
                );
            }

            return [...prev, racer];
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const success = await createTeamsheet(
            teamName,
            selectedRacers,
            bettingTotal
        );

        if (!success) return;

        setTeamName("");
        setSelectedRacers([]);
        setBettingTotal(0);
    };

    return (
        <form onSubmit={handleSubmit} className="add-teamsheet">
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
                        selectedRacer => selectedRacer.id === racer.id
                    );

                    return (
                        <button
                            type="button"
                            key={racer.id}
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
                    value={bettingTotal === 0 ? "" : bettingTotal}
                    onChange={(e) => setBettingTotal(Number(e.target.value))}
                />
            </label>

            {warning && <p className="warning">{warning}</p>}

            <button type="submit">Create Teamsheet</button>
        </form>
    );
}

export function TeamsheetList({
    teamsheets,
    deleteTeamsheet
}: {
    teamsheets: Teamsheet[];
    deleteTeamsheet: (id: string) => Promise<void>;
}) {
    return (
        <section className="teamsheet_list">
            <h2>My Teamsheets</h2>

            {teamsheets.map((teamsheet) => (
                <div key={teamsheet.id} className="teamsheet_card">
                    <h3>{teamsheet.teamName}</h3>
                    <div>Racers: {teamsheet.racers.length}</div>
                    <div>Betting Total: ${teamsheet.bettingTotal}</div>

                    <button
                        type="button"
                        onClick={() => deleteTeamsheet(teamsheet.id)}
                    >
                        Delete Teamsheet
                    </button>
                </div>
            ))}
        </section>
    );
}

export function Racers({
    teamsheets,
    createTeamsheet,
    deleteTeamsheet,
    warning
}: {
    teamsheets: Teamsheet[];
    createTeamsheet: (
        teamName: string,
        selectedRacers: Racer[],
        bettingTotal: number
    ) => Promise<boolean>;
    deleteTeamsheet: (id: string) => Promise<void>;
    warning: string;
}) {
    const [racers, setRacers] = useState<Racer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadRacers() {
            try {
                const data = await racerService.getAll();
                setRacers(data);
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : "Failed to load racers"
                );
            } finally {
                setLoading(false);
            }
        }

        loadRacers();
    }, []);

    return (
        <main>
            <AddTeamsheet
                racers={racers}
                createTeamsheet={createTeamsheet}
                warning={warning}
            />

            <TeamsheetList
                teamsheets={teamsheets}
                deleteTeamsheet={deleteTeamsheet}
            />

            {loading && <p>Loading racers...</p>}
            {error && <p className="warning">{error}</p>}

            {!loading && !error && <RacerList racers={racers} />}
        </main>
    );
}

export function RacerList({ racers }: { racers: Racer[] }) {
    return (
        <section className="statistics_list">
            <h2>Racer Statistics</h2>

            <div className="racer_list">
                {racers.map((racer) => (
                    <div key={racer.id} className="racer_card">
                        <img
                            src={`http://localhost:3000${racer.image ?? ""}`}
                            alt={racer.name}
                            className="racer_image"
                        />
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
