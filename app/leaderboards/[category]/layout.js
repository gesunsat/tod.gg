import { Suspense } from "react";
import LeaderboardsJobList from "./jobList";
import LeaderboardsServerList from "./serverList";
import LeaderboardsTabs from "./tabs";
import { Skeleton } from "@/components/ui/skeleton";
import LeaderboardsGuildTabs from "./guildTabs";

// export async function generateMetadata({ params }) {
//     try {
//         const headersList = headers();
//         const header_url = headersList.get("x-url") || "";
//         const selectedDate = searchQueryParams({ query: "date", fullUrl: header_url });
//         const OCID = await getCharOCID(decodeURI(params.name));

//         if (!OCID?.ocid) {
//             return {
//                 title: "캐릭터 정보 | TOD.GG",
//                 description: "캐릭터가 존재하지 않거나 불러올 수 없는 캐릭터입니다.",
//             }
//         }

//         const [characterBasic, characterStat, userUnion] = await Promise.all([
//             getCharBasic(OCID.ocid, selectedDate),
//             getCharStat(OCID.ocid, selectedDate),
//             getUserUnion(OCID.ocid, selectedDate),
//         ]);

//         if (!characterBasic.character_class) {
//             return {
//                 title: "캐릭터 정보 | TOD.GG",
//                 description: "캐릭터가 존재하지 않거나 불러올 수 없는 캐릭터입니다.",
//             }
//         }

//         return {
//             title: `${characterBasic.character_name} 캐릭터 정보 | TOD.GG 토드지지`,
//             description:
//                 `${characterBasic.world_name} | ` +
//                 `${characterBasic.character_class} | ` +
//                 `Lv.${characterBasic.character_level} | ` +
//                 `길드:${characterBasic.character_guild_name ? characterBasic.character_guild_name + " | " : "- | "}` +
//                 `전투력:${characterStat?.final_stat.reverse().map((stat) => { if (stat.stat_name == "전투력") return parseInt(stat.stat_value).toLocaleString() }).join('')} | ` +
//                 `${userUnion?.union_level ? "유니온:" + userUnion?.union_level : ""}`,
//             openGraph: {
//                 images: characterBasic.character_image,
//                 url: `https://tod.gg/char/${params.id}`,
//                 title: `${characterBasic.character_name} 캐릭터 정보 | TOD.GG`,
//                 description:
//                     `${characterBasic.world_name} | ` +
//                     `${characterBasic.character_class} | ` +
//                     `Lv.${characterBasic.character_level} | ` +
//                     `길드:${characterBasic.character_guild_name ? characterBasic.character_guild_name + " | " : "- | "}` +
//                     `전투력:${characterStat?.final_stat.reverse().map((stat) => { if (stat.stat_name == "전투력") return parseInt(stat.stat_value).toLocaleString() }).join('')} | ` +
//                     `${userUnion?.union_level ? "유니온:" + userUnion?.union_level : ""}`,
//             }
//         }
//     } catch (err) {
//         console.log(err);
//         return {
//             title: "캐릭터 정보 | TOD.GG",
//             description: "캐릭터가 존재하지 않거나 불러올 수 없는 캐릭터입니다.",
//         }
//     }
// }

export default async function CharacterLayout({ params, searchParams, children }) {
    return (
        <>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-2 m-1 space-y-2">
                <LeaderboardsTabs category={params.category} />

                {
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
                }

                {children}
            </div>
        </>
    )
}