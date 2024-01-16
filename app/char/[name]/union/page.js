import { cn } from "@/lib/utils"
import { union_raider_vector_map } from "./union_raider_vector_map"
import { getCharOCID } from "@/lib/nexonAPI/getCharOCID";
import { getUserUnionRaider } from "@/lib/nexonAPI/getUserUnionRaider";
import { getUserUnion } from "@/lib/nexonAPI/getUserUnion";
import Image from "next/image";
import { Fragment } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

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

export default async function Union({ params }) {
    const characterName = decodeURI(params.name);
    const OCID = await getCharOCID(characterName);
    const [
        userUnion,
        userUnionRaider,
    ] = await Promise.all([
        getUserUnion(OCID.ocid),
        getUserUnionRaider(OCID.ocid),
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
                    <div className="absolute w-full text-neutral-500 text-sm">Lv.{userUnion?.union_level}</div>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="bg-muted p-2 rounded-md shadow-md">
                <div className="flex flex-row flex-wrap">

                    <div className="basis-full lg:basis-2/3 order-1">
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
                                    <div className="absolute h-full">
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
                            <div className="grid min-[370px]:grid-cols-2 max-[370px]:grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-2">
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
                                                    <div className="flex-1 self-center min-[370px]:text-xs max-[370px]:text-base sm:text-base">
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
        </>
    )
}