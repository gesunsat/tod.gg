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
    const top100 = [
        "조선우",
        "르헤솔",
        "맑음",
        "겨울",
        "수호",
        "토니",
        "렌조",
        "진격캐넌",
        "피엘",
        "으찌",
        "토르",
        "불행",
        "도끼",
        "초코빵내꺼야",
        "냉은",
        "아크",
        "건물주",
        "박세웅",
        "시프",
        "아침보름",
        "천원",
        "꿈달",
        "세계",
        "독사",
        "성배",
        "뚱달콤",
        "포츈베이요넷",
        "끼토",
        "응급",
        "아델",
        "구닌",
        "식초",
        "냥들",
        "후니",
        "반로",
        "세븐",
        "버프가부족햠",
        "휴씨엔버",
        "고딩",
        "페이커",
        "개사기",
        "티레사",
        "무토",
        "양주",
        "반반",
        "반민우",
        "zl존",
        "리트",
        "알티",
        "비올팬",
        "토햐",
        "혈점",
        "타일런트",
        "메구루루",
        "동정녀",
        "남준",
        "자유",
        "영원",
        "테러비터",
        "에휴",
        "공주",
        "Mr자비",
        "Rudolf",
        "오두현",
        "신의아이제로",
        "햄톨",
        "글죠",
        "솔라",
        "영왕",
        "퍼리",
        "이국주",
        "맹쿠",
        "대갈텀",
        "연놈",
        "축일추풍",
        "카라",
        "석현",
        "뜬궁",
        "포던",
        "곤봉",
        "을가",
        "코토",
        "51새",
        "교황",
        "치임",
        "탄환님",
        "에브",
        "TheKing",
        "놈현",
        "단소",
        "리터",
        "피글렛",
        "데덩",
        "청순해",
        "작반",
        "잊쉭",
        "장브로",
        "승수",
        "토하",
        "의뢰장"
    ]

    const characterBasics = {};
    const promises = [];
    for (const character of top100) {
        promises.push((async () => {
            const OCID = await getCharOCID(character);
            const basic = await getCharBasic(OCID.ocid);
            characterBasics[character] = basic;
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
                        top100.map((row, rowIndex) => {
                            return (
                                <TableRow key={rowIndex}>
                                    <TableCell className="text-center px-0 py-2">{rowIndex + 1}위</TableCell>
                                    <TableCell className="flex px-0 sm:py-2 gap-3">
                                        <div className="w-[72px] h-[72px] relative self-center">
                                            {
                                                characterBasics[row]?.character_image ?
                                                    <div
                                                        style={{ '--image-url': `url(${characterBasics[row].character_image})` }}
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
                                                    src={serverIconImg[characterBasics[row].world_name]}
                                                    alt={characterBasics[row]?.world_name}
                                                    width={27}
                                                    height={27}
                                                />
                                                <Link
                                                    className="flex space-x-1 hover:underline underline-offset-2"
                                                    href={`/char/${row}`}
                                                    target="_blank"
                                                >
                                                    <span>{row}</span>
                                                    <ExternalLink className="h-[12px] w-[12px] self-center" />
                                                </Link>
                                            </div>
                                            <div className="flex gap-2">
                                                <span>
                                                    Lv.{characterBasics[row]?.character_level}
                                                </span>
                                                <span>|</span>
                                                <span>
                                                    {characterBasics[row]?.character_class}
                                                </span>
                                            </div>
                                            <div className="flex sm:hidden space-x-1">
                                                <span className="font-bold">길드</span>
                                                <span>:</span>
                                                <Link
                                                    target="_blank"
                                                    href={`/guild/${characterBasics[row].world_name}/${characterBasics[row]?.character_guild_name}`}
                                                    className={cn(
                                                        "flex space-x-1 hover:underline underline-offset-2",
                                                        !characterBasics[row]?.character_guild_name && "pointer-events-none"
                                                    )}
                                                >
                                                    <span>{characterBasics[row]?.character_guild_name || "-"}</span>
                                                    {
                                                        characterBasics[row]?.character_guild_name &&
                                                        <ExternalLink className="ml-1 h-[12px] w-[12px] self-center" />
                                                    }
                                                </Link>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        <Link
                                            target="_blank"
                                            href={`/guild/${characterBasics[row].world_name}/${characterBasics[row]?.character_guild_name}`}
                                            className={cn(
                                                "hover:underline underline-offset-2 inline-flex",
                                                !characterBasics[row]?.character_guild_name && "pointer-events-none"
                                            )}
                                        >
                                            <span>{characterBasics[row]?.character_guild_name || "-"}</span>
                                            {
                                                characterBasics[row]?.character_guild_name &&
                                                <ExternalLink className="ml-1 h-[12px] w-[12px] self-center" />
                                            }
                                        </Link>
                                    </TableCell>
                                    {
                                        params.category == "overall" &&
                                        <TableCell className="hidden sm:table-cell">{characterBasics[row]?.character_exp_rate || "0.000"}%</TableCell>
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