import { classLevel } from "@/mapleData/classLevel";
import { getCharBasic } from "@/lib/nexonAPI/getCharBasic";
import { getCharDojang } from "@/lib/nexonAPI/getCharDojang";
import { getCharOCID } from "@/lib/nexonAPI/getCharOCID";
import { getRankingOverall } from "@/lib/nexonAPI/getRankingOverall";
import Image from "next/image";
import { getUserUnion } from "@/lib/nexonAPI/getUserUnion";
import { getRankingUnion } from "@/lib/nexonAPI/getRankingUnion";
import { getRankingAchievement } from "@/lib/nexonAPI/getRankingAchievement";
import { getRankingDojang } from "@/lib/nexonAPI/getRankingDojang";
import { getRankingTheseed } from "@/lib/nexonAPI/getRankingTheseed";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";

const unionGradeImage = {
    "노비스 유니온 1": "symbol.0.0",
    "노비스 유니온 2": "symbol.0.1",
    "노비스 유니온 3": "symbol.0.2",
    "노비스 유니온 4": "symbol.0.3",
    "노비스 유니온 5": "symbol.0.4",
    "베테랑 유니온 1": "symbol.1.0",
    "베테랑 유니온 2": "symbol.1.1",
    "베테랑 유니온 3": "symbol.1.2",
    "베테랑 유니온 4": "symbol.1.3",
    "베테랑 유니온 5": "symbol.1.4",
    "마스터 유니온 1": "symbol.2.0",
    "마스터 유니온 2": "symbol.2.1",
    "마스터 유니온 3": "symbol.2.2",
    "마스터 유니온 4": "symbol.2.3",
    "마스터 유니온 5": "symbol.2.4",
    "그랜드 마스터 유니온 1": "symbol.3.0",
    "그랜드 마스터 유니온 2": "symbol.3.1",
    "그랜드 마스터 유니온 3": "symbol.3.2",
    "그랜드 마스터 유니온 4": "symbol.3.3",
    "그랜드 마스터 유니온 5": "symbol.3.4",
    "슈프림 유니온 1": "symbol.4.0",
    "슈프림 유니온 2": "symbol.4.1",
    "슈프림 유니온 3": "symbol.4.2",
    "슈프림 유니온 4": "symbol.4.3",
    "슈프림 유니온 5": "symbol.4.4",
};

const achievementGradeImage = {
    "브론즈": "emblem.bronze",
    "실버": "emblem.silver",
    "골드": "emblem.gold",
    "플래티넘": "emblem.platinum",
    "다이아몬드": "emblem.diamond",
    "마스터": "emblem.master",
};

const dojangFloorMonster = ["", "마노", "머쉬맘", "스텀피", "블루 머쉬맘", "좀비 머쉬맘", "킹슬라임", "다일", "킹크랑", "파우스트", "반 레온", "메탈 골렘", "포장마차", "주니어 발록", "엘리쟈", "크림슨 발록", "설산의 마녀", "세르프", "데우", "파파픽시", "힐라", "디트와 로이 + 네오 휴로이드", "키메라 + 호문스큘러", "프랑켄로이드 + 미스릴 뮤테", "차우 + 원시멧돼지", "에피네아 + 샤이닝 페어리", "롬바드 + 킹 블록골렘", "타이머 + 틱톡", "마스터 스펙터 + 사신 스펙터", "마스터 버크 + 듀얼 버크", "아카이럼", "마뇽 × 2", "그리프 × 2", "크세르크세스 × 2", "파풀라투스 × 2", "알리샤르 × 2", "스노우맨 × 2", "리치 × 2", "아니 × 3", "킹 오멘 × 3", "매그너스", "타르가", "스칼리온", "요괴선사", "데비존", "라바나", "레비아탄", "도도", "릴리노흐", "라이카", "핑크빈", "락 스피릿", "타란튤로스", "드래고니카", "드래곤 라이더", "호크아이", "이카르트", "이리나", "오즈", "미하일", "시그너스", "피아누스", "렉스", "카웅", "변형된 스텀피", "하늘 수호령", "게오르크", "타락마족 강화늑대기수", "아르마", "츄릅나무", "스우", "클리너", "악화된 조화의 정령", "증발하는 에르다스", "아랑", "봉선", "오공", "송달", "황룡", "적호", "무공", "아라네아", "빛의 집행자", "히아데스", "공허의 하수인", "데미안", "황혼의 하수인", "거대한 골렘", "리버스 다크 소울", "절망의 칼날", "윌", "안세스티온", "어센시온", "엠브리온", "각성한 아랑", "각성한 봉선", "각성한 오공", "각성한 송달", "각성한 황룡", "각성한 적호", "각성한 무공"];

