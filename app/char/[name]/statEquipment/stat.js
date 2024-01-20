"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { Fragment, useEffect, useState } from "react";

export default function Stat(props) {
    const [user, setUser] = useState();
    useEffect(() => {
        setUser(props.character);
    }, [props])

    const [characterStat, setCharacterStat] = useState({});
    useEffect(() => {
        if (!user) return;
        if (!user?.characterStat) return;

        let characterStat = {};

        user?.characterStat.final_stat?.map((stat) => {
            characterStat[stat.stat_name] = stat.stat_value;
        });

        // console.log("characterStat", characterStat);

        setCharacterStat(characterStat);
    }, [user]);

    const [currentHyperStatPresetNo, setCurrentHyperStatPresetNo] = useState(parseInt(user?.characterHyperStat?.use_preset_no) || 1);
    const [currentAbilityPresetNo, setCurrentAbilityPresetNo] = useState(parseInt(user?.characterAbility?.preset_no) || 1);

    return (
        <>
            {
                Object.keys(characterStat).length == 0 &&
                <Skeleton className="min-h-[500px] col-span-3 lg:col-span-2" />
            }
            {
                Object.keys(characterStat).length != 0 &&
                <div className="min-h-[500px] col-span-3 lg:col-span-2 bg-muted bg-opacity-20 justify-between flex flex-col flex-1 p-2 relative rounded-md shadow-md">
                    <div className="flex flex-col">
                        <div className="bg-background rounded">
                            <div className="text-3xl text-center my-2">
                                <span>전투력 : </span>
                                <span>{parseInt(characterStat["전투력"] || 0).toLocaleString()}</span>
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row mt-2 gap-2">
                            <div className="text-lg basis-full lg:basis-1/3 bg-background rounded py-2">
                                <div className="basis-auto space-y-2 px-5 lg:px-12 flex flex-col h-full justify-center">
                                    <div className="flex justify-between">
                                        <div className="text-start">STR</div>
                                        <div className="text-end">{parseInt(characterStat["STR"] || 0).toLocaleString()}</div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="text-start">DEX</div>
                                        <div className="text-end">{parseInt(characterStat["DEX"] || 0).toLocaleString()}</div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="text-start">INT</div>
                                        <div className="text-end">{parseInt(characterStat["INT"] || 0).toLocaleString()}</div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="text-start">LUK</div>
                                        <div className="text-end">{parseInt(characterStat["LUK"] || 0).toLocaleString()}</div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="text-start">HP</div>
                                        <div className="text-end">{parseInt(characterStat["HP"] || 0).toLocaleString()}</div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="text-start">MP</div>
                                        <div className="text-end">{parseInt(characterStat["MP"] || 0).toLocaleString()}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-lg basis-full lg:basis-2/3 bg-background rounded py-2">
                                <div className="basis-auto space-y-2 px-5 lg:px-20 flex flex-col h-full justify-center">
                                    <div className="flex justify-between">
                                        <div className="text-start">보스 몬스터 데미지</div>
                                        <div className="text-end">{parseFloat(characterStat["보스 몬스터 데미지"] || 0).toLocaleString()}%</div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="text-start">방어율 무시</div>
                                        <div className="text-end">{parseFloat(characterStat["방어율 무시"] || 0).toLocaleString()}%</div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="text-start">크리티컬 확률</div>
                                        <div className="text-end">{parseFloat(characterStat["크리티컬 확률"] || 0).toLocaleString()}%</div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="text-start">크리티컬 데미지</div>
                                        <div className="text-end">{parseFloat(characterStat["크리티컬 데미지"] || 0).toLocaleString()}%</div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="text-start">재사용 대기시간 감소</div>
                                        <div className="text-end">{parseInt(characterStat["재사용 대기시간 감소 (초)"] || 0).toLocaleString()}초/{parseFloat(characterStat["재사용 대기시간 감소 (%)"] || 0).toLocaleString()}%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-lg basis-full bg-background rounded py-2 mt-2">
                            <div className="flex flex-col lg:flex-row gap-2">
                                <div className="basis-1/2 flex flex-col lg:flex-ro gap-2">
                                    <div className="basis-auto space-y-2 pl-5 lg:pl-12 pr-5 lg:pr-6 flex flex-col h-full justify-center">
                                        <div className="flex justify-between">
                                            <div className="text-start">최대 스탯 공격력</div>
                                            <div className="text-end">{parseInt(characterStat["최대 스탯공격력"] || 0).toLocaleString()}</div>
                                        </div>
                                        <div className="flex justify-between">
                                            <div className="text-start">최소 스탯 공격력</div>
                                            <div className="text-end">{parseInt(characterStat["최소 스탯공격력"] || 0).toLocaleString()}</div>
                                        </div>
                                        <div className="flex justify-between">
                                            <div className="text-start">최종 데미지</div>
                                            <div className="text-end">{parseInt(characterStat["최종 데미지"] || 0).toLocaleString()}%</div>
                                        </div>
                                        <div className="flex justify-between">
                                            <div className="text-start">데미지</div>
                                            <div className="text-end">{parseInt(characterStat["데미지"] || 0).toLocaleString()}%</div>
                                        </div>
                                        <div className="flex justify-between">
                                            <div className="text-start">공격력</div>
                                            <div className="text-end">{parseInt(characterStat["공격력"] || 0).toLocaleString()}</div>
                                        </div>
                                        <div className="flex justify-between">
                                            <div className="text-start">마력</div>
                                            <div className="text-end">{parseInt(characterStat["마력"] || 0).toLocaleString()}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="basis-1/2 flex flex-col lg:flex-ro gap-2">
                                    <div className="basis-auto space-y-2 pr-5 lg:pr-12 pl-5 lg:pl-6 flex flex-col h-full justify-center">
                                        <div className="flex justify-between">
                                            <div className="text-start">재사용 대기시간 미적용</div>
                                            <div className="text-end">{parseFloat(characterStat["재사용 대기시간 미적용"] || 0).toLocaleString()}%</div>
                                        </div>
                                        <div className="flex justify-between">
                                            <div className="text-start">일반 몬스터 데미지</div>
                                            <div className="text-end">{parseFloat(characterStat["일반 몬스터 데미지"] || 0).toLocaleString()}%</div>
                                        </div>
                                        <div className="flex justify-between">
                                            <div className="text-start">소환수 지속시간</div>
                                            <div className="text-end">{parseFloat(characterStat["소환수 지속시간 증가"] || 0).toLocaleString()}%</div>
                                        </div>
                                        <div className="flex justify-between">
                                            <div className="text-start">버프 지속시간</div>
                                            <div className="text-end">{parseFloat(characterStat["버프 지속시간"] || 0).toLocaleString()}%</div>
                                        </div>
                                        <div className="flex justify-between">
                                            <div className="text-start">속성 내성 무시</div>
                                            <div className="text-end">{parseFloat(characterStat["속성 내성 무시"] || 0).toLocaleString()}%</div>
                                        </div>
                                        <div className="flex justify-between">
                                            <div className="text-start">상태이상 추가 데미지</div>
                                            <div className="text-end">{parseFloat(characterStat["상태이상 추가 데미지"] || 0).toLocaleString()}%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-lg basis-full bg-background rounded py-2 mt-2">
                            <div className="flex flex-col lg:flex-row gap-2">
                                <div className="basis-1/2 flex flex-col lg:flex-ro gap-2">
                                    <div className="basis-auto space-y-2 pl-5 lg:pl-12 pr-5 lg:pr-6 flex flex-col h-full justify-center">
                                        <div className="flex justify-between">
                                            <div className="text-start">아케인포스</div>
                                            <div className="text-end">{parseInt(characterStat["아케인포스"] || 0).toLocaleString()}</div>
                                        </div>
                                        <div className="flex justify-between">
                                            <div className="text-start">어센틱포스</div>
                                            <div className="text-end">{parseInt(characterStat["어센틱포스"] || 0).toLocaleString()}</div>
                                        </div>
                                        <div className="flex justify-between">
                                            <div className="text-start">스타포스</div>
                                            <div className="text-end">{parseInt(characterStat["스타포스"] || 0).toLocaleString()}</div>
                                        </div>
                                        <div className="flex justify-between">
                                            <div className="text-start">공격속도</div>
                                            <div className="text-end">{parseInt(characterStat["공격 속도"] || 0).toLocaleString()}단계</div>
                                        </div>
                                        <div className="flex justify-between">
                                            <div className="text-start">스탠스</div>
                                            <div className="text-end">{parseFloat(characterStat["스탠스"] || 0).toLocaleString()}%</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="basis-1/2 flex flex-col lg:flex-ro gap-2">
                                    <div className="basis-auto space-y-2 pr-5 lg:pr-12 pl-5 lg:pl-6 flex flex-col h-full justify-center">
                                        <div className="flex justify-between">
                                            <div className="text-start">메소 획득량</div>
                                            <div className="text-end">{parseFloat(characterStat["메소 획득량"] || 0).toLocaleString()}%</div>
                                        </div>
                                        <div className="flex justify-between">
                                            <div className="text-start">아이템 드롭률</div>
                                            <div className="text-end">{parseFloat(characterStat["아이템 드롭률"] || 0).toLocaleString()}%</div>
                                        </div>
                                        <div className="flex justify-between">
                                            <div className="text-start">추가 경험치 획득</div>
                                            <div className="text-end">{parseFloat(characterStat["추가 경험치 획득"] || 0).toLocaleString()}%</div>
                                        </div>
                                        <div className="flex justify-between">
                                            <div className="text-start">상태이상 내성</div>
                                            <div className="text-end">{parseInt(characterStat["상태이상 내성"] || 0).toLocaleString()}</div>
                                        </div>
                                        <div className="flex justify-between">
                                            <div className="text-start">방어력</div>
                                            <div className="text-end">{parseInt(characterStat["방어력"] || 0).toLocaleString()}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row gap-2 mt-2">
                            <div className="text-lg basis-full lg:basis-1/2 bg-background rounded py-2">
                                <div className="basis-auto px-3 flex flex-col h-full justify-between">
                                    <div className="flex justify-center">
                                        <div>하이퍼 스탯</div>
                                    </div>
                                    <div className="py-3">
                                        {
                                            Object.keys(user?.characterHyperStat?.[`hyper_stat_preset_${currentHyperStatPresetNo}`]) &&
                                            user?.characterHyperStat?.[`hyper_stat_preset_${currentHyperStatPresetNo}`].map((hyperStatObject, hyperStatObjectIndex) => {
                                                if (hyperStatObject.stat_level == 0) return;
                                                return (
                                                    <div key={hyperStatObjectIndex} className="text-start">{hyperStatObject.stat_increase}</div>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className="mt-2 py-1 px-1 bg-muted relative select-none rounded shadow-md w-fit self-center">
                                        <ToggleGroup
                                            variant="outline"
                                            type="single"
                                            rovingFocus={false}
                                            defaultValue={currentHyperStatPresetNo}
                                            onValueChange={(value) => setCurrentHyperStatPresetNo(value)}
                                        >
                                            <ToggleGroupItem className="dark:data-[state=on]:bg-background data-[state=on]:pointer-events-none" value={1} aria-label="hyperStatPreset1">
                                                <div className="h-auto w-4">1</div>
                                            </ToggleGroupItem>
                                            <ToggleGroupItem className="dark:data-[state=on]:bg-background data-[state=on]:pointer-events-none" value={2} aria-label="hyperStatPreset2" disabled={user?.characterHyperStat?.hyper_stat_preset_2_remain_point == user?.characterHyperStat?.use_available_hyper_stat}>
                                                <div className="h-auto w-4">2</div>
                                            </ToggleGroupItem>
                                            <ToggleGroupItem className="dark:data-[state=on]:bg-background data-[state=on]:pointer-events-none" value={3} aria-label="hyperStatPreset3" disabled={user?.characterHyperStat?.hyper_stat_preset_3_remain_point == user?.characterHyperStat?.use_available_hyper_stat}>
                                                <div className="h-auto w-4">3</div>
                                            </ToggleGroupItem>
                                        </ToggleGroup>
                                    </div>
                                </div>
                            </div>
                            <div className="text-lg basis-full lg:basis-1/2 bg-background rounded py-2">
                                <div className="basis-auto px-3 flex flex-col h-full justify-between">
                                    <div className="flex justify-center">
                                        <div>어빌리티</div>
                                    </div>
                                    <div className="space-y-2">
                                        {
                                            user?.characterAbility?.[`ability_preset_${currentAbilityPresetNo}`]?.ability_info ?
                                                user?.characterAbility?.[`ability_preset_${currentAbilityPresetNo}`]?.ability_info?.map((ability, abilityIndex) => {
                                                    return (
                                                        <Fragment key={abilityIndex}>
                                                            <div
                                                                className={cn(
                                                                    ability?.ability_grade == "레전드리" && "bg-green-500 dark:bg-lime-600",
                                                                    ability?.ability_grade == "유니크" && "bg-yellow-500 dark:bg-amber-600",
                                                                    ability?.ability_grade == "에픽" && "bg-violet-400 dark:bg-violet-600",
                                                                    ability?.ability_grade == "레어" && "bg-sky-400 dark:bg-sky-600",
                                                                    "rounded"
                                                                )}
                                                            >
                                                                <div className="px-2 py-1 text-center">{ability.ability_value}</div>
                                                            </div >
                                                        </Fragment>
                                                    )
                                                }) :
                                                user?.characterAbility?.ability_info?.map((ability, abilityIndex) => {
                                                    return (
                                                        <Fragment key={abilityIndex}>
                                                            <div
                                                                className={cn(
                                                                    ability?.ability_grade == "레전드리" && "bg-green-500 dark:bg-lime-600",
                                                                    ability?.ability_grade == "유니크" && "bg-yellow-500 dark:bg-amber-600",
                                                                    ability?.ability_grade == "에픽" && "bg-violet-400 dark:bg-violet-600",
                                                                    ability?.ability_grade == "레어" && "bg-sky-400 dark:bg-sky-600",
                                                                    "rounded"
                                                                )}
                                                            >
                                                                <div className="px-2 py-1 text-center">{ability.ability_value}</div>
                                                            </div >
                                                        </Fragment>
                                                    )
                                                })
                                        }
                                    </div>
                                    <div className="mt-2 py-1 px-1 bg-muted relative select-none rounded shadow-md w-fit self-center">
                                        <ToggleGroup
                                            variant="outline"
                                            type="single"
                                            rovingFocus={false}
                                            defaultValue={currentAbilityPresetNo}
                                            onValueChange={(value) => setCurrentAbilityPresetNo(value)}
                                        >
                                            <ToggleGroupItem className="dark:data-[state=on]:bg-background data-[state=on]:pointer-events-none" value={1} aria-label="abilityPreset1">
                                                <div className="h-auto w-4">1</div>
                                            </ToggleGroupItem>
                                            <ToggleGroupItem className="dark:data-[state=on]:bg-background data-[state=on]:pointer-events-none" value={2} aria-label="abilityPreset2">
                                                <div className="h-auto w-4">2</div>
                                            </ToggleGroupItem>
                                            <ToggleGroupItem className="dark:data-[state=on]:bg-background data-[state=on]:pointer-events-none" value={3} aria-label="abilityPreset3">
                                                <div className="h-auto w-4">3</div>
                                            </ToggleGroupItem>
                                        </ToggleGroup>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            }
        </>
    )
}