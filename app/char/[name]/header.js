import { Badge } from "@/components/ui/badge";
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
import { PlayIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { serverIconImg } from "@/mapleData/serverIconImg";
import { getWorldCharacters } from "@/lib/todAPI/getWorldCharacters";
import { headers } from 'next/headers';
import { searchQueryParams } from "@/lib/getQueryParam";
import { DatePicker } from "@/components/datePicker";
import CharHeaderCharacterImage from "./headerCharacterImage";

export default async function CharHeader(props) {
    const characterName = decodeURI(props.characterName);
    const headersList = headers();
    const header_url = headersList.get("x-url") || "";
    const selectedDate = searchQueryParams({ query: "date", fullUrl: header_url });

    const OCID = await getCharOCID(characterName);
    const charBasic = await getCharBasic(OCID.ocid, selectedDate);

    const worldName = charBasic?.world_name;
    const guildName = charBasic?.character_guild_name;
    const [
        charPopularity,
        charStat,
        userUnion,
        rankingUnion,
        guildBasic,
    ] = await Promise.all([
        getCharPopularity(OCID.ocid, selectedDate),
        getCharStat(OCID.ocid, selectedDate),
        getUserUnion(OCID.ocid, selectedDate),
        getRankingUnion(OCID.ocid, selectedDate),
        (async () => {
            const guildID = await getGuildID(worldName, guildName, selectedDate);
            return await getGuildBasic(guildID.oguild_id, selectedDate);
        })(),
    ]);

    const character = {
        "characterBasic": charBasic,
        "characterPopularity": charPopularity,
        "characterStat": charStat,
        "userUnion": userUnion,
        "rankingUnion": rankingUnion,
        "guildBasic": guildBasic,
    };

    updateCharacterInfo(OCID.ocid, character, selectedDate);

    return (
        <>
            <CharHeaderCharacterImage character={character} />
            <div className="col-span-4 lg:col-span-3 bg-muted bg-opacity-20 flex justify-between flex-1 p-3 rounded-md lg:rounded-s-none lg:rounded-e-md">
                <div>
                    <div className="text-3xl font-bold">{character.characterBasic.character_name}</div>
                    <div className="mt-5 space-y-1.5">
                        <div className="flex">
                            <Badge className={"text-[14px] w-[65px] flex justify-center mr-2"}>레벨</Badge>
                            <div>
                                <span className="text-xs">Lv. </span>
                                <span>{character.characterBasic.character_level}</span>
                            </div>
                        </div>
                        <div className="flex">
                            <Badge className={"text-[14px] w-[65px] flex justify-center mr-2"}>직업</Badge>
                            <span>{character.characterBasic.character_class}({character.characterBasic.character_gender})</span>
                        </div>
                        <div className="flex">
                            <Badge className={"text-[14px] w-[65px] flex justify-center mr-2"}>서버</Badge>
                            <div className="flex items-center">
                                <Image width={25} height={25} className="w-auto h-[24px] my-auto mr-1" alt="서버 이미지" src={serverIconImg[character.characterBasic.world_name]}></Image>
                                <span>{character.characterBasic.world_name}</span>
                            </div>
                        </div>
                        <div className="flex">
                            <Badge className={"text-[14px] w-[65px] flex justify-center mr-2"}>길드</Badge>
                            <Link href={character.characterBasic.character_guild_name ? `/guild/${character.characterBasic.world_name}/${character.characterBasic.character_guild_name}` : ""}>
                                <div className="flex items-center">
                                    {
                                        (character.guildBasic.guild_mark || character.guildBasic.guild_mark_custom) &&
                                        <Image width={24} height={24} className="my-auto mr-1" alt="길드 이미지" src={character.guildBasic.guild_mark || `data:image/png;base64,${character.guildBasic.guild_mark_custom}`}></Image>
                                    }
                                    <span className={character.guildBasic.guild_name && "underline underline-offset-4"}>{character.characterBasic.character_guild_name ? character.characterBasic.character_guild_name : "-"}</span>
                                </div>
                            </Link>
                        </div>
                        <div className="flex">
                            <Badge className={"text-[14px] w-[65px] flex justify-center mr-2"}>인기도</Badge>
                            <span>{character.characterPopularity.popularity || 0}</span>
                        </div>
                        <div className="flex">
                            <Badge className={"text-[14px] w-[65px] flex justify-center mr-2"}>유니온</Badge>
                            <span>Lv. {character.userUnion.union_level || 0}</span>
                        </div>
                        <div className="flex">
                            <Badge className={"text-[14px] w-[65px] flex justify-center mr-2"}>기준일</Badge>
                            <DatePicker className="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}