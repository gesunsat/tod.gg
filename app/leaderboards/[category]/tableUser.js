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
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { getRankingUnion } from "@/lib/nexonAPI/getRankingUnion";
import { getRankingDojang } from "@/lib/nexonAPI/getRankingDojang";
import { getLastWeekGuildRankingDate, getLastWeekRankingDate } from "@/lib/getLastWeekRankingDate";
import { getRankingAchievement } from "@/lib/nexonAPI/getRankingAchievement";
import { getRankingTheseed } from "@/lib/nexonAPI/getRankingTheseed";

const RANKING_MAX_LENGTH = 200;
const PAGE_SIZE = 10;

export default async function LeaderboardsTableUser({ params, searchParams }) {
    const job = searchParams.job || "전체";
    const server = searchParams.server || "일반 전체";
    const page = searchParams.page || 1;
    const requestPage = parseInt(((page - 1) * PAGE_SIZE) / RANKING_MAX_LENGTH) + 1;
    const date = searchParams.date || getYesterdayDate();

    let rankingData = {};
    if (params.category == "power") {
        // TODO: 추후
    } else if (params.category == "overall") {
        if (server.includes("리부트")) {
            rankingData = await getRankingOverall(
                server.includes("전체") ? null : server,
                server.includes("전체") ? 1 : null,
                job == "전체" ? null : `${classLevel[job][0]}-${classLevel[job][6]}`,
                null,
                requestPage,
                date
            )
        } else {
            rankingData = await getRankingOverall(
                server.includes("전체") ? null : server,
                server.includes("전체") ? 0 : null,
                job == "전체" ? null : `${classLevel[job][0]}-${classLevel[job][6]}`,
                null,
                requestPage,
                date
            )
        }
    } else if (params.category == "union") {
        rankingData = await getRankingUnion(
            null,
            server == "일반 전체" ? null : server,
            requestPage,
            date
        )
    } else if (params.category == "dojang") {
        rankingData = await getRankingDojang(
            server == "일반 전체" ? null : server,
            1,
            job == "전체" ? null : `${classLevel[job][0]}-${classLevel[job][6]}`,
            null,
            requestPage,
            getLastWeekRankingDate(0)
        )
    } else if (params.category == "achievement") {
        rankingData = await getRankingAchievement(
            null,
            requestPage,
            date
        )
    } else if (params.category == "theseed") {
        rankingData = await getRankingTheseed(
            null,
            server == "일반 전체" ? null : server,
            requestPage,
            date
        )
    }
    rankingData.ranking = rankingData?.ranking || [];
    const cuttingRankingData = [...rankingData?.ranking].splice(parseInt((page - 1) * PAGE_SIZE) - RANKING_MAX_LENGTH * (requestPage - 1), PAGE_SIZE);

    const characterBasics = {};
    const promises = [];
    for (const character of cuttingRankingData) {
        promises.push((async () => {
            const OCID = await getCharOCID(character.character_name);
            const basic = await getCharBasic(OCID.ocid);
            characterBasics[character.character_name] = basic;
        })());
    }
    await Promise.all(promises);

    // console.log(cuttingRankingData[0])

    return (
        <>
            <Table id="tal">
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[45px] md:w-[100px] text-center">#</TableHead>
                        <TableHead>캐릭터</TableHead>
                        <TableHead className="w-[130px] hidden sm:table-cell">길드</TableHead>
                        {
                            params.category == "overall" &&
                            <TableHead className="w-[100px] hidden sm:table-cell">경험치</TableHead>
                        }
                        {
                            params.category == "union" &&
                            <>
                                <TableHead className="w-[100px] hidden sm:table-cell text-center">레벨</TableHead>
                                <TableHead className="w-[130px] hidden sm:table-cell">전투력</TableHead>
                            </>
                        }
                        {
                            params.category == "dojang" &&
                            <TableHead className="w-[150px] hidden sm:table-cell text-center">기록</TableHead>
                        }
                        {
                            params.category == "achievement" &&
                            <TableHead className="w-[150px] hidden sm:table-cell text-center">점수</TableHead>
                        }
                        {
                            params.category == "theseed" &&
                            <TableHead className="w-[110px] hidden sm:table-cell text-center">기록</TableHead>
                        }
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        cuttingRankingData.map((row, rowIndex) => {
                            return (
                                <TableRow key={rowIndex}>
                                    <TableCell className="text-center px-0 py-2">{row.ranking}</TableCell>
                                    <TableCell className="flex px-0 sm:py-2 gap-3">
                                        <div className="w-[72px] h-[72px] relative self-center">
                                            {
                                                characterBasics[row.character_name]?.character_image ?
                                                    <div
                                                        style={{ '--image-url': `url(${characterBasics[row.character_name].character_image})` }}
                                                        className={"w-full h-full bg-negative-fixed-more text-positive-fixed bg-center bg-no-repeat bg-contain bg-[image:var(--image-url)]"}
                                                    /> :
                                                    <Image
                                                        src={NullCharacterIcon}
                                                        alt="캐릭터 이미지"
                                                        className="object-contain brightness-50 dark:brightness-100"
                                                        fill
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
                                                    href={`/char/${row.character_name}`}
                                                >
                                                    <span>{row.character_name}</span>
                                                    <ExternalLink className="h-[12px] w-[12px] self-center" />
                                                </Link>
                                            </div>
                                            <div className="flex gap-2">
                                                <span>
                                                    Lv.{characterBasics[row.character_name]?.character_level}
                                                </span>
                                                <span>|</span>
                                                <span>
                                                    {characterBasics[row.character_name]?.character_class}
                                                </span>
                                            </div>
                                            <div className="flex sm:hidden space-x-1">
                                                <span className="font-bold">길드</span>
                                                <span>:</span>
                                                <Link
                                                    href={`/guild/${row.world_name}/${characterBasics[row.character_name]?.character_guild_name}`}
                                                    className={cn(
                                                        "flex space-x-1 hover:underline underline-offset-2",
                                                        !characterBasics[row.character_name]?.character_guild_name && "pointer-events-none"
                                                    )}
                                                >
                                                    <span>{characterBasics[row.character_name]?.character_guild_name || "-"}</span>
                                                    {
                                                        characterBasics[row.character_name]?.character_guild_name &&
                                                        <ExternalLink className="ml-1 h-[12px] w-[12px] self-center" />
                                                    }
                                                </Link>
                                            </div>
                                            {
                                                params.category == "overall" &&
                                                <div className="flex sm:hidden space-x-1">
                                                    <span className="font-bold">경험치</span>
                                                    <span>:</span>
                                                    <span>{characterBasics[row.character_name]?.character_exp_rate || "0.000"}%</span>
                                                </div>
                                            }
                                            {
                                                params.category == "union" &&
                                                <>
                                                    <div className="flex sm:hidden space-x-1">
                                                        <span className="font-bold">레벨</span>
                                                        <span>:</span>
                                                        <div className="relative flex space-x-1">
                                                            <Image
                                                                alt="유니온 심볼"
                                                                src={`/union/${unionGradeImage[getUnionGradeName(row.union_level)]}.png`}
                                                                width={20}
                                                                height={20}
                                                                className="w-auto h-[20px]"
                                                                priority
                                                            />
                                                            <span>{(row.union_level).toLocaleString()}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex sm:hidden space-x-1">
                                                        <span className="font-bold">전투력</span>
                                                        <span>:</span>
                                                        <span>{(row.union_power).toLocaleString()}</span>
                                                    </div>
                                                </>
                                            }
                                            {
                                                params.category == "dojang" &&
                                                <div className="flex sm:hidden space-x-1">
                                                    <span className="font-bold">기록</span>
                                                    <span>:</span>
                                                    <div className="relative flex space-x-1">
                                                        <span>{row.dojang_floor}층 ({`${parseInt(row.dojang_time_record / 60)}분 ${row.dojang_time_record % 60}초`})</span>
                                                    </div>
                                                </div>
                                            }
                                            {
                                                params.category == "achievement" &&
                                                <div className="flex sm:hidden space-x-1">
                                                    <span className="font-bold">점수</span>
                                                    <span>:</span>
                                                    <div className="relative flex space-x-1">
                                                        <Image
                                                            alt={`${row.trophy_grade}`}
                                                            src={`/achievement/${achievementGradeImage[row.trophy_grade]}.png`}
                                                            width={20}
                                                            height={20}
                                                            className="w-auto h-[20px]"
                                                            priority
                                                        />
                                                        <span>{(row.trophy_score).toLocaleString()}점</span>
                                                    </div>
                                                </div>
                                            }
                                            {
                                                params.category == "theseed" &&
                                                <div className="flex sm:hidden space-x-1">
                                                    <span className="font-bold">기록</span>
                                                    <span>:</span>
                                                    <div className="relative flex space-x-1">
                                                        <span>{row.theseed_floor}층 ({`${parseInt(row.theseed_time_record / 60)}분 ${row.theseed_time_record % 60}초`})</span>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        <Link
                                            href={`/guild/${row.world_name}/${characterBasics[row.character_name]?.character_guild_name}`}
                                            className={cn(
                                                "hover:underline underline-offset-2 inline-flex",
                                                !characterBasics[row.character_name]?.character_guild_name && "pointer-events-none"
                                            )}
                                        >
                                            <span>{characterBasics[row.character_name]?.character_guild_name || "-"}</span>
                                            {
                                                characterBasics[row.character_name]?.character_guild_name &&
                                                <ExternalLink className="ml-1 h-[12px] w-[12px] self-center" />
                                            }
                                        </Link>
                                    </TableCell>
                                    {
                                        params.category == "overall" &&
                                        <TableCell className="hidden sm:table-cell">{characterBasics[row.character_name]?.character_exp_rate || "0.000"}%</TableCell>
                                    }
                                    {
                                        params.category == "union" &&
                                        <>
                                            <TableCell className="hidden sm:table-cell py-2">
                                                <div className="relative flex flex-col place-items-center">
                                                    <Image
                                                        alt="유니온 심볼"
                                                        src={`/union/${unionGradeImage[getUnionGradeName(row.union_level)]}.png`}
                                                        width={50}
                                                        height={50}
                                                        className="w-auto h-[50px]"
                                                        priority
                                                    />
                                                    <span>{(row.union_level).toLocaleString()}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">{(row.union_power).toLocaleString()}</TableCell>
                                        </>
                                    }
                                    {
                                        params.category == "dojang" &&
                                        <TableCell className="hidden sm:table-cell py-2">
                                            <div className="relative flex flex-col place-items-center">
                                                <Image
                                                    alt={`${row.dojang_floor}층 몬스터`}
                                                    src={`/dojang/${row.dojang_floor}.png`}
                                                    width={50}
                                                    height={50}
                                                    className="w-auto h-[50px]"
                                                    priority
                                                />
                                                <span>{row.dojang_floor}층 ({`${parseInt(row.dojang_time_record / 60)}분 ${row.dojang_time_record % 60}초`})</span>
                                            </div>
                                        </TableCell>
                                    }
                                    {
                                        params.category == "achievement" &&
                                        <TableCell className="hidden sm:table-cell py-2">
                                            <div className="relative flex flex-col place-items-center">
                                                <Image
                                                    alt={`${row.trophy_grade}`}
                                                    src={`/achievement/${achievementGradeImage[row.trophy_grade]}.png`}
                                                    width={50}
                                                    height={50}
                                                    className="w-auto h-[50px]"
                                                    priority
                                                />
                                                <span>{(row.trophy_score).toLocaleString()}점</span>
                                            </div>
                                        </TableCell>
                                    }
                                    {
                                        params.category == "theseed" &&
                                        <TableCell className="hidden sm:table-cell">
                                            <div className="flex flex-col items-center">
                                                <span>{row.theseed_floor}층</span>
                                                <span>({`${parseInt(row.theseed_time_record / 60)}분 ${row.theseed_time_record % 60}초`})</span>
                                            </div>
                                        </TableCell>
                                    }
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>

            <LeaderboardsPagination length={rankingData.ranking.length} />
        </>
    )
}

const unionGradeImage = {
    "노비스 유니온 1": "symbol.0.0", "노비스 유니온 2": "symbol.0.1", "노비스 유니온 3": "symbol.0.2", "노비스 유니온 4": "symbol.0.3", "노비스 유니온 5": "symbol.0.4",
    "베테랑 유니온 1": "symbol.1.0", "베테랑 유니온 2": "symbol.1.1", "베테랑 유니온 3": "symbol.1.2", "베테랑 유니온 4": "symbol.1.3", "베테랑 유니온 5": "symbol.1.4",
    "마스터 유니온 1": "symbol.2.0", "마스터 유니온 2": "symbol.2.1", "마스터 유니온 3": "symbol.2.2", "마스터 유니온 4": "symbol.2.3", "마스터 유니온 5": "symbol.2.4",
    "그랜드 마스터 유니온 1": "symbol.3.0", "그랜드 마스터 유니온 2": "symbol.3.1", "그랜드 마스터 유니온 3": "symbol.3.2", "그랜드 마스터 유니온 4": "symbol.3.3", "그랜드 마스터 유니온 5": "symbol.3.4",
    "슈프림 유니온 1": "symbol.4.0", "슈프림 유니온 2": "symbol.4.1", "슈프림 유니온 3": "symbol.4.2", "슈프림 유니온 4": "symbol.4.3", "슈프림 유니온 5": "symbol.4.4",
};

const achievementGradeImage = {
    "브론즈": "emblem.bronze",
    "실버": "emblem.silver",
    "골드": "emblem.gold",
    "플래티넘": "emblem.platinum",
    "다이아몬드": "emblem.diamond",
    "마스터": "emblem.master",
};

function getUnionGradeName(level) {
    if (level < 1000) {
        return '노비스 유니온 1';
    } else if (level < 1500) {
        return '노비스 유니온 2';
    } else if (level < 2000) {
        return '노비스 유니온 3';
    } else if (level < 2500) {
        return '노비스 유니온 4';
    } else if (level < 3000) {
        return '노비스 유니온 5';
    } else if (level < 3500) {
        return '베테랑 유니온 1';
    } else if (level < 4000) {
        return '베테랑 유니온 2';
    } else if (level < 4500) {
        return '베테랑 유니온 3';
    } else if (level < 5000) {
        return '베테랑 유니온 4';
    } else if (level < 5500) {
        return '베테랑 유니온 5';
    } else if (level < 6000) {
        return '마스터 유니온 1';
    } else if (level < 6500) {
        return '마스터 유니온 2';
    } else if (level < 7000) {
        return '마스터 유니온 3';
    } else if (level < 7500) {
        return '마스터 유니온 4';
    } else if (level < 8000) {
        return '마스터 유니온 5';
    } else if (level < 8500) {
        return '그랜드 마스터 유니온 1';
    } else if (level < 9000) {
        return '그랜드 마스터 유니온 2';
    } else if (level < 9500) {
        return '그랜드 마스터 유니온 3';
    } else if (level < 10000) {
        return '그랜드 마스터 유니온 4';
    } else if (level < 10500) {
        return '그랜드 마스터 유니온 5';
    } else if (level < 11000) {
        return '슈프림 유니온 1';
    } else if (level < 11500) {
        return '슈프림 유니온 2';
    } else if (level < 12000) {
        return '슈프림 유니온 3';
    } else if (level < 12500) {
        return '슈프림 유니온 4';
    } else {
        return '슈프림 유니온 5';
    }
}