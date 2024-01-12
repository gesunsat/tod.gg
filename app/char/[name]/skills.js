"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Skill6th from "./skill6th";
import Skill5th from "./skill5th";
import SkillLink from "./skillLink";

export default function Skills(props) {
    const [character, setCharacter] = useState();
    useEffect(() => {
        setCharacter(props.character);
        console.log(props.character)
    }, [])

    return (
        <>
            {
                character &&
                <Tabs
                    defaultValue={
                        character?.characterSkill6th?.character_skill_grade ?
                            "6th" :
                            character?.characterSkill5th?.character_skill_grade ?
                                "5th" :
                                "link"
                    }
                    activationMode="manual"
                    className="w-full"
                >
                    <TabsList className="justify-start w-full overflow-x-scroll hidden-scroll grid grid-cols-3">
                        <TabsTrigger value="6th" disabled={!character?.characterSkill6th?.character_skill_grade}>6차 스킬</TabsTrigger>
                        <TabsTrigger value="5th" disabled={!character?.characterSkill5th?.character_skill_grade}>5차 스킬</TabsTrigger>
                        <TabsTrigger value="link">링크 스킬</TabsTrigger>
                    </TabsList>
                    <TabsContent value="6th">
                        {
                            character?.characterSkill6th?.character_skill_grade &&
                            <Skill6th character={character} />
                        }
                    </TabsContent>
                    <TabsContent value="5th">
                        {
                            character?.characterSkill5th?.character_skill_grade &&
                            <Skill5th character={character} />
                        }
                    </TabsContent>
                    <TabsContent value="link">
                        {
                            character?.characterLinkSkill?.character_class &&
                            <SkillLink character={character} />
                        }
                    </TabsContent>
                </Tabs>
            }
        </>
    )
}