import { Suspense } from "react";
import LeaderboardsJobList from "./jobList";
import LeaderboardsServerList from "./serverList";
import LeaderboardsTabs from "./tabs";
import { Skeleton } from "@/components/ui/skeleton";
import LeaderboardsGuildTabs from "./guildTabs";
import { searchQueryParams } from "@/lib/getQueryParam";
import { headers } from "next/headers";

const categoryKorean = {
    "power": "전투력",
    "overall": "종합",
    "guild": "길드",
    "union": "유니온",
    "dojang": "무릉도장",
    "achievement": "업적",
    "theseed": "더 시드",
}
const guildRankingTypeKorean = {
    "suro": "지하 수로",
    "flag": "플래그",
    "fame": "주간 명성치",
}

export async function generateMetadata({ params, searchParams }) {
    const headersList = headers();
    const header_url = headersList.get("x-url") || "";
    const server = decodeURI(searchQueryParams({ query: "server", fullUrl: header_url }) || "전섭").replace("+", " ");
    const job = decodeURI(searchQueryParams({ query: "job", fullUrl: header_url }) || "");
    const type = decodeURI(searchQueryParams({ query: "type", fullUrl: header_url }) || "suro");

    return {
        title: `${server != "전섭" ? `${server} 서버` : server}${job ? ` ${job}` : ""} ${categoryKorean[params.category]}${params.category == "guild" && type ? ` ${guildRankingTypeKorean[type]}` : ""} 랭킹 | TOD.GG 토드지지`,
        openGraph: {
            images: "https://tod.gg/tode_hammer.png",
            url: `https://tod.gg/leaderboards/${params.category}`,
            title: `${server != "전섭" ? `${server} 서버` : server}${job ? ` ${job}` : ""} ${categoryKorean[params.category]}${params.category == "guild" && type ? ` ${guildRankingTypeKorean[type]}` : ""} 랭킹 | TOD.GG 토드지지`,
        }
    }
}

export default async function CharacterLayout({ params, searchParams, children }) {
    return (
        <>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-2 m-1 space-y-2">
                {/* <LeaderboardsTabs category={params.category} /> */}

                {/* {
                    params.category == "guild" &&
                    <LeaderboardsGuildTabs />
                }

                {
                    !(["union", "theseed", "dojang", "achievement"].includes(params.category)) &&
                    <LeaderboardsServerList rebootDivide />
                }
                {
                    (["union", "theseed", "dojang"].includes(params.category)) &&
                    <LeaderboardsServerList />
                }

                {
                    ["power", "overall", "dojang"].includes(params.category) &&
                    <LeaderboardsJobList />
                } */}

                {children}
            </div>
        </>
    )
}