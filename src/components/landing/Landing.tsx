
const racers = [
    {
        name: "X",
        team: "X",
        number: 44,
        wins: 10,
        ranking: "X",
        odds: "X",
        vehicle: "X",
        color: "X"
    },
    {
        name: "X",
        team: "X",
        number: 44,
        wins: 10,
        ranking: "X",
        odds: "X",
        vehicle: "X",
        color: "X"
    },
    {
        name: "X",
        team: "X",
        number: 44,
        wins: 10,
        ranking: "X",
        odds: "X",
        vehicle: "X",
        color: "X"
    }
];

type Racer = {
    name: string;
    team: string;
    number: number;
    wins: number;
    ranking: string;
    odds: string;
    vehicle: string;
    color: string;
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
                                <div><span className="label">Wins:</span> {racer.wins}</div>
                                <div><span className="label">Ranking:</span> {racer.ranking}</div>
                                <div><span className="label">Odds:</span> {racer.odds}</div>
                                <div><span className="label">Vehicle:</span> {racer.vehicle}</div>
                                <div><span className="label">Color:</span> {racer.color}</div>
                            </div>
                        ))}
                    </div>

                </section>
            ))}
        </section>
    );
}

export default Landing;