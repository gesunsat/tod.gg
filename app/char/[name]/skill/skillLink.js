"use client";

import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function SkillLink(props) {
    const [character, setCharacter] = useState({});
    useEffect(() => {
        setCharacter(props.character);
    }, [props])

    const [openHoverCard, setOpenHoverCard] = useState({});

    return (
        <>
            {
                (Object.keys(character).length && character?.characterLinkSkill?.character_link_skill.length != 0) ?
                    <div className="col-span-3 lg:col-span-2 bg-muted bg-opacity-20 justify-between flex flex-col flex-1 p-2 relative rounded-md shadow-md">
                        <div className="flex flex-col">
                            <div className={"grid gap-2 grid-cols-3 sm:grid-cols-4 md:grid-cols-6"}>
                                {
                                    character?.characterLinkSkill?.character_link_skill?.map((skill, skillIndex) => {
                                        return (
                                            <div
                                                className={"col-span-1 bg-background rounded-lg p-2 aspect-square"}
                                                key={skillIndex}
                                            >
                                                <HoverCard
                                                    openDelay={0}
                                                    closeDelay={0}
                                                    open={openHoverCard[`linkSkill_${skill.skill_name}`]}
                                                    onOpenChange={(skill) => setOpenHoverCard(() => ({ [`linkSkill_${skill.skill_name}`]: false }))}
                                                >
                                                    <HoverCardTrigger
                                                        onClick={() => setOpenHoverCard({ [`linkSkill_${skill.skill_name}`]: true })}
                                                    >
                                                        <div className="w-full h-full flex justify-center">
                                                            <div className="self-center relative w-full">
                                                                <div className="absolute -translate-y-full w-full text-center pb-1 sm:pb-2">
                                                                    <Badge className={"text-base leading-3"}>
                                                                        {skill.skill_level}
                                                                    </Badge>
                                                                </div>
                                                                <Image
                                                                    className="mx-auto w-[32px] h-[32px] sm:w-[40px] sm:h-[40px]"
                                                                    src={skill.skill_icon}
                                                                    alt={skill.skill_name}
                                                                    height={40}
                                                                    width={40}
                                                                />
                                                                <div className="absolute w-full justify-center text-center text-xs sm:text-base pt-1 sm:pt-2">
                                                                    <div className="whitespace-nowrap overflow-ellipsis overflow-hidden">{skill.skill_name}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </HoverCardTrigger>
                                                    <HoverCardContent
                                                        className="text-white w-[99vmin] sm:w-[430px] py-3 px-0 me-1 bg-neutral-800 dark:bg-popover"
                                                        side={"top"}
                                                        sideOffset={10}
                                                        onClick={() => setOpenHoverCard({ [`linkSkill_${skill.skill_name}`]: false })}
                                                    // forceMount={skillIndex == 2}
                                                    >
                                                        <div className="gap-1 mx-auto flex flex-wrap justify-center font-semibold">
                                                            <span>{skill.skill_name}</span>
                                                        </div>
                                                        <div className="mt-3 px-3">
                                                            <div className="flex gap-2">
                                                                <div className="">
                                                                    <Image
                                                                        // className="object-contain scale-75 mx-auto"
                                                                        className="mx-auto border-[1px] border-white rounded-lg"
                                                                        src={skill.skill_icon}
                                                                        alt={skill.skill_name}
                                                                        height={64}
                                                                        width={64}
                                                                        quality={100}
                                                                    />
                                                                </div>
                                                                <div className="w-full">
                                                                    {
                                                                        skill.skill_description &&
                                                                        <>
                                                                            <div className="text-sm">
                                                                                <span className="whitespace-pre-line">{skill.skill_description}</span>
                                                                            </div>
                                                                        </>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {
                                                            (skill.skill_level || skill.skill_effect) &&
                                                            <div className="border-dotted border-b-[1px] border-gray-600 w-full mt-2 mb-2"></div>
                                                        }
                                                        {
                                                            skill.skill_level &&
                                                            <>
                                                                <div className="px-3 text-sm">
                                                                    <span>[</span>
                                                                    <span className="mr-2">현재레벨</span>
                                                                    <span>{skill.skill_level}</span>
                                                                    <span>]</span>
                                                                </div>
                                                            </>
                                                        }
                                                        {
                                                            skill.skill_effect &&
                                                            <>
                                                                <div className="px-3 text-sm">
                                                                    <span className="whitespace-pre-line">{skill.skill_effect}</span>
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
                    </div> :
                    <div className="min-h-[600px] bg-muted rounded-md shadow-md flex justify-center items-center">
                        <h3 className="text-2xl font-semibold leading-none tracking-tight text-center">링크스킬 미적용</h3>
                    </div>
            }
        </>
    )
}