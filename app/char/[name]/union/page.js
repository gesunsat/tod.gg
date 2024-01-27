import { cn } from "@/lib/utils"
import { union_raider_vector_map } from "./union_raider_vector_map"
import { getCharOCID } from "@/lib/nexonAPI/getCharOCID";
import { getUserUnionRaider } from "@/lib/nexonAPI/getUserUnionRaider";
import { getUserUnion } from "@/lib/nexonAPI/getUserUnion";
import Image from "next/image";
import { Fragment } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getUserUnionArtifact } from "@/lib/nexonAPI/getUserUnionArtifact";
import Style from "./union.module.css";
import { getYesterdayDate } from "@/lib/getYesterdayDate";

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

function getUnionGrade(level, character_class) {
    if (character_class == "제로") {
        if (level < 130) {
            return '';
        } else if (level < 160) {
            return 'B';
        } else if (level < 180) {
            return 'A';
        } else if (level < 200) {
            return 'S';
        } else if (level < 250) {
            return 'SS';
        } else {
            return 'SSS';
        }
    }

    if (character_class == "모바일 캐릭터") {
        if (level < 30) {
            return '';
        } else if (level < 50) {
            return 'B';
        } else if (level < 70) {
            return 'A';
        } else if (level < 120) {
            return 'S';
        } else {
            return 'SS';
        }
    }

    if (level < 60) {
        return '';
    } else if (level < 100) {
        return 'B';
    } else if (level < 140) {
        return 'A';
    } else if (level < 200) {
        return 'S';
    } else if (level < 250) {
        return 'SS';
    } else {
        return 'SSS';
    }
};

const classWithAnImage = [
    "소울마스터", "칼리", "데몬어벤져",
    "패스파인더", "키네시스", "스트라이커",
    "팬텀", "비숍", "나이트로드",
    "보우마스터", "제로", "아란",
    "블래스터", "메르세데스", "듀얼블레이더",
    "에반", "아크", "카데나",
    "메카닉", "제논", "은월",
    "캐논마스터", "와일드헌터", "아델",
    "호영", "나이트워커", "신궁",
    "히어로", "바이퍼", "윈드브레이커",
    "카인", "엔젤릭버스터", "카이저",
    "팔라딘", "섀도어", "캡틴",
    "데몬슬레이어", "루미너스", "일리움",
    "라라", "다크나이트", "미하일",
    "배틀메이지", "아크메이지(불,독)", "아크메이지(썬,콜)",
    "플레임위자드"
];

const artifactMonsterImageSize = {
    "artifact.0.evo": { w: 130, h: 136 },
    "artifact.0": { w: 128, h: 122 },
    "artifact.1.evo": { w: 119, h: 118 },
    "artifact.1": { w: 111, h: 111 },
    "artifact.2.evo": { w: 136, h: 130 },
    "artifact.2": { w: 128, h: 122 },
    "artifact.3.evo": { w: 124, h: 120 },
    "artifact.3": { w: 116, h: 114 },
    "artifact.4.evo": { w: 164, h: 136 },
    "artifact.4": { w: 157, h: 129 },
    "artifact.5.evo": { w: 145, h: 135 },
    "artifact.5": { w: 136, h: 127 },
    "artifact.6.evo": { w: 157, h: 133 },
    "artifact.6": { w: 150, h: 125 },
    "artifact.7.evo": { w: 111, h: 129 },
    "artifact.7": { w: 104, h: 122 },
    "artifact.8.evo": { w: 167, h: 139 },
    "artifact.8": { w: 159, h: 132 },
}

