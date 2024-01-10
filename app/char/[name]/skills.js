"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { HexagonIcon, TableIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Skills(props) {
    const [currentSkill6thViewType, setCurrentSkill6thViewType] = useState("tableView");
    const [character, setCharacter] = useState();
    useEffect(() => {
        if (localStorage.getItem("skill6thViewType")) setCurrentSkill6thViewType(localStorage.getItem("skill6thViewType"));

        setCharacter(props.character);
        console.log(props.character)
    }, [])

    const [skillCoreType, setSkillCoreType] = useState({});
    const skillMapping = () => {
        const skillCoreType = {};

        character?.characterHexaMatrix?.character_hexa_core_equipment?.map((hexaMatrix) => {
            hexaMatrix.linked_skill.map((skill) => {
                skillCoreType[skill] = hexaMatrix.hexa_core_type;
            })
        })

        setSkillCoreType(skillCoreType);
    };

    useEffect(() => {
        localStorage.setItem("skill6thViewType", currentSkill6thViewType);
    }, [currentSkill6thViewType])

    return (
        <div className="space-y-2">
            <Alert>
                <AlertDescription className="text-3xl">
                    준비중
                </AlertDescription>
            </Alert>
            {
                character?.characterSkill6th?.character_skill.length != 0 &&
                <div className="min-h-[500px] col-span-3 lg:col-span-2 bg-muted bg-opacity-20 justify-between flex flex-col flex-1 p-2 relative rounded-md shadow-md">
                    <div className="flex flex-col">
                        <div className="bg-background rounded">
                            <div className="text-3xl text-center my-2">
                                <span>6차 스킬</span>
                            </div>
                        </div>
                        <div>
                            <ToggleGroup
                                className={"gap-0 justify-end mt-2"}
                                variant="outline"
                                type="single"
                                defaultValue={currentSkill6thViewType}
                                onValueChange={(value) => setCurrentSkill6thViewType(value)}
                            >
                                <ToggleGroupItem className="dark:data-[state=on]:bg-background data-[state=on]:pointer-events-none" value={"tableView"} aria-label="tableView">
                                    <TableIcon />
                                </ToggleGroupItem>
                                <ToggleGroupItem className="dark:data-[state=on]:bg-background data-[state=on]:pointer-events-none" value={"hexagonView"} aria-label="hexagonView">
                                    <HexagonIcon />
                                </ToggleGroupItem>
                            </ToggleGroup>
                        </div>
                        {
                            <div className="grid grid-cols-3 gap-2 mt-2">
                                {

                                    currentSkill6thViewType == "tableView" &&
                                    character?.characterSkill6th?.character_skill?.map((skill, skillIndex) => {
                                        console.log(skill)
                                        return (
                                            <div className="col-span-3 lg:col-span-1 bg-background rounded flex p-3 gap-2" key={skillIndex}>
                                                <div className="self-center">
                                                    <Image
                                                        className=""
                                                        src={skill.skill_icon}
                                                        alt={skill.skill_name}
                                                        height={40}
                                                        width={40}
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <div>
                                                        <span className="text-xs">Lv.</span>
                                                        <span>{skill.skill_level}</span>
                                                    </div>
                                                    <div>{skill.skill_name}</div>
                                                    <div className="h-[24px] flex flex-col justify-center">
                                                        <Progress value={50} className="h-2" />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        }
                    </div>
                </div>
            }
            {
                character?.characterSkill5th?.character_skill.length != 0 &&
                <div className="min-h-[500px] col-span-3 lg:col-span-2 bg-muted bg-opacity-20 justify-between flex flex-col flex-1 p-2 relative rounded-md shadow-md">
                    <div className="flex flex-col">
                        <div className="bg-background rounded">
                            <div className="text-3xl text-center my-2">
                                <span>5차 스킬</span>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div >
    )
}