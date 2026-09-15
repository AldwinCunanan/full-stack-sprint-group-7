
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
        image: "/kimi_antonelli.atif"
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

export function Landing() {
    return (
        <>
            <header>
                <img src="/logo.svg" alt="F1 Logo" className="logo" />
                <h1>Formula One 2026</h1>
                <span></span>
            </header>
            <main>
                <RacerList racers={racers} />
            </main>
        </>
    );
}

function RacerList({ racers }: { racers: Racer[] }) {
    return (
        <section className="statistics_list">
            <h2>Racer Statistics</h2>
                    <div className="racer_list">
                        {racers.map((racer) => (
                            <div key={racer.name} className="racer_card">
                                <img src={racer.image} alt={racer.name} className="racer_image" />
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
            )}

export default Landing;