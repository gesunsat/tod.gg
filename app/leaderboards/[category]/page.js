import { cn } from "@/lib/utils";
import LeaderboardsServerList from "./serverList";
import LeaderboardsJobList from "./jobList";
import { getRankingOverall } from "@/lib/nexonAPI/getRankingOverall";
import { classLevel } from "@/mapleData/classLevel";
import { getYesterdayDate } from "@/lib/getYesterdayDate";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


export default async function LeaderboardsPage({ params, searchParams }) {
    console.log(searchParams);
    const job = searchParams.job || "전체";
    const server = searchParams.server || "일반 전체";
    const page = searchParams.page || 1;
    const date = searchParams.date || getYesterdayDate();

    let rankingData = {};
    if (params.category == "power") {
        console.log("TODO: 집가서")
    }
    if (params.category == "overall") {
        if (server.includes("리부트")) {
            rankingData = await getRankingOverall(
                server.includes("전체") ? null : server,
                server.includes("전체") ? 1 : null,
                job == "전체" ? null : `${classLevel[job][0]}-${classLevel[job][6]}`,
                null,
                page,
                date
            )
        } else {
            rankingData = await getRankingOverall(
                server.includes("전체") ? null : server,
                server.includes("전체") ? 0 : null,
                job == "전체" ? null : `${classLevel[job][0]}-${classLevel[job][6]}`,
                null,
                page,
                date
            )
        }
    }
    rankingData = rankingData.ranking;

    console.log(rankingData[3])

    return (
        <>
            {
                !(["achievement"].includes(params.category)) &&
                <LeaderboardsServerList />
            }

            {
                ["power", "overall", "dojang"].includes(params.category) &&
                <LeaderboardsJobList />
            }
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center w-[100px]">#</TableHead>
                        <TableHead>캐릭터</TableHead>
                        <TableHead className="w-[100px]">길드</TableHead>
                        <TableHead className="w-[100px]">인기도</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>

                    {
                        rankingData.map((row, rowIndex) => {
                            return (
                                <TableRow key={rowIndex}>
                                    <TableCell className="text-center">{row.ranking}</TableCell>
                                    <TableCell>
                                        <div>
                                            {row.character_name}
                                        </div>
                                        <div className="flex gap-2">
                                            <span>
                                                Lv.{row.character_level}
                                            </span>
                                            <span>|</span>
                                            <span>
                                                {row.sub_class_name || row.class_name}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{row.character_guildname || "-"}</TableCell>
                                    <TableCell>{row.character_popularity}</TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>





        </>
    )
}