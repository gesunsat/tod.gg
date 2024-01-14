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

const unionGradeImage = {
    "노비스 I": "symbol.0.0",
    "노비스 II": "symbol.0.1",
    "노비스 III": "symbol.0.2",
    "노비스 IV": "symbol.0.3",
    "노비스 V": "symbol.0.4",
    "마스터 I": "symbol.2.0",
    "마스터 II": "symbol.2.1",
    "마스터 III": "symbol.2.2",
    "마스터 IV": "symbol.2.3",
    "마스터 V": "symbol.2.4",
    "그랜드마스터 I": "symbol.3.0",
    "그랜드마스터 II": "symbol.3.1",
    "그랜드마스터 III": "symbol.3.2",
    "그랜드마스터 IV": "symbol.3.3",
    "그랜드마스터 V": "symbol.3.4",
    "슈프림 I": "symbol.4.0",
    "슈프림 II": "symbol.4.1",
    "슈프림 III": "symbol.4.2",
    "슈프림 IV": "symbol.4.3",
    "슈프림 V": "symbol.4.4",
};
const achievementGradeImage = {
    "브론즈": "emblem.bronze",
    "실버": "emblem.silver",
    "골드": "emblem.gold",
    "플래티넘": "emblem.platinum",
    "다이아몬드": "emblem.diamond",
    "마스터": "emblem.master",
};

export default async function Content({ params }) {
    const characterName = decodeURI(params.name);
    const OCID = await getCharOCID(characterName);
    const charBasic = await getCharBasic(OCID.ocid);

    const worldName = charBasic?.world_name;
    const guildName = charBasic?.character_guild_name;
    const character_class = charBasic?.character_class;
    const character_class_level = charBasic?.character_class_level;

    const [
        rankingOverallAllWorld,
        rankingOverallCharacterWorld,
        rankingOverallAllWorldClass,
        rankingOverallCharacterWorldClass,
        rankingUnionAllWorld,
        rankingUnionCharacterWorld,
        rankingAchievement,
        charDojang,
        rankingDojangAllWorldClass,
        rankingDojangCharacterWorldClass,
        rankingTheseedAllWorld,
        rankingTheseedCharacterWorld,
    ] = await Promise.all([
        getRankingOverall(null, worldName.includes("리부트") ? 1 : 0, null, OCID.ocid),
        getRankingOverall(worldName, null, null, OCID.ocid),
        getRankingOverall(null, worldName.includes("리부트") ? 1 : 0, `${classLevel[character_class][0]}-${classLevel[character_class][character_class_level]}`, OCID.ocid),
        getRankingOverall(worldName, null, `${classLevel[character_class][0]}-${classLevel[character_class][character_class_level]}`, OCID.ocid),
        getRankingUnion(OCID.ocid, null),
        getRankingUnion(OCID.ocid, worldName),
        getRankingAchievement(OCID.ocid, null),
        getCharDojang(OCID.ocid),
        getRankingDojang(null, 1, `${classLevel[character_class][0]}-${classLevel[character_class][character_class_level]}`, OCID.ocid),
        getRankingDojang(worldName, 1, `${classLevel[character_class][0]}-${classLevel[character_class][character_class_level]}`, OCID.ocid),
        getRankingTheseed(OCID.ocid, null),
        getRankingTheseed(OCID.ocid, worldName),
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
    const userUnionGradeName = getUnionGradeName(parseInt(rankingUnionAllWorld?.ranking?.[0]?.union_level || 0));

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
                                        src={`/union/${unionGradeImage[userUnionGradeName]}.png`}
                                        className="object-contain" fill sizes="256px" priority
                                    />
                                </div>
                            </div>
                            <div className="mt-5 text-2xl">
                                {userUnionGradeName}
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
                                    <Image
                                        alt="업적 뱃지"
                                        src={`/achievement/${achievementGradeImage[rankingAchievement?.ranking?.[0]?.trophy_grade]}.png`}
                                        className="object-contain" fill sizes="256px" priority
                                    />
                                </div>
                            </div>
                            <div className="mt-5 text-2xl">
                                {rankingAchievement?.ranking?.[0]?.trophy_grade}
                            </div>
                            <div className="text-neutral-500">
                                <span>{(rankingAchievement?.ranking?.[0]?.trophy_score || 0).toLocaleString()}점</span>
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
                                <div className="relative w-full aspect-square">
                                    {
                                        charDojang?.dojang_best_floor >= 1 &&
                                        <Image
                                            alt="무릉도장 몬스터"
                                            src={`/dojang/${charDojang?.dojang_best_floor}.png`}
                                            className="object-contain" fill sizes="256px" priority
                                        />
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

function getUnionGradeName(level) {
    if (level < 1000) {
        return '노비스 I';
    } else if (level < 1500) {
        return '노비스 II';
    } else if (level < 2000) {
        return '노비스 III';
    } else if (level < 2500) {
        return '노비스 IV';
    } else if (level < 3000) {
        return '노비스 V';
    } else if (level < 3500) {
        return '베테랑 I';
    } else if (level < 4000) {
        return '베테랑 II';
    } else if (level < 4500) {
        return '베테랑 III';
    } else if (level < 5000) {
        return '베테랑 IV';
    } else if (level < 5500) {
        return '베테랑 V';
    } else if (level < 6000) {
        return '마스터 I';
    } else if (level < 6500) {
        return '마스터 II';
    } else if (level < 7000) {
        return '마스터 III';
    } else if (level < 7500) {
        return '마스터 IV';
    } else if (level < 8000) {
        return '마스터 V';
    } else if (level < 8500) {
        return '그랜드마스터 I';
    } else if (level < 9000) {
        return '그랜드마스터 II';
    } else if (level < 9500) {
        return '그랜드마스터 III';
    } else if (level < 10000) {
        return '그랜드마스터 IV';
    } else if (level < 10500) {
        return '그랜드마스터 V';
    } else if (level < 11000) {
        return '슈프림 I';
    } else if (level < 11500) {
        return '슈프림 II';
    } else if (level < 12000) {
        return '슈프림 III';
    } else if (level < 12500) {
        return '슈프림 IV';
    } else {
        return '슈프림 V';
    }
}

function getAchieveGradeName(score, rank) {
    if (score >= 30000 && rank <= 100) {
        return '마스터';
    } else if (score < 5000) {
        return '브론즈';
    } else if (score < 20000) {
        return '실버';
    } else if (score < 30000) {
        return '골드';
    } else if (score < 36000) {
        return '플래티넘';
    } else {
        return '다이아몬드';
    }
}