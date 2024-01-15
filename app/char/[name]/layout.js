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
import Menu from "./mainTabs";
import { serverIconImg } from "@/mapleData/serverIconImg";
import { getWorldCharacters } from "@/lib/todAPI/getWorldCharacters";

export async function generateMetadata({ params }) {
    try {
        const OCID = await getCharOCID(decodeURI(params.name));

        if (!OCID?.ocid) {
            return {
                title: "캐릭터 정보 | TOD.GG",
                description: "캐릭터가 존재하지 않거나 불러올 수 없는 캐릭터입니다.",
            }
        }

        const [characterBasic, characterStat, userUnion] = await Promise.all([
            getCharBasic(OCID.ocid),
            getCharStat(OCID.ocid),
            getUserUnion(OCID.ocid)
        ]);

        if (!characterBasic.character_class) {
            return {
                title: "캐릭터 정보 | TOD.GG",
                description: "캐릭터가 존재하지 않거나 불러올 수 없는 캐릭터입니다.",
            }
        }

        return {
            title: `${characterBasic.character_name} 캐릭터 정보 | TOD.GG 토드지지`,
            description:
                `${characterBasic.world_name} | ` +
                `${characterBasic.character_class} | ` +
                `Lv.${characterBasic.character_level} | ` +
                `길드:${characterBasic.character_guild_name ? characterBasic.character_guild_name + " | " : "- | "}` +
                `전투력:${characterStat?.final_stat.reverse().map((stat) => { if (stat.stat_name == "전투력") return parseInt(stat.stat_value).toLocaleString() }).join('')} | ` +
                `${userUnion?.union_level ? "유니온:" + userUnion?.union_level : ""}`,
            openGraph: {
                images: characterBasic.character_image,
                url: `https://tod.gg/char/${params.id}`,
                title: `${characterBasic.character_name} 캐릭터 정보 | TOD.GG`,
                description:
                    `${characterBasic.world_name} | ` +
                    `${characterBasic.character_class} | ` +
                    `Lv.${characterBasic.character_level} | ` +
                    `길드:${characterBasic.character_guild_name ? characterBasic.character_guild_name + " | " : "- | "}` +
                    `전투력:${characterStat?.final_stat.reverse().map((stat) => { if (stat.stat_name == "전투력") return parseInt(stat.stat_value).toLocaleString() }).join('')} | ` +
                    `${userUnion?.union_level ? "유니온:" + userUnion?.union_level : ""}`,
            }
        }
    } catch (err) {
        console.log(err);
        return {
            title: "캐릭터 정보 | TOD.GG",
            description: "캐릭터가 존재하지 않거나 불러올 수 없는 캐릭터입니다.",
        }
    }
}

export default async function CharacterLayout({ params, children }) {
    const characterName = decodeURI(params.name);
    const OCID = await getCharOCID(characterName);
    if (!OCID?.ocid) {
        return (
            <div className="text-center my-64">
                <div>존재하지 않거나 불러올 수 없는 캐릭터입니다.</div>
                <div>다음 날 오전 1시 이후 다시 검색해주세요.</div>
                <br />
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
                <br />
                <div>(2023년 12월 21일 이후 접속한 캐릭터만 조회가 가능합니다.)</div>
            </div>
        )
    }

    const worldName = charBasic?.world_name;
    const guildName = charBasic?.character_guild_name;
    const [
        charPopularity,
        charStat,
        userUnion,
        rankingUnion,
        guildBasic,
    ] = await Promise.all([
        getCharPopularity(OCID.ocid),
        getCharStat(OCID.ocid),
        getUserUnion(OCID.ocid),
        getRankingUnion(OCID.ocid),
        (async () => {
            const guildID = await getGuildID(worldName, guildName);
            return await getGuildBasic(guildID.oguild_id);
        })(),
    ]);

    const user = {
        "characterBasic": charBasic,
        "characterPopularity": charPopularity,
        "characterStat": charStat,
        "userUnion": userUnion,
        "rankingUnion": rankingUnion,
        "guildBasic": guildBasic,
    };

    updateCharacterInfo(OCID.ocid, user);

    return (
        <>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="grid grid-cols-4">
                    <div className="col-span-4 lg:col-span-1 text-center p-3">
                        {
                            user?.characterBasic?.character_image &&
                            <div
                                style={{ '--image-url': `url(${user.characterBasic.character_image})` }}
                                className={"relative h-56 lg:h-full overflow-hidden bg-negative-fixed-more text-positive-fixed bg-center bg-no-repeat bg-contain bg-[image:var(--image-url)]"}
                            />
                        }
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
                <Menu characterName={characterName} />

                <div className="mt-2">
                    {children}
                </div>
            </div>
        </>
    )
}