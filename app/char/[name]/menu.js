import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { serverIconImg } from "@/dictData/serverIconImg";
import Image from "next/image";
import Link from "next/link";
import PlayIcon from "@/public/play.svg";
import { getCharAbility } from '@/lib/nexonAPI/getCharAbility';
import { getCharAndroidEquipment } from '@/lib/nexonAPI/getCharAndroidEquipment';
import { getCharBasic } from '@/lib/nexonAPI/getCharBasic';
import { getCharBeautyEquipment } from '@/lib/nexonAPI/getCharBeautyEquipment';
import { getCharCashitemEquipment } from '@/lib/nexonAPI/getCharCashitemEquipment';
import { getCharDojang } from '@/lib/nexonAPI/getCharDojang';
import { getCharHexaMatrix } from '@/lib/nexonAPI/getCharHexaMatrix';
import { getCharHexaMatrixStat } from '@/lib/nexonAPI/getCharHexaMatrixStat';
import { getCharHyperStat } from '@/lib/nexonAPI/getCharHyperStat';
import { getCharItemEquipment } from '@/lib/nexonAPI/getCharItemEquipment';
import { getCharLinkSkill } from '@/lib/nexonAPI/getCharLinkSkill';
import { getCharOCID } from '@/lib/nexonAPI/getCharOCID';
import { getCharPetEquipment } from '@/lib/nexonAPI/getCharPetEquipment';
import { getCharPopularity } from '@/lib/nexonAPI/getCharPopularity';
// import { getCharPropensity } from '@/lib/nexonAPI/getCharPropensity';
// import { getCharSetEffect } from '@/lib/nexonAPI/getCharSetEffect';
import { getCharSkill } from '@/lib/nexonAPI/getCharSkill';
import { getCharStat } from '@/lib/nexonAPI/getCharStat';
import { getCharSymbolEquipment } from '@/lib/nexonAPI/getCharSymbolEquipment';
import { getCharVMatrix } from '@/lib/nexonAPI/getCharVMatrix';
import { getRankingUnion } from '@/lib/nexonAPI/getRankingUnion';
import { getUserUnion } from '@/lib/nexonAPI/getUserUnion';
import { getUserUnionRaider } from '@/lib/nexonAPI/getUserUnionRaider';
import { getGuildID } from "@/lib/nexonAPI/getGuildID";
import { getGuildBasic } from "@/lib/nexonAPI/getGuildBasic";
import { updateCharacterInfo } from "@/lib/todAPI/updateCharacterInfo";
import Equipment from "./statEquipment/equipment";
import Stat from "./statEquipment/stat";
import WorldCharacters from "./worldCharacters/page";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Skills from "./skills";
import Contents from "./contents";

export default async function Menu(props) {
    const characterName = props.characterName;

    return (
        <>
            <Tabs defaultValue="union" activationMode="manual" className="w-full">
                <TabsList className="justify-start w-full overflow-x-scroll hidden-scroll flex gap-x-[10px] sm:grid sm:grid-cols-5">
                    <TabsTrigger asChild value="stat/equipment"><Link href={`/char/${characterName}/statEquipment`}>스탯/장비</Link></TabsTrigger>
                    <TabsTrigger asChild value="skills">스킬</TabsTrigger>
                    <TabsTrigger asChild value="union" disabled>유니온</TabsTrigger>
                    <TabsTrigger asChild value="contents">컨텐츠</TabsTrigger>
                    <TabsTrigger asChild value="worldCharacters"><Link href={`/char/${characterName}/worldCharacters`}>보유 캐릭터</Link></TabsTrigger>
                </TabsList>


                {/* <TabsContent value="stat/equipment">
                        <div className="grid grid-cols-3 gap-2">
                            <Equipment character={user} />
                            <Stat character={user} />
                        </div>
                    </TabsContent > */}


                <TabsContent value="skills">
                    <Skills character={user} />
                </TabsContent>


                {/* <TabsContent value="union">

                    </TabsContent> */}


                <TabsContent value="contents">
                    <Contents character={user} test={getCharOCID} />
                </TabsContent>


                {/* <TabsContent value="worldCharacters">
                        <Suspense fallback={<Skeleton className="min-h-[500px]" />}>
                            <WorldCharacters characterName={user?.rankingUnion?.ranking?.[0]?.character_name} worldName={user?.rankingUnion?.ranking?.[0]?.world_name} />
                        </Suspense>
                    </TabsContent> */}
            </Tabs>
        </>
    );
}
