
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Skill6th from "./skill6th";
import Skill5th from "./skill5th";
import SkillLink from "./skillLink";
import { getCharOCID } from "@/lib/nexonAPI/getCharOCID";
import { getCharSkill } from "@/lib/nexonAPI/getCharSkill";
import { getCharLinkSkill } from "@/lib/nexonAPI/getCharLinkSkill";
import { getCharVMatrix } from "@/lib/nexonAPI/getCharVMatrix";
import { getCharHexaMatrix } from "@/lib/nexonAPI/getCharHexaMatrix";
import { getCharHexaMatrixStat } from "@/lib/nexonAPI/getCharHexaMatrixStat";

export default async function Skill({ params }) {
    const characterName = decodeURI(params.name);
    const OCID = await getCharOCID(characterName);

    const [
        charSkill5th,
        charSkill6th,
        charLinkSkill,
        charVMatrix,
        charHexaMatrix,
        charHexaMatrixStat,
    ] = await Promise.all([
        getCharSkill(OCID.ocid, 5),
        getCharSkill(OCID.ocid, 6),
        getCharLinkSkill(OCID.ocid),
        getCharVMatrix(OCID.ocid),
        getCharHexaMatrix(OCID.ocid),
        getCharHexaMatrixStat(OCID.ocid),
    ]);

    const character = {
        "characterSkill5th": charSkill5th,
        "characterSkill6th": charSkill6th,
        "characterLinkSkill": charLinkSkill,
        "characterVMatrix": charVMatrix,
        "characterHexaMatrix": charHexaMatrix,
        "characterHexaMatrixStat": charHexaMatrixStat,
    };

    return (
        <>
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
        </>
    )
}