export default async function Content({ params, searchParams }) {
    const characterName = decodeURI(params.name);
    const selectedDate = searchParams?.date;
    const OCID = await getCharOCID(characterName);
    const charBasic = await getCharBasic(OCID.ocid, selectedDate);

    const worldName = charBasic?.world_name;
    const character_class = charBasic?.character_class;
    const character_class_level = charBasic?.character_class_level;

    const [
        rankingOverallAllWorld,
        rankingOverallCharacterWorld,
        rankingOverallAllWorldClass,
        rankingOverallCharacterWorldClass,
        userUnion,
        rankingUnionAllWorld,
        rankingUnionCharacterWorld,
        rankingAchievement,
        charDojang,
        rankingDojangAllWorldClass,
        rankingDojangCharacterWorldClass,
        rankingTheseedAllWorld,
        rankingTheseedCharacterWorld,
    ] = await Promise.all([
        getRankingOverall(null, worldName.includes("리부트") ? 1 : 0, null, OCID.ocid, null, selectedDate),
        getRankingOverall(worldName, null, null, OCID.ocid, null, selectedDate),
        getRankingOverall(null, worldName.includes("리부트") ? 1 : 0, `${classLevel[character_class][0]}-${classLevel[character_class][character_class_level]}`, OCID.ocid, null, selectedDate),
        getRankingOverall(worldName, null, `${classLevel[character_class][0]}-${classLevel[character_class][character_class_level]}`, OCID.ocid, null, selectedDate),
        getUserUnion(OCID.ocid, selectedDate),
        getRankingUnion(OCID.ocid, null, null, selectedDate),
        getRankingUnion(OCID.ocid, worldName, null, selectedDate),
        getRankingAchievement(OCID.ocid, null, selectedDate),
        getCharDojang(OCID.ocid, selectedDate),
        getRankingDojang(null, 1, `${classLevel[character_class][0]}-${classLevel[character_class][character_class_level]}`, OCID.ocid, null, selectedDate),
        getRankingDojang(worldName, 1, `${classLevel[character_class][0]}-${classLevel[character_class][character_class_level]}`, OCID.ocid, null, selectedDate),
        getRankingTheseed(OCID.ocid, null, null, selectedDate),
        getRankingTheseed(OCID.ocid, worldName, null, selectedDate),
    ]);

    const character = {
        "rankingOverallAllWorld": rankingOverallAllWorld,
        "rankingOverallCharacterWorld": rankingOverallCharacterWorld,
        "rankingOverallAllWorldClass": rankingOverallAllWorldClass,
        "rankingOverallCharacterWorldClass": rankingOverallCharacterWorldClass,
        "rankingUnionAllWorld": rankingUnionAllWorld,
        "rankingUnionCharacterWorld": rankingUnionCharacterWorld,
        "rankingAchievement": rankingAchievement,
        "charDojang": charDojang,
        "rankingDojangAllWorldClass": rankingDojangAllWorldClass,
        "rankingDojangCharacterWorldClass": rankingDojangCharacterWorldClass,
        "rankingTheseedAllWorld": rankingTheseedAllWorld,
        "rankingTheseedCharacterWorld": rankingTheseedCharacterWorld,
    };

    return (
        <>
            <div className="bg-muted p-2 rounded-md shadow-md">
                <div className="basis-full lg:basis-1/2 bg-background rounded">
                    <div className="grid grid-cols-2 divide-x-0 lg:divide-x-2 divide-y-2 lg:divide-y-0">
                        <div className="col-span-2 lg:col-span-1 flex px-2 sm:px-10 py-3">
                            <div className="self-center text-xl sm:text-2xl font-semibold">
                                전체 서버
                            </div>
                            <div className="flex-1 space-y-2 flex flex-col items-end text-sm sm:text-base">
                                <div className="flex gap-2">
                                    <span>종합 랭킹</span>
                                    <span>{
                                        character?.rankingOverallAllWorld?.ranking?.[0]?.ranking ?
                                            parseInt(character?.rankingOverallAllWorld?.ranking?.[0]?.ranking).toLocaleString() :
                                            "-"
                                    } 위</span>
                                </div>
                                <div className="flex gap-2">
                                    <span>직업 랭킹 </span>
                                    <span>{
                                        character?.rankingOverallAllWorldClass?.ranking?.[0]?.ranking ?
                                            parseInt(character?.rankingOverallAllWorldClass?.ranking?.[0]?.ranking).toLocaleString() :
                                            "-"
                                    } 위</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-2 lg:col-span-1 flex px-2 sm:px-10 py-3">
                            <div className="self-center text-xl sm:text-2xl font-semibold">
                                {worldName} 서버
                            </div>
                            <div className="flex-1 space-y-2 flex flex-col items-end text-sm sm:text-base">
                                <div className="flex gap-2">
                                    <span>종합 랭킹</span>
                                    <span>{
                                        character?.rankingOverallCharacterWorld?.ranking?.[0]?.ranking ?
                                            parseInt(character?.rankingOverallCharacterWorld?.ranking?.[0]?.ranking).toLocaleString() :
                                            "-"
                                    } 위</span>
                                </div>
                                <div className="flex gap-2">
                                    <span>직업 랭킹 </span>
                                    <span>{
                                        character?.rankingOverallCharacterWorldClass?.ranking?.[0]?.ranking ?
                                            parseInt(character?.rankingOverallCharacterWorldClass?.ranking?.[0]?.ranking).toLocaleString() :
                                            "-"
                                    } 위</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"grid gap-2 grid-cols-4 mt-2"}>
                    <div className="col-span-4 md:col-span-2 lg:col-span-1 bg-background rounded">
                        <div className="flex flex-col justify-center text-center m-2">
                            <div className="text-2xl font-semibold">유니온</div>
                            <div className="px-10 mt-5">
                                <div className="relative w-full aspect-square">
                                    <Image
                                        alt="유니온 심볼"
                                        src={`/union/${unionGradeImage[userUnion?.union_grade]}.png`}
                                        className="object-contain" fill sizes="256px" priority
                                    />
                                </div>
                            </div>
                            <div className="mt-5 text-2xl">
                                {userUnion?.union_grade.replace("1", "I").replace("2", "II").replace("3", "III").replace("4", "IV").replace("5", "V")}
                            </div>
                            <div className="text-neutral-500">
                                <span className="text-xs">Lv. </span>
                                <span>{(rankingUnionAllWorld?.ranking?.[0]?.union_level || 0).toLocaleString()}</span>
                            </div>
                            <div className="mt-5">
                                <span>공격대 전투력 : </span>
                                <span>{(rankingUnionAllWorld?.ranking?.[0]?.union_power || 0).toLocaleString()}</span>
                            </div>
                            <div className="mt-5">
                                <span>전체 서버 : </span>
                                <span>{rankingUnionAllWorld?.ranking?.[0]?.ranking ? rankingUnionAllWorld?.ranking?.[0]?.ranking.toLocaleString() + " 위" : "-"}</span>
                            </div>
                            <div className="">
                                <span>{worldName} 서버 : </span>
                                <span>{rankingUnionCharacterWorld?.ranking?.[0]?.ranking ? rankingUnionCharacterWorld?.ranking?.[0]?.ranking.toLocaleString() + " 위" : "-"}</span>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-4 md:col-span-2 lg:col-span-1 bg-background rounded">
                        <div className="flex flex-col justify-center text-center m-2">
                            <div className="text-2xl font-semibold">업적</div>
                            <div className="px-10 mt-5">
                                <div className="relative w-full aspect-square">
                                    {
                                        rankingAchievement?.ranking?.[0]?.trophy_grade &&
                                        <Image
                                            alt="업적 뱃지"
                                            src={`/achievement/${achievementGradeImage[rankingAchievement?.ranking?.[0]?.trophy_grade]}.png`}
                                            className="object-contain" fill sizes="256px" priority
                                        />
                                    }
                                </div>
                            </div>
                            <div className="mt-5 text-2xl">
                                {
                                    rankingAchievement?.ranking?.[0]?.trophy_grade ?
                                        rankingAchievement?.ranking?.[0]?.trophy_grade :
                                        "-"
                                }
                            </div>
                            <div className="text-neutral-500">
                                <span>{rankingAchievement?.ranking?.[0]?.trophy_score ? rankingAchievement?.ranking?.[0]?.trophy_score.toLocaleString() + "점" : "-"}</span>
                            </div>
                            <div className="mt-5">
                                <br />
                            </div>
                            <div className="mt-5">
                                <span>전체 서버 : </span>
                                <span>{rankingAchievement?.ranking?.[0]?.ranking ? rankingAchievement?.ranking?.[0]?.ranking.toLocaleString() + " 위" : "-"}</span>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-4 md:col-span-2 lg:col-span-1 bg-background rounded">
                        <div className="flex flex-col justify-center text-center m-2">
                            <div className="text-2xl font-semibold">무릉도장</div>
                            <div className="px-10 mt-5">
                                <div className="w-full aspect-square">
                                    {
                                        charDojang?.dojang_best_floor >= 1 &&
                                        <HoverCard openDelay={0} closeDelay={0}>
                                            <HoverCardTrigger asChild>
                                                <Button variant="link" className="relative w-full h-full p-0 cursor-default">
                                                    <Image
                                                        alt="무릉도장 몬스터"
                                                        src={`/dojang/${charDojang?.dojang_best_floor}.png`}
                                                        className="object-contain" fill sizes="256px" priority
                                                    />
                                                </Button>
                                            </HoverCardTrigger>
                                            <HoverCardContent
                                                className="text-white w-auto p-3 bg-neutral-800 dark:bg-popover"
                                                side={"top"}
                                            >
                                                <div>
                                                    <span>{dojangFloorMonster[charDojang?.dojang_best_floor]}</span>
                                                </div>
                                            </HoverCardContent>
                                        </HoverCard>
                                    }
                                </div>
                            </div>
                            <div className="mt-5 text-2xl">
                                {charDojang?.dojang_best_floor ? charDojang?.dojang_best_floor + "층" : "-"}
                            </div>
                            <div className="text-neutral-500">
                                <span>
                                    {
                                        charDojang?.dojang_best_floor ?
                                            `${parseInt(charDojang?.dojang_best_time / 60)}분 ${charDojang?.dojang_best_time % 60}초` :
                                            "-"
                                    }
                                </span>
                            </div>
                            <div className="mt-5">
                                <span>기록 갱신일 : </span>
                                <span>
                                    {
                                        charDojang?.date_dojang_record ?
                                            `${new Date(charDojang?.date_dojang_record).getFullYear()}년 ${new Date(charDojang?.date_dojang_record).getMonth() + 1}월 ${new Date(charDojang?.date_dojang_record).getDate()}일` :
                                            "-"
                                    }
                                </span>
                            </div>
                            <div className="mt-5">
                                <span>전체 서버 : </span>
                                <span>{rankingDojangAllWorldClass?.ranking?.[0]?.ranking ? rankingDojangAllWorldClass?.ranking?.[0]?.ranking.toLocaleString() + " 위" : "-"}</span>
                            </div>
                            <div className="">
                                <span>{worldName} 서버 : </span>
                                <span>{rankingDojangAllWorldClass?.ranking?.[0]?.ranking ? rankingDojangAllWorldClass?.ranking?.[0]?.ranking.toLocaleString() + " 위" : "-"}</span>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-4 md:col-span-2 lg:col-span-1 bg-background rounded">
                        <div className="flex flex-col justify-center text-center m-2">
                            <div className="text-2xl font-semibold">더 시드</div>
                            <div className="px-10 mt-5">
                                <div className="relative w-full aspect-square">
                                    {
                                        rankingTheseedAllWorld?.ranking?.[0]?.theseed_floor >= 5 &&
                                        <Image
                                            alt="더 시드 훈장"
                                            src={`/theseed/${getTheseedMedalImage(rankingTheseedAllWorld?.ranking?.[0]?.theseed_floor)}.png`}
                                            className="object-contain" fill sizes="256px" priority
                                            quality={100}
                                        />
                                    }
                                </div>
                            </div>
                            <div className="mt-5 text-2xl">
                                {rankingTheseedAllWorld?.ranking?.[0]?.theseed_floor ? rankingTheseedAllWorld?.ranking?.[0]?.theseed_floor + " 층" : "-"}
                            </div>
                            <div className="text-neutral-500">
                                <span>
                                    {
                                        rankingTheseedAllWorld?.ranking?.[0]?.theseed_floor ?
                                            `${parseInt(rankingTheseedAllWorld?.ranking?.[0]?.theseed_time_record / 60)}분 ${rankingTheseedAllWorld?.ranking?.[0]?.theseed_time_record % 60}초` :
                                            "-"
                                    }
                                </span>
                            </div>
                            <div className="mt-5">
                                <br />
                            </div>
                            <div className="mt-5">
                                <span>전체 서버 : </span>
                                <span>{rankingTheseedAllWorld?.ranking?.[0]?.ranking ? rankingTheseedAllWorld?.ranking?.[0]?.ranking.toLocaleString() + " 위" : "-"}</span>
                            </div>
                            <div className="">
                                <span>{worldName} 서버 : </span>
                                <span>{rankingTheseedCharacterWorld?.ranking?.[0]?.ranking ? rankingTheseedCharacterWorld?.ranking?.[0]?.ranking.toLocaleString() + " 위" : "-"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}


function getTheseedMedalImage(floor) {
    if (floor < 5) {
        return '';
    } else if (floor < 10) {
        return '5';
    } else if (floor < 15) {
        return '10';
    } else if (floor < 20) {
        return '15';
    } else if (floor < 25) {
        return '20';
    } else if (floor < 30) {
        return '25';
    } else if (floor < 35) {
        return '30';
    } else if (floor < 40) {
        return '35';
    } else if (floor < 45) {
        return '40';
    } else if (floor < 50) {
        return '45';
    } else {
        return '50';
    }
}