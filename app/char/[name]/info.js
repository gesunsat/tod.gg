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
import { getCharPropensity } from '@/lib/nexonAPI/getCharPropensity';
import { getCharSetEffect } from '@/lib/nexonAPI/getCharSetEffect';
import { getCharSkill } from '@/lib/nexonAPI/getCharSkill';
import { getCharStat } from '@/lib/nexonAPI/getCharStat';
import { getCharSymbolEquipment } from '@/lib/nexonAPI/getCharSymbolEquipment';
import { getCharVMatrix } from '@/lib/nexonAPI/getCharVMatrix';
import { getRankingUnion } from '@/lib/nexonAPI/getRankingUnion';
import { getUserUnion } from '@/lib/nexonAPI/getUserUnion';
import { getUserUnionRaider } from '@/lib/nexonAPI/getUserUnionRaider';
import { getGuildID } from "@/lib/nexonAPI/getGuildID";
import Equipment from "./equipment";
import { getGuildBasic } from "@/lib/nexonAPI/getGuildBasic";
import Stat from "./stat";
import AccountCharacters from "./accountCharacter";
import { updateCharacterInfo } from "@/lib/todAPI/updateCharacterInfo";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Skills from "./skills";

export default async function CharacterInfo(props) {
    const OCID = await getCharOCID(props.characterName);
    if (!OCID?.ocid) {
        return (
            <div className="text-center my-64">
                <div>존재하지 않거나 불러올 수 없는 캐릭터입니다.</div>
                <div>다음 날 오전 1시 이후 다시 검색해주세요.</div>
                <br></br>
                <div>(2023년 12월 21일 이후 접속한 캐릭터만 조회가 가능합니다.)</div>
            </div>
        )
    }

    const charBasic = await getCharBasic(OCID.ocid);
    if (!charBasic?.character_class) {
        return (
            <div className="text-center my-64">
                <div>존재하지 않거나 불러올 수 없는 캐릭터입니다.</div>
                <div>다음 날 오전 1시 이후 다시 검색해주세요.</div>
                <br></br>
                <div>(2023년 12월 21일 이후 접속한 캐릭터만 조회가 가능합니다.)</div>
            </div>
        )
    }

    const guildName = charBasic?.character_guild_name;
    const worldName = charBasic?.world_name;
    let guildID = {};
    let guildBasic = {};
    if (guildName) {
        guildID = await getGuildID(worldName, guildName);
        guildBasic = await getGuildBasic(guildID.oguild_id);
    }

    const [
        charPopularity,
        charAbility,
        charStat,
        charHyperStat,
        charPropensity,
        charItemEquipment,
        charCashitemEquipment,
        charSymbolEquipment,
        charSetEffect,
        charBeautyEquipment,
        charAndroidEquipment,
        charPetEquipment,
        charSkill5th,
        charSkill6th,
        charLinkSkill,
        charVMatrix,
        charHexaMatrix,
        charHexaMatrixStat,
        charDojang,
        userUnion,
        userUnionRaider,
        rankingUnion,
    ] = await Promise.all([
        getCharPopularity(OCID.ocid),
        getCharAbility(OCID.ocid),
        getCharStat(OCID.ocid),
        getCharHyperStat(OCID.ocid),
        getCharPropensity(OCID.ocid),
        getCharItemEquipment(OCID.ocid),
        getCharCashitemEquipment(OCID.ocid),
        getCharSymbolEquipment(OCID.ocid),
        getCharSetEffect(OCID.ocid),
        getCharBeautyEquipment(OCID.ocid),
        getCharAndroidEquipment(OCID.ocid),
        getCharPetEquipment(OCID.ocid),
        getCharSkill(OCID.ocid, 5),
        getCharSkill(OCID.ocid, 6),
        getCharLinkSkill(OCID.ocid),
        getCharVMatrix(OCID.ocid),
        getCharHexaMatrix(OCID.ocid),
        getCharHexaMatrixStat(OCID.ocid),
        getCharDojang(OCID.ocid),
        getUserUnion(OCID.ocid),
        getUserUnionRaider(OCID.ocid),
        getRankingUnion(OCID.ocid)
    ]);

    const user = {
        "characterBasic": charBasic,
        "characterPopularity": charPopularity,
        "characterPopularity": charPopularity,
        "characterAbility": charAbility,
        "characterStat": charStat,
        "characterHyperStat": charHyperStat,
        "characterPropensity": charPropensity,
        "characterItemEquipment": charItemEquipment,
        "characterCashitemEquipment": charCashitemEquipment,
        "characterSymbolEquipment": charSymbolEquipment,
        "characterSetEffect": charSetEffect,
        "characterBeautyEquipment": charBeautyEquipment,
        "characterAndroidEquipment": charAndroidEquipment,
        "characterPetEquipment": charPetEquipment,
        "characterSkill5th": charSkill5th,
        "characterSkill6th": charSkill6th,
        "characterLinkSkill": charLinkSkill,
        "characterVMatrix": charVMatrix,
        "characterHexaMatrix": charHexaMatrix,
        "characterHexaMatrixStat": charHexaMatrixStat,
        "characterDojang": charDojang,
        "userUnion": userUnion,
        "userUnionRaider": userUnionRaider,
        "rankingUnion": rankingUnion,
        "guildBasic": guildBasic,
    };

    updateCharacterInfo(OCID.ocid, user);

    return (
        <>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="grid grid-cols-4">
                    <div className="col-span-4 lg:col-span-1 text-center p-3">
                        <div className={"relative h-56 lg:h-full overflow-hidden bg-negative-fixed-more text-positive-fixed bg-center bg-no-repeat bg-contain"} style={{ backgroundImage: `url(${user.characterBasic.character_image})` }}></div>
                    </div>
                    <div className="col-span-4 lg:col-span-3 bg-muted bg-opacity-20 flex justify-between flex-1 p-3 relative rounded-md lg:rounded-s-none lg:rounded-e-md">
                        <div>
                            <div className="text-3xl font-bold">{user.characterBasic.character_name}</div>
                            <div className="mt-5 space-y-1.5">
                                <div className="flex">
                                    <Badge className={"text-[14px] w-[65px] flex justify-center mr-2"}>레벨</Badge>
                                    <div>
                                        <span className="text-xs">Lv. </span>
                                        <span>{user.characterBasic.character_level}</span>
                                    </div>
                                </div>
                                <div className="flex">
                                    <Badge className={"text-[14px] w-[65px] flex justify-center mr-2"}>직업</Badge>
                                    <span>{user.characterBasic.character_class}({user.characterBasic.character_gender})</span>
                                </div>
                                <div className="flex">
                                    <Badge className={"text-[14px] w-[65px] flex justify-center mr-2"}>서버</Badge>
                                    <div className="flex items-center">
                                        <Image width={20} height={20} className="my-auto mr-1" alt="서버 이미지" src={serverIconImg[user.characterBasic.world_name]}></Image>
                                        <span>{user.characterBasic.world_name}</span>
                                    </div>
                                </div>
                                <div className="flex">
                                    <Badge className={"text-[14px] w-[65px] flex justify-center mr-2"}>길드</Badge>
                                    <Link href={user.characterBasic.character_guild_name ? `/guild/${user.characterBasic.world_name}/${user.characterBasic.character_guild_name}` : ""}>
                                        <div className="flex items-center">
                                            {
                                                (user.guildBasic.guild_mark || user.guildBasic.guild_mark_custom) &&
                                                <Image width={20} height={20} className="my-auto mr-1" alt="길드 이미지" src={user.guildBasic.guild_mark || `data:image/png;base64,${user.guildBasic.guild_mark_custom}`}></Image>
                                            }
                                            <span className={user.guildBasic.guild_name && "underline underline-offset-4"}>{user.characterBasic.character_guild_name ? user.characterBasic.character_guild_name : "-"}</span>
                                        </div>
                                    </Link>
                                </div>
                                <div className="flex">
                                    <Badge className={"text-[14px] w-[65px] flex justify-center mr-2"}>인기도</Badge>
                                    <span>{user.characterPopularity.popularity || 0}</span>
                                </div>
                                <div className="flex">
                                    <Badge className={"text-[14px] w-[65px] flex justify-center mr-2"}>유니온</Badge>
                                    <span>Lv. {user.userUnion.union_level || 0}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 lg:my-auto left-0 top-full lg:top-0 absolute lg:relative h-[230px] w-full lg:max-w-[410px]">
                            <div id="RichMidia" className="mx-auto border-[1px] h-full w-full max-w-[410px] rounded-lg border-neutral-500">
                                <div className="flex flex-col h-full justify-center">
                                    <div className="mx-auto">
                                        <div className="absolute right-1/2 translate-x-1/2 translate-y-[-18px] opacity-50">AD</div>
                                        <PlayIcon width={50} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="MobileRichMidaMargin" className="mt-3 lg:mt-0 w-full h-[230px] lg:h-0"></div>

            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-2 mt-2">
                <Tabs defaultValue="stat/equipment" activationMode="manual" className="w-full">
                    <TabsList className="justify-start w-full overflow-x-scroll hidden-scroll flex gap-x-[10px] sm:grid sm:grid-cols-5">
                        <TabsTrigger value="stat/equipment">스탯/장비</TabsTrigger>
                        <TabsTrigger value="skills">스킬</TabsTrigger>
                        <TabsTrigger value="union" disabled>유니온</TabsTrigger>
                        <TabsTrigger value="contents" disabled>콘텐츠</TabsTrigger>
                        <TabsTrigger value="accountCharacters">보유 캐릭터</TabsTrigger>
                    </TabsList>


                    <TabsContent value="stat/equipment">
                        <div className="grid grid-cols-3 gap-2">
                            <Equipment character={user} />
                            <Stat character={user} />
                        </div>
                    </TabsContent >


                    <TabsContent value="skills">
                        <Skills character={user} />
                    </TabsContent>


                    <TabsContent value="union">

                    </TabsContent>


                    <TabsContent value="contents">

                    </TabsContent>


                    <TabsContent value="accountCharacters">
                        <Suspense fallback={<Skeleton className="min-h-[500px]" />}>
                            <AccountCharacters rankingUnion={user.rankingUnion} />
                        </Suspense>
                    </TabsContent>
                </Tabs >
            </div >
        </>
    );
}
