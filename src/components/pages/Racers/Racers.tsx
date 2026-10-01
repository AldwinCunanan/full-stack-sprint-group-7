import React, { useState } from 'react';

const racers = [
    {
        name: "Kimi Antonelli",
        team: "Mercedes",
        country: "Italy",
        number: 12,
        season_position: "1st",
        season_points: 292,
        grand_prix_races: 14,
        grand_prix_wins: 8,
        image: "/kimi_antonelli.avif"
    },
    {
        name: "George Russell",
        team: "Mercedes",
        country: "United Kingdom",
        number: 63,
        season_position: "2nd",
        season_points: 211,
        grand_prix_races: 14,
        grand_prix_wins: 2,
        image: "/george_russell.avif"
    },
    {
        name: "Lewis Hamilton",
        team: "Ferrari",
        country: "United Kingdom",
        number: 44,
        season_position: "3rd",
        season_points: 191,
        grand_prix_races: 14,
        grand_prix_wins: 1,
        image: "/lewis_hamilton.avif"
    },
    {
        name: "Lando Norris",
        team: "McLaren",
        country: "United Kingdom",
        number: 1,
        season_position: "4th",
        season_points: 186,
        grand_prix_races: 14,
        grand_prix_wins: 2,
        image: "/lando_norris.avif"
    },
    {
        name: "Charles Leclerc",
        team: "Ferrari",
        country: "Monaco",
        number: 16,
        season_position: "5th",
        season_points: 167,
        grand_prix_races: 14,
        grand_prix_wins: 1,
        image: "/charles_leclerc.avif"
    },
    {
        name: "Max Verstappen",
        team: "Red Bull Racing",
        country: "Netherlands",
        number: 3,
        season_position: "6th",
        season_points: 145,
        grand_prix_races: 14,
        grand_prix_wins: 0,
        image: "/max_verstappen.avif"
    },
    {
        name: "Oscar Piastri",
        team: "McLaren",
        country: "Australia",
        number: 81,
        season_position: "7th",
        season_points: 120,
        grand_prix_races: 14,
        grand_prix_wins: 0,
        image: "/oscar_piastri.avif"
    },
    {
        name: "Isack Hadjar",
        team: "Red Bull Racing",
        country: "France",
        number: 6,
        season_position: "8th",
        season_points: 71,
        grand_prix_races: 11,
        grand_prix_wins: 0,
        image: "/isack_hadjar.avif"
    },
    {
        name: "Liam Lawson",
        team: "Racing Bulls",
        country: "New Zealand",
        number: 30,
        season_position: "9th",
        season_points: 59,
        grand_prix_races: 14,
        grand_prix_wins: 0,
        image: "/liam_lawson.avif"
    },
    {
        name: "Pierre Gasly",
        team: "Alpine",
        country: "France",
        number: 10,
        season_position: "10th",
        season_points: 41,
        grand_prix_races: 14,
        grand_prix_wins: 0,
        image: "/pierre_gasly.avif"
    },
    {
        name: "Arvin Lindblad",
        team: "Racing Bulls",
        country: "United Kingdom",
        number: 41,
        season_position: "11th",
        season_points: 31,
        grand_prix_races: 14,
        grand_prix_wins: 0,
        image: "/arvin_lindblad.avif"
    },
    {
        name: "Franco Colapinto",
        team: "Alpine",
        country: "Argentina",
        number: 43,
        season_position: "12th",
        season_points: 27,
        grand_prix_races: 14,
        grand_prix_wins: 0,
        image: "/franco_colapinto.avif"
    }
];

type Racer = {
    name: string;
    team: string;
    country: string;
    number: number;
    season_position: string;
    season_points: number;
    grand_prix_races: number;
    grand_prix_wins: number;
    image?: string;
};

export type Teamsheet = {
    id: string;
    teamName: string;
    racers: Racer[];
    bettingTotal: number;
};

export function AddTeamsheet({addTeamsheet}: {addTeamsheet: (teamsheet: Teamsheet) => void;}) {
    const [teamName, setTeamName] = useState("");
    const [selectedRacers, setSelectedRacers] = useState<Racer[]>([]);
    const [bettingTotal, setBettingTotal] = useState(0);
    const [warning, setWarning] = useState("");

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

        if (teamName.trim().length < 3) {
            setWarning(
                "Team name must be at least 3 characters long"
            );
            return;
        }

        if (selectedRacers.length === 0) {
            setWarning(
                "You must select at least one racer"
            );
            return;
        }

        if (bettingTotal <= 0) {
            setWarning(
                "Betting total must be greater than $0"
            );
            return;
        }

        const newTeamsheet: Teamsheet = {
            id: crypto.randomUUID(),
            teamName: teamName.trim(),
            racers: selectedRacers,
            bettingTotal: bettingTotal
        };

        addTeamsheet(newTeamsheet);

        setTeamName("");
        setSelectedRacers([]);
        setBettingTotal(0);
        setWarning("");
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
    return (
        <main>
            <AddTeamsheet
                addTeamsheet={addTeamsheet}
            />

            <TeamsheetList
                teamsheets={teamsheets}
                deleteTeamsheet={deleteTeamsheet}
            />

            <RacerList
                racers={racers}
            />
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