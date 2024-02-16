import LeaderboardsTableUser from "./tableUser";
import LeaderboardsTableGuild from "./tableGuild";
import LeaderboardsPagination from "./pagination";

const RANKING_MAX_LENGTH = 200;
const PAGE_SIZE = 10;

export default async function LeaderboardsPage({ params, searchParams }) {
    return (
        <>
            {
                params.category != "guild" ?
                    <LeaderboardsTableUser params={params} searchParams={searchParams} /> :
                    <LeaderboardsTableGuild params={params} searchParams={searchParams} />
            }
        </>
    )
}