export default async function Union({ params, searchParams }) {
    const characterName = decodeURI(params.name);
    const selectedDate = searchParams?.date;
    const OCID = await getCharOCID(characterName);
    const [
        userUnion,
        userUnionRaider,
        userUnionArtifact,
    ] = await Promise.all([
        getUserUnion(OCID.ocid, selectedDate),
        getUserUnionRaider(OCID.ocid, selectedDate),
        getUserUnionArtifact(OCID.ocid, selectedDate),
    ]);

    const fill_vector = [];
    const raider_x_size = 20;
    const raider_y_size = 22;
    const classList = [];
    userUnionRaider?.union_block?.map((block) => {
        classList.push([
            block.block_class,
            block.block_level,
            getUnionGrade(parseInt(block.block_level), block.block_class)
        ])
        block.block_position.map((position) => {
            const x = position.x;
            const y = position.y;

            fill_vector.push((((raider_y_size / 2) - y) * raider_y_size) + (x - (raider_x_size / 2)))
        })
    })
    classList.sort((a, b) => {
        if (a[1] > b[1]) return -1;
        if (a[1] < b[1]) return 1;
        return 0;
    });

    const UnionSymbol = () => {
        return (
            <div className="flex justify-center gap-2 h-auto">
                <div className="relative h-24 aspect-square">
                    <Image
                        alt="유니온 심볼"
                        src={`/union/${unionGradeImage[userUnion?.union_grade]}.png`}
                        className="object-contain" fill sizes="256px" priority
                    />
                </div>
                <div className="text-lg font-semibold self-center text-center relative">
                    <div>{userUnion?.union_grade.replace("1", "I").replace("2", "II").replace("3", "III").replace("4", "IV").replace("5", "V")}</div>
                    <div className="absolute left-1/2 -translate-x-1/2 text-neutral-500 text-sm">Lv.{userUnion?.union_level}</div>
                </div>
            </div>
        )
    }

    const effectAbbreviation = (str) => {
        str = str.replace(" 증가", "");
        str = str.replace("최대 HP/MP", "HP");
        str = str.replace("공격력/마력", "공/마");
        str = str.replace("보스 몬스터 공격 시 데미지", "보공");
        str = str.replace("몬스터 방어율 무시", "방무");
        str = str.replace("버프 지속시간", "벞지");
        str = str.replace("재사용 대기시간 미적용 확률", "쿨초");
        str = str.replace("메소 획득량", "메획");
        str = str.replace("아이템 드롭률", "아획");
        str = str.replace("크리티컬 확률", "크확");
        str = str.replace("크리티컬 데미지", "크뎀");
        str = str.replace("추가 경험치 획득", "추경");
        str = str.replace("상태이상 내성", "내성");
        str = str.replace("소환수 지속시간", "소환수");
        str = str.replace("파이널 어택류 스킬 데미지", "파이널");
        return str;
    }

    return (
        <>
            <div className="space-y-2">
                <div className="bg-muted p-2 rounded-md">
                    <div className="grid grid-cols-3 gap-2">
                        <div className="col-span-3 lg:col-span-2">
                            <div className="grid grid-cols-3 gap-5">
                                {
                                    Array(9).fill().map((_, artifactIndex) => {
                                        return (
                                            <div
                                                key={artifactIndex}
                                                className={cn(
                                                    "col-span-1 w-full aspect-[1/1.18] rounded-2xl",
                                                    // userUnionArtifact?.union_artifact_crystal?.[artifactIndex]?.level == 5 ?
                                                    //     "from-indigo-500" :
                                                    //     "from-sky-500"

                                                )}
                                            >
                                                <div className="flex flex-col w-full h-full justify-center relative">
                                                    {
                                                        (
                                                            userUnionArtifact?.union_artifact_crystal?.[artifactIndex]?.name &&
                                                            new Date(selectedDate || getYesterdayDate() + " 23:59:59") < new Date(userUnionArtifact?.union_artifact_crystal?.[artifactIndex]?.date_expire)
                                                        ) ?
                                                            <Image
                                                                className="absolute top-0 w-full h-full"
                                                                alt={`slot_${artifactIndex}`}
                                                                src={`/artifact/artifact.slot${userUnionArtifact?.union_artifact_crystal?.[artifactIndex]?.level == 5 ? ".evo" : ""}.png`}
                                                                priority
                                                                width={178}
                                                                height={210}
                                                            /> :
                                                            <Image
                                                                className="absolute top-0 w-full h-full"
                                                                alt={`slot_${artifactIndex}`}
                                                                src={`/artifact/disabledSlot.png`}
                                                                priority
                                                                width={178}
                                                                height={210}
                                                            />
                                                    }
                                                    {
                                                        (
                                                            userUnionArtifact?.union_artifact_crystal?.[artifactIndex]?.level == 5 &&
                                                            new Date(selectedDate || getYesterdayDate() + " 23:59:59") < new Date(userUnionArtifact?.union_artifact_crystal?.[artifactIndex]?.date_expire)
                                                        ) &&
                                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-auto aspect-square">
                                                            <div className={cn(
                                                                "w-full aspect-square rounded-full",
                                                                Style.evoCircleGlow
                                                            )} />
                                                        </div>
                                                    }
                                                    {
                                                        (
                                                            userUnionArtifact?.union_artifact_crystal?.[artifactIndex]?.level >= 1 &&
                                                            new Date(selectedDate || getYesterdayDate() + " 23:59:59") < new Date(userUnionArtifact?.union_artifact_crystal?.[artifactIndex]?.date_expire)
                                                        ) &&
                                                        <video
                                                            autoPlay muted loop
                                                            className={cn(
                                                                "absolute object-cover w-3/4",
                                                                userUnionArtifact?.union_artifact_crystal?.[artifactIndex]?.level <= 1 ?
                                                                    "top-3/4 left-1/2 -translate-x-1/2" :
                                                                    userUnionArtifact?.union_artifact_crystal?.[artifactIndex]?.level <= 4 ?
                                                                        "bottom-1 left-1/2 -translate-x-1/2" :
                                                                        "bottom-1 left-1/2 -translate-x-1/2"

                                                            )}
                                                        >
                                                            <source
                                                                type="video/webm"
                                                                src={
                                                                    `/artifact/gradeEffect${userUnionArtifact?.union_artifact_crystal?.[artifactIndex]?.level <= 1 ?
                                                                        "" :
                                                                        userUnionArtifact?.union_artifact_crystal?.[artifactIndex]?.level <= 4 ?
                                                                            "Normal" :
                                                                            "Evo"
                                                                    }.webm`
                                                                }
                                                                className=""
                                                            />
                                                        </video>
                                                    }
                                                    <div className="relative h-3/5 mb-2 self-center">
                                                        <Image
                                                            alt={userUnionArtifact?.union_artifact_crystal?.[artifactIndex]?.name || `monster_${artifactIndex}`}
                                                            src={`/artifact/artifact.${artifactIndex}${userUnionArtifact?.union_artifact_crystal?.[artifactIndex]?.level == 5 ? "" : ""}.png`}
                                                            className={cn(
                                                                "object-contain h-full w-auto scale-75 sm:scale-100 translate-y-3",
                                                                userUnionArtifact?.union_artifact_crystal?.[artifactIndex]?.name == "크리스탈 : 스텀프" && "translate-x-[3px] sm:translate-x-[5px]",
                                                                new Date(selectedDate || getYesterdayDate() + " 23:59:59") > new Date(userUnionArtifact?.union_artifact_crystal?.[artifactIndex]?.date_expire) && "grayscale brightness-[0.35]",
                                                                !userUnionArtifact?.union_artifact_crystal?.[artifactIndex]?.name && "grayscale brightness-[0.35]",
                                                                (5 > userUnionArtifact?.union_artifact_crystal?.[artifactIndex]?.level && userUnionArtifact?.union_artifact_crystal?.[artifactIndex]?.level >= 2) && Style.normalGlow,
                                                                (
                                                                    userUnionArtifact?.union_artifact_crystal?.[artifactIndex]?.level == 5 &&
                                                                    new Date(selectedDate || getYesterdayDate() + " 23:59:59") < new Date(userUnionArtifact?.union_artifact_crystal?.[artifactIndex]?.date_expire)
                                                                ) && Style.evoGlow,
                                                            )}
                                                            width={artifactMonsterImageSize[`artifact.${artifactIndex}${userUnionArtifact?.union_artifact_crystal?.[artifactIndex]?.level == 5 ? ".evo" : ""}`]?.w}
                                                            height={artifactMonsterImageSize[`artifact.${artifactIndex}${userUnionArtifact?.union_artifact_crystal?.[artifactIndex]?.level == 5 ? ".evo" : ""}`]?.h}
                                                        />
                                                    </div>
                                                    {
                                                        userUnionArtifact?.union_artifact_crystal?.[artifactIndex]?.level >= 1 &&
                                                        <div className={cn(
                                                            "absolute top-5 left-1/2 -translate-x-1/2 w-full",
                                                            new Date(selectedDate || getYesterdayDate() + " 23:59:59") > new Date(userUnionArtifact?.union_artifact_crystal?.[artifactIndex]?.date_expire) ? "h-[17px]" : "h-[23px]"
                                                        )}>
                                                            <div className="flex flex-row justify-center h-1/2 sm:h-full">
                                                                {
                                                                    Array(userUnionArtifact?.union_artifact_crystal?.[artifactIndex]?.level).fill().map((_, levelIndex) => {
                                                                        return (
                                                                            <div
                                                                                key={levelIndex}
                                                                                className={cn("aspect-square h-auto w-auto relative")}
                                                                            >
                                                                                <Image
                                                                                    alt={"등급 레벨"}
                                                                                    src={`/artifact/level${new Date(selectedDate || getYesterdayDate() + " 23:59:59") > new Date(userUnionArtifact?.union_artifact_crystal?.[artifactIndex]?.date_expire) ? ".disabled" : ""}.png`}
                                                                                    className="scale-125 lg:scale-100 w-auto h-auto"
                                                                                    width={23}
                                                                                    height={23}
                                                                                />
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                        </div>
                                                    }
                                                    {
                                                        !userUnionArtifact?.union_artifact_crystal?.[artifactIndex]?.name &&
                                                        <Image
                                                            alt={"슬롯 미개방"}
                                                            src={`/artifact/disabled.png`}
                                                            className={cn(
                                                                "absolute top-0 w-full h-full",
                                                                // userUnionArtifact?.union_artifact_crystal?.[artifactIndex]?.name == "크리스탈 : 스텀프" && "translate-x-[3px] sm:translate-x-[5px]"
                                                            )}
                                                            width={176}
                                                            height={206}
                                                        />
                                                    }
                                                    {
                                                        new Date(selectedDate || getYesterdayDate() + " 23:59:59") > new Date(userUnionArtifact?.union_artifact_crystal?.[artifactIndex]?.date_expire) &&
                                                        <Image
                                                            alt={"유효기간 만료"}
                                                            src={`/artifact/outdated.png`}
                                                            className={cn(
                                                                "absolute top-0 w-full h-full",
                                                                // userUnionArtifact?.union_artifact_crystal?.[artifactIndex]?.name == "크리스탈 : 스텀프" && "translate-x-[3px] sm:translate-x-[5px]"
                                                            )}
                                                            width={176}
                                                            height={206}
                                                        />
                                                    }
                                                    {
                                                        (
                                                            userUnionArtifact?.union_artifact_crystal?.[artifactIndex]?.level >= 1 &&
                                                            new Date(selectedDate || getYesterdayDate() + " 23:59:59") < new Date(userUnionArtifact?.union_artifact_crystal?.[artifactIndex]?.date_expire)
                                                        ) &&
                                                        <div className="text-center flex justify-center absolute bottom-0 w-full h-1/6 backdrop-blur-[3px] rounded-b-lg flex-none transition-colors duration-500 lg:z-50 bg-white/60 dark:bg-black/60">
                                                            <ul className="mt-1 flex gap-0 sm:gap-3 text-xs sm:text-base">
                                                                <li>{effectAbbreviation(userUnionArtifact?.union_artifact_crystal?.[artifactIndex]?.crystal_option_name_1)}</li>
                                                                <li>|</li>
                                                                <li>{effectAbbreviation(userUnionArtifact?.union_artifact_crystal?.[artifactIndex]?.crystal_option_name_2)}</li>
                                                                <li>|</li>
                                                                <li>{effectAbbreviation(userUnionArtifact?.union_artifact_crystal?.[artifactIndex]?.crystal_option_name_3)}</li>
                                                            </ul>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="col-span-3 lg:col-span-1">
                            <div className="flex flex-col h-full">
                                <div className="flex justify-center gap-2 h-24">
                                    <div className="text-lg font-semibold self-center text-center relative">
                                        <div>ARTIFACT Lv.{userUnion?.artifact_level >= 1 ? userUnion?.artifact_level : "0"}</div>
                                    </div>
                                </div>
                                <div className="bg-background rounded h-full">
                                    <div className="font-semibold px-2 pt-2 pb-3">
                                        아티팩트 효과
                                    </div>
                                    <div className="ms-3">
                                        {
                                            userUnionArtifact?.union_artifact_effect?.map((effect, effectIndex) => {
                                                return (
                                                    <Fragment key={effectIndex}>
                                                        <div>Lv.{effect.level} {effect.name}</div>
                                                    </Fragment>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-muted p-2 rounded-md">
                    <div className="flex flex-row flex-wrap">
                        <div className="basis-full lg:basis-2/3 order-1 relative">
                            <div className="grid grid-cols-[repeat(22,_minmax(0,_1fr))] aspect-[22/20]">
                                {
                                    Array(raider_x_size * raider_y_size).fill().map((_, bgCubeIndex) => {
                                        return (
                                            <div
                                                key={bgCubeIndex}
                                                className={cn(
                                                    "col-span-1 bg-gray-800 border-[1px] border-gray-700",
                                                    fill_vector.includes(bgCubeIndex + 1) && "bg-orange-200 border-orange-200 shadow-inner shadow-amber-100 drop-shadow-2xl"
                                                )}
                                                style={union_raider_vector_map[bgCubeIndex]}
                                            />
                                        )
                                    })
                                }
                            </div>
                            <div className="absolute top-0 right-0 text-lg text-white font-bold h-full w-full">
                                <div className="relative h-full w-full">
                                    <div style={{ textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000" }} className="absolute -translate-x-1/2 -translate-y-1/2 text-xs sm:text-lg whitespace-nowrap top-[33%] left-[43%]">{userUnionRaider?.union_inner_stat?.[0]?.stat_field_effect.replace("유니온 ", "").replace("최대 ", "")}</div>
                                    <div style={{ textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000" }} className="absolute -translate-x-1/2 -translate-y-1/2 text-xs sm:text-lg whitespace-nowrap top-[33%] left-[57%]">{userUnionRaider?.union_inner_stat?.[1]?.stat_field_effect.replace("유니온 ", "").replace("최대 ", "")}</div>
                                    <div style={{ textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000" }} className="absolute -translate-x-1/2 -translate-y-1/2 text-xs sm:text-lg whitespace-nowrap top-[42%] left-[70%]">{userUnionRaider?.union_inner_stat?.[2]?.stat_field_effect.replace("유니온 ", "").replace("최대 ", "")}</div>
                                    <div style={{ textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000" }} className="absolute -translate-x-1/2 -translate-y-1/2 text-xs sm:text-lg whitespace-nowrap top-[58%] left-[70%]">{userUnionRaider?.union_inner_stat?.[3]?.stat_field_effect.replace("유니온 ", "").replace("최대 ", "")}</div>
                                    <div style={{ textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000" }} className="absolute -translate-x-1/2 -translate-y-1/2 text-xs sm:text-lg whitespace-nowrap top-[67%] left-[57%]">{userUnionRaider?.union_inner_stat?.[4]?.stat_field_effect.replace("유니온 ", "").replace("최대 ", "")}</div>
                                    <div style={{ textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000" }} className="absolute -translate-x-1/2 -translate-y-1/2 text-xs sm:text-lg whitespace-nowrap top-[67%] left-[43%]">{userUnionRaider?.union_inner_stat?.[5]?.stat_field_effect.replace("유니온 ", "").replace("최대 ", "")}</div>
                                    <div style={{ textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000" }} className="absolute -translate-x-1/2 -translate-y-1/2 text-xs sm:text-lg whitespace-nowrap top-[58%] left-[30%]">{userUnionRaider?.union_inner_stat?.[6]?.stat_field_effect.replace("유니온 ", "").replace("최대 ", "")}</div>
                                    <div style={{ textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000" }} className="absolute -translate-x-1/2 -translate-y-1/2 text-xs sm:text-lg whitespace-nowrap top-[42%] left-[30%]">{userUnionRaider?.union_inner_stat?.[7]?.stat_field_effect.replace("유니온 ", "").replace("최대 ", "")}</div>

                                    <div style={{ textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000" }} className="absolute -translate-x-1/2 -translate-y-1/2 text-xs sm:text-lg whitespace-nowrap top-[12.5%] left-[31.5%]">상태이상내성</div>
                                    <div style={{ textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000" }} className="absolute -translate-x-1/2 -translate-y-1/2 text-xs sm:text-lg whitespace-nowrap top-[12.5%] left-[68.5%]">획득경험치</div>
                                    <div style={{ textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000" }} className="absolute -translate-x-1/2 -translate-y-1/2 text-xs sm:text-lg whitespace-nowrap top-[32.5%] left-[89%]">크리티컬 확률</div>
                                    <div style={{ textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000" }} className="absolute -translate-x-1/2 -translate-y-1/2 text-xs sm:text-lg whitespace-nowrap top-[67.5%] left-[89%]">보스데미지</div>
                                    <div style={{ textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000" }} className="absolute -translate-x-1/2 -translate-y-1/2 text-xs sm:text-lg whitespace-nowrap top-[87.5%] left-[68.5%]">일반데미지</div>
                                    <div style={{ textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000" }} className="absolute -translate-x-1/2 -translate-y-1/2 text-xs sm:text-lg whitespace-nowrap top-[87.5%] left-[31.5%]">버프지속시간</div>
                                    <div style={{ textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000" }} className="absolute -translate-x-1/2 -translate-y-1/2 text-xs sm:text-lg whitespace-nowrap top-[67.5%] left-[11%]">방어율무시</div>
                                    <div style={{ textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000" }} className="absolute -translate-x-1/2 -translate-y-1/2 text-xs sm:text-lg whitespace-nowrap top-[32.5%] left-[11%]">크리티컬 데미지</div>
                                </div>
                            </div>
                        </div>

                        <div className="basis-full lg:basis-1/3 ps-0 lg:ps-2 order-3 lg:order-2 h-auto">
                            <div className="flex flex-col gap-2 h-full">
                                <div className="hidden lg:block">
                                    <UnionSymbol />
                                </div>
                                <div className="bg-background rounded h-auto">
                                    <div className="font-semibold px-2 pt-2 pb-3">
                                        공격대 점령 효과
                                    </div>
                                    <div className="ms-3">
                                        <div className="whitespace-pre-wrap">
                                            {
                                                userUnionRaider?.union_occupied_stat.sort().join("\n")
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-background rounded h-full min-h-[200px]">
                                    <div className="relative h-full">
                                        <div className="absolute h-full w-full">
                                            <ScrollArea type={"always"} className="h-full">
                                                <div className="font-semibold px-2 pt-2 pb-3">
                                                    공격대원 효과
                                                </div>
                                                <div className="whitespace-pre-wrap ms-3">
                                                    {
                                                        userUnionRaider?.union_raider_stat.sort().join(`\n`)
                                                    }
                                                </div>
                                            </ScrollArea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="basis-full mt-2 mb-2 lg:mb-0 order-2 lg:order-3">
                            <div className="flex flex-col gap-2 h-full">
                                <div className="block lg:hidden">
                                    <UnionSymbol />
                                </div>
                                <div className="grid max-[370px]:grid-cols-1 min-[370px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                                    {
                                        classList.length >= 1 &&
                                        classList.map((block, block_index) => {
                                            // {block[0]}{block[1]}
                                            return (
                                                <Fragment key={block_index}>
                                                    <div className="col-span-1 bg-background rounded flex gap-2 p-2">
                                                        <div className="relative aspect-square w-1/4">
                                                            <Image
                                                                alt={block[1]}
                                                                src={
                                                                    classWithAnImage.includes(block[0]) ?
                                                                        `/class/${block[0]}.png` :
                                                                        "/class/공란.png"
                                                                }
                                                                className="object-contain rounded-full" fill sizes="256px"
                                                            />
                                                        </div>
                                                        <div className="flex-1 self-center max-[370px]:text-base min-[370px]:text-xs sm:text-base">
                                                            <div>
                                                                {block[0].replace("모바일 캐릭터", "메이플M")}
                                                            </div>
                                                            <div className="flex gap-2 self-center">
                                                                <div
                                                                    className={cn(
                                                                        block[2] == "SSS" && "text-sky-500",
                                                                        block[2] == "SS" && "text-violet-500",
                                                                        block[2] == "S" && "text-amber-500 dark:text-yellow-500",
                                                                        block[2] == "A" && "text-neutral-400",
                                                                        "font-bold"
                                                                    )}
                                                                >{block[2]}</div>
                                                                <div >|</div>
                                                                <div className="flex">
                                                                    <span>Lv.{block[1]}</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </Fragment>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}