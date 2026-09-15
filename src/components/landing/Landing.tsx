
const racers = [
    {
        name: "KimiAntonelli",
        team: "Mercedes",
        country: "Italy",
        number: 12,
        season_position: "1st",
        season_points: 292,
        grand_prix_races: 14,
        grand_prix_wins: 8
    },
    {
        name: "X",
        team: "X",
        country: "X",
        number: 44,
        season_position: "10",
        season_points: 0,
        grand_prix_races: 0,
        grand_prix_wins: 0
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
};

const statistics: Statistics[] = [
    {
        name: "Racer Statistics",
        stats: racers
    }
];

type Statistics = {
    name: string;
    stats: Racer[];
};

export function Landing() {
    return (
        <>
            <header>
                <img src="/logo.svg" alt="F1 Logo" className="logo" />
                <h1>Formula One</h1>
                <span></span>
            </header>
            <main>
                <StatisticsList statistics={statistics} />
            </main>
        </>
    );
}

function StatisticsList({ statistics }: { statistics: Statistics[] }) {
    return (
        <section className="statistics_list">
            {statistics.map((stat) => (
                <section key={stat.name}>
                    <h2>{stat.name}</h2>

                    <div className="racer_list">
                        {stat.stats.map((racer) => (
                            <div key={racer.name} className="racer_card">
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
            ))}
        </section>
    );
}

export default Landing;