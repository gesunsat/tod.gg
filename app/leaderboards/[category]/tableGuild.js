import { cn } from "@/lib/utils";
import LeaderboardsServerList from "./serverList";
import LeaderboardsJobList from "./jobList";
import { getRankingOverall } from "@/lib/nexonAPI/getRankingOverall";
import { classLevel } from "@/mapleData/classLevel";
import { getYesterdayDate } from "@/lib/getYesterdayDate";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import LeaderboardsPagination from "./pagination";
import { getCharOCID } from "@/lib/nexonAPI/getCharOCID";
import { getCharBasic } from "@/lib/nexonAPI/getCharBasic";
import Image from "next/image";
import NullCharacterIcon from "@/public/nullCharacter.png"
import { Suspense } from "react";
import { serverIconImg } from "@/mapleData/serverIconImg";
import { ExternalLink, Info } from "lucide-react";
import Link from "next/link";
import { getRankingGuild } from "@/lib/nexonAPI/getRankingGuild";
import { getGuildID } from "@/lib/nexonAPI/getGuildID";
import { getGuildBasic } from "@/lib/nexonAPI/getGuildBasic";
import { serverOpenList } from "@/mapleData/serverOpenList";
import { getLastWeekRankingDate } from "@/lib/getLastWeekGuildRankingDate";

const RANKING_MAX_LENGTH = 200;
const PAGE_SIZE = 10;
const typeID = {
    "fame": 0,
    "flag": 1,
    "suro": 2,
}

