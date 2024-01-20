"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { TableIcon, HexagonIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Style from "./skills.module.css";
import HexagonsIcon from "@/public/hexagons.svg";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import SolErdaIcon from "@/public/solErda.png";
import SolErdaPieceIcon from "@/public/solErdaPiece.png";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

export default function Skill6th(props) {
    const [currentSkill6thViewType, setCurrentSkill6thViewType] = useState("tableView");
    const [character, setCharacter] = useState({});
    useEffect(() => {
        if (localStorage.getItem("skill6thViewType")) setCurrentSkill6thViewType(localStorage.getItem("skill6thViewType"));

        setCharacter(props.character);
    }, [props])

    useEffect(() => {
        skillMapping();
        setCurrentHexaMatrixStatPresetNo(character?.characterHexaMatrixStat?.character_hexa_stat_core?.[0]?.slot_id || "0")
    }, [character])


    const [currentHexaMatrixStatPresetNo, setCurrentHexaMatrixStatPresetNo] = useState("0");
    useEffect(() => {
    }, [currentHexaMatrixStatPresetNo])

    const [skill6thInfo, setSkill6thInfo] = useState({});
    const [sortSkill6thByCoreType, setSortSkill6thByCoreType] = useState([]);
    const [usedSolErda, setUsedSolErda] = useState(0);
    const [usedSolErdaPiece, setUsedSolErdaPiece] = useState(0);
    const skillMapping = () => {
        if (!Object.keys(character).length) return;

        const skill6thInfo = {};
        let sortSkill6thByCoreType = [];
        for (let i = 0; i < Object.keys(character?.characterSkill6th?.character_skill).length; i++) {
            const values = Object.values(character?.characterSkill6th?.character_skill)[i];
            skill6thInfo[values.skill_name] = values;
        }
        character?.characterHexaMatrix?.character_hexa_core_equipment?.map((hexaMatrix) => {
            const linked_skill = [...hexaMatrix.linked_skill];
            if (hexaMatrix.hexa_core_name == "솔 야누스") linked_skill.push({ hexa_skill_id: "솔 야누스 : 새벽" });

            linked_skill.map((skill) => {
                skill6thInfo[skill.hexa_skill_id].skill_core_type = hexaMatrix.hexa_core_type.replace("스킬 코어", "오리진 코어");
                sortSkill6thByCoreType.push(skill.hexa_skill_id);
            })
        });

        let totalUsedSolErda = 0;
        let totalUsedSolErdaPiece = 0;
        character?.characterHexaMatrix?.character_hexa_core_equipment?.map((skill) => {
            if (skill.hexa_core_type == "스킬 코어") {
                totalUsedSolErda += OriginSkillEachLevelUsedSolErda[skill.hexa_core_level];
                totalUsedSolErdaPiece += OriginSkillEachLevelUsedSolErdaPiece[skill.hexa_core_level];
            } else if (skill.hexa_core_type == "마스터리 코어") {
                totalUsedSolErda += MasterySkillEachLevelUsedSolErda[skill.hexa_core_level];
                totalUsedSolErdaPiece += MasterySkillEachLevelUsedSolErdaPiece[skill.hexa_core_level];
            } else if (skill.hexa_core_type == "강화 코어") {
                totalUsedSolErda += EnhanceSkillEachLevelUsedSolErda[skill.hexa_core_level];
                totalUsedSolErdaPiece += EnhanceSkillEachLevelUsedSolErdaPiece[skill.hexa_core_level];
            } else if (skill.hexa_core_type == "공용 코어") {
                totalUsedSolErda += CommonSkillEachLevelUsedSolErda[skill.hexa_core_level];
                totalUsedSolErdaPiece += CommonSkillEachLevelUsedSolErdaPiece[skill.hexa_core_level];
            }
        })

        sortSkill6thByCoreType.sort((a, b) => {
            if (skill6thInfo[a] > skill6thInfo[b]) return -1;
            if (skill6thInfo[a] < skill6thInfo[b]) return 1;
            return 0;
        })

        totalUsedSolErda -= 5 // 6차 전직시 오리진 스킬 1레벨 기본 찍힘
        totalUsedSolErdaPiece -= 100 // 6차 전직시 오리진 스킬 1레벨 기본 찍힘

        // console.log(sortSkill6thByCoreType)
        // console.log(skill6thInfo)

        setUsedSolErda(totalUsedSolErda);
        setUsedSolErdaPiece(totalUsedSolErdaPiece);
        setSortSkill6thByCoreType(sortSkill6thByCoreType);
        setSkill6thInfo(skill6thInfo);
    };

    useEffect(() => {
        localStorage.setItem("skill6thViewType", currentSkill6thViewType);
    }, [currentSkill6thViewType]);

    const solErdaNeededForOriginSkillMaster = 150
    const solErdaPieceNeededForOriginSkillMaster = 4500
    const OriginSkillEachLevelUsedSolErda = {
        1: 5, 2: 6, 3: 7, 4: 8, 5: 10, 6: 12, 7: 14, 8: 17, 9: 20, 10: 30, 11: 33, 12: 36, 13: 40, 14: 44, 15: 48, 16: 52, 17: 56, 18: 60, 19: 65, 20: 80, 21: 85, 22: 90, 23: 95, 24: 100, 25: 105, 26: 111, 27: 117, 28: 123, 29: 130, 30: 150
    };
    const OriginSkillEachLevelUsedSolErdaPiece = {
        1: 100, 2: 130, 3: 165, 4: 205, 5: 250, 6: 300, 7: 355, 8: 415, 9: 480, 10: 680, 11: 760, 12: 850, 13: 950, 14: 1060, 15: 1180, 16: 1310, 17: 1450, 18: 1600, 19: 1760, 20: 2110, 21: 2280, 22: 2460, 23: 2650, 24: 2850, 25: 3060, 26: 3280, 27: 3510, 28: 3750, 29: 4000, 30: 4500
    };
    const solErdaNeededForMasterySkillMaster = 83
    const solErdaPieceNeededForMasterySkillMaster = 2252
    const MasterySkillEachLevelUsedSolErda = {
        1: 3, 2: 4, 3: 5, 4: 6, 5: 7, 6: 8, 7: 9, 8: 11, 9: 13, 10: 18, 11: 20, 12: 22, 13: 24, 14: 26, 15: 28, 16: 30, 17: 32, 18: 34, 19: 37, 20: 45, 21: 48, 22: 51, 23: 54, 24: 57, 25: 60, 26: 63, 27: 66, 28: 69, 29: 73, 30: 83
    };
    const MasterySkillEachLevelUsedSolErdaPiece = {
        1: 50, 2: 65, 3: 83, 4: 103, 5: 126, 6: 151, 7: 179, 8: 209, 9: 242, 10: 342, 11: 382, 12: 427, 13: 477, 14: 532, 15: 592, 16: 657, 17: 727, 18: 802, 19: 882, 20: 1057, 21: 1142, 22: 1232, 23: 1327, 24: 1427, 25: 1532, 26: 1642, 27: 1757, 28: 1877, 29: 2002, 30: 2252
    };
    const solErdaNeededForEnhanceSkillMaster = 123
    const solErdaPieceNeededForEnhanceSkillMaster = 3383
    const EnhanceSkillEachLevelUsedSolErda = {
        1: 4, 2: 5, 3: 6, 4: 7, 5: 9, 6: 11, 7: 13, 8: 16, 9: 19, 10: 27, 11: 30, 12: 33, 13: 36, 14: 39, 15: 42, 16: 45, 17: 48, 18: 51, 19: 55, 20: 67, 21: 71, 22: 75, 23: 79, 24: 83, 25: 87, 26: 92, 27: 97, 28: 102, 29: 108, 30: 123
    };
    const EnhanceSkillEachLevelUsedSolErdaPiece = {
        1: 75, 2: 98, 3: 125, 4: 155, 5: 189, 6: 227, 7: 269, 8: 314, 9: 363, 10: 513, 11: 573, 12: 641, 13: 716, 14: 799, 15: 889, 16: 987, 17: 1092, 18: 1205, 19: 1325, 20: 1588, 21: 1716, 22: 1851, 23: 1994, 24: 2144, 25: 2302, 26: 2467, 27: 2640, 28: 2820, 29: 3008, 30: 3383
    };
    const solErdaNeededForCommonSkillMaster = 208
    const solErdaPieceNeededForCommonSkillMaster = 6268
    const CommonSkillEachLevelUsedSolErda = {
        1: 7, 2: 9, 3: 11, 4: 13, 5: 16, 6: 19, 7: 22, 8: 27, 9: 32, 10: 46, 11: 51, 12: 56, 13: 62, 14: 68, 15: 74, 16: 80, 17: 86, 18: 92, 19: 99, 20: 116, 21: 123, 22: 130, 23: 137, 24: 144, 25: 151, 26: 160, 27: 169, 28: 178, 29: 188, 30: 208
    };
    const CommonSkillEachLevelUsedSolErdaPiece = {
        1: 125, 2: 163, 3: 207, 4: 257, 5: 314, 6: 377, 7: 446, 8: 521, 9: 603, 10: 903, 11: 1013, 12: 1137, 13: 1275, 14: 1427, 15: 1592, 16: 1771, 17: 1964, 18: 2171, 19: 2391, 20: 2916, 21: 3150, 22: 3398, 23: 3660, 24: 3935, 25: 4224, 26: 4527, 27: 4844, 28: 5174, 29: 5518, 30: 6268
    };

    // 2024년 1월 18일 전 마스터리 코어 추가 패치 전
    const numberOfOriginSkill = 1;
    const numberOfMasterySkill = 1;
    const numberOfEnhanceSkill = 4;
    const numberOfCommonSkill = 1;
    const solErdaNeededForAllSkillMaster = (
        (solErdaNeededForOriginSkillMaster * numberOfOriginSkill) + // 오리진 코어
        (solErdaNeededForMasterySkillMaster * numberOfMasterySkill) + // 마스터리 코어
        (solErdaNeededForEnhanceSkillMaster * numberOfEnhanceSkill) + // 강화 코어
        (solErdaNeededForCommonSkillMaster * numberOfCommonSkill) // 공용 코어
        - 5 // 6차 전직시 오리진 스킬 1레벨 기본 찍힘
    );
    const solErdaPieceNeededForAllSkillMaster = (
        (solErdaPieceNeededForOriginSkillMaster * numberOfOriginSkill) + // 오리진 코어
        (solErdaPieceNeededForMasterySkillMaster * numberOfMasterySkill) + // 마스터리 코어
        (solErdaPieceNeededForEnhanceSkillMaster * numberOfEnhanceSkill) + // 강화 코어
        (solErdaPieceNeededForCommonSkillMaster * numberOfCommonSkill) // 공용 코어
        - 100 // 6차 전직시 오리진 스킬 1레벨 기본 찍힘
    );

    const hexaStatMain = {
        "크리티컬 데미지 증가": ["0.35%", "0.7%", "1.05%", "1.4%", "2.1%", "2.8%", "3.5%", "4.55%", "5.60%", "7%"],
        "보스 데미지 증가": ["1%", "2%", "3%", "4%", "6%", "8%", "10%", "13%", "16%", "20%"],
        "방어율 무시 증가": ["1%", "2%", "3%", "4%", "6%", "8%", "10%", "13%", "16%", "20%"],
        "데미지 증가": ["0.75%", "1.5%", "2.25%", "3%", "4.5%", "6%", "7.5%", "9.75%", "12%", "15%"],
        "공격력 증가": ["5", "10", "15", "20", "30", "40", "50", "65", "80", "100"],
        "마력 증가": ["5", "10", "15", "20", "30", "40", "50", "65", "80", "100"],
        "주력 스탯 증가": [100, 200, 300, 400, 600, 800, 1000, 1300, 1600, 2000]
    }
    const hexaStatSub = {
        "크리티컬 데미지 증가": ["0.35%", "0.7%", "1.05%", "1.4%", "1.75%", "2.1%", "2.45%", "2.8%", "3.15%", "3.5%"],
        "보스 데미지 증가": ["1%", "2%", "3%", "4%", "5%", "6%", "7%", "8%", "9%", "10%"],
        "방어율 무시 증가": ["1%", "2%", "3%", "4%", "5%", "6%", "7%", "8%", "9%", "10%"],
        "데미지 증가": ["0.75%", "1.5%", "2.25%", "3%", "3.75%", "4.5%", "5.25%", "6%", "6.75%", "7.5%"],
        "공격력 증가": ["5", "10", "15", "20", "25", "30", "35", "40", "45", "50"],
        "마력 증가": ["5", "10", "15", "20", "25", "30", "35", "40", "45", "50"],
        "주력 스탯 증가": [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]
    }

    const [openHoverCard, setOpenHoverCard] = useState({});

    return (
        <>
            {
                sortSkill6thByCoreType.length == 0 &&
                <div className="h-[600px] bg-muted rounded-md shadow-md">
                </div>
            }
            {
                sortSkill6thByCoreType.length != 0 &&
                <div className="min-h-[600px] col-span-3 lg:col-span-2 bg-muted bg-opacity-20 justify-between flex flex-col flex-1 p-2 relative rounded-md shadow-md">
                    <div className="flex flex-col">
                        <div className="flex flex-col lg:flex-row gap-2">
                            <div className="basis-full lg:basis-1/2 bg-background rounded py-2 relative">
                                <div className="text-center absolute w-full text-2xl font-semibold">
                                    누적 소모량
                                </div>
                                <div className="basis-auto px-5 flex flex-col h-full justify-center pt-[60px] lg:pt-[0px] text-lg">
                                    <div className="lg:mx-14 space-y-4">
                                        <div className="flex flex-row justify-between">
                                            <div className="flex gap-2 items-center">
                                                <Image
                                                    className="w-[32px] h-[33px]"
                                                    src={SolErdaIcon}
                                                    alt={"솔 에르다"}
                                                    height={32}
                                                    width={33}
                                                />
                                                <div>
                                                    솔 에르다
                                                </div>
                                            </div>
                                            <div className="flex gap-1 items-center relative">
                                                <span>{usedSolErda}</span>
                                                <span>/</span>
                                                <span>{solErdaNeededForAllSkillMaster}</span>
                                                <div className="pt-1 absolute -translate-y-full right-0 text-sm">[ {parseInt(usedSolErda / solErdaNeededForAllSkillMaster * 100)}% ]</div>
                                            </div>
                                        </div>
                                        <div className="flex flex-row justify-between">
                                            <div className="flex gap-2 items-center">
                                                <Image
                                                    className="w-[30px] h-[32px]"
                                                    src={SolErdaPieceIcon}
                                                    alt={"솔 에르다 조각"}
                                                    height={30}
                                                    width={32}
                                                />
                                                <div>조각</div>
                                            </div>
                                            <div className="flex gap-1 items-center relative">
                                                <span>{usedSolErdaPiece}</span>
                                                <span>/</span>
                                                <span>{solErdaPieceNeededForAllSkillMaster}</span>
                                                <div className="pt-1 absolute -translate-y-full right-0 text-sm">[ {parseInt(usedSolErdaPiece / solErdaPieceNeededForAllSkillMaster * 100)}% ]</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="basis-full lg:basis-1/2 bg-background rounded py-2">
                                <div className="basis-auto px-3 flex flex-col h-full space-y-3">
                                    <div className="text-center text-2xl font-semibold">
                                        HEXA 스탯
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex flex-row h-full gap-2">
                                            <div className="flex-1">
                                                {
                                                    character?.characterHexaMatrixStat?.preset_hexa_stat_core.length != 0 &&
                                                    <>
                                                        <div className="flex flex-col space-y-2">
                                                            <div className="bg-muted rounded">
                                                                <div className="my-2 px-2 flex gap-2">
                                                                    <div>
                                                                        <span className="text-xs">Lv.</span>
                                                                        <span>{character?.characterHexaMatrixStat?.preset_hexa_stat_core?.[currentHexaMatrixStatPresetNo].main_stat_level}</span>
                                                                    </div>
                                                                    <div>
                                                                        <span>
                                                                            {character?.characterHexaMatrixStat?.preset_hexa_stat_core?.[currentHexaMatrixStatPresetNo].main_stat_name == "주력 스탯 증가" ?
                                                                                character?.characterSkill6th?.character_class == "제논" ? "올스탯 증가" :
                                                                                    character?.characterSkill6th?.character_class == "데몬어벤져" ? "HP 증가" : "주력 스탯 증가" :
                                                                                character?.characterHexaMatrixStat?.preset_hexa_stat_core?.[currentHexaMatrixStatPresetNo].main_stat_name}
                                                                        </span>
                                                                    </div>
                                                                    <div>
                                                                        {
                                                                            character?.characterHexaMatrixStat?.preset_hexa_stat_core?.[currentHexaMatrixStatPresetNo].main_stat_level >= 1 && "+"
                                                                        }
                                                                        <span>
                                                                            {
                                                                                (character?.characterHexaMatrixStat?.preset_hexa_stat_core?.[currentHexaMatrixStatPresetNo].main_stat_level >= 1 && character?.characterHexaMatrixStat?.preset_hexa_stat_core?.[currentHexaMatrixStatPresetNo].main_stat_name == "주력 스탯 증가") ?
                                                                                    hexaStatMain[character?.characterHexaMatrixStat?.preset_hexa_stat_core?.[currentHexaMatrixStatPresetNo].main_stat_name][(character?.characterHexaMatrixStat?.preset_hexa_stat_core?.[currentHexaMatrixStatPresetNo].main_stat_level) - 1]
                                                                                    * ((character?.characterHexaMatrixStat?.preset_hexa_stat_core?.[currentHexaMatrixStatPresetNo].main_stat_name == "주력 스탯 증가" && character?.characterSkill6th?.character_class == "제논") ? 0.48 : 1)
                                                                                    * ((character?.characterHexaMatrixStat?.preset_hexa_stat_core?.[currentHexaMatrixStatPresetNo].main_stat_name == "주력 스탯 증가" && character?.characterSkill6th?.character_class == "데몬어벤져") ? 21 : 1) :
                                                                                    hexaStatMain[character?.characterHexaMatrixStat?.preset_hexa_stat_core?.[currentHexaMatrixStatPresetNo].main_stat_name][(character?.characterHexaMatrixStat?.preset_hexa_stat_core?.[currentHexaMatrixStatPresetNo].main_stat_level) - 1]
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="bg-neutral-100 dark:bg-neutral-600 rounded">
                                                                <div className="my-2 px-2 flex gap-2">
                                                                    <div>
                                                                        <span className="text-xs">Lv.</span>
                                                                        <span>{character?.characterHexaMatrixStat?.preset_hexa_stat_core?.[currentHexaMatrixStatPresetNo].sub_stat_level_1}</span>
                                                                    </div>
                                                                    <div>
                                                                        <span>
                                                                            {character?.characterHexaMatrixStat?.preset_hexa_stat_core?.[currentHexaMatrixStatPresetNo].sub_stat_name_1 == "주력 스탯 증가" ?
                                                                                character?.characterSkill6th?.character_class == "제논" ? "올스탯 증가" :
                                                                                    character?.characterSkill6th?.character_class == "데몬어벤져" ? "HP 증가" : "주력 스탯 증가" :
                                                                                character?.characterHexaMatrixStat?.preset_hexa_stat_core?.[currentHexaMatrixStatPresetNo].sub_stat_name_1}
                                                                        </span>
                                                                    </div>
                                                                    <div>
                                                                        {
                                                                            character?.characterHexaMatrixStat?.preset_hexa_stat_core?.[currentHexaMatrixStatPresetNo].main_stat_level >= 1 && "+"
                                                                        }
                                                                        <span>
                                                                            {
                                                                                (character?.characterHexaMatrixStat?.preset_hexa_stat_core?.[currentHexaMatrixStatPresetNo].main_stat_level >= 1 && character?.characterHexaMatrixStat?.preset_hexa_stat_core?.[currentHexaMatrixStatPresetNo].sub_stat_name_1 == "주력 스탯 증가") ?
                                                                                    hexaStatSub[character?.characterHexaMatrixStat?.preset_hexa_stat_core?.[currentHexaMatrixStatPresetNo].sub_stat_name_1][(character?.characterHexaMatrixStat?.preset_hexa_stat_core?.[currentHexaMatrixStatPresetNo].sub_stat_level_1) - 1]
                                                                                    * ((character?.characterHexaMatrixStat?.preset_hexa_stat_core?.[currentHexaMatrixStatPresetNo].sub_stat_name_1 == "주력 스탯 증가" && character?.characterSkill6th?.character_class == "제논") ? 0.48 : 1)
                                                                                    * ((character?.characterHexaMatrixStat?.preset_hexa_stat_core?.[currentHexaMatrixStatPresetNo].sub_stat_name_1 == "주력 스탯 증가" && character?.characterSkill6th?.character_class == "데몬어벤져") ? 21 : 1) :
                                                                                    hexaStatSub[character?.characterHexaMatrixStat?.preset_hexa_stat_core?.[currentHexaMatrixStatPresetNo].sub_stat_name_1][(character?.characterHexaMatrixStat?.preset_hexa_stat_core?.[currentHexaMatrixStatPresetNo].sub_stat_level_1) - 1]
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="bg-neutral-100 dark:bg-neutral-600 rounded">
                                                                <div className="my-2 px-2 flex gap-2">
                                                                    <div>
                                                                        <span className="text-xs">Lv.</span>
                                                                        <span>{character?.characterHexaMatrixStat?.preset_hexa_stat_core?.[currentHexaMatrixStatPresetNo].sub_stat_level_2}</span>
                                                                    </div>
                                                                    <div>
                                                                        <span>
                                                                            {character?.characterHexaMatrixStat?.preset_hexa_stat_core?.[currentHexaMatrixStatPresetNo].sub_stat_name_2 == "주력 스탯 증가" ?
                                                                                character?.characterSkill6th?.character_class == "제논" ? "올스탯 증가" :
                                                                                    character?.characterSkill6th?.character_class == "데몬어벤져" ? "HP 증가" : "주력 스탯 증가" :
                                                                                character?.characterHexaMatrixStat?.preset_hexa_stat_core?.[currentHexaMatrixStatPresetNo].sub_stat_name_2}
                                                                        </span>
                                                                    </div>
                                                                    <div>
                                                                        <span>
                                                                            {
                                                                                character?.characterHexaMatrixStat?.preset_hexa_stat_core?.[currentHexaMatrixStatPresetNo].main_stat_level >= 1 && "+"
                                                                            }
                                                                            {
                                                                                character?.characterHexaMatrixStat?.preset_hexa_stat_core?.[currentHexaMatrixStatPresetNo].sub_stat_name_2 == "주력 스탯 증가" ?
                                                                                    hexaStatSub[character?.characterHexaMatrixStat?.preset_hexa_stat_core?.[currentHexaMatrixStatPresetNo].sub_stat_name_2][(character?.characterHexaMatrixStat?.preset_hexa_stat_core?.[currentHexaMatrixStatPresetNo].sub_stat_level_2) - 1]
                                                                                    * ((character?.characterHexaMatrixStat?.preset_hexa_stat_core?.[currentHexaMatrixStatPresetNo].sub_stat_name_2 == "주력 스탯 증가" && character?.characterSkill6th?.character_class == "제논") ? 0.48 : 1)
                                                                                    * ((character?.characterHexaMatrixStat?.preset_hexa_stat_core?.[currentHexaMatrixStatPresetNo].sub_stat_name_2 == "주력 스탯 증가" && character?.characterSkill6th?.character_class == "데몬어벤져") ? 21 : 1) :
                                                                                    hexaStatSub[character?.characterHexaMatrixStat?.preset_hexa_stat_core?.[currentHexaMatrixStatPresetNo].sub_stat_name_2][(character?.characterHexaMatrixStat?.preset_hexa_stat_core?.[currentHexaMatrixStatPresetNo].sub_stat_level_2) - 1]
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="py-1 px-1 bg-muted relative select-none rounded shadow-md w-min self-center">
                                        <ToggleGroup
                                            variant="outline"
                                            type="single"
                                            rovingFocus={false}
                                            defaultValue={currentHexaMatrixStatPresetNo || "0"}
                                            onValueChange={(value) => setCurrentHexaMatrixStatPresetNo(value)}
                                        >
                                            <ToggleGroupItem className="dark:data-[state=on]:bg-background data-[state=on]:pointer-events-none" value={"0"} aria-label="hexaStatPreset1">
                                                <div className="h-auto w-4">1</div>
                                            </ToggleGroupItem>
                                            <ToggleGroupItem className="dark:data-[state=on]:bg-background data-[state=on]:pointer-events-none" value={"1"} aria-label="hexaStatPreset2" disabled={!character?.characterHexaMatrixStat?.preset_hexa_stat_core?.[1]?.main_stat_name}>
                                                <div className="h-auto w-4">2</div>
                                            </ToggleGroupItem>
                                        </ToggleGroup>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            {
                                currentSkill6thViewType &&
                                <ToggleGroup
                                    className={"gap-0 justify-end mt-2"}
                                    variant="outline"
                                    type="single"
                                    defaultValue={currentSkill6thViewType}
                                    onValueChange={(value) => setCurrentSkill6thViewType(value)}
                                >
                                    <ToggleGroupItem className="w-[66px] dark:data-[state=on]:bg-background data-[state=on]:pointer-events-none" value={"tableView"} aria-label="tableView">
                                        <TableIcon />
                                    </ToggleGroupItem>
                                    <ToggleGroupItem className="w-[66px] dark:data-[state=on]:bg-background data-[state=on]:pointer-events-none" value={"hexagonView"} aria-label="hexagonView">
                                        <HexagonsIcon />
                                    </ToggleGroupItem>
                                </ToggleGroup>

                            }
                        </div>
                        <div
                            className={cn(
                                currentSkill6thViewType == "tableView" && "grid gap-2 grid-cols-3 mt-2",
                                currentSkill6thViewType == "hexagonView" && "flex flex-wrap justify-start my-5",
                                ""
                            )}
                        >
                            {
                                currentSkill6thViewType == "tableView" &&
                                sortSkill6thByCoreType?.map((skill, skillIndex) => {
                                    if (skill.skill_name == "HEXA 스탯") return;
                                    return (
                                        <div
                                            className={"col-span-3 lg:col-span-1 bg-background rounded-lg p-2 border-2 border-opacity-70"}
                                            key={skillIndex}
                                        >
                                            <HoverCard
                                                openDelay={0}
                                                closeDelay={0}
                                                open={openHoverCard[`${currentSkill6thViewType}_${skill}`]}
                                                onOpenChange={(skill) => setOpenHoverCard(() => ({ [`${currentSkill6thViewType}_${skill}`]: false }))}
                                            >
                                                <HoverCardTrigger
                                                    onClick={() => setOpenHoverCard({ [`${currentSkill6thViewType}_${skill}`]: true })}
                                                >
                                                    <div className="flex flex-row">
                                                        <div className="self-center min-w-[40px]">
                                                            <Image
                                                                className=""
                                                                src={skill6thInfo[skill].skill_icon}
                                                                alt={skill6thInfo[skill].skill_name}
                                                                height={40}
                                                                width={40}
                                                            />
                                                        </div>
                                                        <div className="ms-2 overflow-hidden flex-1">
                                                            <div className="flex flex-row items-center gap-2">
                                                                <div>
                                                                    <span className="text-xs">Lv.</span>
                                                                    <span>{skill6thInfo[skill].skill_level}</span>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="whitespace-nowrap overflow-ellipsis overflow-hidden">{skill6thInfo[skill].skill_name}</div>
                                                            </div>
                                                            <div className="flex flex-row justify-center items-center gap-2">
                                                                <Progress value={
                                                                    ((
                                                                        (skill6thInfo[skill].skill_core_type == "스킬 코어" && OriginSkillEachLevelUsedSolErda[skill6thInfo[skill].skill_level]) ||
                                                                        (skill6thInfo[skill].skill_core_type == "마스터리 코어" && MasterySkillEachLevelUsedSolErda[skill6thInfo[skill].skill_level]) ||
                                                                        (skill6thInfo[skill].skill_core_type == "강화 코어" && EnhanceSkillEachLevelUsedSolErda[skill6thInfo[skill].skill_level]) ||
                                                                        (skill6thInfo[skill].skill_core_type == "공용 코어" && CommonSkillEachLevelUsedSolErda[skill6thInfo[skill].skill_level])
                                                                    ) /
                                                                        (
                                                                            (skill6thInfo[skill].skill_core_type == "스킬 코어" && solErdaNeededForOriginSkillMaster) ||
                                                                            (skill6thInfo[skill].skill_core_type == "마스터리 코어" && solErdaNeededForMasterySkillMaster) ||
                                                                            (skill6thInfo[skill].skill_core_type == "강화 코어" && solErdaNeededForEnhanceSkillMaster) ||
                                                                            (skill6thInfo[skill].skill_core_type == "공용 코어" && solErdaNeededForCommonSkillMaster)
                                                                        )) * 100
                                                                } className="flex-1 h-2 bg-muted" />
                                                                <div>{
                                                                    parseInt(((
                                                                        (skill6thInfo[skill].skill_core_type == "스킬 코어" && OriginSkillEachLevelUsedSolErda[skill6thInfo[skill].skill_level]) ||
                                                                        (skill6thInfo[skill].skill_core_type == "마스터리 코어" && MasterySkillEachLevelUsedSolErda[skill6thInfo[skill].skill_level]) ||
                                                                        (skill6thInfo[skill].skill_core_type == "강화 코어" && EnhanceSkillEachLevelUsedSolErda[skill6thInfo[skill].skill_level]) ||
                                                                        (skill6thInfo[skill].skill_core_type == "공용 코어" && CommonSkillEachLevelUsedSolErda[skill6thInfo[skill].skill_level])
                                                                    ) /
                                                                        (
                                                                            (skill6thInfo[skill].skill_core_type == "스킬 코어" && solErdaNeededForOriginSkillMaster) ||
                                                                            (skill6thInfo[skill].skill_core_type == "마스터리 코어" && solErdaNeededForMasterySkillMaster) ||
                                                                            (skill6thInfo[skill].skill_core_type == "강화 코어" && solErdaNeededForEnhanceSkillMaster) ||
                                                                            (skill6thInfo[skill].skill_core_type == "공용 코어" && solErdaNeededForCommonSkillMaster)
                                                                        )) * 100)
                                                                }%</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </HoverCardTrigger>
                                                <HoverCardContent
                                                    className="text-white w-[99vmin] sm:w-[430px] py-3 px-0 me-1 bg-neutral-800 dark:bg-popover"
                                                    side={"top"}
                                                    sideOffset={10}
                                                    onClick={() => setOpenHoverCard({ [`${currentSkill6thViewType}_${skill}`]: false })}
                                                // forceMount={skillIndex == 2}
                                                >
                                                    <div className="gap-1 mx-auto flex flex-wrap justify-center font-semibold">
                                                        <span>{skill6thInfo[skill].skill_name}</span>
                                                    </div>
                                                    <div
                                                        className={cn(
                                                            skill6thInfo[skill].skill_core_type == "스킬 코어" && "text-violet-500",
                                                            skill6thInfo[skill].skill_core_type == "마스터리 코어" && "text-fuchsia-500",
                                                            skill6thInfo[skill].skill_core_type == "강화 코어" && "text-sky-500",
                                                            skill6thInfo[skill].skill_core_type == "공용 코어" && "text-neutral-400",
                                                            "gap-1 mx-auto flex flex-wrap justify-center text-xs font-bold"
                                                        )}
                                                    >
                                                        [{skill6thInfo[skill].skill_core_type}]
                                                    </div>
                                                    <div className="mt-3 px-3">
                                                        <div className="flex gap-2">
                                                            <div className="">
                                                                <Image
                                                                    // className="object-contain scale-75 mx-auto"
                                                                    className="mx-auto border-[1px] border-white rounded-lg"
                                                                    src={skill6thInfo[skill].skill_icon}
                                                                    alt={skill6thInfo[skill].skill_name}
                                                                    height={64}
                                                                    width={64}
                                                                    quality={100}
                                                                />
                                                            </div>
                                                            <div className="w-full">
                                                                {
                                                                    skill6thInfo[skill].skill_description &&
                                                                    <>
                                                                        <div className="text-sm">
                                                                            <span className="whitespace-pre-line">{skill6thInfo[skill].skill_description}</span>
                                                                        </div>
                                                                    </>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {
                                                        (skill6thInfo[skill].skill_level || skill6thInfo[skill].skill_effect) &&
                                                        <div className="border-dotted border-b-[1px] border-gray-600 w-full mt-2 mb-2"></div>
                                                    }
                                                    {
                                                        skill6thInfo[skill].skill_level &&
                                                        <>
                                                            <div className="px-3 text-sm">
                                                                <span>[</span>
                                                                <span className="mr-2">현재레벨</span>
                                                                <span>{skill6thInfo[skill].skill_level}</span>
                                                                <span>]</span>
                                                            </div>
                                                        </>
                                                    }
                                                    {
                                                        skill6thInfo[skill].skill_effect &&
                                                        <>
                                                            <div className="px-3 text-sm">
                                                                <span className="whitespace-pre-line">{skill6thInfo[skill].skill_effect}</span>
                                                            </div>
                                                        </>
                                                    }
                                                </HoverCardContent>
                                            </HoverCard>
                                        </div>
                                    )
                                })
                            }
                            {
                                currentSkill6thViewType == "hexagonView" &&
                                sortSkill6thByCoreType?.map((skill, skillIndex) => {
                                    if (skill.skill_name == "HEXA 스탯") return;
                                    return (
                                        <div
                                            className={cn(
                                                Style.hexagon6th,
                                                "basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 aspect-square"
                                            )}
                                            key={skillIndex}
                                        >
                                            <HoverCard
                                                openDelay={0}
                                                closeDelay={0}
                                                open={openHoverCard[`${currentSkill6thViewType}_${skill}`]}
                                                onOpenChange={(skill) => setOpenHoverCard(() => ({ [`${currentSkill6thViewType}_${skill}`]: false }))}
                                            >
                                                <HoverCardTrigger
                                                    onClick={() => setOpenHoverCard({ [`${currentSkill6thViewType}_${skill}`]: true })}
                                                >
                                                    <div className="relative w-full h-full flex justify-center">
                                                        <div className="absolute w-full h-full">
                                                            <HexagonIcon
                                                                className="w-full h-full scale-x-[1.17] scale-y-125 sm:scale-125 pointer-events-none fill-background over"
                                                                strokeWidth={0.2}
                                                                strokeOpacity={0.7}
                                                            />
                                                        </div>
                                                        <div className="self-center z-[1] relative w-full">
                                                            <div className="absolute -translate-y-full w-full text-center pb-1">
                                                                <Badge className={"text-base leading-3"}>
                                                                    {skill6thInfo[skill].skill_level}
                                                                </Badge>
                                                                <div className="whitespace-nowrap overflow-ellipsis overflow-hidden px-5">{skill6thInfo[skill].skill_name}</div>
                                                            </div>
                                                            <Image
                                                                className="mx-auto"
                                                                src={skill6thInfo[skill].skill_icon}
                                                                alt={skill6thInfo[skill].skill_name}
                                                                height={40}
                                                                width={40}
                                                            />
                                                            <div className="absolute w-full justify-center text-center">
                                                                <Progress value={
                                                                    ((
                                                                        (skill6thInfo[skill].skill_core_type == "스킬 코어" && OriginSkillEachLevelUsedSolErda[skill6thInfo[skill].skill_level]) ||
                                                                        (skill6thInfo[skill].skill_core_type == "마스터리 코어" && MasterySkillEachLevelUsedSolErda[skill6thInfo[skill].skill_level]) ||
                                                                        (skill6thInfo[skill].skill_core_type == "강화 코어" && EnhanceSkillEachLevelUsedSolErda[skill6thInfo[skill].skill_level]) ||
                                                                        (skill6thInfo[skill].skill_core_type == "공용 코어" && CommonSkillEachLevelUsedSolErda[skill6thInfo[skill].skill_level])
                                                                    ) /
                                                                        (
                                                                            (skill6thInfo[skill].skill_core_type == "스킬 코어" && solErdaNeededForOriginSkillMaster) ||
                                                                            (skill6thInfo[skill].skill_core_type == "마스터리 코어" && solErdaNeededForMasterySkillMaster) ||
                                                                            (skill6thInfo[skill].skill_core_type == "강화 코어" && solErdaNeededForEnhanceSkillMaster) ||
                                                                            (skill6thInfo[skill].skill_core_type == "공용 코어" && solErdaNeededForCommonSkillMaster)
                                                                        )) * 100
                                                                } className="h-2 bg-muted w-2/3 mx-auto mt-2" />
                                                                <div>{
                                                                    parseInt(((
                                                                        (skill6thInfo[skill].skill_core_type == "스킬 코어" && OriginSkillEachLevelUsedSolErda[skill6thInfo[skill].skill_level]) ||
                                                                        (skill6thInfo[skill].skill_core_type == "마스터리 코어" && MasterySkillEachLevelUsedSolErda[skill6thInfo[skill].skill_level]) ||
                                                                        (skill6thInfo[skill].skill_core_type == "강화 코어" && EnhanceSkillEachLevelUsedSolErda[skill6thInfo[skill].skill_level]) ||
                                                                        (skill6thInfo[skill].skill_core_type == "공용 코어" && CommonSkillEachLevelUsedSolErda[skill6thInfo[skill].skill_level])
                                                                    ) /
                                                                        (
                                                                            (skill6thInfo[skill].skill_core_type == "스킬 코어" && solErdaNeededForOriginSkillMaster) ||
                                                                            (skill6thInfo[skill].skill_core_type == "마스터리 코어" && solErdaNeededForMasterySkillMaster) ||
                                                                            (skill6thInfo[skill].skill_core_type == "강화 코어" && solErdaNeededForEnhanceSkillMaster) ||
                                                                            (skill6thInfo[skill].skill_core_type == "공용 코어" && solErdaNeededForCommonSkillMaster)
                                                                        )) * 100)
                                                                }%
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </HoverCardTrigger>
                                                <HoverCardContent
                                                    className="text-white w-[99vmin] sm:w-[430px] py-3 px-0 me-1 bg-neutral-800 dark:bg-popover"
                                                    side={"top"}
                                                    sideOffset={10}
                                                    onClick={() => setOpenHoverCard({ [`${currentSkill6thViewType}_${skill}`]: false })}
                                                // forceMount={skillIndex == 2}
                                                >
                                                    <div className="gap-1 mx-auto flex flex-wrap justify-center font-semibold">
                                                        <span>{skill6thInfo[skill].skill_name}</span>
                                                    </div>
                                                    <div
                                                        className={cn(
                                                            skill6thInfo[skill].skill_core_type == "스킬 코어" && "text-violet-500",
                                                            skill6thInfo[skill].skill_core_type == "마스터리 코어" && "text-fuchsia-500",
                                                            skill6thInfo[skill].skill_core_type == "강화 코어" && "text-sky-500",
                                                            skill6thInfo[skill].skill_core_type == "공용 코어" && "text-neutral-400",
                                                            "gap-1 mx-auto flex flex-wrap justify-center text-xs font-bold"
                                                        )}
                                                    >
                                                        [{skill6thInfo[skill].skill_core_type}]
                                                    </div>
                                                    <div className="mt-3 px-3">
                                                        <div className="flex gap-2">
                                                            <div className="">
                                                                <Image
                                                                    // className="object-contain scale-75 mx-auto"
                                                                    className="mx-auto border-[1px] border-white rounded-lg"
                                                                    src={skill6thInfo[skill].skill_icon}
                                                                    alt={skill6thInfo[skill].skill_name}
                                                                    height={64}
                                                                    width={64}
                                                                    quality={100}
                                                                />
                                                            </div>
                                                            <div className="w-full">
                                                                {
                                                                    skill6thInfo[skill].skill_description &&
                                                                    <>
                                                                        <div className="text-sm">
                                                                            <span className="whitespace-pre-line">{skill6thInfo[skill].skill_description}</span>
                                                                        </div>
                                                                    </>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {
                                                        (skill6thInfo[skill].skill_level || skill6thInfo[skill].skill_effect) &&
                                                        <div className="border-dotted border-b-[1px] border-gray-600 w-full mt-2 mb-2"></div>
                                                    }
                                                    {
                                                        skill6thInfo[skill].skill_level &&
                                                        <>
                                                            <div className="px-3 text-sm">
                                                                <span>[</span>
                                                                <span className="mr-2">현재레벨</span>
                                                                <span>{skill6thInfo[skill].skill_level}</span>
                                                                <span>]</span>
                                                            </div>
                                                        </>
                                                    }
                                                    {
                                                        skill6thInfo[skill].skill_effect &&
                                                        <>
                                                            <div className="px-3 text-sm">
                                                                <span className="whitespace-pre-line">{skill6thInfo[skill].skill_effect}</span>
                                                            </div>
                                                        </>
                                                    }
                                                </HoverCardContent>
                                            </HoverCard>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    )
}