export default async function LeaderboardsTableGuild({ params, searchParams }) {
    const server = searchParams.server || "일반 전체";
    const page = searchParams.page || 1;
    const type = searchParams.type || "suro";
    const requestPage = parseInt(((page - 1) * PAGE_SIZE) / RANKING_MAX_LENGTH) + 1;
    const date = searchParams.date || getYesterdayDate(0, 8, 31);

    let lastWeekRankingData = {};
    let thisWeekRankingData = {};
    if (server == "일반 전체") {
        const promisesGetRanking = [];
        lastWeekRankingData.ranking = [];
        for (const server of serverOpenList) {
            if (server.includes("리부트")) continue;
            promisesGetRanking.push((async () => {
                const serverRanking = await getRankingGuild(
                    typeID[type],
                    server,
                    1,
                    null,
                    getLastWeekRankingDate(),
                );
                lastWeekRankingData.ranking.push(...serverRanking.ranking);
            })());
        }
        thisWeekRankingData.ranking = [];
        for (const server of serverOpenList) {
            if (server.includes("리부트")) continue;
            promisesGetRanking.push((async () => {
                const serverRanking = await getRankingGuild(
                    typeID[type],
                    server,
                    1,
                    null,
                    date,
                );
                thisWeekRankingData.ranking.push(...serverRanking.ranking);
            })());
        }
        await Promise.all(promisesGetRanking);
        lastWeekRankingData.ranking.sort((a, b) => b.guild_point - a.guild_point);
        lastWeekRankingData.ranking = lastWeekRankingData.ranking.splice(200 * (requestPage - 1), RANKING_MAX_LENGTH);
        lastWeekRankingData.ranking.map((guild, index) => guild.ranking = index + 1 + (200 * (requestPage - 1)));
        thisWeekRankingData.ranking.map((guild) => thisWeekRankingData[`${guild.world_name}/${guild.guild_name}`] = guild);
        delete thisWeekRankingData.ranking;
    } else if (server == "리부트 전체") {
        const promisesGetRanking = [];
        lastWeekRankingData.ranking = [];
        for (const server of serverOpenList) {
            if (server.includes("리부트")) {
                promisesGetRanking.push((async () => {
                    const serverRanking = await getRankingGuild(
                        typeID[type],
                        server,
                        1,
                        null,
                        getLastWeekRankingDate(),
                    );
                    lastWeekRankingData.ranking.push(...serverRanking.ranking);
                })());
            }
        }
        thisWeekRankingData.ranking = [];
        for (const server of serverOpenList) {
            if (server.includes("리부트")) {
                promisesGetRanking.push((async () => {
                    const serverRanking = await getRankingGuild(
                        typeID[type],
                        server,
                        1,
                        null,
                        date,
                    );
                    thisWeekRankingData.ranking.push(...serverRanking.ranking);
                })());
            }
        }
        await Promise.all(promisesGetRanking);
        lastWeekRankingData.ranking.sort((a, b) => b.guild_point - a.guild_point);
        lastWeekRankingData.ranking = lastWeekRankingData.ranking.splice(200 * (requestPage - 1), RANKING_MAX_LENGTH);
        lastWeekRankingData.ranking.map((guild, index) => guild.ranking = index + 1 + (200 * (requestPage - 1)));
        thisWeekRankingData.ranking.map((guild) => thisWeekRankingData[`${guild.world_name}/${guild.guild_name}`] = guild);
        delete thisWeekRankingData.ranking;
    } else {
        lastWeekRankingData = await getRankingGuild(
            typeID[type],
            server,
            requestPage,
            null,
            getLastWeekRankingDate(),
        )
        thisWeekRankingData = await getRankingGuild(
            typeID[type],
            server,
            requestPage,
            null,
            date,
        )
        thisWeekRankingData.ranking.map((guild) => thisWeekRankingData[`${guild.world_name}/${guild.guild_name}`] = guild);
    }
    lastWeekRankingData.ranking = lastWeekRankingData?.ranking || [];
    const cuttingRankingData = [...lastWeekRankingData.ranking].splice(parseInt((page - 1) * PAGE_SIZE) - RANKING_MAX_LENGTH * (requestPage - 1), PAGE_SIZE);

    const guildBasics = {};
    const promisesBasics = [];
    for (const guild of cuttingRankingData) {
        promisesBasics.push((async () => {
            const OGUILD = await getGuildID(guild.world_name, guild.guild_name);
            const basic = await getGuildBasic(OGUILD.oguild_id);
            guildBasics[`${guild.world_name}/${guild.guild_name}`] = basic;
        })());
    }
    await Promise.all(promisesBasics);

    // console.log(cuttingRankingData[0])
    // console.log(guildBasics[cuttingRankingData[0].guild_name])

    return (
        <>
            <Table>
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[45px] md:w-[100px] text-center">#</TableHead>
                        <TableHead>길드</TableHead>
                        <TableHead className="w-[130px] hidden sm:table-cell">지난주 점수</TableHead>
                        <TableHead className="w-[130px] hidden sm:table-cell">이번 주 점수</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        cuttingRankingData.map((row, rowIndex) => {
                            return (
                                <TableRow key={rowIndex}>
                                    <TableCell className="text-center px-0 py-2">{row.ranking}</TableCell>
                                    <TableCell className="flex px-0 sm:py-2 gap-3">
                                        <div className="w-[51px] h-[51px] relative self-center">
                                            {
                                                guildBasics[`${row.world_name}/${row.guild_name}`]?.guild_mark ?
                                                    <div
                                                        style={{ '--image-url': `url(${guildBasics[`${row.world_name}/${row.guild_name}`].guild_mark})` }}
                                                        className={"w-full h-full bg-negative-fixed-more text-positive-fixed bg-center bg-no-repeat bg-contain bg-[image:var(--image-url)]"}
                                                    /> :
                                                    <div
                                                        style={{ '--image-url': `url(data:image/png;base64,${guildBasics[`${row.world_name}/${row.guild_name}`].guild_mark_custom || ""})` }}
                                                        className={"w-full h-full bg-negative-fixed-more text-positive-fixed bg-center bg-no-repeat bg-contain bg-[image:var(--image-url)]"}
                                                    />
                                            }
                                        </div>
                                        <div className="self-center">
                                            <div className="flex space-x-1">
                                                <Image
                                                    className="w-auto h-[20px]"
                                                    src={serverIconImg[row.world_name]}
                                                    alt={row.world_name}
                                                    width={27}
                                                    height={27}
                                                />
                                                <Link
                                                    className="flex space-x-1 hover:underline underline-offset-2"
                                                    href={`/guild/${row.world_name}/${row.guild_name}`}
                                                >
                                                    <span>{row.guild_name}</span>
                                                    <ExternalLink className="h-[12px] w-[12px] self-center" />
                                                </Link>
                                            </div>
                                            <div className="flex space-x-1">
                                                <span className="font-bold">
                                                    마스터
                                                </span>
                                                <span>:</span>
                                                <Link
                                                    href={`/char/${row.guild_master_name}`}
                                                    className={"flex space-x-1 hover:underline underline-offset-2"}
                                                >
                                                    <span>{row.guild_master_name}</span>
                                                    <ExternalLink className="ml-1 h-[12px] w-[12px] self-center" />
                                                </Link>
                                            </div>
                                            <div className="flex sm:hidden space-x-1">
                                                <span className="font-bold">지난주 점수</span>
                                                <span>:</span>
                                                <span>{(row.guild_point).toLocaleString()}점</span>
                                            </div>
                                            <div className="flex sm:hidden space-x-1">
                                                <span className="font-bold">이번 주 점수</span>
                                                <span>:</span>
                                                <span>{(row.guild_point).toLocaleString()}점</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">{(row.guild_point).toLocaleString()}점</TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        {
                                            thisWeekRankingData[`${row.world_name}/${row.guild_name}`]?.guild_point ?
                                                `${(thisWeekRankingData[`${row.world_name}/${row.guild_name}`].guild_point).toLocaleString()}점` :
                                                "순위권 변동"
                                        }
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>

            <LeaderboardsPagination className={"select-none"} length={lastWeekRankingData.ranking.length} />

            {
                server.includes("전체") &&
                <div className="flex space-x-1 justify-end text-xs">
                    <Info className="w-[16px] h-[16px]" />
                    <span>각 월드 상위 200개 길드 정보만 수집됐습니다.</span>
                </div>
            }
        </>
    )
}